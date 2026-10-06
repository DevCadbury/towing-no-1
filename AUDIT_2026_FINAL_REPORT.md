# AUDIT_2026_FINAL_REPORT.md — TowingNo.1 (Round 2 Update)

**Project:** `F:\town` · **Live site:** https://www.towingno1.com/  
**Stack:** Next.js 16.1.6 (App Router, Turbopack) · React 19 · Tailwind · Vercel  
**Audit date:** 2026-10-05 · **Round:** Multi-agent War Room (independent + adversarial)

> No rankings, indexing, AI citations, traffic, or Domain Authority changes are guaranteed.  
> All findings are verified from the codebase or live site. No competitor names are used publicly.

---

## EXECUTIVE VERDICT

TowingNo.1 is a structurally mature local-service site with a disciplined SEO foundation. Two rounds of auditing have cleared every verifiable P0 and P1 issue. **The live site is currently running Round-1 fixes only** — Round-2 fixes (13 additional changes) are staged in `F:\town` and require a Vercel deploy to go live. After deploy, the site will be in the strongest technical SEO state it has ever been.

**What was wrong in the old report:** It missed 10 real issues — most notably a live "15-minute arrival time" claim on the contact page, brand-name inconsistency on the Surrey location page, a 90KB double-loaded gtag.js script, `priceRange: "$$"` in schema without published pricing, deprecated SpeakableSpecification blocks, a hidden EmbedSocial attribution link, and newer AI crawlers (Google-Extended, OAI-SearchBot, etc.) missing from robots.txt.

**What was confirmed correct:** The about-page schema fix, blog image restoration, claim-drift removal, near-duplicate FAQ dedup, the guard-passing status, and the local/AI SEO architecture were all independently verified by the specialist agents.

---

## CURRENT BASELINE (post Round 2, pre-deploy)

| Check | Status |
|---|---|
| `npm run build` | **PASS** — 53 static pages, exit 0 |
| `seo:guard` (claims/anti-drift) | **PASS** — 0 violations |
| `seo:check` | **PASS** — 0 errors, 0 warnings |
| `audit:links` | **PASS** — 0 dead links |
| `audit:nav` | **PASS** — 42/42 reachable |
| `content-audit` | 42/42 quality pages; 62 residual boilerplate pairs (documented) |
| Live site claim residue | "under 15 min"/"60 Sec" still live — deploy clears them |

---

## WHAT WAS WRONG (Round 2 new findings)

| ID | Severity | Issue | File | Status |
|---|---|---|---|---|
| F-01 | P1 | "under 60 seconds" ×2 live on /locations/surrey | `SurreyPage.tsx:321,364` | ✅ Fixed |
| F-02 | P1 | "15-minute arrival time" live on /contact FAQ | `ContactContent.tsx:79` | ✅ Fixed |
| F-03 | P1 | Duplicate `gtag.js` double-load (~90KB per page) | `layout.tsx:414-435` | ✅ Fixed |
| F-04 | P1 | `priceRange: "$$"` in LocalBusiness schema, no published pricing | `layout.tsx:194` | ✅ Fixed |
| F-05 | P1 | Brand variant "Towing No.1" (space) on /locations/surrey | `SurreyPage.tsx:312,362` | ✅ Fixed |
| F-06 | P1 | Brand variant "Towing No. 1" in Reamaze chat | `layout.tsx:480` | ✅ Fixed |
| F-07 | P1 | BlogPosting author/publisher not linked to `#organization` @id | `blog/[slug]/page.tsx:247-259` | ✅ Fixed |
| F-08 | P1 | Newer AI crawlers missing (Google-Extended, OAI-SearchBot, etc.) | `app/robots.ts:12-17` | ✅ Fixed |
| F-09 | P2 | Homepage 30-term `keywords` meta (dead weight + stuffing signal) | `app/page.tsx:11-52` | ✅ Fixed |
| F-10 | P2 | Deprecated SpeakableSpecification in homepage + blog schema | `page.tsx:138-148`; `blog/[slug]/page.tsx:264` | ✅ Fixed |
| F-11 | P2 | Malformed `host: "https://..."` in robots.ts | `app/robots.ts:26` | ✅ Fixed |
| F-12 | P2 | `llms.txt` lists 8 services; site has 9 (roadside-assistance missing) | `app/llms.txt/route.ts:20-31` | ✅ Fixed |
| F-13 | P2 | Hidden EmbedSocial attribution CSS (likely violates free-tier ToS) | `app/globals.css:297-305` | ✅ Fixed |

