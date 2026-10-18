/**
 * Server-side Google reCAPTCHA v3 verification. SERVER ONLY.
 *
 * Mirrors the behaviour already used by the contact form: when no secret is
 * configured, verification is skipped (so local/dev without keys still works).
 * When a secret IS configured, a missing/invalid/low-score/action-mismatched
 * token is rejected.
 */

export interface RecaptchaResult {
  ok: boolean;
  score?: number;
  reason?: string;
}

export interface RecaptchaOptions {
  secret?: string;
  expectedAction?: string;
  minScore?: number;
  fetchImpl?: typeof fetch;
  env?: NodeJS.ProcessEnv;
}

export async function verifyRecaptcha(token: string, options: RecaptchaOptions = {}): Promise<RecaptchaResult> {
  const env = options.env ?? process.env;
  const secret = (options.secret ?? env.RECAPTCHA_SECRET_KEY ?? "").trim();
  const minScore = options.minScore ?? 0.5;
  const doFetch = options.fetchImpl ?? fetch;

  if (!secret) return { ok: true, reason: "not_configured" };
  if (!token) return { ok: false, reason: "missing_token" };

  try {
    const res = await doFetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number; action?: string };
    if (data.success !== true) return { ok: false, reason: "failed" };
    if (options.expectedAction && data.action && data.action !== options.expectedAction) {
      return { ok: false, reason: "action_mismatch" };
    }
    if (typeof data.score === "number" && data.score < minScore) {
      return { ok: false, score: data.score, reason: "low_score" };
    }
    return { ok: true, score: data.score };
  } catch {
    return { ok: false, reason: "error" };
  }
}
