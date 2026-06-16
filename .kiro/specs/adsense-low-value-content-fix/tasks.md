# Implementation Plan

## Overview

This plan fixes the Google AdSense "Low Value Content" rejection of `towingno1.com` using the bug-condition methodology. It first measures the UNFIXED site to capture concrete counterexamples (task 1) and captures a preservation baseline (task 2), then implements the five design workstreams (content depth/originality, complete policy pages, env-configurable verification code, link integrity, navigation reachability) before re-running Fix Checking and Preservation Checking validation. Validation uses lightweight Node scripts (`content-audit.mjs`, `link-check.mjs`, `nav-reachability.mjs`) mirroring `scripts/seo-check.mjs`, plus `next build` / `next lint`.

## Tasks

- [x] 1. Write bug-condition exploration audit (measure the UNFIXED site)
  - **Property 1: Bug Condition** - Reviewable Surfaces Fail AdSense Value Criteria
  - **CRITICAL**: This audit MUST report FAILURES on the unfixed code - those failures confirm the bug exists and refute/confirm the root-cause hypotheses in the design
  - **DO NOT implement any fix while writing or running this audit** - the goal here is only to capture concrete counterexamples
  - **NOTE**: These same scripts encode the expected behavior thresholds - they will validate the fix when they pass after implementation
  - **GOAL**: Surface counterexamples that demonstrate `isBugCondition(X)` holds across content pages, policy pages, the document head, links, and navigation
  - **Scoped PBT Approach**: The bug is deterministic per surface; scope each property to the concrete content routes enumerated from `app/**`, `lib/blog-posts.ts`, and `lib/service-areas.ts` so every failing surface is reproducible
  - Create `scripts/content-audit.mjs` (mirror `scripts/seo-check.mjs` style: ESM, `fs`/`path`, CSV/console report). For each content route (`/`, `/services`, each `/services/[service]`, `/locations`, each `/locations/[city]`, `/blog`, each `/blog/[slug]`, `/about`, `/contact`) compute visible word count, detect near-duplicate paragraphs across service/location pages, and list every page under 500 words and the quality-page count (pages ≥ 500 words)
  - Create `scripts/link-check.mjs` to extract every internal `href`/`<Link>` target and outbound URL from `app/**`, `components/**`, `lib/**`, resolve internal targets against real routes (including dynamic `[slug]`/`[city]` params from the data modules), and flag dead routes and placeholder `href="#"` links
  - Create `scripts/nav-reachability.mjs` to confirm every content route is reachable from `Navbar` (desktop + mobile), `Footer`, or a reachable index page; list any orphaned route
  - Grep `app/layout.tsx` for the placeholder `REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` and assert it is absent; confirm the AdSense snippet (`ca-pub-2962382436663193`) is present in `<head>`
  - Add `audit:content`, `audit:links`, `audit:nav` scripts to `package.json` mirroring the existing `seo:check` entry
  - Run all audits on UNFIXED code
  - **EXPECTED OUTCOME**: Audits FAIL - service detail pages and card-only index pages flagged under 500 words, templated/duplicate copy flagged, `/privacy` and `/terms` flagged thin, placeholder verification code present, quality-page count under 15, plus any broken/orphaned link
  - Document counterexamples found (e.g., "`/services/battery-boost` = 210 words < 500", "`<head>` advertises REPLACE_WITH_... placeholder", "quality pages = 9 < 15") to confirm root-cause hypotheses 1–5 in the design
  - Mark task complete when scripts are written, run, and the failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [x] 2. Write preservation baseline checks (BEFORE implementing the fix)
  - **Property 2: Preservation** - Non-Buggy Behavior Unchanged
  - **IMPORTANT**: Follow the observation-first methodology - capture the UNFIXED site's behavior first, then assert it is preserved after the fix
  - Observe and snapshot preservation-relevant outputs on UNFIXED code: the full route list with HTTP status (all 200, no 404s), every rendered `tel:+17788380014` href and the GA `call_dialog_open` tracking in `HomeContent.tsx`, per-page emitted `metadata` (title/description/canonical/OG/Twitter), the global JSON-LD `@graph` and per-page `Service`/`FAQPage`/`BreadcrumbList` schema, `app/sitemap.ts` and `app/robots.ts` output, and the presence of GTM (`GTM-5G2X36L7`), GA (`G-30WWS5SMCS`), AdSense (`ca-pub-2962382436663193`), and Reamaze chat tags
  - Write a property-based preservation snapshot: _for all_ routes where `NOT isBugCondition`, emitted metadata/schema/sitemap/robots and `tel:` hrefs must be byte-identical before vs after (store the baseline snapshot for comparison in task 3.3)
  - Capture the contact flow baseline: `components/ContactContent.tsx` → `POST /api/send-email` behaves identically (no logic change expected)
  - Run `next build` and `next lint` on UNFIXED code to record the passing baseline
  - **EXPECTED OUTCOME**: All preservation checks PASS on unfixed code (this is the baseline to preserve)
  - Mark task complete when the baseline snapshot is captured and passing
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Fix for AdSense "Low Value Content" rejection

  - [x] 3.1 Workstream 1 — Content depth & originality
    - Expand each `app/services/*/page.tsx` (8 pages) to 500–1000+ words of original, service-specific prose using `battery-boost/page.tsx` structure (intro → "What's Included" → topic-specific guidance → FAQ → CTA sidebar); ensure each body is unique to its service (e.g., winching → ditch/mud/snow recovery; lockout → key-fob/transponder cases)
    - Enrich each `allServices[]` entry's `paras` in `components/ServicesContent.tsx` with longer distinct copy and add an intro/overview section; keep the layout grid and CTA unchanged
    - Add per-area long-form fields (e.g., `intro`, `whyChooseUs`, `commonScenarios`) to `lib/service-areas.ts` and render them in `app/locations/[city]/page.tsx` so each city reaches 500+ words; preserve `slug`, `getServiceAreaBySlug`, and existing FAQ/summary usage
    - Add substantive prose sections to `components/HomeContent.tsx`, `app/locations/page.tsx`, and `app/blog/page.tsx` where currently card-only; keep all existing sections and CTAs
    - Preserve existing long-form blog posts in `lib/blog-posts.ts` unchanged (optionally add posts to raise quality-page count, additive only)
    - Keep all existing `metadata` and `Service`/`FAQPage`/`BreadcrumbList` schema blocks untouched
    - _Bug_Condition: isBugCondition(X) where isContentPage(X) AND (wordCount(X) < 500 OR NOT isOriginalUsefulContent(X))_
    - _Expected_Behavior: meetsAdSenseValueCriteria(result) — each content page ≥ 500 words of original, topic-specific, non-duplicated text_
    - _Preservation: Preservation Requirements — existing metadata, schema, CTAs, layout, dialing unchanged_
    - _Requirements: 2.1, 2.2_

  - [x] 3.2 Workstream 2 — Policy & informational pages
    - Expand `app/privacy/page.tsx` and `app/terms/page.tsx` to complete, substantive policies (data collection, cookies/analytics disclosure consistent with GTM/GA/AdSense, user rights, payment/cancellation terms, liability, governing law — BC); keep existing `metadata` and layout shell
    - Confirm `app/about/page.tsx` (`components/AboutContent.tsx`) and `app/contact/page.tsx` (`components/ContactContent.tsx`) are substantive; extend About with company/story/credentials prose if under target without altering the contact form logic
    - Confirm all four policy pages are linked from `Footer` and reachable
    - _Bug_Condition: isBugCondition(X) where isPolicyPage(X) AND (isMissing(X) OR isThin(X))_
    - _Expected_Behavior: required policy pages present, substantive, and reachable from navigation_
    - _Preservation: contact form logic and policy-page metadata/layout unchanged_
    - _Requirements: 2.3_

  - [x] 3.3 Workstream 3 — Verification & head integrity
    - In `app/layout.tsx`, replace the placeholder with an env-configurable value: `verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "" }`, omitting the meta entirely when unset so no placeholder is ever emitted
    - Document `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in `.env.local` / deployment env
    - Confirm the AdSense `<script>` (`ca-pub-2962382436663193`) remains in the root layout `<head>` and applies site-wide
    - _Bug_Condition: isBugCondition(X) where isDocumentHead(X) AND (verificationCode(X) = PLACEHOLDER OR NOT containsAdSenseSnippet(X))_
    - _Expected_Behavior: `<head>` carries a valid (non-placeholder) verification code and the AdSense snippet on every route_
    - _Preservation: GTM/GA/AdSense/Reamaze integrations still initialize without error_
    - _Requirements: 2.4_

  - [x] 3.4 Workstream 4 — Link integrity
    - Using the `scripts/link-check.mjs` findings from task 1, fix any dead internal targets (e.g., a `Link` to a non-existent service/location slug) and resolve placeholder social `href="#"` in `Footer` if flagged
    - Verify outbound links are well-formed and non-placeholder
    - _Bug_Condition: isBugCondition(X) where isLink(X) AND NOT resolves(X)_
    - _Expected_Behavior: every internal and outbound link resolves successfully_
    - _Preservation: existing valid routes and links unchanged_
    - _Requirements: 2.5_

  - [x] 3.5 Workstream 5 — Navigation reachability
    - Using the `scripts/nav-reachability.mjs` findings from task 1, ensure every content route is reachable: services index → all 8 service pages, locations index → all 9 cities, blog index → all posts; add any missing links to `Navbar`/`Footer`/index without restructuring the menus
    - _Bug_Condition: isBugCondition(X) where isContentPage(X) AND NOT reachableFromNav(X)_
    - _Expected_Behavior: every content page reachable from clear desktop and mobile navigation; total quality pages ≥ 15_
    - _Preservation: Navbar dropdown + mobile drawer and Footer structure render unchanged_
    - _Requirements: 2.6, 2.7_

  - [x] 3.6 Fix Checking — verify the bug-condition audit now passes
    - **Property 1: Expected Behavior** - Reviewable Surfaces Meet AdSense Value Criteria
    - **IMPORTANT**: Re-run the SAME scripts from task 1 (`content-audit.mjs`, `link-check.mjs`, `nav-reachability.mjs`, verification-code grep) - do NOT write new scripts
    - These scripts encode the expected behavior; when they pass they confirm `meetsAdSenseValueCriteria` for every surface that previously triggered the bug
    - **EXPECTED OUTCOME**: All previously-flagged surfaces PASS - zero pages under 500 words, no cross-page duplication above threshold, policy pages substantive, no placeholder code + AdSense snippet present, all links resolve, all pages reachable, quality-page count ≥ 15
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 3.7 Preservation Checking — verify baseline behavior still holds
    - **Property 2: Preservation** - Non-Buggy Behavior Unchanged
    - **IMPORTANT**: Re-run the SAME preservation checks from task 2 against the FIXED site and compare to the captured baseline - do NOT write new checks
    - Assert for all routes where `NOT isBugCondition`: route list/status unchanged (no new 404s), `tel:+17788380014` hrefs and GA `call_dialog_open` tracking unchanged, per-page metadata + global `@graph` + `Service`/`FAQPage`/`BreadcrumbList` schema + `sitemap.ts`/`robots.ts` output byte-identical, GTM/GA/AdSense/Reamaze tags present, contact `POST /api/send-email` behavior identical, Navbar/Footer/FloatingCallButton render unchanged across breakpoints
    - **EXPECTED OUTCOME**: All preservation checks PASS (no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 4. Checkpoint — Ensure all tests and builds pass
  - Run `next build` (completes with no errors, statically generates all routes — proves no route regressed and `<head>` injection works site-wide)
  - Run `next lint` (passes)
  - Run `npm run seo:check` (existing `scripts/seo-check.mjs` reports zero critical SEO errors after content/policy edits)
  - Confirm `audit:content`, `audit:links`, and `audit:nav` all pass and the preservation snapshot matches
  - Manual smoke pass: load home, one service, one location, one blog post, and all four policy pages on desktop and mobile; confirm dialing, chat widget, and contact form all work
  - Ensure all tests pass; ask the user if questions arise
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1", "2"], "dependsOn": [] },
    { "wave": 2, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5"], "dependsOn": ["1", "2"] },
    { "wave": 3, "tasks": ["3.6", "3.7"], "dependsOn": ["3.1", "3.2", "3.3", "3.4", "3.5"] },
    { "wave": 4, "tasks": ["4"], "dependsOn": ["3.6", "3.7"] }
  ]
}
```

- Tasks 1 and 2 are independent and run first against the unfixed code.
- Tasks 3.1–3.5 depend on tasks 1 and 2; 3.4 and 3.5 additionally consume the audit output captured in task 1.
- Tasks 3.6 and 3.7 depend on all of 3.1–3.5 being complete.
- Task 4 depends on 3.6 and 3.7.

## Notes

- Tasks 1 and 2 MUST run on the UNFIXED code: task 1 is expected to FAIL (confirming the bug), task 2 is expected to PASS (establishing the baseline to preserve).
- The scripts written in task 1 are reused unchanged in task 3.6; the baseline captured in task 2 is reused unchanged in task 3.7. Do not author new tests for verification.
- No automated test framework is installed; validation relies on the Node audit scripts plus `next build` / `next lint`, consistent with the existing `scripts/seo-check.mjs` approach.
- All content edits are additive — expand existing data modules (`lib/blog-posts.ts`, `lib/service-areas.ts`) and components rather than rewriting them, so structured data and interactive behavior remain intact.
- Long-running commands (`next dev`, watch modes) should be run manually by the user; use `next build` and `next lint` for one-shot verification.
