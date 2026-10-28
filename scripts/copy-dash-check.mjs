#!/usr/bin/env node
/**
 * Copy Dash Check for towingno1.com
 *
 * Verifies that customer facing copy contains no dash punctuation (em dash,
 * en dash, figure dash, horizontal bar, spaced hyphens used as dashes, runs
 * of hyphens, hyphenated number ranges) and no hyphenated compound words
 * outside an explicit allowlist of proper nouns and brands.
 *
 * Two modes:
 *
 *   Rendered (default): reads the PRERENDERED output in .next/server/app
 *   (what visitors and crawlers receive): visible text, the alt / title /
 *   aria-label / placeholder attribute values, <title>, the description,
 *   Open Graph and Twitter meta tags (meta keywords are skipped), the human
 *   readable JSON-LD fields, /llms.txt, and the web manifest.
 *   Run `npm run build` first.
 *
 *   Source (--source): scans app/, components/, and lib/ source files (with
 *   comments stripped) for dash characters, their HTML entities, and \u2014 /
 *   \u2013 escapes. This catches client only text that is not part of the
 *   server rendered HTML (menus, accordions, dialogs, form messages) and the
 *   customer confirmation email. Regions wrapped in
 *   `// copy-check-ignore-start` and `// copy-check-ignore-end` comments are
 *   skipped (used for the internal business notification email).
 *
 * Options:
 *   --routes=/,/about,/services/*   limit rendered mode to these routes
 *                                   (a trailing * matches a route prefix)
 *   --paths=components/,lib/faq.ts  limit source mode to these path prefixes
 *
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console report, exit code).
 *
 * Usage:
 *   npm run build && node scripts/copy-dash-check.mjs
 *   node scripts/copy-dash-check.mjs --source
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BUILT = path.join(ROOT, ".next", "server", "app");

const args = process.argv.slice(2);
const SOURCE_MODE = args.includes("--source");
const routeFilter = (args.find((a) => a.startsWith("--routes=")) || "").slice("--routes=".length);
const pathFilter = (args.find((a) => a.startsWith("--paths=")) || "").slice("--paths=".length);

/* ─── allowlist ────────────────────────────────────────────────── */
// Hyphenated proper nouns and brand names that keep their hyphen. Add an entry
// only for a genuine proper noun or brand, with a comment explaining it.
const HYPHEN_ALLOWLIST = new Set(
  [
    "Sea-to-Sky", // Highway 99, the Sea-to-Sky Highway (proper name)
    "Trans-Canada", // Highway 1, the Trans-Canada Highway (proper name)
    "Tri-Cities", // Coquitlam, Port Coquitlam, and Port Moody region (proper name)
    "Mercedes-Benz", // vehicle brand
    "Wi-Fi", // trademark
    "e-Transfer", // Interac e-Transfer (brand)
    "F-150", // Ford F-150 Lightning (vehicle model name)
    "Mach-E", // Ford Mustang Mach-E (vehicle model name)
  ].map((w) => w.toLowerCase()),
);

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

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "\u2014",
  ndash: "\u2013",
  minus: "\u2212",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201d",
  ldquo: "\u201c",
  hellip: "\u2026",
  middot: "\u00b7",
  times: "\u00d7",
  copy: "\u00a9",
  reg: "\u00ae",
  trade: "\u2122",
  deg: "\u00b0",
};

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

function collapse(s) {
  return s.replace(/\s+/g, " ").trim();
}

