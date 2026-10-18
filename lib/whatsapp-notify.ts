import crypto from "node:crypto";

/**
 * Server-side client that forwards a lead notification to the WhatsApp bot's
 * VPS backend. SERVER ONLY — this module reads secrets from the environment and
 * must never be imported into client components or bundles.
 *
 * Security properties:
 * - Signs every request with HMAC-SHA256 over `${timestamp}.${nonce}.${rawBody}`
 *   using WHATSAPP_NOTIFICATION_TOKEN (shared with the VPS). The secret is never
 *   transmitted.
 * - Refuses to POST over plain public HTTP (HTTPS-only guard), so visitor PII is
 *   never sent unencrypted. Email/UX are unaffected because callers treat this
 *   as best-effort.
 * - Never throws; returns a structured result. The destination group is fixed on
 *   the VPS, so the recipient can never be chosen here.
 */

export type NotifySource = "prechat" | "contact" | "webhook";

export interface NotifyPayload {
  type: "chat" | "contact";
  source: NotifySource;
  data: Record<string, string | undefined>;
  chatEventId?: string;
}

export interface NotifyResult {
  ok: boolean;
  status: string;
  httpStatus?: number;
  reason?: string;
}

export interface NotifyOptions {
  backendUrl?: string;
  token?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  now?: number;
  nonce?: string;
  allowInsecure?: boolean;
  env?: NodeJS.ProcessEnv;
  logger?: { warn?: (msg: string) => void; error?: (msg: string) => void };
}

function isHttps(url: string): boolean {
  return /^https:\/\//i.test(url);
}

export function signNotifyRequest(token: string, timestamp: string, nonce: string, rawBody: string): string {
  return crypto.createHmac("sha256", token).update(`${timestamp}.${nonce}.${rawBody}`).digest("hex");
}

export async function notifyWhatsApp(payload: NotifyPayload, options: NotifyOptions = {}): Promise<NotifyResult> {
  const env = options.env ?? process.env;
  const backendUrl = (options.backendUrl ?? env.WHATSAPP_BACKEND_URL ?? "").trim().replace(/\/+$/, "");
  const token = (options.token ?? env.WHATSAPP_NOTIFICATION_TOKEN ?? "").trim();
  const timeoutMs = options.timeoutMs ?? (Number(env.WHATSAPP_NOTIFY_TIMEOUT_MS) || 3000);
  const allowInsecure = options.allowInsecure ?? env.WHATSAPP_NOTIFY_ALLOW_INSECURE === "true";
  const log = options.logger ?? console;
  const doFetch = options.fetchImpl ?? fetch;

  // Feature-flagged: silently no-op when not configured (email/UX unaffected).
  if (!backendUrl || !token) {
    return { ok: false, status: "disabled", reason: "not_configured" };
  }

  // Transport guard: require HTTPS by default. Plain HTTP is only used when
  // WHATSAPP_NOTIFY_ALLOW_INSECURE=true is explicitly set (an informed override
  // for an IP/HTTP backend). Default stays safe so PII isn't leaked by accident.
  if (!isHttps(backendUrl) && !allowInsecure) {
    log.warn?.("[whatsapp-notify] skipped: backend URL is not HTTPS (set WHATSAPP_NOTIFY_ALLOW_INSECURE=true to override)");
    return { ok: false, status: "skipped", reason: "insecure_backend" };
  }
  if (!isHttps(backendUrl)) {
    log.warn?.("[whatsapp-notify] sending over PLAIN HTTP (WHATSAPP_NOTIFY_ALLOW_INSECURE=true) — use HTTPS in production");
  }

  const rawBody = JSON.stringify(payload);
  const timestamp = String(options.now ?? Date.now());
  const nonce = options.nonce ?? crypto.randomBytes(18).toString("hex");
  const signature = signNotifyRequest(token, timestamp, nonce, rawBody);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await doFetch(`${backendUrl}/api/notify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-notify-timestamp": timestamp,
        "x-notify-nonce": nonce,
        "x-notify-signature": signature,
      },
      body: rawBody,
      signal: controller.signal,
    });

    if (!res.ok) {
      const status = res.status === 429 ? "rate_limited" : "error";
      log.warn?.(`[whatsapp-notify] backend responded ${res.status}`);
      return { ok: false, status, httpStatus: res.status };
    }

    let status = "sent";
    try {
      const json = (await res.json()) as { status?: string };
      if (json && typeof json.status === "string") status = json.status;
    } catch {
      /* non-JSON 2xx is still a success */
    }
    return { ok: true, status, httpStatus: res.status };
  } catch (err) {
    // Log the error *type* only — never the payload (PII) or the URL.
    const name = err instanceof Error ? err.name : "error";
    log.error?.(`[whatsapp-notify] request failed: ${name}`);
    return { ok: false, status: "error", reason: "network" };
  } finally {
    clearTimeout(timer);
  }
}
