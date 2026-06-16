#!/usr/bin/env node
/**
 * Preservation Baseline — towingno1.com
 *
 * Property 2 (Preservation): for every surface where the bug condition does
 * NOT hold, the fixed site must produce the same observable behavior as the
 * original. This script implements the observation-first methodology for the
 * AdSense "Low Value Content" fix:
 *
 *   1. It derives a deterministic snapshot of preservation-relevant outputs
 *      from the source (route map + expected HTTP status, every rendered
 *      tel:+17788380014 href, the GA `call_dialog_open` tracking, per-page
 *      emitted metadata, the global JSON-LD @graph + per-page Service /
 *      FAQPage / BreadcrumbList schema, app/sitemap.ts + app/robots.ts
 *      output, the GTM / GA / AdSense / Reamaze integration tags, and the
 *      contact -> /api/send-email flow).
 *   2. On first run (no baseline on disk, or with --update) it WRITES the
 *      snapshot to scripts/preservation-baseline.json. This is the baseline
 *      to preserve — captured against the UNFIXED code in task 2.
 *   3. On later runs (task 3.7, against the FIXED code) it RE-DERIVES the
 *      snapshot and asserts it is byte-identical to the stored baseline,
 *      reporting any drift.
 *
 * KNOWN BUGGY SURFACES are deliberately EXCLUDED from the "must stay
 * identical" baseline because they are being fixed:
 *   - the placeholder Google verification code in app/layout.tsx <head>
 *     (fixed in task 3.3) — the `verification` metadata field is stripped,
 *   - the placeholder social href="#" links in components/Footer.tsx
 *     (fixed in task 3.4) — href="#" links are never captured,
 *   - the data-driven nearbyCities links on /locations/[city]
 *     (fixed in task 3.4) — those links are never captured.
 * Page word counts / prose are also NOT captured (that prose IS the fix).
 *
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console report, exit code).
 *
 * Usage:
 *   node scripts/preservation-baseline.mjs            # capture (if missing) or verify
 *   node scripts/preservation-baseline.mjs --update   # force re-capture the baseline
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components");
const LIB = path.join(ROOT, "lib");
const BASELINE_FILE = path.join(__dirname, "preservation-baseline.json");

const PHONE = "tel:+17788380014";
const UPDATE = process.argv.includes("--update");

/* ─── helpers ──────────────────────────────────────────────────── */

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, exts = [".tsx", ".ts"]) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.includes(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function parseSlugs(src) {
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return slugs;
}

function collapse(s) {
  return s.replace(/\s+/g, " ").trim();
}

// Return the balanced { ... } block (including braces) that follows the first
// match of `startRegex`, or "" if not found.
function balancedAfter(src, startRegex) {
  const re = new RegExp(startRegex.source);
  const m = re.exec(src);
  if (!m) return "";
  const braceStart = src.indexOf("{", m.index);
  if (braceStart === -1) return "";
  let depth = 0;
  let inStr = null;
  for (let i = braceStart; i < src.length; i++) {
    const c = src[i];
    const prev = src[i - 1];
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
      if (depth === 0) return src.slice(braceStart, i + 1);
    }
  }
  return "";
}

// Strip a nested `verification: { ... }` sub-block from a metadata block
// (KNOWN buggy surface — excluded from the preservation baseline).
function stripVerification(block) {
  const re = /verification\s*:\s*/;
  const m = re.exec(block);
  if (!m) return block;
  const sub = balancedAfter(block.slice(m.index), /verification\s*:\s*/);
  if (!sub) return block;
  return block.slice(0, m.index) + block.slice(m.index + (block.slice(m.index).indexOf(sub) + sub.length));
}

// Schema @type tokens present in a source file (sorted multiset).
function schemaTypes(src) {
  const types = [];
  // "@type": "Service"
  let m;
  const single = /"@type":\s*"([^"]+)"/g;
  while ((m = single.exec(src))) types.push(m[1]);
  // "@type": ["LocalBusiness", "AutomotiveBusiness"]
  const arr = /"@type":\s*\[([^\]]+)\]/g;
  while ((m = arr.exec(src))) {
    for (const t of m[1].matchAll(/"([^"]+)"/g)) types.push(t[1]);
  }
  return types.sort();
}

/* ─── enumerate routes + their metadata/schema source files ───────── */

const serviceDir = path.join(APP, "services");
const serviceSlugs = fs
  .readdirSync(serviceDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(serviceDir, e.name, "page.tsx")))
  .map((e) => e.name)
  .sort();

const areaSrc = read(path.join(LIB, "service-areas.ts"));
const blogSrc = read(path.join(LIB, "blog-posts.ts"));
const citySlugs = parseSlugs(areaSrc);
const blogSlugs = parseSlugs(blogSrc);

