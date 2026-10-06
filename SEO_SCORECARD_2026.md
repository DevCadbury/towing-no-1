# SEO_SCORECARD_2026.md — TowingNo.1 (Round 2 Update)

**Date:** 2026-10-05  
**Rounds covered:** Round 1 (prior audit) + Round 2 (multi-agent war room)  
Legend: ✅ Fixed · 🟡 Documented/Recommended · ⏳ Owner input required · ➖ No access · ❌ Rejected (reason given)

---

## PART A — Issues resolved across both rounds

| # | Issue | Evidence | File | Severity | Status |
|---|---|---|---|---|---|
| 1 | Duplicate/unverified Organization schema on /about (`foundingDate "2010"`, "licensed and insured" in JSON-LD) | `seo:guard` 2×UNVERIFIED_IN_SCHEMA | `app/about/page.tsx` | P0 | ✅ R1 |
| 2 | 7 blog posts with broken cover images (posts 7–13) | `public/blog/` missing 7 files | `lib/blog-posts.ts` | P0 | ✅ R1 |
| 3 | Unverified "since 2010" in about metadata, heading, OG/Twitter | `app/about/page.tsx:5-28` | `app/about/page.tsx` | P1 | ✅ R1 |
| 4 | "Top-rated towing service in BC" superlative | `components/AboutContent.tsx:68` | same | P1 | ✅ R1 |
| 5 | "over 15 years" / "thousands of drivers" in About prose | `components/AboutContent.tsx` | same | P1 | ✅ R1 |
| 6 | "BC Licensed Since 2010" + "Founded in 2010" in About body | `components/AboutContent.tsx:56,171` | same | P1 | ✅ R1 |
| 7 | "Stranded? We Dispatch in Under 15 Minutes." H2 (homepage) | `components/HomeContent.tsx` | same | P1 | ✅ R1 |
| 8 | "Free Quote in 60 Sec" / "free quote in under 60 seconds" / "ETA in under 60 seconds" CTAs (homepage) | `components/HomeContent.tsx` | same | P1 | ✅ R1 |
| 9 | "well under fifteen minutes" in dead ServicesContent | `components/ServicesContent.tsx` | same | P1 | ✅ R1 |
| 10 | "Licensed & insured since 2010" in services hero | `app/services/page.tsx:285` | same | P1 | ✅ R1 |
| 11 | Templated "How fast?" FAQ identical across 10 city pages | `lib/service-areas.ts` ×10 | same | P2 | ✅ R1 |
| 12 | Templated "What areas do you serve?" FAQ identical across 7 service pages | 7×`app/services/*/page.tsx` | multiple | P2 | ✅ R1 |
| 13 | **"under 60 seconds" ×2 live on /locations/surrey** | `components/SurreyPage.tsx:321,364` | same | P1 | ✅ R2 |
| 14 | **"15-minute arrival time" live on /contact FAQ** | `components/ContactContent.tsx:79` | same | P1 | ✅ R2 |
| 15 | **Duplicate `gtag.js` double-load (~90KB per page)** | `app/layout.tsx:414,435` | same | P1 | ✅ R2 |
| 16 | **`priceRange: "$$"` in LocalBusiness schema (no published pricing)** | `app/layout.tsx:194` | same | P1 | ✅ R2 |
| 17 | **Brand variant "Towing No.1" on /locations/surrey headings** | `components/SurreyPage.tsx:312,362` | same | P1 | ✅ R2 |
| 18 | **Brand variant "Towing No. 1" in Reamaze chat confirmation** | `app/layout.tsx:480` | same | P1 | ✅ R2 |
| 19 | **BlogPosting author/publisher not @id-linked to `#organization`** | `app/blog/[slug]/page.tsx:247-259` | same | P1 | ✅ R2 |
| 20 | **7 newer AI crawlers missing from robots.txt** | `app/robots.ts:12-17` | same | P1 | ✅ R2 |
| 21 | **Malformed `host: "https://..."` in robots.ts** | `app/robots.ts:26` | same | P2 | ✅ R2 |
| 22 | **Homepage 30-term stuffed `keywords` meta array** | `app/page.tsx:11-52` | same | P2 | ✅ R2 |
| 23 | **Deprecated `SpeakableSpecification` in homepage schema** | `app/page.tsx:138-148` | same | P2 | ✅ R2 |
| 24 | **Deprecated `SpeakableSpecification` in blog schema** | `app/blog/[slug]/page.tsx:264-268` | same | P2 | ✅ R2 |
| 25 | **`/llms.txt` missing roadside-assistance (8 listed, 9 exist)** | `app/llms.txt/route.ts:20-31` | same | P2 | ✅ R2 |
| 26 | **Hidden EmbedSocial attribution CSS (ToS violation + hidden link)** | `app/globals.css:297-305` | same | P2 | ✅ R2 |

