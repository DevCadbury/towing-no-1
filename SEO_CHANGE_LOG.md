# SEO Change Log — TowingNo.1

One entry per change: URL, File, Problem, Evidence, Change, Reason, Expected
impact, Validation, Status. Newest tasks appended at the bottom.

---

## P0-T1 — Baseline + regression guards

**URL:** (repo-wide tooling)
**File:** `scripts/claims-check.mjs` (new), `scripts/preservation-baseline.mjs`, `package.json`, `SEO_BASELINE.md` (new)
**Problem:** No anti-drift guard existed; the preservation baseline was stale (captured against an earlier ~9-city version) and crashed on the route-count mismatch.
**Evidence:** `preservation:baseline` reported 67 diffs then threw `TypeError` in `collapse`; there was no check for fabricated claims or `<0` render output.
**Change:**
- Added `scripts/claims-check.mjs` (guard): scans prerendered `.next/server/app` HTML + source + `lib/business-facts.ts`; enforces (a) no fabricated/unverified claim in JSON-LD, (b) no `<0`/counter-zero/`NaN`/empty-CTA/literal-`**` render output, (c) no fabricated review authors / `aggregateRating` / self review markup.
- Registered `npm run seo:guard`.
- Hardened `collapse()` in `preservation-baseline.mjs` to tolerate structural diffs, then re-captured a clean baseline for this engagement (`--update`).
- Wrote `SEO_BASELINE.md` documenting the before-state.
**Reason:** Establish a measurable before-state and a durable regression net before touching code.
**Expected impact:** Prevents trust-claim and render-placeholder drift throughout the engagement.
**Validation:** `npm run build` PASS; `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS; `preservation:baseline` re-captured (PASS); `seo:guard` correctly FAILS with 63 documented before-state violations.
**Status:** Completed

---

## P0-T2 — /api/test-email hardening (security)

**URL:** `/api/test-email`
**File:** `app/api/test-email/route.ts`
**Problem:** The GET handler sent real email (customer + admin test messages) via Resend with no authorization — anyone could trigger sends (abuse/cost/spoofing risk).
**Evidence:** Route had `export async function GET()` with no auth; it called `sendEmail(...)` on every hit.
**Change:**
- Added a shared-secret gate (`TEST_EMAIL_SECRET`) checked BEFORE any send. Accepts `Authorization: Bearer <secret>` or `?key=`/`?secret=` query param; constant-time compare via SHA-256 digests (`crypto.timingSafeEqual`).
- Disabled by default: with no `TEST_EMAIL_SECRET` set, returns 404 (endpoint appears absent). With the secret set but wrong/missing, returns 401. No mail is sent unless authorized.
- Corrected stale "Microsoft Graph API" copy in the test email body/table to "Resend" (accuracy; the route uses Resend).
**Reason:** An unauthenticated mail-sending endpoint is a security/abuse hole independent of SEO.
**Expected impact:** No functional change for users; removes the abuse vector. Operational note: set `TEST_EMAIL_SECRET` in the deployment env to use the endpoint; leave unset in production to keep it disabled.
**Validation:** `npm run build` PASS. Runtime (prod server): `GET /api/test-email` → 404 (no mail); `GET /api/test-email?key=wrong` → 404 (no mail); `POST /api/test-email` → 405. `/api/send-email` unchanged: `GET` → 405, `POST {}` → 400 "All required fields...", `POST` invalid email → 400 "Please provide a valid email address."
**Status:** Completed

---

## P0-T3 — business-facts.ts source of truth + VERIFICATION_REPORT.md

**URL:** (repo-wide data layer)
**File:** `lib/business-facts.ts` (new), `VERIFICATION_REPORT.md` (new)
**Problem:** Business claims (response time, years, founding, fleet, customers, licensing, rating) were hardcoded and duplicated across many files with no verification status, enabling drift and making the fabricated values hard to govern.
**Evidence:** Grep found "under 15 minutes", "2010", "licensed and insured", "15+/5000+/20+", "4.9/127" scattered across `app/`, `components/`, `lib/`.
**Change:**
- Added `lib/business-facts.ts` with `BusinessFact<T>` schema, `fact()` helper (statically discoverable by the guard), `isVerified()`, `statText()`, and grouped facts: `contact`/`geo` (verified operational), `claims` + `stats` (unverified marketing), `pendingInputs` (awaiting owner data).
- Encoded the policy: verified → UI+metadata+schema; unverified/pending → never in schema, never as an animated numeric stat (Counter shows a neutral `placeholder`), plain marketing copy only.
- Wrote `VERIFICATION_REPORT.md` (Claim → Value → Files → Verifying source → Status → Action pending) + the list of inputs required from the owner.
**Reason:** A single, status-tagged source of truth is the anti-drift backbone the guard enforces against.
**Expected impact:** No user-visible change yet; enables one-place correction once values are verified and prevents unverified claims re-entering schema.
**Validation:** `seo:guard` now parses the module (17 facts; 4 guarded string values) and reports the `UNVERIFIED_IN_SCHEMA` burn-down (77: "2010" + "licensed and insured" from the global schema on every page, plus "under 15 minutes" in FAQ schema) — cleared progressively in T4/T8/T9/T12/T17. Full TS compile verified in the P0-T4 build.
**Status:** Completed

---

## P0-T4 — Remove fabricated review/rating data

**URL:** `/` (and every page via global schema)
**File:** `app/page.tsx`, `app/layout.tsx`, `components/HomeContent.tsx`, `scripts/claims-check.mjs`
**Problem:** Fabricated/self-serving structured data: 4 named 5★ reviews (future 2026 dates) on the homepage; `aggregateRating 4.9/127` in the global LocalBusiness node (emitted on every page); an uncited "4.9 Customer Rating" on-page stat. Unverified `foundingDate 2010` and "Licensed and insured" also sat in the global schema.
**Evidence:** `seo:guard` before-state: FABRICATED_REVIEW 8, AGGREGATE_RATING 36, REVIEW_MARKUP 2, plus UNVERIFIED_IN_SCHEMA for "2010"/"licensed and insured" on every page.
**Change:**
- `app/page.tsx`: deleted `homeReviewSchema` (4 reviews) + its `<script>`; left a comment documenting the re-add rule.
- `app/layout.tsx`: removed `aggregateRating`; removed `foundingDate: "2010"` from both Organization and LocalBusiness; dropped "Licensed and insured." from the LocalBusiness description; documented the review/rating re-add rule (check current Google eligibility; self-serving review restrictions; no aggregating third-party reviews).
- `components/HomeContent.tsx`: replaced the "4.9 Customer Rating" star stat with a verifiable non-numeric item ("Upfront" / Flat-Rate Pricing / free quote, no hidden fees).
- `scripts/claims-check.mjs`: hardened source scanning to strip comments and match schema-property form, so documentation NOTES mentioning "aggregateRating"/"Review" don't false-positive (built-HTML check remains authoritative).
**Reason:** Fabricated/unverifiable review + rating markup violates Google policy and the no-fabrication rule; founding/licensing are unverified and must not sit in structured data.
**Expected impact:** Eliminates policy-risky markup; keeps the site eligible and trustworthy; real reviews can be reinstated later subject to an eligibility check.
**Validation:** `npm run build` PASS. `seo:guard`: FABRICATED_REVIEW/AGGREGATE_RATING/REVIEW_MARKUP now 0 (remaining: RENDER_ZERO 5 → T5, BLOG_* 12 → T6, UNVERIFIED_IN_SCHEMA 7 "under 15 minutes"/"licensed and insured" in FAQ/Service schema → T8/T9/T12). `preservation:baseline`: 35 diffs, all `schema.*` (intended review/rating/founding removal); tel hrefs (33), GA tracking, GTM/GA/AdSense/Reamaze, and contact flow all unchanged — re-captured. `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS.
**Status:** Completed