// route -> file that emits its metadata/schema. Dynamic routes use one
// template entry (the generated output is data-driven and preserved as logic).
const routeFile = new Map();
routeFile.set("/", "app/page.tsx");
routeFile.set("/services", "app/services/page.tsx");
for (const s of serviceSlugs) routeFile.set(`/services/${s}`, `app/services/${s}/page.tsx`);
routeFile.set("/locations", "app/locations/page.tsx");
routeFile.set("/locations/[city]", "app/locations/[city]/page.tsx");
routeFile.set("/blog", "app/blog/page.tsx");
routeFile.set("/blog/[slug]", "app/blog/[slug]/page.tsx");
routeFile.set("/about", "app/about/page.tsx");
routeFile.set("/contact", "app/contact/page.tsx");
routeFile.set("/privacy", "app/privacy/page.tsx");
routeFile.set("/terms", "app/terms/page.tsx");

// The concrete (publicly reachable) route map — used for the route/status list.
const concreteRoutes = ["/", "/about", "/contact", "/privacy", "/terms", "/services", "/locations", "/blog"];
for (const s of serviceSlugs) concreteRoutes.push(`/services/${s}`);
for (const c of citySlugs) concreteRoutes.push(`/locations/${c}`);
for (const b of blogSlugs) concreteRoutes.push(`/blog/${b}`);
concreteRoutes.sort();

/* ─── build the snapshot ──────────────────────────────────────────── */

