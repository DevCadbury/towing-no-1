#!/usr/bin/env node
/**
 * Navigation Reachability Check — towingno1.com
 *
 * Bug-condition exploration audit for the AdSense "Low Value Content" fix.
 * Mirrors scripts/seo-check.mjs (ESM, fs/path, console report).
 *
 * Confirms every content route is reachable from the global navigation
 * (Navbar desktop + mobile, Footer) or transitively from a reachable index
 * page (/services -> service detail pages, /locations -> city pages,
 * /blog -> posts). Lists any orphaned route.
 *
 * EXPECTED on the UNFIXED site: FAILS (exit 1) if any content route is
 * unreachable from clear navigation.
 *
 * Usage: node scripts/nav-reachability.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const COMPONENTS = path.join(ROOT, "components");
const LIB = path.join(ROOT, "lib");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function parseSlugs(src) {
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) slugs.push(m[1]);
  return slugs;
}

/* ─── enumerate content routes + their source files ───────────────── */

const serviceDir = path.join(APP, "services");
const serviceSlugs = fs
  .readdirSync(serviceDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && fs.existsSync(path.join(serviceDir, e.name, "page.tsx")))
  .map((e) => e.name);

const areaSrc = read(path.join(LIB, "service-areas.ts"));
const blogSrc = read(path.join(LIB, "blog-posts.ts"));
const citySlugs = parseSlugs(areaSrc);
const blogSlugs = parseSlugs(blogSrc);

const routeFiles = new Map();
function addRoute(route, files) {
  routeFiles.set(route, files);
}

addRoute("/", ["app/page.tsx", "components/HomeContent.tsx"]);
addRoute("/about", ["app/about/page.tsx", "components/AboutContent.tsx"]);
addRoute("/contact", ["app/contact/page.tsx", "components/ContactContent.tsx"]);
addRoute("/privacy", ["app/privacy/page.tsx"]);
addRoute("/terms", ["app/terms/page.tsx"]);
addRoute("/services", ["app/services/page.tsx"]);
addRoute("/locations", ["app/locations/page.tsx"]);
addRoute("/blog", ["app/blog/page.tsx"]);
for (const s of serviceSlugs) addRoute(`/services/${s}`, [`app/services/${s}/page.tsx`]);
for (const c of citySlugs) addRoute(`/locations/${c}`, ["app/locations/[city]/page.tsx"]);
for (const b of blogSlugs) addRoute(`/blog/${b}`, ["app/blog/[slug]/page.tsx"]);

const allRoutes = [...routeFiles.keys()];

/* ─── extract outgoing links (static + dynamic family) from a source ── */

function linksFrom(files) {
  const targets = new Set();
  const hrefRe = /\bhref\s*[:=]\s*\{?\s*["'`]([^"'`]*)["'`]/g;
  for (const f of files) {
    const src = read(path.join(ROOT, f));
    let m;
    hrefRe.lastIndex = 0;
    while ((m = hrefRe.exec(src))) {
      const href = m[1];
      if (!href || !href.startsWith("/")) continue;
      if (href.includes("${")) {
        // dynamic: link to whole family, e.g. "/locations/${...}" -> all /locations/*
        const prefix = href.slice(0, href.indexOf("${"));
        for (const r of allRoutes) if (r.startsWith(prefix) && r !== prefix.replace(/\/$/, "")) targets.add(r);
      } else {
        const clean = href.replace(/[#?].*$/, "").replace(/\/$/, "") || "/";
        targets.add(clean);
      }
    }
  }
  return targets;
}

/* ─── global navigation roots (Navbar + Footer render on every page) ── */

const navRoots = linksFrom(["components/Navbar.tsx", "components/Footer.tsx"]);
// Keep only roots that are real routes.
const roots = [...navRoots].filter((r) => routeFiles.has(r));

/* ─── BFS reachability ────────────────────────────────────────────── */

const reachable = new Set(roots);
const queue = [...roots];
while (queue.length) {
  const cur = queue.shift();
  const files = routeFiles.get(cur);
  if (!files) continue;
  for (const t of linksFrom(files)) {
    if (routeFiles.has(t) && !reachable.has(t)) {
      reachable.add(t);
      queue.push(t);
    }
  }
}

const orphans = allRoutes.filter((r) => !reachable.has(r));

/* ─── report ──────────────────────────────────────────────────────── */

console.log("--- NAVIGATION REACHABILITY REPORT (towingno1.com) ---\n");
console.log(`Content routes: ${allRoutes.length}`);
console.log(`Navigation roots (Navbar + Footer): ${roots.length}`);
console.log(`  ${roots.sort().join(", ")}`);
console.log(`Reachable routes: ${reachable.size}\n`);

console.log("Route,Reachable");
for (const r of allRoutes.sort()) {
  console.log(`"${r}","${reachable.has(r) ? "YES" : "NO"}"`);
}

console.log("\n--- ORPHANED ROUTES (not reachable from nav/footer/index) ---");
if (orphans.length === 0) console.log("  (none)");
else for (const r of orphans) console.log(`  ${r}`);

const violations = [];
if (orphans.length > 0) violations.push(`${orphans.length} orphaned route(s)`);

console.log(`\nSummary: ${reachable.size}/${allRoutes.length} routes reachable, ${violations.length} violation categories.`);

if (violations.length > 0) {
  console.error("\n[FAIL] Navigation reachability violations found:");
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
} else {
  console.log("\n[PASS] Every content route is reachable from clear navigation.");
}