---

## P0-T5 — Fix `<0` / `0` rendering bugs (Counter)

**URL:** `/`, `/about`
**File:** `components/Counter.tsx` (rewritten), `components/StatNumber.tsx` (new), `components/HomeContent.tsx`, `components/AboutContent.tsx`
**Problem:** The animated Counter initialized at 0, so server-rendered HTML (what crawlers read) showed `<0 min` and `<0+` on the homepage and `0+`/`0/7` on About. It also rendered unverified numbers as prominent stats.
**Evidence:** Baseline prerendered HTML: `&lt;<span>0 min</span>`, `&lt;<span>0+</span>` (index), `<span>0+</span>`/`<span>0/7</span>` (about); guard RENDER_ZERO = 5.
**Change:**
- Rewrote `Counter.tsx`: SSR + first client render emit the FINAL formatted value (no 0/<0/NaN, hydration-safe); count-up is a client-only rAF enhancement on scroll-into-view; skipped entirely when a `prefix` is present (so a verified "<15 min" never flashes "<0 min").
- Added `StatNumber.tsx`: renders the real number only when the underlying `StatFact` is `verified`; otherwise renders the neutral placeholder ("Fast"/"Established"/"Trusted"/"Full fleet"). Single gate keeping unverified numbers out of prominent stats.
- `HomeContent.tsx` "Why Choose Us": now fact-driven via `stats` + `StatNumber`; removed the external `&lt;` + Counter and the unused star branch; response-time sub-copy no longer asserts the unverified number.
- `AboutContent.tsx` stats: fact-driven; "Hours Available" renders "24/7" static (verified), the rest show placeholders until verified.
**Reason:** Crawlers/users must never see 0/<0; unverified numbers must not be rendered as asserted stats (per policy). Values flip to real numbers automatically once verified in `business-facts.ts`.
**Expected impact:** Correct, crawlable stat values; honest placeholders until verification; no layout/animation regression.
**Validation:** `npm run build` PASS. Prerendered HTML now shows Home "Fast / Established / 24/7 / Upfront" and About "Established / Trusted / Full fleet / 24/7" — no `<0`/`0+`. `seo:guard` RENDER_ZERO = 0. `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS; `preservation:baseline` PASS (no drift — stat text is not a preserved surface).
**Status:** Completed

---

## P0-T6 — Fix blog body renderer defects

**URL:** `/blog/*` (all 6 posts)
**File:** `app/blog/[slug]/page.tsx`, `scripts/claims-check.mjs`
**Problem:** The line-by-line body renderer (1) rendered an EMPTY amber CTA box (it used `lines[i+1]`, a blank line, as the box content while the closing bold sentence dropped below it); (2) showed literal `**` for inline bold (e.g. `**#77**`, `**(778) 838-0014**`); (3) emitted loose `<li>` not wrapped in `<ul>`; (4) had no `### `/H3 support.
**Evidence:** Guard before-state: BLOG_EMPTY_CTA 6, BLOG_LITERAL_BOLD 6; prerendered posts showed empty amber boxes and literal `**`.
**Change:**
- Replaced the inline `.map` with a proper block parser (`renderBody`) + inline renderer (`renderInline`): `##`/`###` headings, consecutive `- ` grouped into a real `<ul>`, `---` + a `**bold**` line → a populated amber CTA callout (plain `---` → skipped), whole-line bold → emphasized paragraph, inline `**bold**` parsed everywhere. All text flows through React children (no `dangerouslySetInnerHTML` — XSS-safe).
- Guard: added `stripScripts()` so the visible-text checks (blog `**`, `<0`, counter-zero, empty-CTA) ignore `<script>` content — the Reamaze chat widget's markdown `**Towing No. 1**` config was a false positive on every page.
**Reason:** Correct, readable article rendering; crawlers/users see populated CTAs, bold inline text (phone numbers, `#77`), and semantic lists — not markdown artifacts.
**Expected impact:** Better blog UX + semantics; removes broken placeholders.
**Validation:** `npm run build` PASS. Guard: BLOG_EMPTY_CTA 0, BLOG_LITERAL_BOLD 0 (only UNVERIFIED_IN_SCHEMA 7 remains → T8/T9/T12). Prerendered check: CTA boxes populated; `#77`/phone in `<strong>`; `<ul class="list-disc">` present on posts with bullets (emergency-kit 5, understanding-towing 2) and absent where there are none. `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS; `preservation:baseline` PASS.
**Status:** Completed

### P0 milestone
All P0 correctness/trust/security items are complete. `seo:guard` render + fabrication categories (RENDER_ZERO, RENDER_NAN, BLOG_LITERAL_BOLD, BLOG_EMPTY_CTA, FABRICATED_REVIEW, AGGREGATE_RATING, REVIEW_MARKUP) are all 0. Remaining: UNVERIFIED_IN_SCHEMA 7 ("under 15 minutes" in FAQ schema on home/surrey/burnaby/emergency-towing/flat-tire-help; "licensed and insured" in battery-boost + emergency-towing Service descriptions) — scheduled for P1-T8/T9/T12.

---

## P1-T7 — Blog dates + Article schema

**URL:** `/blog/*` (all 6 posts)
**File:** `lib/blog-posts.ts`, `app/blog/[slug]/page.tsx`, `scripts/claims-check.mjs`
**Problem:** `datePublished` was hardcoded equal to `dateModified` (no freshness signal), dates were emitted with no future-date safety, the schema used generic `Article`, and authorship was Organization-only with no visible byline (weak E-E-A-T). (Note: with the current date being Sep 2026, the posts' Jan–Feb 2026 dates are in the past, not future.)
**Evidence:** `articleSchema` had `datePublished === dateModified === new Date(post.date)`; no `updatedDate` field existed; no byline in the template.
**Change:**
- `lib/blog-posts.ts`: added optional `updatedDate` (drives `dateModified` + a visible "Updated" label; documented "never set a future date"). No values set (honest: no updates made).
- `app/blog/[slug]/page.tsx`: added `toISODate()` (parses the human date; clamps any future date to now); schema `Article` → `BlogPosting`; `datePublished` from `date`, `dateModified` from `updatedDate ?? date`; OG `publishedTime`/`modifiedTime` made future-safe; added a truthful visible byline "By the TowingNo.1 Team" + conditional "· Updated {date}". Kept Organization author (accurate — company-authored; a named author with credentials would strengthen E-E-A-T and remains a pending owner input).
- `scripts/claims-check.mjs`: added a `BLOG_FUTURE_DATE` check that parses `date`/`updatedDate` in `lib/blog-posts.ts` and fails if any is in the future.
**Reason:** Honest, future-safe publish/modified signals; more specific `BlogPosting` type; visible authorship for E-E-A-T; a durable guard against future-dated posts.
**Expected impact:** Correct freshness signals and clearer authorship without fabricating dates or a person author.
**Validation:** `npm run build` PASS. Prerendered: `"@type":"BlogPosting"`, distinct future-safe `datePublished`/`dateModified`, byline present. Guard: 6 blog dates checked, none future; no new violations (still only UNVERIFIED_IN_SCHEMA 7 → T8/T9/T12). `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS; `preservation:baseline` 1 intended schema diff (Article→BlogPosting) — re-captured.
**Status:** Completed

---

## P1-T8 — FAQ consistency (semantic markup)

**URL:** all 8 `/services/*` pages + 12 `/locations/*` pages
**File:** `lib/faq.ts` (new), all 8 `app/services/*/page.tsx`, `lib/service-areas.ts`, `scripts/claims-check.mjs`
**Problem:** (1) FAQPage schema was on only 4 of 8 service pages despite all 8 having a visible FAQ; (2) emergency-towing's FAQ schema text drifted from the visible text; (3) service FAQ arrays were duplicated (schema const + inline JSX) inviting drift; (4) unverified response-time figures ("under 15/20/25 minutes") appeared in FAQ answers, which are structured data.
**Evidence:** Guard UNVERIFIED_IN_SCHEMA flagged "under 15 minutes" in FAQ schema; 4 service pages lacked FAQPage; context map noted the emergency-towing drift.
**Change:**
- Added `lib/faq.ts` (`FaqItem` + `faqPageSchema()`), with a documented note that FAQ markup is semantic (not a guaranteed SERP feature; must mirror visible text; no unverified claims).
- Refactored all 8 service pages to a single `const faq: FaqItem[]` feeding BOTH the visible FAQ (`faq.map`) and `faqPageSchema(faq)` — one source, zero drift. Added FAQPage to accident-recovery, fuel-delivery, vehicle-transport, winching-extraction. Resolved emergency-towing drift.
- Removed unverified response-time figures from every FAQ answer (schema-eligible): emergency-towing, flat-tire-help, battery-boost, lockout-service, and all 12 location FAQ answers in `lib/service-areas.ts`. Answers still address "how fast" truthfully ("we dispatch the nearest available driver immediately… ask for a live ETA"). Marketing wording ("under 15 minutes") remains only in non-schema hero/CTA/prose. Differentiated battery-boost vs lockout answers to avoid a near-duplicate.
- Guard: added CHECK 4b — flags ANY response-time figure (`under \d+ min`, `\d+ minute(s)`) inside JSON-LD, regardless of the specific number.
**Reason:** Structured data must match visible content and must not assert unverified figures; every visible FAQ should be machine-understandable.
**Expected impact:** Consistent, policy-clean FAQ semantics across services + locations; better answer-engine extraction; no schema/visible drift going forward.
**Validation:** `npm run build` PASS. All 8 service pages emit FAQPage (visible === schema). Guard UNVERIFIED_IN_SCHEMA 7→4 (remaining: home FAQ response-time → T12; "licensed and insured" in 2 Service descriptions → T9). `seo:check`/`audit:content` (0 near-dup)/`audit:links`/`audit:nav` PASS; `preservation:baseline` 65 schema-only diffs (4 pages gaining FAQPage), no protected-surface change — re-captured.
**Status:** Completed

---

## P1-T9 — Service schema + OG/social metadata

**URL:** all 8 `/services/*` pages + `/services` hub
**File:** `lib/service-areas.ts`, all 8 `app/services/*/page.tsx`, `app/services/page.tsx`
**Problem:** (1) service `Service` schema `areaServed` varied arbitrarily (4–6 cities per page); (2) the services hub used a string `areaServed: "Lower Mainland, BC"`; (3) the 8 service sub-pages had no `twitter` card and no per-page `openGraph.images` (seo:check warned "Missing Twitter Card"); (4) battery-boost + emergency-towing `Service` descriptions still carried the unverified "Licensed and insured" claim in JSON-LD.
**Evidence:** seo:check listed "Missing Twitter Card metadata" on all 8 sub-pages; guard flagged "licensed and insured" in 2 Service descriptions.
**Change:**
- Added `areaServedSchema` to `lib/service-areas.ts` (all served cities, `City` + `containedInPlace` shape matching the global LocalBusiness node). All 8 service pages now use `areaServed: areaServedSchema` — one consistent, complete coverage list.
- Added a per-page `openGraph.images` (service illustration) + a `twitter` `summary_large_image` card to all 8 service pages.
- Removed "Licensed and insured" from the battery-boost + emergency-towing `Service` schema descriptions (unverified → out of JSON-LD). Marketing wording remains in non-schema meta/UI copy, flagged.
- Converted the services-hub ItemList `areaServed` string → structured `{ "@type": "AdministrativeArea", name: "Lower Mainland, BC" }`.
**Reason:** Consistent entity/coverage signals, complete social previews on every service page, and no unverified claim in structured data.
**Expected impact:** Cleaner entity understanding for search/answer engines and correct social cards; resolves the Twitter-card warnings.
**Validation:** `npm run build` PASS. `seo:check` PASS with no Twitter warnings; prerendered service page shows twitter card + service `og:image`. Guard UNVERIFIED_IN_SCHEMA 4→2 (only the home FAQ response-time remains → T12). `audit:content`/`audit:links`/`audit:nav` PASS. `preservation:baseline` diffs = 8 metadata (service twitter/images) + 32 schema (areaServed normalization + hub), no protected-surface change — re-captured. NOTE: global LocalBusiness lists 10 areaServed cities vs 12 on Service schemas (Surrey sub-areas); optional alignment noted for T17.
**Status:** Completed

---

## P1-T10 — Conversion tracking (GA4 + Google Ads)

**URL:** site-wide
**File:** `lib/analytics.ts` (new), `components/CallTracking.tsx` (new), `app/layout.tsx`, `components/HomeContent.tsx`, `components/ContactContent.tsx`, `components/Navbar.tsx`, `components/FloatingCallButton.tsx`, `scripts/preservation-baseline.mjs`
**Problem:** Only ONE custom event existed (`call_dialog_open`, misnamed, fired from the homepage hero + one bottom CTA). Navbar, floating button, footer, service/location call CTAs, and the contact-form success were untracked; the loaded Google Ads tag had no conversion wired.
**Evidence:** Grep found `trackCallClick`/`call_dialog_open` only in HomeContent (2 sites); no `generate_lead`; no `gtag('event','conversion')` anywhere.
**Change:**
- Added `lib/analytics.ts`: `trackCall(location)` → GA4 `call_click`; `trackLead()` → GA4 `generate_lead`; both attempt a Google Ads `conversion` (`send_to: AW-17934610144/<label>`) but SKIP it while the conversion label is pending (`business-facts.pendingInputs.googleAdsConversionLabel`) — no malformed conversion is ever sent.
- Added `components/CallTracking.tsx`: one capture-phase document click listener (mounted in the layout) that fires `call_click` for EVERY `tel:` link — including server-rendered links (footer, service/location pages, blog) — with an explicit `data-call-location` label when present, else a `page:<path>` label. Zero per-link wiring.
- Added explicit `data-call-location` on the key CTAs (hero, bottom_cta, navbar_desktop, navbar_mobile, floating_button).
- Removed the old `call_dialog_open` event, the `trackCallClick` function, and the duplicate `window.gtag` declaration from HomeContent.
- Contact form: fires `trackLead()` on submit success.
- Updated `preservation-baseline.mjs` to guard the NEW tracking (call_click + generate_lead + global listener mounted + ads-label-guarded) instead of the removed `call_dialog_open`.
**Reason:** Measure the real conversions (calls + leads) that were invisible, and make the loaded Ads tag usable once a label is supplied — without fabricating a conversion.
**Expected impact:** Full call + lead attribution in GA4; a one-line switch (adding the label) activates Ads conversions.
**Validation:** `npm run build` PASS. Prerendered: `data-call-location="hero"` present, `call_dialog_open` gone. Guard steady at UNVERIFIED_IN_SCHEMA 2 (home FAQ → T12); `seo:check`/`audit:content`/`audit:links`/`audit:nav` PASS. `preservation:baseline` sanity OK (tracking signal preserved as call_click/generate_lead/global listener); 7 diffs all under `gaTracking` — re-captured. VERIFY: Google Ads conversion label (pending owner input) to activate Ads conversions.
**Status:** Completed

---

## P1-T11 — Internal linking + nav/footer parity

**URL:** site-wide (footer), all `/services/*`, `/blog/*`, `/contact`
**File:** `components/Footer.tsx`, `app/services/vehicle-transport/page.tsx`, `app/blog/[slug]/page.tsx`, `components/ContactContent.tsx`
**Problem:** Footer listed 6 services (missing Accident Recovery + Vehicle Transport) vs the navbar's 8; no footer location links. vehicle-transport was the only service page with no "Other Services" block. Blog "Related Services & Areas" was an identical static list on every post and "More from Our Blog" was array-order, not topical. The contact card's service-area list omitted Surrey (the primary market).
**Evidence:** context map + `audit:nav` roots; footer/nav service mismatch; blog template hardcoded links.
**Change:**
- Footer: added Accident Recovery + Vehicle Transport (now all 8 services); added a full-width "Service Areas" strip linking all 12 location pages (`serviceAreas`) + "View all" — so every page footer links every location page (strengthens service→location internal linking site-wide).
- vehicle-transport: added the standard "Other Services" sidebar block (parity with the other 7).
- Blog article template: "More from Our Blog" now ranks other posts by shared-keyword overlap then recency; "Related Services & Areas" now derives service links from the post's title/excerpt/keywords (contextual per post) plus Surrey/Langley.
- Contact card: service-area line now leads with Surrey and lists the full coverage set.
**Reason:** Deliberate, contextual internal linking (not repetitive) and complete nav/footer parity improve crawl paths, topical relevance, and location discovery.
**Expected impact:** Better internal link equity to services + locations, topical blog interlinking, and consistent NAP/coverage messaging.
**Validation:** `npm run build` PASS. `audit:links` 153 internal links (was 141), 0 dead; `audit:nav` 34/34 reachable, 0 orphans. Battery post now links battery-boost + emergency-towing + locations (was the generic static set). `seo:check`/`audit:content` PASS; guard steady at UNVERIFIED_IN_SCHEMA 2 (home FAQ → T12); `preservation:baseline` PASS (no protected-surface drift).
**Status:** Completed

---

## P1-T12 — Homepage FAQ / speakable

**URL:** `/`
**File:** `app/page.tsx`, `components/HomeContent.tsx`
**Problem:** The homepage had TWO different FAQ sets — a visible accordion (`HomeContent` local `faqs`) and `homeFaqSchema` (8 different Q&As) — so visible ≠ schema (drift), and both still carried the unverified "under 15 minutes" figure (the last `UNVERIFIED_IN_SCHEMA` items). A dead, fabricated `testimonials` array (Sarah M./David K./… "Verified Customer") also sat unused in HomeContent.
**Evidence:** `guard` UNVERIFIED_IN_SCHEMA 2 (home FAQ); visible `faqs` array ≠ `homeFaqSchema`; unused `testimonials` const with fabricated quotes.
**Change:**
- Unified the homepage FAQ into ONE source: `homeFaq: FaqItem[]` in `app/page.tsx` (9 self-contained, AEO-oriented Q&As with no unverified figures and no "licensed and insured"), `homeFaqSchema = faqPageSchema(homeFaq)`, passed as `<HomeContent faq={homeFaq} />`. `FaqSection` now renders the same array — visible === schema.
- Removed the duplicate local `faqs` array from HomeContent.
- Removed the dead, fabricated `testimonials` array (the carousel already renders REAL Google reviews via the EmbedSocial widget — kept).
- Confirmed the speakable selectors (`#hero-summary`, `#faq-section`) both resolve.
**Reason:** Eliminate FAQ schema/visible drift, remove the last unverified figures from structured data, and delete fabricated content — while keeping a strong visible AEO FAQ.
**Expected impact:** Clean, consistent FAQ semantics + answer-engine extraction on the homepage; guard fully green.
**Validation:** `npm run build` PASS. `seo:guard` **0 violations** (UNVERIFIED_IN_SCHEMA cleared; all render/fabrication/schema categories 0). Prerendered home shows 9 visible FAQ items matching the schema; `#faq-section`/`#hero-summary` present; no "Verified Customer" fabricated text. `seo:check`/`audit:content` (home 1233 words, 0 near-dup)/`audit:links`/`audit:nav` PASS; `preservation:baseline` schema-only diff (home FAQ 8→9) — re-captured.
**Status:** Completed

### P1 milestone (schema/trust)
`seo:guard` is now fully green (0 violations). All unverified claims are out of JSON-LD; the animated stats show neutral placeholders until verified; FAQ visible === schema across home, all services, and all locations.

---

## P1-T13 — Core Web Vitals + image optimization

**URL:** site-wide
**File:** `public/.png` (deleted), `PERFORMANCE_NOTES.md` (new)
**Problem:** Needed a CWV/image audit; found an orphaned 1.8 MB junk asset (`public/.png`) and an oversized blog source image; AdSense/third-party tradeoffs undocumented.
**Evidence:** Asset size listing — `public/.png` 1.8 MB (unreferenced), `public/blog/when-to-call-tow.jpg` 1.6 MB (used, but served optimized by next/image); grep confirmed `/.png`, `preview copy.jpg`, `Roadside_Assistanc.png` unreferenced; no raw `<img>` tags; all 7 Outfit weights in use.
**Change:**
- Deleted the orphaned 1.8 MB `public/.png` (unreferenced, malformed name).
- Wrote `PERFORMANCE_NOTES.md`: verified posture (next/image AVIF/WebP + responsive sizes, LCP `priority`, next/font self-hosted no-CLS, non-blocking third-party scripts), plus recommendations (compress the 1.6 MB blog source, remove two unused assets pending owner OK, add a small favicon, resolve desktop floating-button/chat overlap) and the AdSense-vs-conversion tradeoff (kept, documented, not removed).
**Reason:** Confirm the delivery pipeline is already optimized, remove dead weight, and record the field-measurement + tradeoff items that need the live site / owner input.
**Expected impact:** Slightly smaller deploy; documented CWV posture; no user-facing regression. Field LCP/INP/CLS to be measured via PageSpeed/CrUX (external checklist).
**Validation:** `npm run build` PASS; `seo:guard` 0; `seo:check`/`audit:content`/`audit:links`/`audit:nav`/`preservation:baseline` all PASS.
**Status:** Completed

### P1 milestone (complete)
All P1 high-impact SEO/AEO/GEO/SXO items done. Full suite green: build + guard (0) + 4 audits + preservation. Verification-pending owner inputs remain (Google Ads conversion label; verified numbers for response time / years / founding / fleet / customers / licensing; real review data) — tracked in VERIFICATION_REPORT.md.

---

## P2-T14 — AEO/GEO answer passages + authoritative citations

**URL:** `/services/accident-recovery`, `/services/winching-extraction` (+ site-wide AEO posture)
**File:** `components/OfficialResources.tsx` (new), `app/services/accident-recovery/page.tsx`, `app/services/winching-extraction/page.tsx`
**Problem:** Safety-critical claims (post-collision steps, winter recovery) had no authoritative citations — weak GEO/E-E-A-T for answer/generative engines.
**Evidence:** Service pages had strong self-contained FAQ + prose (good AEO) but no external authoritative references.
**Change:**
- Added `OfficialResources` component (external links open in new tab, marked external + "not affiliated").
- accident-recovery: cited **ICBC — report a claim** (`icbc.com/claims/report-view`) + **DriveBC** (`drivebc.ca`). URLs verified via search.
- winching-extraction: cited **DriveBC** + **B.C. winter tires & chains** (`gov.bc.ca/winterdriving`) with the accurate "Oct 1 – Apr 30" rule.
- Confirmed AEO posture already in place: self-contained, question-led FAQ (home + 8 services + 12 locations) and factual prose; entity clarity (brand→service→geography→contact) carried by schema + `business-facts`.
**Reason:** Safety-critical info should cite authoritative sources; citations strengthen trust and generative-engine grounding without fabricating anything.
**Expected impact:** Better E-E-A-T/GEO signals on safety topics; genuinely useful official links for stressed users.
**Validation:** `npm run build` PASS; `seo:guard` 0; `audit:links` lists the 3 new outbound URLs, 0 malformed; `audit:content`/`audit:nav`/`seo:check`/`preservation` PASS.
**Status:** Completed

---

## P2-T15 — Location enrichment (audit; 12 cities preserved)

**URL:** `/locations/*` (all 12)
**File:** (audit — no code change required)
**Problem:** Verify the 12 location pages provide genuine per-city value (no doorway/duplicate pages).
**Evidence:** `audit:content`: all 12 city pages 646–772 words, **0 near-duplicate sentence pairs**; each has a unique intro, "why locals call us", city-specific common scenarios, neighbourhoods, highways, landmarks, and FAQ (from `lib/service-areas.ts`).
**Change:** None needed — the pages already meet the uniqueness/depth bar. Internal linking to them was strengthened in T11 (footer Service Areas strip links all 12 from every page) and their FAQ response-time figures were cleaned in T8. No doorway pages created; the 12-city architecture is preserved.
**Reason:** The location set is genuinely differentiated; mass-producing or trimming would add no value.
**Expected impact:** Maintained — strong, unique local pages with clean schema and internal links.
**Validation:** `audit:content` PASS (0 near-dup), `audit:links`/`audit:nav`/`seo:check`/guard/preservation PASS.
**Status:** Completed

---

## P2-T17 — Local / entity improvements

**URL:** global (every page via LocalBusiness schema)
**File:** `app/layout.tsx`
**Problem:** The global LocalBusiness `areaServed` listed 10 cities and omitted three that have their own location pages (Cloverdale, South Surrey, Aldergrove), so the global entity's coverage didn't match the site's actual service-area pages or the Service-schema `areaServed` (12).
**Evidence:** Global areaServed had Surrey, Delta, White Rock, Langley, Burnaby, Richmond, Coquitlam, Port Coquitlam, Vancouver, Maple Ridge — missing the 3 sub-area pages.
**Change:** Added Cloverdale, South Surrey, and Aldergrove (`City` + `containedInPlace: British Columbia`) to the global `areaServed` so it now covers all 12 location-page cities (plus Port Coquitlam). NAP confirmed consistent site-wide (phone `(778) 838-0014`, `info@towingno1.com`; only the Reamaze chat copy uses the cosmetic "Towing No. 1"). Safety-source citations were added in T14.
**Reason:** Consistent brand→service→geography entity signals across global schema, Service schemas, and the actual location pages.
**Expected impact:** Clearer local entity/coverage understanding for search + generative engines.
**Validation:** `npm run build` PASS; `seo:guard` 0; prerendered global schema now includes Cloverdale/South Surrey/Aldergrove; all audits PASS; `preservation:baseline` schema-only diff (global areaServed) — re-captured.
**Status:** Completed

---

## P2-T16 — Blog clusters / content architecture

**URL:** `/blog`, `/blog/*`
**File:** `lib/blog-posts.ts`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `BLOG_CONTENT_PLAN.md` (new)
**Problem:** No topic taxonomy on the blog; no documented content-cluster plan or backlog.
**Evidence:** BlogPost had no category field; posts were an undifferentiated list.
**Change:**
- Added an optional `category` field to `BlogPost` and assigned each of the 6 posts a cluster: Road Safety (×2), Seasonal, Maintenance, Towing Advice (×2).
- Display the category as a badge on the blog index cards and the article hero.
- Deliberately did NOT create per-category index routes (thin/doorway risk with 6 posts) — revisit when a cluster reaches ~5+ posts.
- Wrote `BLOG_CONTENT_PLAN.md`: existing-post→cluster map with service/location link targets, the implemented internal-linking summary, a prioritized high-intent backlog (towing cost, flatbed-vs-wheel-lift, EV/AWD towing, post-accident+ICBC, winching, battery/lockout/fuel, local highway guides), a freshness/update policy, and the known non-functional newsletter form.
- (Contextual internal links — relevance-ranked related posts + topic-matched service links — were implemented in T11.)
**Reason:** Give the blog a real topical structure and a disciplined, non-spammy growth plan.
**Expected impact:** Clearer topical grouping for users/engines; a concrete, quality-first content roadmap.
**Validation:** `npm run build` PASS; `seo:guard` 0; category badges render on index + article; `audit:content`/`audit:links`/`audit:nav`/`seo:check`/`preservation` all PASS.
**Status:** Completed

---

## P2-T18 / P3-T19 / P3-T20 / P3-T21 — Authority, monitoring, external data, iteration

**Files:** `package.json`, `AUTHORITY_PLAN.md` (new), `EXTERNAL_SEO_CHECKLIST.md` (new), `SEO_ITERATION_PLAYBOOK.md` (new), `FINAL_SEO_REPORT.md` (new)
**Change:**
- **T19 (monitoring):** added `npm run seo:all` — one command that runs build → `claims-check` guard → `seo-check` → `content-audit` → `link-check` → `nav-reachability` → `preservation-baseline` (schema/claims validation is the guard). Verified end-to-end: exit 0, all PASS. Cadence + drift-detection documented in `SEO_ITERATION_PLAYBOOK.md`.
- **T18 (authority):** `AUTHORITY_PLAN.md` — GBP-first, NAP-citation, genuine-local-relationship + content-earned-link strategy with an explicit avoid-list (no PBNs/spam/fake reviews). No backlink data fabricated (pull from a real tool).
- **T20 (external data):** `EXTERNAL_SEO_CHECKLIST.md` — the exact `/seo` commands + Google tools (GSC, Rich Results Test, PSI, CrUX), rank/AI-surface checks, and the deployment env values to set. Clearly separates what needs live access.
- **T21 (iteration):** `SEO_ITERATION_PLAYBOOK.md` — the continuous loop (health check, drift detection, monitoring cadence, honest content refresh, review acquisition, conversion experiments, verification-pending list, four-perspective quality gate).
- **Capstone:** `FINAL_SEO_REPORT.md` — consolidated before→after across Technical/Local/Content/AEO/GEO/SXO/Schema/Performance/Linking + per-URL changes + remaining issues + next actions.
**Validation:** `npm run seo:all` exit 0 — guard 0 violations, 0 SEO errors (15 soft warnings), 34/34 reachable, 0 dead links, 0 thin/dup pages, preservation holds.
**Status:** Completed

### Engagement complete
All 21 tasks (P0–P3) done. Full suite green. All fabricated/unverified claims removed from structured data and gated by the anti-drift guard; owner verification items tracked in `VERIFICATION_REPORT.md`.

---

## POLISH — Post-engagement minor items (title/desc lengths, newsletter, image, favicon, floating button)

Optional low-risk items flagged (but not actioned) during the main engagement, completed in one pass. Full suite re-verified green (`npm run seo:all` exit 0) and the preservation baseline re-captured for the intended metadata edits.

### PL-1 — Title/description length warnings (15 → 0)

**URL:** `/`, `/about`, `/locations`, `/services`, all 8 `/services/*`
**File:** `app/page.tsx`, `app/about/page.tsx`, `app/locations/page.tsx`, `app/services/page.tsx`, all 8 `app/services/*/page.tsx`
**Problem:** `seo-check` reported 15 soft warnings — 3 titles > 65 chars (`/` 69, `/locations` 67, `/services` 73) and 12 meta descriptions > 160 chars (`/about` 166, `/locations` 187, `/` 200, `/services` 197, and the 8 service sub-pages 161–185).
**Change:** Rewrote the over-length titles (≤ 65) and descriptions (100–160) preserving meaning, keywords, and the verified phone number; updated the matching `openGraph`/`twitter` title copies. Home title → `Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1` (53); `/locations` → 58; `/services` → 58. While shortening, removed the unverified response-time claim "dispatches in under 15 minutes" from the home (`app/page.tsx`) and emergency-towing meta descriptions (consistent with the no-unverified-claims policy; these were the last two hard "under 15 min" assertions in machine-read tags). `/about` description kept "since 2010" + "licensed and insured" to stay consistent with the visible page body (those remain owner-verification items).
**Reason:** Avoid SERP truncation of titles/descriptions; keep unverified figures out of machine-readable tags.
**Expected impact:** Cleaner, fully-rendered SERP snippets; no meaning or keyword loss.
**Validation:** `seo-check` 0 errors, **0 warnings** across 18 pages (was 15 warnings). `seo:guard` 0. Preservation shows 13 intended `metadata.*.normalized` diffs only — re-captured.
**Status:** Completed

### PL-2 — Non-functional blog newsletter form removed

**URL:** `/blog`
**File:** `app/blog/page.tsx`
**Problem:** The "Stay Informed" newsletter `<form>` had no `action`/`onSubmit` handler — a dead control that misleads users. It also sat directly above the "Need Emergency Assistance?" phone CTA (redundant closing section).
**Change:** Removed the newsletter `<section>`. Chose removal over building a handler because `/api/send-email` is contact-specific (requires name/email/phone/message + reCAPTCHA), there is no mailing-list provider wired, and a new unauthenticated email endpoint would be a spam vector with no newsletter to actually send. Blog page now flows hero → intro prose → post grid → phone CTA.
**Reason:** No dead/misleading UI; honest controls only. (A real newsletter needs a mailing provider — noted for the owner.)
**Expected impact:** Cleaner blog closing; removes a broken interaction; conversion CTA (phone) preserved.
**Validation:** `content-audit` 34/34 quality pages (blog still passes); `audit:links`/`audit:nav` PASS; build PASS.
**Status:** Completed

### PL-3 — Oversized blog image compressed (1598 KB → 144 KB)

**URL:** `/blog`, `/blog/what-to-do-car-breaks-down-highway` (featured image)
**File:** `public/blog/when-to-call-tow.jpg`
**Problem:** The source JPEG was 1200×1500 but 1.6 MB — badly compressed. next/image serves optimized derivatives, but the bloated source inflates build/deploy size and any raw serve.
**Change:** Re-encoded in place at JPEG quality 82 (kept full 1200×1500 dimensions), 1598 KB → 144 KB (~11× smaller). Verified visually — no artifacts, smooth sky gradient. All blog images are now 89–144 KB.
**Reason:** Smaller source = faster optimization, smaller deploy, faster raw/OG serve; no quality loss at web sizes.
**Expected impact:** Lighter deploy and faster image delivery on the blog.
**Validation:** Visual check PASS; build PASS; `audit:links` (image still resolves) PASS.
**Status:** Completed

### PL-4 — Proper small favicon (file-convention icons)

**URL:** site-wide (`<head>` icons)
**File:** `app/icon.png` (replaced), `app/apple-icon.png` (new), `app/layout.tsx`
**Problem:** The favicon was the full 307 KB wide logo (`/logo.png`), declared three redundant ways (metadata.icons + manual `<head>` `<link>` tags), plus a 189 KB non-square `app/icon.png`. Result: a heavy, squished favicon and duplicate icon tags.
**Change:** Generated a clean square emblem crop (tow-truck + orange shield from the logo): `app/icon.png` 128×128 transparent (189 KB → 18 KB) for browser tabs, and `app/apple-icon.png` 180×180 on brand navy (#0F1F38, 24 KB) for iOS home screens. Removed the `metadata.icons` block and the 3 manual `<head>` `<link rel=icon/shortcut/apple-touch-icon>` tags from `app/layout.tsx` — Next.js now auto-generates the icon `<link>`s from the file convention (build confirms `/icon.png` and `/apple-icon.png` routes).
**Reason:** A small, square, single-source favicon; no duplicate/competing icon declarations; no 307 KB image as a favicon.
**Expected impact:** Correct, crisp favicon in tabs and on iOS; lighter head; less confusion for crawlers.
**Validation:** Both icons verified visually. `next build` emits `/icon.png` + `/apple-icon.png` routes. Preservation `metadata.__layout__` diff (icons removed) is intended — re-captured.
**Status:** Completed

### PL-5 — FloatingCallButton / Reamaze desktop overlap

**URL:** site-wide (floating call button)
**File:** `components/FloatingCallButton.tsx`
**Problem:** On desktop the button flipped to the bottom-right (`md:right-5 md:bottom-24`), the same corner as the Reamaze live-chat widget (locked to `position: 'bottom-right'`), risking overlap — especially when the chat notification label expands.
**Change:** Pinned the button to the bottom-LEFT at all breakpoints (`md:left-6 md:bottom-10`), matching the mobile placement that already worked. Only the wrapper positioning changed — the `tel:+17788380014` link and `data-call-location="floating_button"` tracking are untouched.
**Reason:** Guarantee separation from the bottom-right chat widget (chat position is fixed in its config); keep both controls tappable.
**Expected impact:** No overlap between the call button and chat on any viewport.
**Validation:** Preservation `tel` count unchanged (link intact); build/guard/audits PASS.
**Status:** Completed

### Polish milestone
All five items done. `npm run seo:all` exit 0 — guard 0 violations, `seo-check` 0 errors **and 0 warnings**, 34/34 quality pages, 0 dead links, 34/34 reachable, preservation byte-identical to the re-captured baseline. Owner-verification items in `VERIFICATION_REPORT.md` are unchanged (still pending): response time, founding year, fleet, customers, licensing, real reviews/rating, Google Ads conversion label.


---

## POLISH — Service-area city priority reorder (owner-directed)

**URL:** `/` (featured grid + local ItemList schema), `/locations` (grid + ItemList schema), site-wide footer, `sitemap.xml`
**File:** `lib/service-areas.ts`, `components/HomeContent.tsx`, `app/sitemap.ts`, `app/locations/page.tsx`
**Problem / request:** The owner specified a priority order for the 12 service-area cities (highest → lowest): **Cloverdale, Langley, Surrey, South Surrey, White Rock, Maple Ridge, Burnaby, Coquitlam, Aldergrove, Delta, Richmond, Vancouver.** The site listed cities in an unrelated order (Surrey-first data order), the homepage featured only 9 of 12 (omitting the #1, Cloverdale), and the `/locations` intro claimed "9 cities" while 12 were listed.
**Change:**
- `lib/service-areas.ts`: made ordering an explicit single source of truth. Renamed the raw data array to `serviceAreaData` (objects left in place) and added an `AREA_PRIORITY` slug list + `areaRank()`; the public `serviceAreas` is now `[...serviceAreaData].sort(by rank)` (unknown slugs sort last). Re-rank cities by editing `AREA_PRIORITY` only. Declared before the `serviceAreaSlugs`/`areaServedSchema` consumers so module-eval order is correct. This propagates order to the `/locations` grid, the footer "Service Areas" strip, and the home + `/locations` ItemList schema positions.
- `components/HomeContent.tsx`: rebuilt the homepage `featuredAreas` grid to show **all 12** cities in priority order (added Cloverdale, South Surrey, Aldergrove cards with subtitles drawn from their neighbourhoods), and reordered the "We cover …" prose to the same order. (`Surrey`-first brand focus in the home title/H1/hero was intentionally left unchanged.)
- `app/sitemap.ts`: location `priority` now derives from the ranked index — a gentle `0.90 → 0.70` gradient (was a flat `0.85`) — so the ranking is reflected in the one field literally named "priority."
- `app/locations/page.tsx`: corrected the intro copy "We serve 9 cities" → "12 communities" (12 are listed).
**Reason:** Reflect the owner's business priority everywhere cities are ordered, from a single maintainable list, and stop omitting the top-priority city from the homepage.
**Expected impact:** Higher-priority cities lead the homepage/locations listings and carry a stronger internal-linking + sitemap signal; the #1 city is now featured on the homepage; coverage copy is accurate.
**Validation:** `npm run seo:all` exit 0 — guard 0 violations, `seo-check` 0 errors / 0 warnings, 34/34 quality pages, 0 dead links, 34/34 reachable, **preservation byte-identical** (reorder is preservation-neutral: sitemap URLs are compared sorted, schema `@type` tokens and `tel:` counts unchanged — no baseline update needed). Built-HTML checks confirm the `/locations` grid, homepage featured grid (12 links), and `sitemap.xml` all render in the exact requested order (Cloverdale → Vancouver), sitemap priority 0.90 → 0.70.
**Status:** Completed


---

## POLISH — Facebook profile, clickable map location, hero/breadcrumb & blog spacing

**URL:** site-wide (footer + global schema), `/services` + all 8 `/services/*`, `/blog/*`
**File:** `components/Footer.tsx`, `app/layout.tsx`, `app/services/page.tsx`, all 8 `app/services/*/page.tsx`, `app/blog/[slug]/page.tsx`
**Request / problem:** Owner asked to (1) add the business Facebook page, (2) make the footer location text a clickable map link on every page, (3) fix the `/services` breadcrumb that was jammed/clipped under the navbar, and (4) fix "Back to Blog" running into the category badge ("Back to BlogTowing Advice") on blog posts.
**Change:**
- **Facebook** (`https://www.facebook.com/people/Towing-No-1/61592728132909/`): added a Facebook icon to the footer social row (alongside Instagram) and added the URL to the Organization `sameAs` in the global JSON-LD (`app/layout.tsx`) so search engines link the profile to the business entity.
- **Clickable location:** wrapped the footer "British Columbia, Canada / Serving the Lower Mainland" text in an `<a>` to Google Maps (`maps/search?api=1&query=Metro Vancouver, British Columbia, Canada`), `target=_blank rel=noopener`, with an aria-label. The footer renders on every page, so the map link is available site-wide.
- **Services breadcrumb clipping:** root cause was the fixed 76px navbar (`components/Navbar.tsx`) overlaying the hero — the `/services` hero (and all 8 service sub-page heroes) used `h-[380–420px] flex items-center` with **no top padding**, so the centered content's top row (the "Home / Services …" breadcrumb) sat under the navbar. Changed those heroes to `min-h-[…] … pt-24` so content always clears the navbar (mirrors the blog hero's top offset). The breadcrumb markup itself was already correct (`flex items-center gap-2`, one line — the "stacked" look was a copy artifact of the `<li>`s).
- **Blog back-link spacing:** the "Back to Blog" link was `inline-flex`, so the inline-block category badge butted right against it. Changed it to `flex w-fit` so the link takes its own line and the badge drops below it (Back to Blog → badge → date → title).
**Reason:** Complete the social/entity signals, give users a one-tap map from any page, and fix two real layout defects (breadcrumb under the navbar; back-link/badge collision).
**Expected impact:** Facebook discoverable + entity-linked; clickable service-area map site-wide; clean, un-clipped service hero breadcrumbs; correctly spaced blog header.
**Validation:** `npm run seo:all` exit 0 — guard 0 violations, `seo-check` 0 errors / 0 warnings, 34/34 quality pages, **0 dead/placeholder links** (new external Facebook + Maps links resolve), 34/34 reachable, preservation holds (the one intended diff — `schema.globalGraph.normalized` from the new `sameAs` — was re-captured; `tel:` counts, metadata, integrations, sitemap, contact flow all unchanged). Built-HTML checks confirm: Facebook in footer + `sameAs` (Instagram retained), Google Maps `<a>` wrapping the location text, `pt-24` on the `/services` and all 8 sub-page heroes, and `flex w-fit` on the blog back-link.
**Status:** Completed