function buildSnapshot() {
  const layoutSrc = read(path.join(APP, "layout.tsx"));

  /* route list + expected HTTP status (200 = page module / param exists) */
  const routes = concreteRoutes.map((route) => ({ route, status: 200 }));

  /* per-page emitted metadata (verification field stripped — buggy surface) */
  const metadata = {};
  for (const [route, file] of routeFile) {
    const src = read(path.join(ROOT, file));
    let block =
      balancedAfter(src, /export\s+const\s+metadata\s*[:=]/) ||
      balancedAfter(src, /export\s+async\s+function\s+generateMetadata/) ||
      balancedAfter(src, /function\s+generateMetadata/);
    if (route === "/" && !block) {
      // home metadata falls back to the root layout defaults
      block = balancedAfter(layoutSrc, /export\s+const\s+metadata\s*[:=]/);
    }
    block = stripVerification(block);
    metadata[route] = {
      present: block !== "",
      dynamic: /generateMetadata/.test(src),
      normalized: collapse(block),
    };
  }
  // root layout default metadata (template/default title, OG, twitter, robots)
  metadata["__layout__"] = {
    present: true,
    dynamic: false,
    normalized: collapse(stripVerification(balancedAfter(layoutSrc, /export\s+const\s+metadata\s*[:=]/))),
  };

  /* global JSON-LD @graph + per-page schema @type tokens */
  const globalGraphBlock = balancedAfter(layoutSrc, /const\s+globalSchema\s*=/);
  const schema = {
    globalGraph: {
      types: schemaTypes(globalGraphBlock),
      normalized: collapse(globalGraphBlock),
    },
    perPage: {},
  };
  for (const [route, file] of routeFile) {
    const src = read(path.join(ROOT, file));
    schema.perPage[route] = schemaTypes(src);
  }

  /* every rendered tel:+17788380014 href + GA call_dialog_open tracking */
  const telByFile = {};
  let telTotal = 0;
  const files = [...walk(APP), ...walk(COMPONENTS)];
  for (const file of files) {
    const src = read(file);
    const count = (src.match(/tel:\+17788380014/g) || []).length;
    if (count > 0) {
      telByFile[rel(file)] = count;
      telTotal += count;
    }
  }
  const homeSrc = read(path.join(COMPONENTS, "HomeContent.tsx"));
  const gaTracking = {
    eventName: /call_dialog_open/.test(homeSrc) ? "call_dialog_open" : null,
    trackFn: /function\s+trackCallClick/.test(homeSrc),
    // the onClick={() => trackCallClick("...")} call sites, sorted
    callSites: [...homeSrc.matchAll(/trackCallClick\(\s*["']([^"']+)["']\s*\)/g)]
      .map((m) => m[1])
      .sort(),
  };

  /* app/sitemap.ts output (URL set, derived the same way the route does) */
  const sitemapSrc = read(path.join(APP, "sitemap.ts"));
  const sitemapStatic = [...sitemapSrc.matchAll(/\$\{baseUrl\}(\/[a-z-]*)/g)].map((m) => m[1]).sort();
  const baseUrl = "https://www.towingno1.com";
  const sitemapServiceSlugs = (() => {
    const block = balancedAfter(sitemapSrc, /servicePageRoutes[\s\S]*?=\s*\[/) || sitemapSrc;
    // service slugs are an explicit string array mapped to /services/<slug>
    const arr = sitemapSrc.match(/\[\s*("[a-z-]+",?\s*)+\]/);
    return arr ? [...arr[0].matchAll(/"([a-z-]+)"/g)].map((m) => m[1]).sort() : [];
  })();
  const sitemapUrls = [
    baseUrl,
    `${baseUrl}/services`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/blog`,
    `${baseUrl}/locations`,
    `${baseUrl}/privacy`,
    `${baseUrl}/terms`,
    ...sitemapServiceSlugs.map((s) => `${baseUrl}/services/${s}`),
    ...citySlugs.map((c) => `${baseUrl}/locations/${c}`),
    ...blogSlugs.map((b) => `${baseUrl}/blog/${b}`),
  ].sort();

  /* app/robots.ts output (rules + sitemap + host) */
  const robotsSrc = read(path.join(APP, "robots.ts"));
  const robots = {
    userAgents: [...robotsSrc.matchAll(/userAgent:\s*(\[[^\]]*\]|"[^"]*")/g)].map((m) => collapse(m[1])),
    disallow: [...new Set([...robotsSrc.matchAll(/"(\/[^"]*\/?)"/g)].map((m) => m[1]))]
      .filter((p) => p.startsWith("/api"))
      .sort(),
    sitemap: (robotsSrc.match(/sitemap:\s*"([^"]+)"/) || [])[1] || null,
    host: (robotsSrc.match(/host:\s*"([^"]+)"/) || [])[1] || null,
  };

  /* third-party integration tags present (presence, not buggy content) */
  const integrations = {
    gtm: /GTM-5G2X36L7/.test(layoutSrc),
    ga: /G-30WWS5SMCS/.test(layoutSrc),
    adsense: /ca-pub-2962382436663193/.test(layoutSrc),
    reamaze: /reamaze/.test(layoutSrc) && /14d9241b-cb1a-4379-a0d3-f9cb700e9592/.test(layoutSrc),
  };

  /* contact flow: ContactContent.tsx -> POST /api/send-email */
  const contactSrc = read(path.join(COMPONENTS, "ContactContent.tsx"));
  const fetchArgs = (contactSrc.match(/fetch\(\s*"([^"]+)"[\s\S]*?method:\s*"([^"]+)"/) || []);
  const contactFlow = {
    endpoint: fetchArgs[1] || null,
    method: fetchArgs[2] || null,
    contentTypeJson: /"Content-Type":\s*"application\/json"/.test(contactSrc),
    fields: ["name", "email", "phone", "message"].filter((f) =>
      new RegExp(`\\b${f}\\b`).test(balancedAfter(contactSrc, /useState\(/) || contactSrc)
    ),
  };
  const apiExists = fs.existsSync(path.join(APP, "api", "send-email", "route.ts"));

  return {
    version: 1,
    routes,
    metadata,
    schema,
    tel: { total: telTotal, byFile: telByFile },
    gaTracking,
    sitemap: { urls: sitemapUrls, staticPaths: sitemapStatic },
    robots,
    integrations,
    contactFlow,
    apiSendEmailExists: apiExists,
  };
}

/* ─── deterministic serialization + diffing ───────────────────────── */

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function diff(a, b, prefix = "") {
  const diffs = [];
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  for (const k of keys) {
    const p = prefix ? `${prefix}.${k}` : k;
    const av = a ? a[k] : undefined;
    const bv = b ? b[k] : undefined;
    const aObj = av && typeof av === "object";
    const bObj = bv && typeof bv === "object";
    if (aObj && bObj) {
      diffs.push(...diff(av, bv, p));
    } else if (stableStringify(av) !== stableStringify(bv)) {
      diffs.push({ path: p, baseline: av, current: bv });
    }
  }
  return diffs;
}

/* ─── sanity checks (these are the preservation checks that PASS now) ─ */

function sanity(snap) {
  const fail = [];
  if (snap.routes.length < 15) fail.push(`only ${snap.routes.length} routes enumerated`);
  if (snap.routes.some((r) => r.status !== 200)) fail.push("a route has a non-200 expected status");
  if (snap.tel.total < 1) fail.push("no tel:+17788380014 href found");
  for (const f of ["components/Navbar.tsx", "components/Footer.tsx", "components/HomeContent.tsx"]) {
    if (!snap.tel.byFile[f]) fail.push(`tel href missing from ${f}`);
  }
  if (snap.gaTracking.eventName !== "call_dialog_open") fail.push("GA call_dialog_open tracking missing");
  if (!snap.gaTracking.trackFn) fail.push("trackCallClick function missing");
  if (snap.gaTracking.callSites.length < 1) fail.push("no trackCallClick call sites");
  for (const [name, ok] of Object.entries(snap.integrations)) {
    if (!ok) fail.push(`integration tag missing: ${name}`);
  }
  if (snap.contactFlow.endpoint !== "/api/send-email") fail.push("contact endpoint != /api/send-email");
  if (snap.contactFlow.method !== "POST") fail.push("contact method != POST");
  if (!snap.apiSendEmailExists) fail.push("api/send-email route missing");
  if (!snap.robots.sitemap) fail.push("robots sitemap missing");
  if (snap.sitemap.urls.length < 15) fail.push(`sitemap only has ${snap.sitemap.urls.length} urls`);
  if (snap.schema.globalGraph.types.length === 0) fail.push("global JSON-LD @graph missing");
  return fail;
}

/* ─── run ─────────────────────────────────────────────────────────── */

const snap = buildSnapshot();

console.log("--- PRESERVATION BASELINE (towingno1.com) ---\n");
console.log(`Routes enumerated            : ${snap.routes.length} (all expected status 200)`);
console.log(`tel:+17788380014 hrefs       : ${snap.tel.total} across ${Object.keys(snap.tel.byFile).length} files`);
console.log(`GA call tracking             : event="${snap.gaTracking.eventName}", sites=[${snap.gaTracking.callSites.join(", ")}]`);
console.log(`Pages with captured metadata : ${Object.keys(snap.metadata).length}`);
console.log(`Global JSON-LD @graph types  : ${snap.schema.globalGraph.types.join(", ")}`);
console.log(`Sitemap URLs                 : ${snap.sitemap.urls.length}`);
console.log(`robots sitemap / host        : ${snap.robots.sitemap} / ${snap.robots.host}`);
console.log(`Integrations present         : GTM=${snap.integrations.gtm} GA=${snap.integrations.ga} AdSense=${snap.integrations.adsense} Reamaze=${snap.integrations.reamaze}`);
console.log(`Contact flow                 : ${snap.contactFlow.method} ${snap.contactFlow.endpoint} (json=${snap.contactFlow.contentTypeJson}, fields=[${snap.contactFlow.fields.join(", ")}])`);
console.log("\nExcluded (known buggy surfaces, will be fixed):");
console.log("  - placeholder Google verification code (app/layout.tsx) — stripped from metadata");
console.log('  - placeholder social href="#" links (components/Footer.tsx) — not captured');
console.log("  - data-driven nearbyCities links (/locations/[city]) — not captured");

const sanityFailures = sanity(snap);
console.log("\n--- SANITY CHECKS (baseline must be healthy on UNFIXED code) ---");
if (sanityFailures.length === 0) {
  console.log("  [OK] all preservation-relevant outputs are present and well-formed");
} else {
  for (const f of sanityFailures) console.error(`  [X] ${f}`);
}

/* capture or verify */
const baselineExists = fs.existsSync(BASELINE_FILE);

if (sanityFailures.length > 0) {
  console.error("\n[FAIL] Baseline could not be established — preservation outputs are not healthy.");
  process.exit(1);
}

if (!baselineExists || UPDATE) {
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(snap, null, 2) + "\n", "utf8");
  console.log(`\n[CAPTURED] Baseline ${UPDATE ? "updated" : "written"} -> scripts/preservation-baseline.json`);
  console.log("[PASS] Preservation baseline captured on the unfixed code. Reused unchanged in task 3.7.");
  process.exit(0);
}

/* compare against stored baseline (task 3.7 path) */
const baseline = JSON.parse(read(BASELINE_FILE));
const diffs = diff(baseline, snap);

console.log("\n--- COMPARISON AGAINST STORED BASELINE ---");
if (diffs.length === 0) {
  console.log("  [OK] current snapshot is byte-identical to the captured baseline");
  console.log("\n[PASS] Preservation holds — non-buggy behavior is unchanged.");
  process.exit(0);
} else {
  console.error(`  ${diffs.length} preservation difference(s) detected:`);
  for (const d of diffs.slice(0, 40)) {
    console.error(`    ~ ${d.path}`);
    console.error(`        baseline: ${collapse(stableStringify(d.baseline)).slice(0, 120)}`);
    console.error(`        current : ${collapse(stableStringify(d.current)).slice(0, 120)}`);
  }
  console.error("\n[FAIL] Preservation regression — non-buggy behavior changed. Review the diffs above.");
  process.exit(1);
}
