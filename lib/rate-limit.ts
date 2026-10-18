/**
 * Best-effort in-memory fixed-window rate limiter. SERVER ONLY.
 *
 * IMPORTANT LIMITATION: on Vercel (serverless) each instance has its own memory,
 * so these limits are per-instance and NOT globally authoritative. They raise the
 * bar against casual abuse; the authoritative limits/dedup live on the VPS bot
 * (global quota + per-contact cooldown behind HMAC auth). Documented in the runbook.
 */

type Bucket = { start: number; count: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now()
): { allowed: boolean; count: number } {
  let b = buckets.get(key);
  if (!b || now - b.start >= windowMs) {
    b = { start: now, count: 0 };
    buckets.set(key, b);
  }
  b.count += 1;
  // Opportunistic cleanup to bound memory.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now - v.start >= windowMs) buckets.delete(k);
    }
  }
  return { allowed: b.count <= limit, count: b.count };
}

export function resetRateLimit(): void {
  buckets.clear();
}

type GetHeader = (name: string) => string | null | undefined;

/**
 * Derive a client identifier from proxy headers. On Vercel the platform sets
 * `x-forwarded-for` with the real client as the FIRST entry. We take the first
 * hop and fall back to `x-real-ip`. This is best-effort and can be influenced by
 * forged headers on arbitrary hosts, which is why it is never the sole control.
 */
export function ipFromHeaders(getHeader: GetHeader): string {
  const xff = getHeader("x-forwarded-for");
  if (xff) {
    const first = String(xff).split(",")[0]?.trim();
    if (first) return first;
  }
  const real = getHeader("x-real-ip");
  if (real) return String(real).trim();
  return "unknown";
}
