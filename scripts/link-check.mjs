#!/usr/bin/env node
/**
 * Link Integrity Check — towingno1.com
 *
 * Bug-condition exploration audit for the AdSense "Low Value Content" fix.
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console report).
 *
 * Extracts every internal href / <Link> target and outbound URL from
 * app/**, components/**, and lib/**, then resolves internal targets against
 * the real route map (including dynamic [slug]/[city] params enumerated from
 * lib/blog-posts.ts and lib/service-areas.ts). It flags dead internal routes,
 * placeholder href="#" links, and malformed outbound URLs.
 *
 * It also resolves data-driven links (e.g. the nearby-city links built from
 * `serviceAreas[].nearbyCities`) which are easy to break with a stale slug.
 *
 * EXPECTED on the UNFIXED site: this audit FAILS (exit 1) if any link is dead.
 *
 * Usage: node scripts/link-check.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components");
const LIB = path.join(ROOT, "lib");

/* ─── helpers ──────────────────────────────────────────────────── */

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, exts = [".tsx", ".ts"]) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function parseSlugs(src) {
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return slugs;
}

/* ─── build the real route map ────────────────────────────────────── */

const serviceDir = path.join(APP, "services");
const serviceSlugs = fs
  .readdirSync(serviceDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(serviceDir, e.name, "page.tsx")))
  .map((e) => e.name);

const areaSrc = read(path.join(LIB, "service-areas.ts"));
const blogSrc = read(path.join(LIB, "blog-posts.ts"));
const citySlugs = parseSlugs(areaSrc);
const blogSlugs = parseSlugs(blogSrc);

const staticRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/services",
  "/locations",
  "/blog",
]);
const validRoutes = new Set(staticRoutes);
for (const s of serviceSlugs) validRoutes.add(`/services/${s}`);
for (const c of citySlugs) validRoutes.add(`/locations/${c}`);
for (const b of blogSlugs) validRoutes.add(`/blog/${b}`);

