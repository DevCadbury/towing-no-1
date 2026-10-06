# SEO_VERIFICATION_2026.md — TowingNo.1 Post-Implementation Verification

**Date:** 2026-10-05  
**Round:** Multi-agent War Room (round 2)  
**Verified by:** Independent QA pass against built output + live site

---

## Build Verification

| Check | Result |
|---|---|
| `npm run build` | **PASS** — 53 static pages, exit 0 |
| TypeScript compile | PASS (no TS errors) |
| Static page count | 53 (unchanged) |

---

## Audit Script Results

| Script | Result | Notes |
|---|---|---|
| `claims-check.mjs` | **PASS** — 0 violations | Built HTML scanned: 44 pages; 4 guarded facts; 0 UNVERIFIED_IN_SCHEMA |
| `seo-check.mjs` | **PASS** — 0 errors, 0 warnings | 19 page modules checked |
| `link-check.mjs` | **PASS** — 0 dead links | 42 routes, 538+ static links verified |
| `nav-reachability.mjs` | **PASS** — 42/42 reachable | 0 orphan pages |
| `content-audit.mjs` | 42/42 quality pages | 62 residual near-dup pairs (shared safety boilerplate — documented acceptable) |
| `preservation-baseline.mjs` | **RE-CAPTURED** | Baseline updated to reflect intentional round-2 changes |

---

## Change-by-Change Verification

### T-01 — SurreyPage "under 60 seconds" removal
- `grep "under 60 seconds" F:\town\components\SurreyPage.tsx` → **0 matches** ✅
- `grep "ETA in under" F:\town\components\SurreyPage.tsx` → **0 matches** ✅
- `/locations/surrey` renders from `SurreyPage.tsx`; change confirmed in source

### T-02 — ContactContent 15-minute claim removal
- `grep "15-minute" F:\town\components\ContactContent.tsx` → **0 matches** ✅
- `grep "arrival time" F:\town\components\ContactContent.tsx` → **0 matches** ✅
- New FAQ answer verified: dispatches nearest driver, no time guarantee

### T-03 — robots.ts AI crawlers + host fix
- `grep "OAI-SearchBot\|Google-Extended\|Applebot-Extended\|Amazonbot\|Meta-ExternalAgent\|cohere-ai\|YouBot" F:\town\app\robots.ts` → **7 matches** ✅
- `grep "host:" F:\town\app\robots.ts` → **0 matches** (comment only) ✅
- Build generates correct robots.txt without malformed `Host: https://...` line

### T-04 — gtag.js deduplication
- `grep "gtag/js" F:\town\app\layout.tsx` → **1 match** (was 2) ✅
- Single `gtag('config', 'G-30WWS5SMCS'); gtag('config', 'AW-17934610144');` init block verified
- Google Ads conversion tracking preserves correct AW-17934610144 ID

### T-05 — priceRange removal
- `grep "priceRange" F:\town\app\layout.tsx` → **comment only, no emitted value** ✅
- `node scripts/claims-check.mjs` → 0 violations (pricing schema not flagged) ✅

### T-06 — Reamaze brand string
- `grep "Towing No\. 1" F:\town\app\layout.tsx` → **0 matches** ✅
- `grep "TowingNo.1" F:\town\app\layout.tsx` → match in Reamaze config ✅

### T-07 — SurreyPage brand headings
- `grep "Towing No\.1\b" F:\town\components\SurreyPage.tsx` → **0 matches** ✅
- (Note: `TowingNo.1` without space appears correctly in other SurreyPage prose — those are correct)

### T-08 + T-09 — BlogPosting @id + speakable removal
- `grep "@id.*organization" F:\town\app\blog/[slug]/page.tsx` → **2 matches** (author + publisher) ✅
- `grep "SpeakableSpecification" F:\town\app\blog/[slug]/page.tsx` → comment only ✅
- `grep "speakable" F:\town\app\blog/[slug]/page.tsx` → comment only ✅

### T-10 — Homepage keywords meta removal
- `grep "\"keywords\"" F:\town\app\page.tsx` → **0 matches** ✅
- Metadata exports cleanly without keywords field

### T-11 — Homepage speakableSchema removal
- `grep "speakableSchema\|SpeakableSpecification\|speakable" F:\town\app\page.tsx` → **comment only** ✅
- Homepage JSON-LD now emits 4 blocks (Service, FAQPage, ItemList, WebSite) vs. 5 previously

### T-12 — llms.txt roadside-assistance
- `grep "roadside-assistance" F:\town\app/llms.txt/route.ts` → **1 match** ✅
- Service count in array: 9 (was 8) ✅

### T-13 — EmbedSocial hidden CSS removal
- `grep "display: none.*embedsocial\|embedsocial.*display: none" F:\town\app\globals.css` → **0 matches** ✅
- EmbedSocial attribution link is now visible (as required by free-tier ToS)

---

## Live Site Verification

> ⚠️ The live site at `https://www.towingno1.com/` still serves PRE-FIX content until a Vercel deploy is triggered. All verifications below are against the **local build** (`.next/`), which represents the correct post-fix state.

| Check | Status | Notes |
|---|---|---|
| robots.txt (post-deploy) | Will gain 7 new AI crawlers; `Host:` line removed | Deploy required |
| sitemap.xml | No change — 42 URLs unchanged | |
| Homepage JSON-LD | 4 blocks (speakable removed) | Verified in `.next/server/app/page.html` |
| Blog JSON-LD | author/publisher now @id-linked to `#organization` | Verified in `.next/server/app/blog/*/` |
| `/locations/surrey` | "under 60 seconds" removed, brand corrected | Verified in SurreyPage source |
| `/contact` | 15-minute claim removed | Verified in ContactContent source |
| gtag.js | Single load (was double) | Verified in layout.tsx |
| `priceRange` | Absent from LocalBusiness schema | Verified via claims-check |
| EmbedSocial attribution | No longer hidden | Verified in globals.css |

---

## Remaining Concerns (not regressions — documented known items)

| Item | Status |
|---|---|
| 62 near-duplicate sentence pairs in content-audit | Documented P3 — shared safety/availability boilerplate across service pages. Not a spam risk. |
| Surrey/Langley FAQ schema ↔ component drift | Documented P2 — schema built from service-areas.ts, visible FAQ from SurreyPage/LangleyPage components. Fix deferred pending refactor plan. |
| Blog publish dates are placeholders | Documented — owner must supply real dates |
| `middleware.ts` deprecation warning | Documented P3 — functional, deferred |
| AdSense on every page | Documented — business decision |
| Dead components (BespokeFeatures, CallDialog, ServicesContent, Icons) | Documented P3 — cleanup PR |
| Google Search Console verification token empty | Documented — owner must add token |
| Resend API key / legacy Azure/SMTP credentials in `.env.local` | Documented — rotate/remove |
