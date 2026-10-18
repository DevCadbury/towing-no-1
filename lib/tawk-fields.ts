/**
 * Maps tawk.to pre-chat form data to our four fields. CLIENT + SERVER SAFE
 * (no node-only imports), because it runs inside the browser onPrechatSubmit
 * callback.
 *
 * The onPrechatSubmit `data` shape is NOT rigidly documented and varies across
 * tawk.to widget versions (top-level keys, a `questions` array of {label,answer},
 * or a flat label->value object). We therefore map DEFENSIVELY by label and never
 * assume a fixed property name. Fields we cannot find are returned empty (no
 * guessing). `describeShape` returns only structural info (labels/keys) for safe,
 * PII-free debug logging.
 */

export interface MappedPrechat {
  name: string;
  phone: string;
  from: string;
  to: string;
  email: string;
}

interface Pair {
  label: string;
  answer: string;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : v === null || v === undefined ? "" : String(v);
}

function pushPair(pairs: Pair[], item: unknown): void {
  if (!item || typeof item !== "object") return;
  const o = item as Record<string, unknown>;
  const label = str(o.label || o.name || o.title || o.key || o.question || o.id);
  const answer = str(o.answer ?? o.value ?? o.val ?? o.text ?? o.response);
  if (label || answer) pairs.push({ label, answer });
}

function collectPairs(data: unknown): Pair[] {
  const pairs: Pair[] = [];
  if (Array.isArray(data)) {
    for (const item of data) pushPair(pairs, item);
    return pairs;
  }
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    // Nested arrays of {label, answer} under common keys.
    for (const key of ["questions", "fields", "customFields", "answers", "preChatForm"]) {
      const arr = o[key];
      if (Array.isArray(arr)) for (const item of arr) pushPair(pairs, item);
    }
    // Flat key -> string entries (covers top-level name/email/phone and label maps).
    for (const [key, val] of Object.entries(o)) {
      if (typeof val === "string") pairs.push({ label: key, answer: val });
    }
  }
  return pairs;
}

function pick(pairs: Pair[], patterns: RegExp[]): string {
  for (const re of patterns) {
    const hit = pairs.find((p) => re.test(p.label) && p.answer.trim());
    if (hit) return hit.answer.trim();
  }
  return "";
}

export function mapPrechatData(data: unknown): MappedPrechat {
  const pairs = collectPairs(data);
  return {
    name: pick(pairs, [/^name$/i, /full\s*name/i, /\bname\b/i]),
    phone: pick(pairs, [/phone/i, /mobile/i, /contact\s*(no|number)/i, /\btel\b/i, /whats\s*app/i]),
    // "Roadside Assistance From?" (pickup). Specific patterns first, then fallbacks.
    from: pick(pairs, [/roadside.*from/i, /^from\b/i, /pick\s*-?\s*up/i, /pickup/i, /origin/i, /\bfrom\b/i]),
    // "Roadside Assistance to" (destination).
    to: pick(pairs, [/roadside.*\bto\b/i, /^to\b/i, /destination/i, /drop\s*-?\s*off/i, /dropoff/i, /\bto\b/i]),
    email: pick(pairs, [/e-?mail/i]),
  };
}

/** Structure-only summary (labels/keys, NO answers) for safe debug logging. */
export function describeShape(data: unknown): { kind: string; labels: string[] } {
  if (Array.isArray(data)) {
    return { kind: "array", labels: collectPairs(data).map((p) => p.label).filter(Boolean) };
  }
  if (data && typeof data === "object") {
    return { kind: "object", labels: collectPairs(data).map((p) => p.label).filter(Boolean) };
  }
  return { kind: typeof data, labels: [] };
}
