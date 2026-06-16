#!/usr/bin/env node
/**
 * Content Audit Script — towingno1.com
 *
 * Bug-condition exploration audit for the AdSense "Low Value Content" fix.
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console + CSV-style report).
 *
 * For each content route it computes a visible word count, detects
 * near-duplicate prose across service / location pages, lists every page
 * under the 500-word value threshold, and counts the "quality" pages
 * (>= 500 words). It also checks the document <head> for the placeholder
 * Google verification code and the AdSense snippet.
 *
 * EXPECTED on the UNFIXED site: this audit FAILS (exit 1). Those failures
 * are the counterexamples that confirm the bug. The same script validates
 * the fix when it later passes.
 *
 * Usage: node scripts/content-audit.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components");
const LIB = path.join(ROOT, "lib");

const WORD_THRESHOLD = 500;
const MIN_QUALITY_PAGES = 15;
const DUP_JACCARD = 0.75;

/* ─── helpers ──────────────────────────────────────────────────── */

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function decodeEntities(s) {
  return s
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, " ")
    .replace(/&[a-z]+;/gi, " ");
}

function countWords(text) {
  const m = decodeEntities(text).match(/[A-Za-z][A-Za-z'&-]*/g);
  return m ? m.length : 0;
}

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
}

// Remove a `{ ... }` region that follows the first match of startRegex
// (used to drop metadata exports, generateMetadata bodies, and *Schema objects).
function removeBalanced(src, startRegex) {
  let result = src;
  for (;;) {
    const re = new RegExp(startRegex.source);
    const m = re.exec(result);
    if (!m) break;
    const braceStart = result.indexOf("{", m.index);
    if (braceStart === -1) break;
    let depth = 0;
    let i = braceStart;
    let inStr = null;
    for (; i < result.length; i++) {
      const c = result[i];
      const prev = result[i - 1];
      if (inStr) {
        if (c === inStr && prev !== "\\") inStr = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        inStr = c;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }
    result = result.slice(0, m.index) + " " + result.slice(i);
  }
  return result;
}

// Remove a whole function body following the head match. Unlike removeBalanced,
// this skips the parameter list (which may contain destructuring braces like
// `({ params }: Props)`) and balances from the body's opening `{` — the first
// `{` that appears once parenthesis depth has returned to zero.
function removeFunctionBody(src, headRegex) {
  let result = src;
  for (;;) {
    const re = new RegExp(headRegex.source);
    const m = re.exec(result);
    if (!m) break;
    let i = m.index + m[0].length;
    let paren = 0;
    let bodyStart = -1;
    for (; i < result.length; i++) {
      const c = result[i];
      if (c === "(") paren++;
      else if (c === ")") paren--;
      else if (c === "{" && paren === 0) {
        bodyStart = i;
        break;
      }
    }
    if (bodyStart === -1) break;
    let depth = 0;
    let inStr = null;
    let j = bodyStart;
    for (; j < result.length; j++) {
      const c = result[j];
      const prev = result[j - 1];
      if (inStr) {
        if (c === inStr && prev !== "\\") inStr = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        inStr = c;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    result = result.slice(0, m.index) + " " + result.slice(j);
  }
  return result;
}

// Extract human-visible prose from a .tsx page/component source:
// drop imports, comments, TS/structural declarations, metadata/schema/data-fn
// blocks and component/hook boilerplate, then strip JSX tags, JSX member-expression
// references, object keys, and path/URL string literals, leaving only the prose text
// and data-array copy that a visitor actually reads.
function extractVisibleText(src) {
  let s = stripComments(src);
  s = s.replace(/^\s*import\s.+$/gm, " ");
  s = s.replace(/^\s*["']use client["'];?\s*$/gm, " ");

  // ── Remove non-prose TypeScript / structural declarations ──────────
  // `interface X { ... }` and `declare global { ... }` blocks.
  s = removeBalanced(s, /\binterface\s+\w+/);
  s = removeBalanced(s, /\bdeclare\s+global\b/);
  // `type X = ...;` aliases.
  s = s.replace(/\btype\s+\w+\s*=\s*[^;\n]+;?/g, " ");

  // ── Remove Next.js metadata / schema / data-function blocks ────────
  // generateMetadata / generateStaticParams bodies hold meta strings (titles,
  // descriptions, keywords) and routing code — not visible prose. Use the
  // body-aware remover so destructured params (`{ params }`) don't truncate it.
  s = removeBalanced(s, /export\s+const\s+metadata\s*[:=]/);
  s = removeFunctionBody(s, /export\s+(?:async\s+)?function\s+generateMetadata/);
  s = removeFunctionBody(s, /export\s+(?:async\s+)?function\s+generateStaticParams/);
  s = s.replace(/export\s+const\s+dynamicParams\b[^\n;]*;?/g, " ");
  s = removeBalanced(s, /const\s+\w*[Ss]chema\s*=/);
  s = removeBalanced(s, /const\s+\w*[Ss]chema\b[\s\S]*?=/);

  // ── Remove component/function signatures + hook/return boilerplate ──
  // (Keep the JSX body that follows, which holds the visible prose.)
  s = s.replace(/export\s+default\s+(?:async\s+)?function\s+\w+\s*\([^)]*\)\s*(?::\s*[^{]+)?\{/g, " ");
  s = s.replace(/export\s+(?:async\s+)?function\s+\w+\s*\([^)]*\)\s*(?::\s*[^{]+)?\{/g, " ");
  s = s.replace(/\bfunction\s+\w+\s*\([^)]*\)\s*\{/g, " ");
  s = s.replace(/\breturn\s*\(/g, " ");
  s = s.replace(/const\s*\{[^}]*\}\s*=\s*await[^;]*;/g, " ");   // const { city } = await params;
  s = s.replace(/const\s+\w+\s*=\s*await[^;]*;/g, " ");
  s = s.replace(/\bconst\s+\w+\s*=\s*[A-Za-z_][\w.]*\s*\([^;]*\)\s*;/g, " "); // const area = getServiceAreaBySlug(city);
  s = s.replace(/\bconst\s+\w+\s*=\s*`[^`]*`\s*;/g, " ");        // const canonical = `https://…`;
  s = s.replace(/\bif\s*\([^)]*\)\s*\{[^{}]*\}/g, " ");          // if (!area) { notFound(); }
  s = s.replace(/\bif\s*\([^)]*\)\s*\w+\([^)]*\);/g, " ");       // if (!area) notFound();
  // Array iteration / arrow-callback boilerplate: `.map((svc) => (`, `(item) => (`, `=>`.
  // (Leaves the JSX rendered per item intact; only the code wrapper is removed.)
  s = s.replace(/\.\s*(?:map|filter|forEach|slice|reduce|find|sort)\s*\(/g, " ");
  s = s.replace(/\([^()]*\)\s*=>\s*\(?/g, " ");
  s = s.replace(/=>/g, " ");

  // Strip JSX / HTML tags (className, svg paths, aria, etc. live inside tags).
  // Replace each tag with a sentence boundary so that distinct visible elements
  // (breadcrumbs, headings, button labels, separate <p> blocks) are NOT glued
  // into one artificial paragraph. This keeps the word count identical
  // (punctuation isn't counted) while making duplication detection reflect real
  // rendered blocks: shared UI furniture stays as short sub-sentence fragments,
  // and genuine prose sentences remain intact for cross-page comparison.
  s = s.replace(/<[^>]*>/g, " . ");
  // Remove path / URL string literals.
  s = s.replace(/["'`]\s*\/[^"'`]*["'`]/g, " ");
  s = s.replace(/https?:\/\/[^\s"'`]+/g, " ");
  // Remove bare JSX member-expression references like {area.city}, {item.q},
  // {scenario.title} — these are code refs to data, not prose. (Dotted member
  // access only; a literal like "TowingNo.1" or "No. 3" is left untouched.)
  s = s.replace(/\b[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+/g, " ");
  // Remove object keys (identifier followed by colon).
  s = s.replace(/\b[A-Za-z_]\w*\s*:/g, " ");
  // Separate adjacent string literals that are joined only by structural
  // punctuation (commas/braces/brackets) — e.g. an inline `[{ label: "...", desc:
  // "..." }, …]` nav/data array. Each renders as its own element, so they must
  // not be glued into one artificial paragraph. Genuine prose sentences (which
  // live in JSX text nodes between tags, already broken above) are unaffected.
  s = s.replace(/(["'`])([\s,;{}\[\]()]+)(["'`])/g, "$1 . $3");
  return s;
}

function listServiceSlugs() {
  const dir = path.join(APP, "services");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .filter((e) => fs.existsSync(path.join(dir, e.name, "page.tsx")))
    .map((e) => e.name);
}

function parseSlugs(src) {
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return slugs;
}

// Count words inside string / template literals, skipping path & url literals.
function countWordsInLiterals(block) {
  let total = 0;
  const re = /"([^"]*)"|'([^']*)'|`([^`]*)`/g;
  let m;
  while ((m = re.exec(block))) {
    const val = m[1] ?? m[2] ?? m[3] ?? "";
    if (/^\s*\//.test(val) || /^https?:/.test(val)) continue;
    total += countWords(val);
  }
  return total;
}

// Per-record data word counts for the service-areas module (keyed by slug).
// Records are delimited by their leading `slug: "..."` field. We slice from one
// record's slug keyword to the next so each chunk starts on a balanced quote
// boundary (the earlier split-on-`slug:\s*"` began mid-string and mis-paired
// every quote, under-counting per-city prose). Then count words inside all
// string/template literals in the record, skipping path/URL literals.
function serviceAreaDataWords() {
  const src = read(path.join(LIB, "service-areas.ts"));
  const out = {};
  const matches = [...src.matchAll(/slug:\s*"([^"]+)"/g)];
  for (let i = 0; i < matches.length; i++) {
    const slug = matches[i][1];
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
    out[slug] = countWordsInLiterals(src.slice(start, end));
  }
  return out;
}

// Per-record data word counts for the blog-posts module (keyed by slug).
// Records are delimited by their leading `id: N` field; each chunk begins before
// any string literal so quotes pair correctly. Count words inside all
// string/template literals in the record (the post body lives in a template
// literal), skipping path/URL literals.
function blogDataWords() {
  const src = read(path.join(LIB, "blog-posts.ts"));
  const out = {};
  const matches = [...src.matchAll(/\n\s*id:\s*\d+\s*,/g)];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
    const chunk = src.slice(start, end);
    const slugMatch = chunk.match(/slug:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    out[slugMatch[1]] = countWordsInLiterals(chunk);
  }
  return out;
}

/* ─── sentence extraction for duplication detection ───────────────── */

function sentences(text) {
  return decodeEntities(text)
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function tokenSet(sentence) {
  const m = sentence.toLowerCase().match(/[a-z][a-z'&-]*/g) || [];
  return new Set(m);
}

function jaccard(a, b) {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

/* ─── build route table ───────────────────────────────────────────── */

const serviceSlugs = listServiceSlugs();
const areaSrc = read(path.join(LIB, "service-areas.ts"));
const blogSrc = read(path.join(LIB, "blog-posts.ts"));
const citySlugs = parseSlugs(areaSrc);
const blogSlugs = parseSlugs(blogSrc);
const areaWords = serviceAreaDataWords();
const blogWords = blogDataWords();

const routes = [];

routes.push({
  route: "/",
  kind: "content",
  files: ["app/page.tsx", "components/HomeContent.tsx"],
});
routes.push({ route: "/services", kind: "content", files: ["app/services/page.tsx"] });
for (const slug of serviceSlugs) {
  routes.push({
    route: `/services/${slug}`,
    kind: "service",
    files: [`app/services/${slug}/page.tsx`],
  });
}
routes.push({
  route: "/locations",
  kind: "content",
  files: ["app/locations/page.tsx"],
  // index renders every area summary + headline
  dataWords: Object.values(areaWords).reduce((a, b) => a + b, 0),
});
for (const slug of citySlugs) {
  routes.push({
    route: `/locations/${slug}`,
    kind: "location",
    files: ["app/locations/[city]/page.tsx"],
    dataWords: areaWords[slug] || 0,
  });
}
routes.push({
  route: "/blog",
  kind: "content",
  files: ["app/blog/page.tsx"],
});
for (const slug of blogSlugs) {
  routes.push({
    route: `/blog/${slug}`,
    kind: "blog",
    files: ["app/blog/[slug]/page.tsx"],
    dataWords: blogWords[slug] || 0,
  });
}
routes.push({ route: "/about", kind: "policy", files: ["components/AboutContent.tsx"] });
routes.push({ route: "/contact", kind: "policy", files: ["components/ContactContent.tsx"] });
routes.push({ route: "/privacy", kind: "policy", files: ["app/privacy/page.tsx"] });
routes.push({ route: "/terms", kind: "policy", files: ["app/terms/page.tsx"] });

/* ─── compute word counts + collect sentences ─────────────────────── */

const results = [];
const dupSentences = []; // { route, sentence, tokens }

for (const r of routes) {
  let text = "";
  for (const f of r.files) text += " " + extractVisibleText(read(path.join(ROOT, f)));
  const templateWords = countWords(text);
  const total = templateWords + (r.dataWords || 0);
  results.push({ ...r, words: total });

  if (r.kind === "service" || r.kind === "location") {
    for (const s of sentences(text)) {
      const toks = tokenSet(s);
      if (toks.size >= 6) dupSentences.push({ route: r.route, sentence: s, tokens: toks });
    }
  }
}

/* ─── near-duplicate detection across service/location pages ──────── */

const dupPairs = [];
for (let i = 0; i < dupSentences.length; i++) {
  for (let j = i + 1; j < dupSentences.length; j++) {
    const a = dupSentences[i];
    const b = dupSentences[j];
    if (a.route === b.route) continue;
    const la = a.tokens.size;
    const lb = b.tokens.size;
    if (Math.min(la, lb) / Math.max(la, lb) < 0.6) continue;
    const sim = jaccard(a.tokens, b.tokens);
    if (sim >= DUP_JACCARD) {
      dupPairs.push({ a, b, sim });
    }
  }
}

/* ─── head integrity (verification + AdSense) ─────────────────────── */

const layoutSrc = read(path.join(APP, "layout.tsx"));
const hasPlaceholder = /REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE/.test(layoutSrc);
const hasAdSense = /ca-pub-2962382436663193/.test(layoutSrc);

/* ─── report ──────────────────────────────────────────────────────── */

console.log("--- CONTENT AUDIT REPORT (towingno1.com) ---\n");

console.log("Route,Kind,Words,Status");
for (const r of results) {
  const status = r.words >= WORD_THRESHOLD ? "OK" : "THIN(<500)";
  console.log(`"${r.route}","${r.kind}",${r.words},"${status}"`);
}

const thin = results.filter((r) => r.words < WORD_THRESHOLD);
const quality = results.filter((r) => r.words >= WORD_THRESHOLD);

console.log("\n--- PAGES UNDER 500 WORDS ---");
if (thin.length === 0) {
  console.log("(none)");
} else {
  for (const r of thin) console.log(`  ${r.route} = ${r.words} words`);
}

console.log("\n--- QUALITY PAGES (>= 500 words) ---");
console.log(`  count = ${quality.length} (threshold >= ${MIN_QUALITY_PAGES})`);
for (const r of quality) console.log(`    ${r.route} = ${r.words} words`);

console.log("\n--- NEAR-DUPLICATE PROSE (service/location pages) ---");
console.log(`  near-duplicate sentence pairs (Jaccard >= ${DUP_JACCARD}): ${dupPairs.length}`);
const dupRoutes = new Set();
for (const p of dupPairs) {
  dupRoutes.add(p.a.route);
  dupRoutes.add(p.b.route);
}
if (dupPairs.length > 0) {
  console.log(`  routes sharing templated copy: ${[...dupRoutes].sort().join(", ")}`);
  console.log("  examples:");
  for (const p of dupPairs.slice(0, 5)) {
    console.log(`    [${p.sim.toFixed(2)}] ${p.a.route}: "${p.a.sentence.slice(0, 70)}..."`);
    console.log(`           ${p.b.route}: "${p.b.sentence.slice(0, 70)}..."`);
  }
}

console.log("\n--- DOCUMENT HEAD INTEGRITY (app/layout.tsx) ---");
console.log(`  placeholder verification code present : ${hasPlaceholder ? "YES (FAIL)" : "no"}`);
console.log(`  AdSense snippet (ca-pub-2962382436663193) present : ${hasAdSense ? "yes" : "NO (FAIL)"}`);

/* ─── verdict ─────────────────────────────────────────────────────── */

const violations = [];
if (thin.length > 0) violations.push(`${thin.length} page(s) under ${WORD_THRESHOLD} words`);
if (quality.length < MIN_QUALITY_PAGES)
  violations.push(`only ${quality.length} quality pages (need >= ${MIN_QUALITY_PAGES})`);
if (dupPairs.length > 0) violations.push(`${dupPairs.length} near-duplicate sentence pair(s)`);
if (hasPlaceholder) violations.push("placeholder Google verification code in <head>");
if (!hasAdSense) violations.push("AdSense snippet missing from <head>");

console.log(`\nSummary: ${results.length} routes audited, ${quality.length} quality pages, ${violations.length} violation categories.`);

if (violations.length > 0) {
  console.error("\n[FAIL] Content value violations found:");
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
} else {
  console.log("\n[PASS] All content routes meet AdSense value criteria.");
}
