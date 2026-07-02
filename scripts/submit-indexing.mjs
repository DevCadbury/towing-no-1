/**
 * Google Indexing & Sitemap Submission Script
 * ============================================
 * Run: node scripts/submit-indexing.mjs
 *
 * This script:
 * 1. Pings Google to re-fetch the sitemap
 * 2. Submits all URLs to IndexNow (Bing/Yandex — instant indexing)
 * 3. Logs instructions for Google Search Console manual submission
 *
 * Prerequisites:
 * - Set INDEXNOW_KEY in .env.local
 * - Set INDEXNOW_SECRET in .env.local
 * - Deploy the site first so URLs are live
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
let envVars = {};
try {
  const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
  envFile.split("\n").forEach((line) => {
    const [key, ...val] = line.split("=");
    if (key && val.length) envVars[key.trim()] = val.join("=").trim();
  });
} catch {
  console.log("⚠  No .env.local found — skipping IndexNow submission");
}

const BASE_URL = "https://www.towingno1.com";
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const INDEXNOW_KEY = envVars["INDEXNOW_KEY"] || "8a4557d424984be2a7c5c7d0a031a499";

const ALL_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/services`,
  `${BASE_URL}/services/emergency-towing`,
  `${BASE_URL}/services/battery-boost`,
  `${BASE_URL}/services/lockout-service`,
  `${BASE_URL}/services/flat-tire-help`,
  `${BASE_URL}/services/fuel-delivery`,
  `${BASE_URL}/services/winching-extraction`,
  `${BASE_URL}/services/vehicle-transport`,
  `${BASE_URL}/services/accident-recovery`,
  `${BASE_URL}/locations`,
  `${BASE_URL}/locations/surrey`,
  `${BASE_URL}/locations/langley`,
  `${BASE_URL}/locations/burnaby`,
  `${BASE_URL}/locations/coquitlam`,
  `${BASE_URL}/locations/richmond`,
  `${BASE_URL}/locations/white-rock`,
  `${BASE_URL}/locations/vancouver`,
  `${BASE_URL}/locations/delta`,
  `${BASE_URL}/locations/maple-ridge`,
  `${BASE_URL}/locations/cloverdale`,
  `${BASE_URL}/locations/south-surrey`,
  `${BASE_URL}/locations/aldergrove`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/what-to-do-car-breaks-down-highway`,
  `${BASE_URL}/blog/prepare-vehicle-winter-bc`,
  `${BASE_URL}/blog/signs-car-battery-dying`,
  `${BASE_URL}/blog/emergency-kit-essentials`,
  `${BASE_URL}/blog/when-call-tow-vs-fix-yourself`,
  `${BASE_URL}/blog/understanding-towing-services`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
];

async function pingGoogleSitemap() {
  // NOTE: Google retired the anonymous sitemap ping endpoint
  // (google.com/ping?sitemap=...) in 2023 — it now 404s and does nothing.
  // The supported ways to get Google to (re)crawl are:
  //   1. Submit/keep the sitemap in Search Console (Sitemaps report)
  //   2. Use URL Inspection → "Request indexing" for priority pages
  // So we no longer call the dead endpoint; we just remind the operator.
  console.log("\nℹ  Google sitemap ping is deprecated (removed by Google in 2023).");
  console.log("   Submit the sitemap in Search Console and use 'Request indexing' instead (see steps below).");
}

async function pingBingSitemap() {
  // Bing also deprecated the anonymous GET sitemap ping; IndexNow (below) is
  // the supported real-time submission path for Bing/Yandex.
  console.log("\nℹ  Bing sitemap ping is deprecated — using IndexNow instead (below).");
}

async function submitIndexNow() {
  const key = INDEXNOW_KEY;

  console.log(`\n📡 Submitting ${ALL_URLS.length} URLs to IndexNow (key: ${key.slice(0, 8)}...)...`);
  const payload = {
    host: "www.towingno1.com",
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: ALL_URLS,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (res.status === 200) {
      console.log(`✅ IndexNow: ${ALL_URLS.length} URLs submitted successfully`);
    } else if (res.status === 202) {
      console.log(`✅ IndexNow: Accepted (202) — URLs queued for processing`);
    } else {
      console.log(`⚠  IndexNow returned ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.log(`❌ IndexNow failed: ${err.message}`);
  }
}

function printGoogleSearchConsoleInstructions() {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GOOGLE SEARCH CONSOLE — MANUAL STEPS (do these once)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. VERIFY OWNERSHIP
   → Go to https://search.google.com/search-console
   → Add property: https://www.towingno1.com
   → Choose "HTML tag" verification method
   → Copy the content="..." value from the meta tag
   → Add it to layout.tsx: verification: { google: "YOUR_CODE" }
   → Deploy, then click Verify in GSC

2. SUBMIT SITEMAP
   → In GSC: Sitemaps → Add sitemap
   → Enter: sitemap.xml
   → Click Submit

3. REQUEST INDEXING FOR KEY PAGES (do manually for fastest results)
   Priority pages to request indexing via GSC URL Inspection:
   ${ALL_URLS.slice(0, 10).map((u) => `   → ${u}`).join("\n")}

4. GOOGLE BUSINESS PROFILE (most important for local #1)
   → Go to https://business.google.com
   → Claim/verify: TowingNo.1, Surrey BC
   → Add: phone, hours (24/7), services, photos, description
   → Category: "Towing Service"
   → Get 5+ real reviews from customers

5. CORE WEB VITALS
   → Test at https://pagespeed.web.dev/?url=https://www.towingno1.com
   → Target: LCP < 2.5s, CLS < 0.1, INP < 200ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

// Run all steps
(async () => {
  console.log("🚀 TowingNo.1 — Search Engine Indexing Submission");
  console.log(`   Sitemap: ${SITEMAP_URL}`);
  console.log(`   URLs: ${ALL_URLS.length} pages`);

  await pingGoogleSitemap();
  await pingBingSitemap();
  await submitIndexNow();
  printGoogleSearchConsoleInstructions();

  console.log("\n✅ Done. Check Google Search Console in 24–48 hours.\n");
})();