---

## PART B — Issues documented / recommended (not yet implemented)

| # | Issue | Evidence | File | Severity | Status |
|---|---|---|---|---|---|
| 27 | Surrey/Langley FAQPage schema built from service-areas.ts but visible FAQ from SurreyPage/LangleyPage — answers have drifted | `SurreyPage.tsx:39` vs `service-areas.ts:52` | `components/SurreyPage.tsx` | P2 | 🟡 Roadmap W2–4 |
| 28 | `/services/roadside-assistance` is a pure aggregator duplicating 5 children — potential cannibalization | `roadside-assistance/page.tsx:12,192-233` | same | P2 | 🟡 Needs GSC data |
| 29 | 6-step "What Happens When You Call" block copy-pasted on 8 of 9 service pages | grep H2 at 8 locations | 8 service pages | P2 | 🟡 Roadmap W3–5 |
| 30 | 3 pages target "towing Surrey" primary (potential cannibalization) | `page.tsx:7`, `services/page.tsx:6`, `locations/[city]/page.tsx:32` | multiple | P2 | 🟡 Needs GSC data |
| 31 | Blog publish dates are acknowledged placeholders in `datePublished` schema | `business-facts.ts:157` | `lib/blog-posts.ts` | P2 | ⏳ Owner: real dates |
| 32 | 62 residual near-duplicate sentence pairs (shared safety/availability boilerplate) | `content-audit.mjs` output | 9 service pages | P3 | 🟡 Acceptable; note only |
| 33 | Dead components: BespokeFeatures, CallDialog, ServicesContent, Icons | grep — zero importers | `components/` | P3 | 🟡 Cleanup PR |
| 34 | `middleware.ts` deprecated in Next.js 16 | build warning | `middleware.ts` | P3 | 🟡 Roadmap W4–6 |
| 35 | Sitemap `lastmod` = build time for 29/42 URLs | `app/sitemap.ts:7` | same | P3 | 🟡 Low priority |
| 36 | AdSense loaded globally on every page (heavy JS, zero lead value for emergency towing) | `app/layout.tsx:399-403` | same | P2 | ❌ Business decision |
| 37 | PNG source format for 9 service-card images (100–198 KB each) | `public/image/*.png` | same | P3 | 🟡 Roadmap W4–6 |
| 38 | `logo.png` 307 KB (should be SVG or compressed WebP) | `public/logo.png` | same | P3 | 🟡 Roadmap W4–6 |
| 39 | No Content-Security-Policy header | `vercel.json` | same | P3 | ❌ Complex; deferred |

---

## PART C — Owner verification items (no code change possible until owner provides data)

| # | Item | `business-facts.ts` field | What it unlocks |
|---|---|---|---|
| 40 | Founding year | `claims.foundingYear` | Years-in-business stat; About copy |
| 41 | Response time | `claims.responseTimeClaim` | Can restore specific dispatch time in CTAs |
| 42 | Licence # + insurer | `claims.licensedInsured` | Substantiated "licensed & insured" claim |
| 43 | Fleet size | `stats.trucksInFleet` | Fleet stat on homepage |
| 44 | Customers served | `stats.happyCustomers` | Customer-count stat |
| 45 | Blog publish dates | `pendingInputs.blogPublishDates` | Accurate `datePublished` in BlogPosting schema |
| 46 | Google Ads conversion label | `pendingInputs.googleAdsConversionLabel` | Activates Ads conversion event |
| 47 | Real GBP review data | `pendingInputs.reviewData` | AggregateRating markup (check Google rules first) |

---

## PART D — Access-gated items (require Semrush / GSC / browser login)

| # | Item | Blocked by |
|---|---|---|
| 48 | Existing backlink profile (totals, referring domains, toxicity) | Semrush login |
| 49 | Organic keyword rankings, impressions, CTR, cannibalization confirmation | GSC login |
| 50 | Core Web Vitals (field data) | CrUX / GSC / PSI |
| 51 | Competitor backlink gap | Semrush login |
| 52 | Unlinked brand mentions | Semrush brand monitoring |

---

## AUDIT SCRIPT PASS/FAIL HISTORY

| Script | Round 0 (before R1) | After Round 1 | After Round 2 |
|---|---|---|---|
| `claims-check` | **FAIL** 63 violations | **PASS** 0 | **PASS** 0 |
| `seo-check` | PASS 0 errors / 23 warnings | **PASS** 0/0 | **PASS** 0/0 |
| `link-check` | PASS | PASS | **PASS** |
| `nav-reachability` | PASS | PASS | **PASS** |
| `content-audit` | PASS 0 near-dup | 62 near-dup (residual) | **62** (unchanged — boilerplate) |
| `npm run build` | PASS | PASS | **PASS** |
