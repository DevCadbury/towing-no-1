# SEO_IMPLEMENTATION_LOG_2026.md — TowingNo.1 Round 2

**Date:** 2026-10-05  
**Round:** Multi-agent War Room (round 2)  
**Build result:** PASS (53 static pages, exit 0)  
**Audit results:** claims-check PASS · seo-check PASS · link-check PASS · nav-reachability PASS · content-audit 42/42 quality pages (62 residual boilerplate pairs, documented)

---

## Changes made this round

All changes are in `F:\town`. A Vercel deploy is required before they reach the live site.

---

### T-01 · P1 · `components/SurreyPage.tsx` — Remove "under 60 seconds" response-time claims

**Problem:** Two live claims on `/locations/surrey`:  
- Line 321: *"You hear the exact price in under 60 seconds."*  
- Line 364: *"upfront quote and a live ETA in under 60 seconds"*

These are unverified response-time assertions consistent with the kind removed from HomeContent in Round 1, but missed because SurreyPage is a separate component.

**Change:**
- L321: `"You hear the exact price in under 60 seconds."` → `"You hear the exact price before any truck rolls."`
- L364: `"a live ETA in under 60 seconds, then dispatch the nearest available driver immediately"` → `"We give you an upfront quote and confirm the nearest available driver immediately."`

**Also fixed in same file — T-07:**
- L312: `"Why Choose Towing No.1"` → `"Why Choose TowingNo.1"` (brand consistency)
- L362: `"Call Towing No.1 Today"` → `"Call TowingNo.1 Today"` (brand consistency)

**Verification:** `grep "under 60 seconds" components/SurreyPage.tsx` → 0 matches. `grep "Towing No.1" components/SurreyPage.tsx` → 0 matches.

---

### T-02 · P1 · `components/ContactContent.tsx:79` — Remove "15-minute arrival time" unverified claim

**Problem:** The contact-page FAQ answered *"How fast can you get to me?"* with *"We aim for a 15-minute arrival time or less, depending on traffic and your location."* — a concrete time guarantee, contradicted by `lib/business-facts.ts:113` which marks `responseTimeClaim` as `unverified` awaiting dispatch-log data.

**Change:** Replaced with: *"We dispatch the nearest available driver as soon as you call. Arrival time depends on your location and current traffic — call (778) 838-0014 and the dispatcher will give you a live estimate before any truck rolls."*

**Verification:** `grep "15-minute" components/ContactContent.tsx` → 0 matches.

---

### T-03 · P1 · `app/robots.ts` — Add newer AI crawlers + remove malformed `host:` scheme

**Problem 1:** The existing `robots.ts` listed only first-generation AI crawlers. Missing: `OAI-SearchBot` (ChatGPT Search), `Google-Extended` (Gemini grounding), `Applebot-Extended`, `Amazonbot`, `Meta-ExternalAgent`, `cohere-ai`, `YouBot`.

**Problem 2:** `host: "https://www.towingno1.com"` emitted `Host: https://www.towingno1.com` in the live robots.txt — the scheme prefix is non-standard (the `Host` directive accepts a bare hostname only). Google and Bing ignore `Host` entirely; it is a Yandex-only, largely retired directive. Removed.

**Change:** Added 7 new AI-crawler user-agents to the AI group; removed `host` field entirely.

**Verification:** Build PASS. The `host:` line no longer appears in generated robots output.

---

### T-04 · P1 · `app/layout.tsx` — Deduplicate gtag.js double-load (~90 KB saved per page)

**Problem:** GA4 (`G-30WWS5SMCS`) and Google Ads (`AW-17934610144`) each loaded their own `<Script src="https://www.googletagmanager.com/gtag/js?id=...">` tag, fetching the same ~90 KB `gtag.js` library twice on every page. The library is identical; only the `id=` query parameter differs.

**Change:** Collapsed to one `<Script src="...gtag/js?id=G-30WWS5SMCS">` load, with a single inline init block that calls `gtag('config', 'G-30WWS5SMCS')` and `gtag('config', 'AW-17934610144')` together. Removes one full HTTP round-trip and ~90 KB parse cost on every page load.

**Verification:** Build PASS. `grep "gtag/js" app/layout.tsx` → 1 match (was 2).

---

### T-05 · P1 · `app/layout.tsx:194` — Remove `priceRange: "$$"` from LocalBusiness schema

**Problem:** `priceRange: "$$"` was present in the LocalBusiness JSON-LD node. The site publishes no fixed service pricing; the business model is "upfront flat-rate quote before dispatch" (price varies by distance/vehicle). Emitting a price-range indicator without a basis in published pricing is inconsistent with the no-pricing-schema rule.

**Change:** Replaced `priceRange: "$$"` with a comment explaining the removal.

**Verification:** Build PASS. `node scripts/claims-check.mjs` → 0 violations. `grep "priceRange" app/layout.tsx` → comment only, no emitted value.

---

### T-06 · P1 · `app/layout.tsx:480` — Fix Reamaze brand string

**Problem:** The Reamaze chat widget confirmation message contained `"Towing No. 1"` (with spaces and a period), which is visible to users. The canonical brand name is `"TowingNo.1"`.

