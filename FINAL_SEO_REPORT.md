# TowingNo.1 — Unified SEO / AEO / GEO / SXO Report

Engagement: technical + trust + local + answer/generative + search-experience
optimization of the Next.js 16 site at `f:\town` (https://www.towingno1.com).
Companion docs: `SEO_BASELINE.md`, `SEO_CHANGE_LOG.md` (per-change detail),
`VERIFICATION_REPORT.md`, `PERFORMANCE_NOTES.md`, `BLOG_CONTENT_PLAN.md`,
`AUTHORITY_PLAN.md`, `EXTERNAL_SEO_CHECKLIST.md`, `SEO_ITERATION_PLAYBOOK.md`.

Verification method: `npm run seo:all` (build + anti-drift guard + 5 audit
scripts). Final state: **all green** — guard 0 violations, 0 SEO errors,
34/34 routes reachable, 0 dead links, 0 thin/duplicate pages, preservation holds.

## A. Executive summary

The site was already mature; the work prioritized correctness and trust, then
tightened technical SEO/schema, added measurement, and deepened entity/content
signals — without fabricating any business fact and without breaking routing,
forms, phone tracking, chat, or analytics.

Headline outcomes:
- Removed all fabricated/unverifiable trust markup (4 fake reviews, `aggregateRating` 4.9/127, dead "Verified Customer" testimonials array) and fixed the `<0 min` / `<0+` render bug that shipped to crawlers.
- Introduced `lib/business-facts.ts` (single source of truth with `verified/unverified/pending` statuses) + a build guard (`claims-check.mjs`) that permanently blocks unverified claims from re-entering schema and blocks broken render placeholders.
- Hardened an unauthenticated mail endpoint (security).
- Unified FAQ (home + 8 services + 12 locations) so visible === schema, with no unverified figures in structured data.
- Wired real conversion tracking (call + lead) and complete internal-link/nav parity.

## B. Technical SEO — before → after
- **Render integrity:** `<0 min`/`<0+` (home) and `0+`/`0/7` (about) in prerendered HTML → SSR-correct stats; unverified numbers show neutral placeholders, never 0/`<0`/NaN.
- **Security:** `/api/test-email` sent real mail with no auth → disabled by default (404), secret-gated, constant-time compare; `/api/send-email` unchanged.
- **Guardrails:** none → `npm run seo:all` (build + guard + 5 audits) one-command health check; preservation baseline protects routes/tracking/contact flow.
- **Crawl/index:** already solid (dynamic sitemap/robots, canonicals, redirects) — preserved; 34/34 routes reachable, 0 dead links.

## C. Local SEO — before → after
- Footer linked 0 location pages → a "Service Areas" strip links all **12** city pages from every page.
- Global LocalBusiness `areaServed` 10 cities (missing 3 that have pages) → all 12 served cities.
- Contact card omitted Surrey (primary market) → Surrey-first full coverage list.
- NAP verified consistent site-wide (phone/email/name). Service-area business modeled correctly (no invented street address). GBP + citation plan documented (`AUTHORITY_PLAN.md`).

## D. Content — before → after
- Blog body renderer shipped empty CTA boxes + literal `**` + loose `<li>` → proper block/inline renderer (populated CTA, bold inline, real `<ul>`, H3, XSS-safe).
- No taxonomy → `category` clusters + badges; documented cluster map + quality-first backlog (`BLOG_CONTENT_PLAN.md`).
- All 34 content routes remain ≥ 500 words with 0 near-duplicate prose.

## E. AEO — before → after
- FAQ existed but drifted from schema and carried unverified figures → single-source FAQ (visible === schema) on home + 8 services + 12 locations; answers self-contained; FAQPage added to the 4 service pages that lacked it; homepage speakable selectors (`#hero-summary`, `#faq-section`) resolve.

## F. GEO — before → after
- Entity clarity centralized (`business-facts` + consistent schema): brand→service→geography→contact. Safety-critical pages now cite authoritative sources (ICBC, DriveBC, gov.bc.ca winter driving). No unverified figures in machine-readable fields.

## G. SXO — before → after
- One call event (misnamed, homepage-only) → GA4 `call_click` on **every** `tel:` link (global listener + per-CTA labels) and `generate_lead` on form success; Google Ads conversion ready (fires once the label is provided). Phone-first CTAs preserved; contact form intact.

## H. Schema — before → after
- Removed: fake `Review` ×4, `aggregateRating`, `foundingDate`, "licensed and insured" from JSON-LD; response-time figures from all FAQ/Service schema.
- Normalized: service `areaServed` (consistent 12-city list); services-hub `areaServed` string → structured; blog `Article` → `BlogPosting` with distinct, future-safe `datePublished`/`dateModified`.
- Added: FAQPage on all 8 service pages; per-page OG image + Twitter card on all 8. Validate post-deploy with Rich Results Test (schema does not guarantee a SERP feature).

## I. Performance — before → after
- Deleted an orphaned 1.8 MB `/.png`. Confirmed next/image (AVIF/WebP + responsive + LCP `priority`), next/font self-hosted (no CLS), no raw `<img>`, non-blocking third-party scripts. Recommendations + AdSense-vs-conversion tradeoff in `PERFORMANCE_NOTES.md`. Field LCP/INP/CLS to be measured via PSI/CrUX (external checklist).

## J. Internal linking — before → after
- Footer services 6→8; added all-12 location strip; every service page has an "Other Services" block (vehicle-transport was missing it); blog related links now topic-matched + relevance-ranked (were static/array-order). 153 internal links, 0 dead, 0 orphans.

## K. Service pages — changes by URL
All 8 (`/services/{emergency-towing, battery-boost, flat-tire-help, lockout-service, fuel-delivery, vehicle-transport, winching-extraction, accident-recovery}`): single-source FAQ + FAQPage schema; consistent `areaServed`; per-page OG image + Twitter; response-time figures removed from schema. emergency-towing + battery-boost also lost "licensed and insured" from schema descriptions. vehicle-transport gained "Other Services". accident-recovery + winching-extraction gained authoritative citations.

## L. Location pages — changes by URL
All 12 `/locations/*`: FAQ answers cleaned of unverified response-time figures (schema); linked from the new footer strip; audited as unique + substantial (no doorway pages). 12-city architecture preserved.

## M. Blog / content
6 posts: `BlogPosting` schema, byline, future-safe dates, `updatedDate` support, category taxonomy; renderer fixed; contextual internal links. Backlog + freshness policy in `BLOG_CONTENT_PLAN.md`.

## N. Backlink / authority
See `AUTHORITY_PLAN.md` — GBP-first, NAP citations, genuine local relationships, content-earned links; explicit avoid-list. Backlink data to be pulled from a real tool (external checklist).

## O. Analytics / conversion
GA4 `call_click` (labeled by location) + `generate_lead`; Google Ads conversion gated on the pending label; GTM/GA4/Ads/AdSense/Reamaze/EmbedSocial preserved.

## P. Remaining issues / owner inputs (verification-pending)
Kept OUT of schema until confirmed (placeholders/marketing copy shown meanwhile) — see `VERIFICATION_REPORT.md`:
- Response time, years in business / founding year, fleet size, customers served, licensing/insurance.
- Real blog publish dates; Google reviews/rating (before any review markup); Google Ads conversion label.
- Minor polish items (title/description lengths, non-functional blog newsletter form, oversized `blog/when-to-call-tow.jpg`, favicon, desktop floating-button/chat overlap) were all resolved in the post-engagement polish pass — see the POLISH section of `SEO_CHANGE_LOG.md`. `seo-check` is now 0 errors / **0 warnings**.

## Q. Recommended next actions
- **P0/P1 (owner):** provide the verification-pending values → set them in `lib/business-facts.ts`; add the Google Ads conversion label; set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; keep `TEST_EMAIL_SECRET` unset in prod.
- **P1:** run the external validation set (Rich Results Test, PSI/CrUX, GSC) per `EXTERNAL_SEO_CHECKLIST.md`.
- **P2:** execute the blog backlog + GBP/citation plan.
- **P3:** run `npm run seo:all` each deploy; follow `SEO_ITERATION_PLAYBOOK.md` cadence.