function snippet(text, index, length) {
  const start = Math.max(0, index - 45);
  const end = Math.min(text.length, index + length + 45);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

/* ─── text checks ──────────────────────────────────────────────── */

const DASH_CHARS = [
  { re: /\u2014/g, category: "EM_DASH" },
  { re: /\u2013/g, category: "EN_DASH" },
  { re: /\u2012/g, category: "FIGURE_DASH" },
  { re: /\u2015/g, category: "HORIZONTAL_BAR" },
];

// Phone numbers and ISO dates keep their hyphens; remove them before the
// hyphen checks. The replacement keeps string length so snippets stay aligned.
const PROTECTED = [
  /\+?1-\d{3}-\d{3}-\d{4}\b/g, // +1-778-838-0014, 1-800-910-4222
  /\(\d{3}\)\s?\d{3}-\d{4}\b/g, // (778) 838-0014
  /\b\d{3}-\d{3}-\d{4}\b/g, // 778-838-0014, 604-520-8222
  /\b\d{4}-\d{2}-\d{2}\b/g, // ISO dates
  /https?:\/\/\S+/g, // URLs
  /\bwww\.\S+/g,
  /\b(?:[a-z0-9-]+\.)+(?:ca|com|org|net|gov|io|info)\b(?:\/[^\s)"']*)?/gi, // bare domains and paths, e.g. surrey.ca/about-surrey/
  /[\w.+-]+@[\w-]+\.[\w.-]+/g, // email addresses
];

function maskProtected(text) {
  let out = text;
  for (const re of PROTECTED) out = out.replace(re, (m) => " ".repeat(m.length));
  return out;
}

function checkText(text) {
  const found = [];
  if (!text) return found;
  for (const { re, category } of DASH_CHARS) {
    for (const m of text.matchAll(re)) found.push({ category, index: m.index, length: m[0].length });
  }
  const masked = maskProtected(text.replace(/[\u2010\u2011]/g, "-"));
  // Spaced hyphen used as a dash: "word - word" or "word -- word".
  const spaced = [];
  for (const m of masked.matchAll(/(?<=\S) -{1,2} (?=\S)/g)) {
    found.push({ category: "SPACED_HYPHEN", index: m.index, length: m[0].length });
    spaced.push([m.index, m.index + m[0].length]);
  }
  // Runs of two or more hyphens: "word--word" used as a dash, or leftover
  // markup such as a markdown table row "|---|". Spaced " -- " is reported above.
  for (const m of masked.matchAll(/-{2,}/g)) {
    if (spaced.some(([s, e]) => m.index >= s && m.index < e)) continue;
    found.push({ category: "HYPHEN_RUN", index: m.index, length: m[0].length });
  }
  // Hyphenated number range: "30-60", "3-5" (phone numbers are masked above).
  for (const m of masked.matchAll(/(?<![\w.-])\d+(?:\.\d+)?-\d+(?:\.\d+)?\+?(?![\w-])/g)) {
    found.push({ category: "NUMERIC_RANGE", index: m.index, length: m[0].length });
  }
  // Hyphenated words that contain a letter and are not allowlisted.
  for (const m of masked.matchAll(/(?<![\p{L}\p{N}-])[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+(?![\p{L}\p{N}-])/gu)) {
    const word = m[0];
    if (!/\p{L}/u.test(word)) continue;
    if (HYPHEN_ALLOWLIST.has(word.toLowerCase())) continue;
    found.push({ category: "HYPHENATED_WORD", index: m.index, length: word.length, word });
  }
  return found.map((f) => ({ ...f, snippet: snippet(text, f.index, f.length) }));
}

/* ─── rendered mode ────────────────────────────────────────────── */

const LD_FIELDS = new Set(["name", "description", "text", "headline", "alternateName", "caption"]);
const META_NAMES = new Set(["description", "twitter:title", "twitter:description", "twitter:image:alt"]);
const META_PROPS = new Set(["og:title", "og:description", "og:image:alt", "og:site_name"]);

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return m ? m[1] ?? m[2] ?? "" : null;
}

function collectLdStrings(node, out) {
  if (Array.isArray(node)) {
    for (const item of node) collectLdStrings(item, out);
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === "string" && LD_FIELDS.has(key)) out.push({ key, value });
      else if (value && typeof value === "object") collectLdStrings(value, out);
    }
  }
}