**Change:** `"Towing No. 1"` → `"TowingNo.1"` in the Reamaze config string.

**Verification:** `grep "Towing No" app/layout.tsx` → 0 matches.

---

### T-08 + T-09 · P1 · `app/blog/[slug]/page.tsx` — Link BlogPosting to `#organization` @id + remove speakable

**Problem 1 (T-08):** The `BlogPosting` schema declared inline `Organization` nodes for `author` and `publisher` with `name`/`url`/`logo` but no `@id`, creating floating entities disconnected from the canonical `#organization` node already defined in the global layout schema. This is the same pattern the about-page Organization was fixed for in Round 1.

**Change:** Added `"@id": "https://www.towingno1.com/#organization"` to both `author` and `publisher` nodes, linking them to the canonical entity.

**Problem 2 (T-09):** `SpeakableSpecification` was present in the blog schema. Google dropped support for `speakable` around 2023; it adds JSON-LD noise with no benefit.

**Change:** Removed the `speakable` block entirely. Added a comment explaining the removal.

**Verification:** Build PASS. `grep "SpeakableSpecification" app/blog/[slug]/page.tsx` → comment only.

---

### T-10 · P2 · `app/page.tsx` — Remove stuffed `keywords` meta array

**Problem:** The homepage carried a 30+ term `keywords` metadata array including 5 "near me" variants and repeated "surrey" permutations. Google has ignored the `keywords` meta tag for rankings since 2009. The array is dead weight and a keyword-stuffing signal in the raw HTML source (visible to content-quality tools and potentially scrutinized by manual reviewers).

**Change:** Removed the entire `keywords` field from the homepage metadata. Added a comment explaining the omission (consistent with the approach already taken on the Surrey and Langley location page branches).

**Verification:** Build PASS. `grep "keywords:" app/page.tsx` → comment only.

---

### T-11 · P2 · `app/page.tsx` — Remove deprecated `SpeakableSpecification` from homepage

**Problem:** Homepage emitted a `WebPage + SpeakableSpecification` JSON-LD block targeting `#hero-summary` and `#faq-section`. As with the blog, Google dropped `speakable` support; the block adds noise with no benefit.

**Change:** Removed `speakableSchema` const and its `<script type="application/ld+json">` render call.

**Verification:** Build PASS. `grep "speakable" app/page.tsx` → 0 matches.

---

### T-12 · P2 · `app/llms.txt/route.ts` — Add missing roadside-assistance service

**Problem:** The `/llms.txt` file's comment said "8 service pages" and its `services` array listed 8 items, but the site has 9 service pages — `/services/roadside-assistance` was omitted. LLM crawlers reading `llms.txt` would not discover this service.

**Change:** Added `Roadside Assistance` as the second entry in the services list (positioned logically after Emergency Towing). Updated comment to say "all 9 service pages."

**Verification:** Build PASS. `grep "roadside-assistance" app/llms.txt/route.ts` → 1 match.

---

### T-13 · P2 · `app/globals.css` — Remove hidden EmbedSocial attribution CSS

**Problem:** Lines 297–305 contained CSS rules that hid the EmbedSocial widget's "powered by" attribution links using `display: none !important; visibility: hidden !important; opacity: 0 !important`. Hiding a third-party attribution link likely violates the EmbedSocial free-tier ToS, and constitutes a hidden link pattern that could be flagged by a Google quality reviewer.

**Change:** Removed the four-selector hide rule block. Replaced with a comment explaining the removal and advising a paid EmbedSocial plan if branding removal is required.

**Verification:** Build PASS. `grep "embedsocial.com" app/globals.css` → comment only.

---

## Files changed this round

| File | Nature of change |
|---|---|
| `components/SurreyPage.tsx` | Remove "under 60 seconds" ×2; fix brand "Towing No.1" → "TowingNo.1" ×2 |
| `components/ContactContent.tsx` | Remove "15-minute arrival time" claim from FAQ |
| `app/robots.ts` | Add 7 AI crawlers; remove malformed `host:` directive |
| `app/layout.tsx` | Deduplicate gtag.js; remove `priceRange: "$$"`; fix Reamaze brand string |
| `app/blog/[slug]/page.tsx` | Link author/publisher to `#organization` @id; remove speakable |
| `app/page.tsx` | Remove 30-term `keywords` meta; remove speakableSchema const + render |
| `app/llms.txt/route.ts` | Add roadside-assistance to 9-service list |
| `app/globals.css` | Remove hidden EmbedSocial attribution CSS |
| `scripts/preservation-baseline.json` | Re-captured after round-2 changes |

---

## What was NOT changed (with reasons)

| Item | Reason not changed |
|---|---|
| `/services/roadside-assistance` consolidation | Needs GSC data to confirm cannibalization |
| Surrey/Langley FAQ schema drift | Refactor carries regression risk; deferred |
| Dead component removal | Low urgency; cleanup PR |
| AdSense removal | Business decision |
| `middleware.ts` → `proxy.ts` | Deprecated but functional; deferred |
| Blog publish date placeholders | Owner must supply real dates |
| `Content-Security-Policy` header | Complex; needs inline-script allowances |
| "licensed & insured" site-wide wording | Owner verification pending; allowed in prose |