---

## WHAT WAS CONFIRMED CORRECT (independently verified)

- ✅ `/about` duplicate Organization schema — removed, 0 guard violations
- ✅ All 13 blog cover images present and correctly named
- ✅ No `aggregateRating`, `Review`, `PriceSpecification`, `since 2010`, `top-rated` in emitted output
- ✅ `.env.local` gitignored, no committed secrets
- ✅ 42-URL sitemap with canonical `www`, all unique, valid lastmod
- ✅ Non-www → www 301 redirect working live
- ✅ Homepage title/description/canonical/H1/JSON-LD correct on live site
- ✅ LocalBusiness/Organization schema consistent across all Service pages (@id references)
- ✅ All 42 routes reachable; 0 orphan pages; 0 dead internal links
- ✅ NAP consistent (phone, email) sitewide
- ✅ No fabricated street address
- ✅ `/llms.txt` live and restricted to verified facts
- ✅ 12 location pages have genuinely unique intro/scenarios content

---

## WHAT THE AGENTS DISAGREED ABOUT

1. **Roadside-assistance cannibalization** — On-Page Agent flagged `/services/roadside-assistance` as a pure aggregator duplicating child pages. Red Team argued it may rank for distinct "roadside assistance Surrey" intent. **Resolution: deferred.** GSC query data required before any consolidation.

2. **"15-minute" claim in HomeContent** — Red Team noted the "Stranded? We Dispatch Now — 24/7" fix in Round 1 did soften the H2, but Technical SEO agent confirmed "under 15 minutes" text was still live in the homepage HTML at audit time. **Resolution: confirmed live at audit; fix was staged in Round 1 but not deployed.**

3. **Generated blog covers** — Red Team partially challenged them (text-on-navy covers are lower quality than real photography). **Resolution: functional fix, not a spam signal. Owner should commission real photography when budget allows.**

---

## WHAT WAS MISSED BY THE PRIOR AUDIT

1. `ContactContent.tsx:79` — live "15-minute arrival time" on /contact (most consequential missed item)
2. `layout.tsx:414-435` — double gtag.js load (90KB waste per page)
3. `SurreyPage.tsx` — "under 60 seconds" and brand-name variants
4. `layout.tsx:194` — `priceRange: "$$"` in LocalBusiness schema
5. `blog/[slug]/page.tsx:247-259` — inline author/publisher (no @id link)
6. `page.tsx:138-148` + blog — deprecated SpeakableSpecification
7. `app/robots.ts` — 7 newer AI crawlers missing; malformed `host:` scheme
8. `app/globals.css:297-305` — hidden EmbedSocial link
9. `app/page.tsx:11-52` — 30-term stuffed keywords meta

---

## WHAT WAS IMPLEMENTED (Round 2)

13 changes across 8 files. Full detail in `SEO_IMPLEMENTATION_LOG_2026.md`.

---

## WHAT WAS REJECTED (with reasons)

| Item | Reason |
|---|---|
| `/services/roadside-assistance` consolidation | Needs GSC data first |
| Surrey/Langley FAQ schema↔component drift fix | High regression risk; deferred to planned sprint |
| Dead component removal | Low urgency; cleanup PR |
| AdSense removal | Business decision |
| `middleware.ts` deprecation fix | Functional; deferred |
| Content-Security-Policy header | Complex crafting required |
| Blog publish date fix | Owner must supply real dates |

---

## WHAT REMAINS

See `SEO_ROADMAP_NEXT_90_DAYS.md` for the full prioritised roadmap.