function routeForFile(file) {
  let r = rel(file).replace(/^\.next\/server\/app\//, "");
  r = r.replace(/\.html$/, "").replace(/\.body$/, "");
  if (r === "index") return "/";
  return "/" + r;
}

function routeMatches(route) {
  if (!routeFilter) return true;
  return routeFilter.split(",").some((p) => {
    const pat = p.trim();
    if (!pat) return false;
    if (pat.endsWith("*")) return route.startsWith(pat.slice(0, -1));
    return route === pat;
  });
}

function scanHtml(html) {
  const results = [];
  const push = (where, text) => {
    for (const v of checkText(text)) results.push({ where, ...v });
  };

  // JSON-LD: human readable fields only.
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const raw = m[1];
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch {
      try {
        data = JSON.parse(decodeEntities(raw));
      } catch {
        data = null;
      }
    }
    if (data) {
      const strings = [];
      collectLdStrings(data, strings);
      for (const s of strings) push(`json-ld:${s.key}`, s.value);
    } else {
      push("json-ld:raw", raw);
    }
  }

  // <title> and meta tags (keywords skipped).
  for (const m of html.matchAll(/<title>([\s\S]*?)<\/title>/gi)) push("title", decodeEntities(m[1]));
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const name = (attr(tag, "name") || "").toLowerCase();
    const prop = (attr(tag, "property") || "").toLowerCase();
    const content = attr(tag, "content");
    if (content == null) continue;
    if (META_NAMES.has(name)) push(`meta:${name}`, decodeEntities(content));
    else if (META_PROPS.has(prop)) push(`meta:${prop}`, decodeEntities(content));
  }

  // Body: drop non visible blocks, then check attributes and visible text.
  let body = html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<title>[\s\S]*?<\/title>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "");

  for (const m of body.matchAll(/<[a-z][^>]*>/gi)) {
    const tag = m[0];
    for (const a of ["alt", "title", "aria-label", "placeholder"]) {
      const v = attr(tag, a);
      if (v) push(`attr:${a}`, decodeEntities(v));
    }
  }

  const text = collapse(decodeEntities(body.replace(/<[^>]*>/g, " ")));
  push("visible", text);
  return results;
}

function scanPlainText(text) {
  return checkText(text).map((v) => ({ where: "text", ...v }));
}

function scanManifest(json) {
  const results = [];
  try {
    const data = JSON.parse(json);
    for (const key of ["name", "short_name", "description"]) {
      if (typeof data[key] === "string") {
        for (const v of checkText(data[key])) results.push({ where: `manifest:${key}`, ...v });
      }
    }
  } catch {
    for (const v of checkText(json)) results.push({ where: "manifest:raw", ...v });
  }
  return results;
}

function runRendered() {
  if (!fs.existsSync(BUILT)) {
    console.error("[FAIL] No build found at .next/server/app. Run `npm run build` first.");
    process.exit(1);
  }
  const files = walk(BUILT, [".html", ".body"]).filter((f) => {
    const r = rel(f);
    if (r.includes("/.segments/")) return false;
    if (r.endsWith(".html")) return !r.endsWith("_global-error.html"); // Next default error page
    return r.endsWith("llms.txt.body") || r.endsWith("manifest.webmanifest.body");
  });

  const byRoute = [];
  for (const file of files.sort()) {
    const route = routeForFile(file);
    if (!routeMatches(route)) continue;
    const content = read(file);
    let violations;
    if (file.endsWith("llms.txt.body")) violations = scanPlainText(content);
    else if (file.endsWith("manifest.webmanifest.body")) violations = scanManifest(content);
    else violations = scanHtml(content);
    byRoute.push({ route, violations });
  }
  return byRoute;
}

/* ─── source mode ──────────────────────────────────────────────── */

const SOURCE_DIRS = ["app", "components", "lib"];
const SOURCE_EXCLUDE = [
  "app/api/test-email/", // developer test endpoint, not customer facing
  "app/api/indexnow/", // owner facing URL submission endpoint (admin JSON responses)
  "lib/whatsapp-notify.ts", // server only notification client; its strings are server logs
  "components/ServicesContent.tsx", // unused component: no page imports it
];

// Blank out a region while keeping its line breaks, so reported line numbers
// still match the original file.
function blank(s) {
  return s.replace(/[^\n]/g, " ");
}

