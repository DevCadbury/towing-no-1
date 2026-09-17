#!/usr/bin/env node
/**
 * Claims / Anti-Drift Guard — towingno1.com
 *
 * The enforcement backbone for the SEO/AEO/GEO/SXO engagement. It protects two
 * invariants that are easy to regress:
 *
 *   1. TRUST INTEGRITY — no fabricated or unverified business claim may leak
 *      into machine-readable structured data (JSON-LD), and no fabricated
 *      review / rating markup may exist at all.
 *   2. RENDER INTEGRITY — no page may ship a broken placeholder to crawlers or
 *      users: "<0", a counter stuck at 0 ("0+", "0/7", "0 min"), "NaN", an
 *      empty call-to-action box, or literal "**" left over from the blog body
 *      renderer.
 *
 * It reads the PRERENDERED HTML in .next/server/app (what crawlers actually
 * receive) plus the source in app/ and components/, and — once it exists —
 * lib/business-facts.ts (the single source of truth for every claim).
 *
 * Anti-drift rule enforced against business-facts.ts:
 *   status "verified"            -> may appear in UI + metadata + schema
 *   status "unverified"/"pending" -> MUST NOT appear in any JSON-LD block
 *                                    (may remain in UI only, by intent)
 *
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console report, exit code).
 *
 * Usage:
 *   npm run build && node scripts/claims-check.mjs
 *   node scripts/claims-check.mjs            # source-only checks still run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components");
const BUILT = path.join(ROOT, ".next", "server", "app");
const FACTS_FILE = path.join(ROOT, "lib", "business-facts.ts");

/* Known fabricated review authors that must never reappear in markup. */
const FABRICATED_AUTHORS = ["Sarah M.", "David K.", "Lisa R.", "Tom W."];

/* ─── helpers ──────────────────────────────────────────────────── */

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

// Strip JS/TS comments so documentation NOTES that mention tokens like
// "aggregateRating" or "Review" are not mistaken for real schema. The [^:]
// guard preserves "https://" inside string literals.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
}