**Most important remaining items (owner-action required):**
1. **Deploy Round-2 fixes** to Vercel
2. **Add GSC verification token** (currently empty)
3. **Provide real blog publish dates**
4. **Confirm founding year / response time / licence # / fleet** (to flip `business-facts.ts` statuses)
5. **Rotate Resend API key**; remove unused Azure/SMTP credentials from `.env.local`

---

## BACKLINK STATUS

No Semrush or GSC access was available (both require manual login). Backlink totals, referring-domain counts, and authority metrics are therefore not asserted. The `BACKLINK_DATABASE.csv` has been expanded with new fields and additional prospects. The primary near-term backlink actions are: join the three local chambers of commerce (Surrey Board of Trade, Langley Chamber, South Surrey & White Rock Board of Trade), apply for BBB Mainland BC accreditation, and pitch the EV-towing and winter-safety articles to Surrey/Langley local media before winter season.

---

## AI SEO / GEO STATUS

Strong. `/llms.txt` live and accurate (now includes roadside-assistance). AI crawlers allowed (7 new ones added). Entity graph: single `#organization` + `#localbusiness` @id, consistently referenced. BlogPosting now links to canonical entity. SpeakableSpecification removed (deprecated). The site clearly answers WHO/WHAT/WHERE/WHEN/WHY/HOW on homepage, services hub, and location pages.

**One open item:** Surrey/Langley FAQPage schema answers have drifted from the visible FAQ rendered by the hardcoded components — a guideline violation. Scheduled for the Week 2–4 sprint.

---

## LOCAL SEO STATUS

NAP consistent (phone + email). No fabricated address. All 12 location pages have unique local content. Brand-name variants ("Towing No.1" / "Towing No. 1") now corrected across all user-facing surfaces. 12 location pages in footer (all reachable). Google Maps deep-link present in footer. Google Business Profile alignment pending owner verification.

---

## TECHNICAL SEO STATUS

All critical issues resolved. Robots.txt now covers all major AI crawlers. Sitemap: 42 URLs, canonical, valid. Redirects: www enforced in three layers (harmless redundancy). Security headers: complete in vercel.json. Remaining P2 items: `middleware.ts` deprecation (functional), `sitemap.ts` lastmod = build time (cosmetic), redundant redirect layers.

---

## PERFORMANCE STATUS

**Biggest win this round:** removed the duplicate gtag.js load (~90KB per page). Remaining performance concerns: AdSense loaded globally (business decision), oversized PNG source files for service cards, logo.png 307KB. No field CWV data available without RUM/PSI access — recommend running PageSpeed Insights on the live site post-deploy.

---

## BEFORE / AFTER SCORECARD (combined Round 1 + Round 2)

See `SEO_SCORECARD_2026.md` for the full issue-level table.

| Metric | Before Round 1 | After Round 1 | After Round 2 |
|---|---|---|---|
| `seo:guard` violations | 63 | **0** | **0** |
| `seo:check` errors/warnings | 0/23 | 0/0 | **0/0** |
| Broken blog images | 7 | 0 | 0 |
| Unverified claims in schema | 2 | 0 | **0** |
| Near-duplicate FAQ pairs | 93 | 62 | **62** (residual boilerplate) |
| "under 15 min" / "60 sec" claims live | Multiple pages | Homepage only | **Deploy clears all** |
| gtag.js loads per page | 2 | 2 | **1** |
| AI crawlers in robots.txt | 6 | 6 | **13** |
| BlogPosting @id-linked to entity | No | No | **Yes** |
| `priceRange` in schema | Yes | Yes | **No** |
| Hidden EmbedSocial link | Yes | Yes | **No** |
| Stuffed `keywords` meta (homepage) | Yes | Yes | **No** |
| Brand variants in UI | 2 locations | 2 locations | **0** |

---

*Full change history: `SEO_IMPLEMENTATION_LOG_2026.md`. Multi-agent debate: `MULTIAGENT_DEBATE_2026.md`. Post-implementation verification: `SEO_VERIFICATION_2026.md`. 90-day roadmap: `SEO_ROADMAP_NEXT_90_DAYS.md`.*