function stripForSource(src) {
  return src
    .replace(/\/\/\s*copy-check-ignore-start[\s\S]*?\/\/\s*copy-check-ignore-end/g, blank)
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:\\])(\/\/[^\n]*)/g, (_, pre, comment) => pre + blank(comment));
}

const SOURCE_PATTERNS = [
  { re: /[\u2012-\u2015]/g, category: "DASH_CHARACTER" },
  { re: /&(?:mdash|ndash);|&#821[12];|&#x201[34];/gi, category: "DASH_ENTITY" },
  { re: /\\u201[34]/gi, category: "DASH_ESCAPE" },
];

function runSource() {
  const files = [];
  for (const d of SOURCE_DIRS) files.push(...walk(path.join(ROOT, d), [".ts", ".tsx"]));
  const results = [];
  for (const file of files.sort()) {
    const r = rel(file);
    if (SOURCE_EXCLUDE.some((x) => r.startsWith(x))) continue;
    if (pathFilter && !pathFilter.split(",").some((p) => p.trim() && r.startsWith(p.trim()))) continue;
    const stripped = stripForSource(read(file));
    const lines = stripped.split("\n");
    const violations = [];
    lines.forEach((line, i) => {
      for (const { re, category } of SOURCE_PATTERNS) {
        for (const m of line.matchAll(re)) {
          violations.push({ where: `line ${i + 1}`, category, snippet: snippet(line.trim(), Math.max(0, m.index - (line.length - line.trimStart().length)), m[0].length) });
        }
      }
    });
    results.push({ route: r, violations });
  }
  return results;
}

/* ─── report ───────────────────────────────────────────────────── */

const groups = SOURCE_MODE ? runSource() : runRendered();
const label = SOURCE_MODE ? "files" : "routes";

console.log(`--- COPY DASH CHECK (${SOURCE_MODE ? "source" : "rendered"}) (towingno1.com) ---\n`);
if (routeFilter && !SOURCE_MODE) console.log(`Route filter: ${routeFilter}`);
if (pathFilter && SOURCE_MODE) console.log(`Path filter: ${pathFilter}`);
console.log(`${label[0].toUpperCase()}${label.slice(1)} scanned: ${groups.length}\n`);

const totals = {};
const words = new Map();
const seen = new Map();
let total = 0;

for (const g of groups) {
  if (g.violations.length === 0) continue;
  console.log(`[${g.route}] ${g.violations.length} violation(s)`);
  let repeated = 0;
  for (const v of g.violations) {
    total++;
    totals[v.category] = (totals[v.category] || 0) + 1;
    if (v.word) {
      const w = v.word.toLowerCase();
      if (!words.has(w)) words.set(w, new Set());
      words.get(w).add(g.route);
    }
    const key = `${v.category}|${v.where}|${v.snippet}`;
    if (seen.has(key)) {
      repeated++;
      continue;
    }
    seen.set(key, g.route);
    console.log(`    ${v.category.padEnd(15)} ${v.where.padEnd(22)} ${v.snippet}`);
  }
  if (repeated) console.log(`    (+${repeated} repeated shared snippet(s) already listed above)`);
}

console.log("\n--- TOTALS BY CATEGORY ---");
if (total === 0) console.log("  (none)");
for (const [cat, n] of Object.entries(totals).sort()) console.log(`  ${cat}: ${n}`);

if (words.size) {
  console.log("\n--- HYPHENATED WORDS (unique) ---");
  for (const [w, routes] of [...words.entries()].sort()) console.log(`  ${w}  (${routes.size} ${label})`);
}

const affected = groups.filter((g) => g.violations.length > 0).length;
console.log(`\nSummary: ${total} violation(s) across ${affected} of ${groups.length} ${label}.`);

if (total > 0) {
  console.error("\n[FAIL] Dash punctuation found in customer facing copy (see above).");
  process.exit(1);
} else {
  console.log("\n[PASS] No dash punctuation in customer facing copy.");
}