function decode(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

// Remove <script>/<style>/<noscript> blocks so third-party inline config
// (e.g. the Reamaze chat widget's markdown "**Towing No. 1**") is not mistaken
// for rendered page content. JSON-LD is extracted separately from raw HTML.
function stripScripts(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
}

// Tag-aware text: drop tags, then decode entities. Keeps adjacent
// "&lt;" + "<span>0 min</span>" as "<0 min" (the exact prefix bug signature).
function toText(html) {
  return decode(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ");
}

// Extract the contents of every <script type="application/ld+json"> block.
function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push(decode(m[1]));
  return blocks;
}

/* ─── violation collection ─────────────────────────────────────── */

const violations = []; // { category, detail, where }
function flag(category, detail, where) {
  violations.push({ category, detail, where });
}

/* ─── load built HTML ──────────────────────────────────────────── */

const builtFiles = walk(BUILT, [".html"]);
const built = builtFiles.map((f) => ({ file: rel(f), html: read(f) }));
const haveBuild = built.length > 0;

/* ─── CHECK 1: render integrity (needs the build) ──────────────── */
// Counter-stuck-at-zero signatures + "<0" + "NaN" in the delivered HTML.
const COUNTER_ZERO = /<span[^>]*>\s*0(?:\+|\/7|\.\d+|\s*min(?:ute)?s?)?\s*<\/span>/i;
const COUNTER_ZERO_G = new RegExp(COUNTER_ZERO.source, "gi");

for (const { file, html } of built) {
  const visible = stripScripts(html);
  const text = toText(visible);

  if (text.includes("<0")) flag("RENDER_ZERO", 'rendered text contains "<0"', file);
  if (/\bNaN\b/.test(text)) flag("RENDER_NAN", 'rendered text contains "NaN"', file);

  // A stat counter that server-rendered as 0 (e.g. "<span>0+</span>",
  // "<span>0 min</span>", "<span>0/7</span>"). A fixed counter renders the
  // real value ("15+", "24/7", ...) so this only matches the bug.
  const zeros = visible.match(COUNTER_ZERO_G);
  if (zeros) {
    for (const z of [...new Set(zeros)]) {
      // Ignore a legitimate lone "0" with no numeric suffix inside prose spans:
      // require a suffix (+, /7, min, .d) OR the "<0" prefix handled above.
      if (/0(?:\+|\/7|\.\d+|\s*min)/i.test(z)) {
        flag("RENDER_ZERO", `counter rendered as zero: ${z.trim()}`, file);
      }
    }
  }
}

/* ─── CHECK 2: blog body renderer (empty CTA + literal **) ─────── */
for (const { file, html } of built) {
  if (!/\/blog\//.test(file) && !/blog\\/.test(file)) continue;
  const visible = stripScripts(html);
  const text = toText(visible);
  if (text.includes("**")) flag("BLOG_LITERAL_BOLD", 'rendered blog contains literal "**"', file);

  // Empty amber CTA box: an amber-50 container whose visible text is blank.
  const boxRe = /<div[^>]*bg-amber-50[^>]*>([\s\S]*?)<\/div>/gi;
  let bm;
  while ((bm = boxRe.exec(visible))) {
    const inner = toText(bm[1]).trim();
    if (inner === "") flag("BLOG_EMPTY_CTA", "empty amber CTA box (no text)", file);
  }
}

/* ─── CHECK 3: fabricated / self-serving review + rating markup ── */
// In JSON-LD (built) AND in source, flag fabricated authors, aggregateRating,
// and self-emitted Review nodes. Per the approved rule, review/rating markup
// may only be reintroduced after an explicit Google-eligibility review — so any
// such markup is flagged here until that allowlist decision is made.
const ldSources = [];
for (const { file, html } of built) for (const b of extractJsonLd(html)) ldSources.push({ where: file, ld: b });
// Source-level JSON-LD objects (constants ending in Schema) — catch before
// build too. Comments are stripped so documentation NOTES don't false-positive,
// and matches require the schema-property form (a key), not prose mentions.
for (const f of walk(APP, [".tsx", ".ts"])) {
  const src = stripComments(read(f));
  if (/application\/ld\+json/.test(src) || /Schema\s*=/.test(src)) ldSources.push({ where: rel(f), ld: src });
}

for (const { where, ld } of ldSources) {
  for (const author of FABRICATED_AUTHORS) {
    if (ld.includes(author)) flag("FABRICATED_REVIEW", `fabricated review author "${author}"`, where);
  }
  // Require the property form (key), so "aggregateRating" in prose/HTML text
  // does not trip it — only a real `aggregateRating:` / `"aggregateRating"` key.
  if (/["']?aggregateRating["']?\s*:/.test(ld))
    flag("AGGREGATE_RATING", "aggregateRating present (self-serving/unverified)", where);
  if (/"@type"\s*:\s*"Review"/.test(ld) || /["']?reviewBody["']?\s*:/.test(ld))
    flag("REVIEW_MARKUP", "Review markup present (needs eligibility review before use)", where);
}

/* ─── CHECK 4: unverified/pending facts must not appear in schema ─ */
// Parse lib/business-facts.ts (regex, no TS execution). Facts are declared via
// the fact("<value>", "<status>", ...) helper. Any unverified/pending value
// that appears inside a JSON-LD block is a drift violation.
let factsParsed = 0;
const forbiddenValues = [];
if (fs.existsSync(FACTS_FILE)) {
  const src = read(FACTS_FILE);
  const re = /fact\(\s*"([^"]*)"\s*,\s*"(verified|unverified|pending)"/g;
  let m;
  while ((m = re.exec(src))) {
    factsParsed++;
    const [, value, status] = m;
    if ((status === "unverified" || status === "pending") && value.trim().length >= 4) {
      forbiddenValues.push(value.trim());
    }
  }
  // Deduplicate.
  const uniq = [...new Set(forbiddenValues)];
  forbiddenValues.length = 0;
  forbiddenValues.push(...uniq);

  const ldToScan = haveBuild
    ? ldSources.filter((s) => s.where.endsWith(".html"))
    : ldSources;
  for (const { where, ld } of ldToScan) {
    const hay = ld.toLowerCase();
    for (const val of forbiddenValues) {
      if (hay.includes(val.toLowerCase())) {
        flag("UNVERIFIED_IN_SCHEMA", `unverified/pending fact "${val}" emitted in JSON-LD`, where);
      }
    }
  }
}

/* ─── CHECK 4b: any response-time figure is unverified in schema ── */
// Catches "under 15 minutes", "under 20 minutes", "15-minute", etc. inside
// JSON-LD regardless of the specific number — response time is unverified.
const RESPONSE_TIME_RE = /\bunder\s+\d+\s*min|\b\d+\s*-?\s*minutes?\b/i;
{
  const ldForTime = haveBuild ? ldSources.filter((s) => s.where.endsWith(".html")) : ldSources;
  for (const { where, ld } of ldForTime) {
    const m = ld.match(RESPONSE_TIME_RE);
    if (m) flag("UNVERIFIED_IN_SCHEMA", `unverified response-time figure "${m[0].trim()}" in JSON-LD`, where);
  }
}

/* ─── CHECK 5: blog dates must never be in the future ──────────── */
const BLOG_FILE = path.join(ROOT, "lib", "blog-posts.ts");
let blogDatesChecked = 0;
if (fs.existsSync(BLOG_FILE)) {
  const src = read(BLOG_FILE);
  const now = Date.now();
  for (const m of src.matchAll(/\b(date|updatedDate):\s*"([^"]+)"/g)) {
    const [, field, val] = m;
    const t = new Date(val).getTime();
    if (Number.isNaN(t)) continue;
    blogDatesChecked++;
    if (t > now) flag("BLOG_FUTURE_DATE", `blog ${field} "${val}" is in the future`, "lib/blog-posts.ts");
  }
}

/* ─── report ───────────────────────────────────────────────────── */

console.log("--- CLAIMS / ANTI-DRIFT GUARD (towingno1.com) ---\n");
console.log(`Built HTML pages scanned : ${built.length}${haveBuild ? "" : "  (no build found — run `npm run build` for render checks)"}`);
console.log(`business-facts.ts        : ${fs.existsSync(FACTS_FILE) ? `${factsParsed} facts parsed, ${forbiddenValues.length} unverified/pending guarded` : "not present yet"}`);
console.log(`JSON-LD blocks inspected : ${ldSources.length}`);
console.log(`Blog dates checked       : ${blogDatesChecked} (none may be in the future)`);

const byCat = {};
for (const v of violations) (byCat[v.category] ??= []).push(v);

console.log("\n--- VIOLATIONS BY CATEGORY ---");
if (violations.length === 0) {
  console.log("  (none)");
} else {
  for (const [cat, list] of Object.entries(byCat)) {
    console.log(`\n  [${cat}] ${list.length}`);
    const seen = new Set();
    for (const v of list) {
      const key = `${v.where}::${v.detail}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`    - ${v.where}: ${v.detail}`);
    }
  }
}

console.log(`\nSummary: ${violations.length} violation(s) across ${Object.keys(byCat).length} categor(y/ies).`);

if (violations.length > 0) {
  console.error("\n[FAIL] Claims/anti-drift guard found violations (see above).");
  process.exit(1);
} else {
  console.log("\n[PASS] No fabricated claims, unverified schema values, or broken render placeholders.");
}