function normalize(href) {
  return href.replace(/[#?].*$/, "").replace(/\/$/, "") || "/";
}

function resolvesInternal(href) {
  const clean = normalize(href);
  if (validRoutes.has(clean)) return true;
  return false;
}

/* ─── extract links ───────────────────────────────────────────────── */

const files = [...walk(APP), ...walk(COMPONENTS), ...walk(LIB)];

const PUBLIC = path.join(ROOT, "public");

const placeholderLinks = []; // { file, href }
const deadInternal = []; // { file, href }
const deadAssets = []; // { file, href }
const dynamicInternal = []; // { file, raw } (template literal — resolved separately)
const outbound = new Set();
const malformedOutbound = [];
let internalChecked = 0;

function isAssetPath(href) {
  const last = href.split("/").pop() || "";
  return /\.[a-z0-9]+$/i.test(last);
}

function assetExists(href) {
  const clean = href.replace(/[#?].*$/, "");
  return fs.existsSync(path.join(PUBLIC, clean));
}

// Match href="..." , href={"..."} , href={`...`} and href: "..." (object data arrays).
const hrefRe = /\bhref\s*[:=]\s*\{?\s*["'`]([^"'`]*)["'`]/g;
// Match any outbound http(s) string literal (catches links assigned via data vars).
const urlRe = /["'`](https?:\/\/[^"'`\s]+)["'`]/g;

for (const file of files) {
  const src = read(file);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");

  // Outbound URLs (anywhere in source), excluding self / schema references.
  let u;
  urlRe.lastIndex = 0;
  while ((u = urlRe.exec(src))) {
    const url = u[1];
    if (/schema\.org/.test(url)) continue;
    if (/(^|\/\/)(www\.)?towingno1\.com/.test(url)) continue;
    if (/googletagmanager|googlesyndication|google-analytics|reamaze/.test(url)) continue;
    outbound.add(url);
    if (!/^https?:\/\/[^\s/]+\.[^\s/]+/.test(url)) malformedOutbound.push({ file: rel, href: url });
  }

  let m;
  hrefRe.lastIndex = 0;
  while ((m = hrefRe.exec(src))) {
    const href = m[1];
    if (href === "") continue;
    if (href === "#") {
      placeholderLinks.push({ file: rel, href });
      continue;
    }
    if (href.startsWith("tel:") || href.startsWith("mailto:")) continue;
    if (href.startsWith("http://") || href.startsWith("https://")) continue; // handled above
    if (href.includes("${")) {
      dynamicInternal.push({ file: rel, raw: href });
      continue;
    }
    if (href.startsWith("/")) {
      if (isAssetPath(href)) {
        if (!assetExists(href)) deadAssets.push({ file: rel, href });
        continue;
      }
      internalChecked++;
      if (!resolvesInternal(href)) deadInternal.push({ file: rel, href });
      continue;
    }
  }
}

/* ─── resolve data-driven dynamic links ───────────────────────────── */
// The nearby-area links on /locations/[city] are built as
// `/locations/${nearby.toLowerCase().replace(/\s+/g, "-")}` from
// serviceAreas[].nearbyCities. Verify each generated slug is a real route.

const deadDataLinks = []; // { source, target, slug }
{
  // crude parse of nearbyCities arrays per area
  const parts = areaSrc.split(/slug:\s*"/);
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    const slug = seg.match(/^([^"]+)"/)?.[1];
    const nb = seg.match(/nearbyCities:\s*\[([^\]]*)\]/);
    if (!slug || !nb) continue;
    const cities = [...nb[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    for (const city of cities) {
      const target = `/locations/${slugify(city)}`;
      if (!validRoutes.has(target)) {
        deadDataLinks.push({ source: `/locations/${slug}`, target, city });
      }
    }
  }
}

/* ─── report ──────────────────────────────────────────────────────── */

console.log("--- LINK INTEGRITY REPORT (towingno1.com) ---\n");
console.log(`Valid routes in map: ${validRoutes.size}`);
console.log(`  services: ${serviceSlugs.length}, locations: ${citySlugs.length}, blog: ${blogSlugs.length}`);
console.log(`Static internal links checked: ${internalChecked}`);
console.log(`Dynamic (template) internal links found: ${dynamicInternal.length}`);
console.log(`Outbound URLs found: ${outbound.size}\n`);

console.log("--- OUTBOUND URLS ---");
for (const u of [...outbound].sort()) console.log(`  ${u}`);

console.log("\n--- PLACEHOLDER LINKS (href=\"#\") ---");
if (placeholderLinks.length === 0) console.log("  (none)");
else for (const l of placeholderLinks) console.log(`  ${l.file}: href="#"`);

console.log("\n--- DEAD STATIC INTERNAL LINKS ---");
if (deadInternal.length === 0) console.log("  (none)");
else for (const l of deadInternal) console.log(`  ${l.file}: ${l.href} -> NO ROUTE`);

console.log("\n--- MISSING STATIC ASSETS ---");
if (deadAssets.length === 0) console.log("  (none)");
else for (const l of deadAssets) console.log(`  ${l.file}: ${l.href} -> NOT IN public/`);

console.log("\n--- DEAD DATA-DRIVEN LINKS (nearbyCities -> /locations/[city]) ---");
if (deadDataLinks.length === 0) console.log("  (none)");
else
  for (const l of deadDataLinks)
    console.log(`  ${l.source}: link to "${l.city}" -> ${l.target} -> NO ROUTE`);

console.log("\n--- MALFORMED OUTBOUND URLS ---");
if (malformedOutbound.length === 0) console.log("  (none)");
else for (const l of malformedOutbound) console.log(`  ${l.file}: ${l.href}`);

/* ─── verdict ─────────────────────────────────────────────────────── */

const violations = [];
if (placeholderLinks.length > 0) violations.push(`${placeholderLinks.length} placeholder href="#" link(s)`);
if (deadInternal.length > 0) violations.push(`${deadInternal.length} dead static internal link(s)`);
if (deadAssets.length > 0) violations.push(`${deadAssets.length} missing static asset(s)`);
if (deadDataLinks.length > 0) violations.push(`${deadDataLinks.length} dead data-driven link(s)`);
if (malformedOutbound.length > 0) violations.push(`${malformedOutbound.length} malformed outbound URL(s)`);

console.log(`\nSummary: ${violations.length} violation categories.`);

if (violations.length > 0) {
  console.error("\n[FAIL] Link integrity violations found:");
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
} else {
  console.log("\n[PASS] Every link resolves and no placeholder links remain.");
}