---

## POLISH — Responsive hero spacing (root cause), Facebook config, clickable address (a11y)

**URL:** `/services` + all 8 `/services/*`, `/blog/*`, site-wide footer + global schema
**File:** `lib/business-facts.ts`, `app/layout.tsx`, `components/Footer.tsx`, `app/blog/[slug]/page.tsx`, `app/services/page.tsx`, all 8 `app/services/*/page.tsx`
**Problem (root cause):** The `Navbar` is `fixed h-[76px]` and **opaque** with no global content offset, so each hero improvised its own nav-clearance. My earlier `pt-24` on the service heroes stacked on top of their `flex items-center` centering → an **excessive gap** between the navbar and the breadcrumb/"WHAT WE OFFER". The blog article hero used `h-[50vh]` (viewport-relative) → a tall, mostly-empty dark band on mobile, and the "Back to Blog" link + category badge were stacked instead of on one aligned row.
**Change:**
- **Service heroes (9):** replaced the `min-h-[…] flex items-center (justify-center) … pt-24` pattern with a clean, consistent one — `section … pt-[76px]` (exactly the navbar height, single source of clearance, no double-compensation) + content `container-custom py-12 md:py-16` (balanced, responsive gap). Height is now content-driven, so the breadcrumb sits a consistent ~48px below the navbar and "WHAT WE OFFER" is no longer pushed down. Consistent across `/services` and all 8 sub-pages.
- **Blog article hero:** `h-[50vh] min-h-[360px]` → `min-h-[340px] md:min-h-[420px]` (removes the viewport-relative excess space); kept the image-with-title-at-bottom design (`flex items-end`, `pb-10 md:pb-14`). "Back to Blog" + category badge are now one vertically-centered row (`flex flex-wrap items-center gap-3 mb-4`, wraps on very narrow screens), with the date/byline a consistent `mb-3` below.
- **Central config (`lib/business-facts.ts`):** added `social` (Facebook + Instagram URLs via `fact(..,"verified")`) and `mapsQuery` + `mapsSearchUrl` (`encodeURIComponent`) so social/map URLs live in ONE editable place. `app/layout.tsx` `sameAs` and the `Footer` icons/address now consume the config instead of scattered literals (rendered values unchanged).
- **Footer a11y/UX:** Facebook icon matches the existing icon style/hover/sizing; both social links open in a new tab (`target=_blank rel="noopener noreferrer"`) with `aria-label="… (opens in a new tab)"` and a `focus-visible` ring. The address ("British Columbia, Canada / Serving the Lower Mainland" — text unchanged) is a semantic `<a>` to Google Maps with hover + `focus-visible` states and an accessible label.
**Reason:** Fix the spacing at its source (navbar offset + duplicated compensation) using the existing responsive class system rather than ad-hoc margins; centralize config; meet accessibility requirements.
**Expected impact:** Balanced, intentional hero spacing on services + blog across 320–430px and desktop; no navbar overlap or excessive gaps; Facebook discoverable + entity-linked; one-tap map from any page.
**Validation:** `npm run seo:all` exit 0 — guard 0, `seo-check` 0 errors/0 warnings, 34/34 quality pages, 0 dead links (Facebook + Maps resolve), 34/34 reachable, preservation holds (one intended `schema.globalGraph.normalized` diff from the `sameAs` config refactor — rendered values identical — re-captured). Built-HTML checks confirm: service heroes use `pt-[76px]` + `py-12 md:py-16` (no leftover `pt-24`/`min-h`), blog hero `min-h-[340px] md:min-h-[420px]` (no `h-[50vh]`) with the one-row header, footer Facebook+Instagram from config, `sameAs` retains both, and the maps address link.
**Status:** Completed


