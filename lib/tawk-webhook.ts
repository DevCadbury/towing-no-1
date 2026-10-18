import crypto from "node:crypto";

/**
 * tawk.to webhook verification + processing. SERVER ONLY.
 *
 * Per tawk.to docs, each webhook is signed with HMAC-SHA1 over the EXACT raw
 * request body using the webhook secret, sent in the `X-Tawk-Signature` header.
 * We verify over the raw bytes with a constant-time compare.
 *
 * This endpoint is SUPPLEMENTARY. The primary 4-field lead comes from the
 * pre-chat callback; `chat:start` does not carry Phone/From/To. By default this
 * receiver verifies + acknowledges but sends NO WhatsApp message (so it cannot
 * duplicate the pre-chat lead). Set TAWK_WEBHOOK_NOTIFY_FALLBACK=true to enable
 * a fallback notification (the VPS suppresses it if a recent pre-chat lead for
 * the same visitor already went out).
 */

const HASH_ALGO = "sha1"; // tawk.to uses HMAC-SHA1; centralised so it can be adjusted
const MAX_BODY_BYTES = 32 * 1024;

export function computeTawkSignature(rawBody: string, secret: string, encoding: "hex" | "base64" = "hex"): string {
  return crypto.createHmac(HASH_ALGO, secret).update(rawBody, "utf8").digest(encoding);
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length === 0 || ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function verifyTawkSignature(rawBody: string, signature: string | null | undefined, secret: string): boolean {
  if (!secret || !signature) return false;
  // Accept hex (documented) and base64 (defensive) encodings.
  return safeEqual(signature, computeTawkSignature(rawBody, secret, "hex"))
    || safeEqual(signature, computeTawkSignature(rawBody, secret, "base64"));
}

function str(v: unknown): string {
  return typeof v === "string" ? v : v === null || v === undefined ? "" : String(v);
}

export interface ParsedChatStart {
  event: string;
  chatId: string;
  time: string;
  domain: string;
  name: string;
  email: string;
  message: string;
  senderType: string;
}

export function parseTawkChatStart(payload: Record<string, unknown>): ParsedChatStart {
  const visitor = (payload.visitor as Record<string, unknown>) || {};
  const message = (payload.message as Record<string, unknown>) || {};
  const sender = (message.sender as Record<string, unknown>) || {};
  return {
    event: str(payload.event),
    chatId: str(payload.chatId),
    time: str(payload.time),
    domain: str(payload.domain),
    name: str(visitor.name),
    email: str(visitor.email),
    message: str(message.text),
    senderType: str(sender.type),
  };
}

export interface TawkWebhookDeps {
  rateLimit: (key: string, limit: number, windowMs: number, now?: number) => { allowed: boolean };
  ipFromHeaders: (getHeader: (name: string) => string | null | undefined) => string;
  notify: (payload: {
    type: "chat";
    source: "webhook";
    data: Record<string, string>;
    chatEventId?: string;
  }) => Promise<{ ok: boolean; status: string }>;
  logger?: { warn?: (msg: string) => void; info?: (msg: string) => void };
}

export interface ProcessTawkArgs {
  raw: string;
  getHeader: (name: string) => string | null | undefined;
  env?: NodeJS.ProcessEnv;
  deps: TawkWebhookDeps;
}

export async function processTawkWebhook(args: ProcessTawkArgs): Promise<{ httpStatus: number; body: unknown }> {
  const { raw, getHeader, deps } = args;
  const env = args.env ?? process.env;
  const secret = (env.TAWK_WEBHOOK_SECRET || "").trim();
  const log = deps.logger;

  if (!secret) {
    return { httpStatus: 503, body: { ok: false, error: "not configured" } };
  }

  const byteLength = Buffer.byteLength(raw || "", "utf8");
  if (byteLength > MAX_BODY_BYTES) {
    return { httpStatus: 413, body: { ok: false, error: "payload too large" } };
  }

  // Verify signature over the EXACT raw body BEFORE parsing.
  const signature = getHeader("x-tawk-signature");
  if (!verifyTawkSignature(raw, signature, secret)) {
    return { httpStatus: 401, body: { ok: false, error: "invalid signature" } };
  }

  let payload: Record<string, unknown>;
  try {
    payload = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return { httpStatus: 400, body: { ok: false, error: "invalid request" } };
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { httpStatus: 400, body: { ok: false, error: "invalid request" } };
  }

  const parsed = parseTawkChatStart(payload);

  // Only act on new-conversation events.
  if (parsed.event !== "chat:start") {
    return { httpStatus: 200, body: { ok: true, status: "ignored" } };
  }
  // Only visitor-originated starts (when sender info is present).
  if (parsed.senderType && parsed.senderType !== "visitor") {
    return { httpStatus: 200, body: { ok: true, status: "ignored" } };
  }

  // Best-effort rate limit (tawk delivers from a small set of IPs).
  const ip = deps.ipFromHeaders(getHeader);
  const limit = Number(env.WEBHOOK_RATE_LIMIT) || 60;
  if (!deps.rateLimit(`tawk-webhook:${ip}`, limit, 60_000).allowed) {
    return { httpStatus: 429, body: { ok: false, error: "rate limited" } };
  }

  // DEFAULT: acknowledge without notifying (pre-chat is the primary lead).
  if (env.TAWK_WEBHOOK_NOTIFY_FALLBACK !== "true") {
    log?.info?.("[tawk-webhook] verified chat:start (fallback disabled, not notifying)");
    return { httpStatus: 200, body: { ok: true, status: "acknowledged" } };
  }

  // Opt-in fallback: forward to the VPS as a webhook-sourced chat lead. The VPS
  // dedups by chatId and suppresses if a recent pre-chat lead already went out.
  const result = await deps.notify({
    type: "chat",
    source: "webhook",
    data: { name: parsed.name, email: parsed.email, message: parsed.message },
    chatEventId: parsed.chatId || undefined,
  });

  // Invite a tawk retry only on a transport error (VPS releases the dedup claim).
  if (!result.ok && result.status === "error") {
    return { httpStatus: 503, body: { ok: false, error: "temporary" } };
  }
  return { httpStatus: 200, body: { ok: true, status: "forwarded" } };
}
