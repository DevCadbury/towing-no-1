/**
 * Pure request-processing logic for the tawk.to pre-chat endpoint. SERVER ONLY.
 *
 * Kept free of `next/server` so it can be unit-tested directly. The route file
 * is a thin adapter that injects the real dependencies.
 */

export interface PrechatDeps {
  verifyRecaptcha: (token: string, opts?: { expectedAction?: string }) => Promise<{ ok: boolean; reason?: string }>;
  rateLimit: (key: string, limit: number, windowMs: number, now?: number) => { allowed: boolean };
  ipFromHeaders: (getHeader: (name: string) => string | null | undefined) => string;
  notify: (payload: {
    type: "chat";
    source: "prechat";
    data: Record<string, string>;
  }) => Promise<{ ok: boolean; status: string }>;
}

export interface ProcessPrechatArgs {
  raw: string;
  getHeader: (name: string) => string | null | undefined;
  env?: NodeJS.ProcessEnv;
  deps: PrechatDeps;
}

const MAX_BODY_BYTES = 8 * 1024;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

export async function processPrechat(args: ProcessPrechatArgs): Promise<{ httpStatus: number; body: unknown }> {
  const { raw, getHeader, deps } = args;
  const env = args.env ?? process.env;

  // Size guard (header hint + actual bytes).
  const contentLength = Number(getHeader("content-length") || 0);
  const byteLength = Buffer.byteLength(raw || "", "utf8");
  if ((contentLength && contentLength > MAX_BODY_BYTES) || byteLength > MAX_BODY_BYTES) {
    return { httpStatus: 413, body: { ok: false, error: "payload too large" } };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return { httpStatus: 400, body: { ok: false, error: "invalid request" } };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { httpStatus: 400, body: { ok: false, error: "invalid request" } };
  }

  // Best-effort per-IP rate limit (documented serverless limitation).
  const ip = deps.ipFromHeaders(getHeader);
  const limit = Number(env.CHAT_RATE_LIMIT) || 5;
  const windowMs = Number(env.CHAT_RATE_WINDOW_MS) || 60_000;
  if (!deps.rateLimit(`prechat:${ip}`, limit, windowMs).allowed) {
    return { httpStatus: 429, body: { ok: false, error: "rate limited" } };
  }

  // reCAPTCHA (action "prechat"). Skipped only when no secret is configured.
  const token = typeof parsed.recaptchaToken === "string" ? parsed.recaptchaToken : "";
  const rc = await deps.verifyRecaptcha(token, { expectedAction: "prechat" });
  if (!rc.ok) {
    return { httpStatus: 400, body: { ok: false, error: "verification failed" } };
  }

  // Validate + sanitize the four fields (Name required; others handled safely).
  const name = clean(parsed.name, 120);
  const phone = clean(parsed.phone, 40);
  const from = clean(parsed.from, 200);
  const to = clean(parsed.to, 200);
  const email = clean(parsed.email, 160);
  if (!name) {
    return { httpStatus: 400, body: { ok: false, error: "name required" } };
  }

  // Best-effort WhatsApp notification. The destination group is fixed on the VPS.
  // Downstream status is intentionally NOT echoed (don't leak internals); the
  // chat UX proceeds regardless.
  await deps.notify({ type: "chat", source: "prechat", data: { name, phone, from, to, email } });

  return { httpStatus: 200, body: { ok: true } };
}