---

## POLISH — Add /llms.txt (GEO/AEO) + drop an unverified claim it surfaced

**URL:** `/llms.txt` (new); `/locations` + `/locations/surrey` (Surrey summary prose)
**File:** `app/llms.txt/route.ts` (new), `lib/service-areas.ts`
**Request:** "llms.txt not found so add."
**Change:**
- Added `app/llms.txt/route.ts` — a `force-static` route handler that serves `/llms.txt` (the [llmstxt.org](https://llmstxt.org) convention: an LLM-friendly, structured site summary). It is generated from the existing data (services list, `serviceAreas`, `blogPosts`, and verified `contact`/`geo`/`social` facts), so it stays in sync automatically — same pattern as `app/sitemap.ts` / `app/robots.ts`. Format: H1 + summary blockquote, then `## Services`, `## Service areas` (in the owner's priority order), `## Guides & articles`, `## Company`, and `## Contact` link lists. Title uses a plain ASCII hyphen and the file is served `text/plain; charset=utf-8`.
- Kept it claim-clean: only VERIFIED facts (24/7, phone, email, region, services, areas, blog). While wiring it up I found the **Surrey** area `summary` still asserted "average response time under 15 minutes" (an unverified response-time claim) — which was flowing into `/llms.txt`. Removed it (→ "with fast, local dispatch."), which also cleans the visible `/locations` Surrey card and `/locations/surrey`. Consistent with keeping unverified response-time figures out of machine-readable surfaces.
- Did NOT list `/llms.txt` in the sitemap/robots (it's a root convention file like robots.txt, not an indexable page) — avoids preservation churn.
**Reason:** Give AI/answer engines a clean, curated map of the site (GEO/AEO); avoid asserting an unverified metric to those systems.
**Expected impact:** LLM/answer-engine crawlers get an accurate, link-rich overview (services, priority-ordered areas, guides, contact) without any unverified claim.
**Validation:** `npm run seo:all` exit 0 — build emits `/llms.txt` (static), guard 0, `seo-check` 0 errors/0 warnings, 34/34 quality pages, 0 dead links, 34/34 reachable, preservation byte-identical (the new route + prose edit touch no tracked surface — no baseline update needed). Verified the served `/llms.txt` body: valid H1 + blockquote structure, all 8 services, 12 areas (Cloverdale first), 6 guides, contact block, and **no** "under 15 min".
**Status:** Completed
