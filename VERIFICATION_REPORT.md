# Verification Report — TowingNo.1 business claims

Every unsupported business claim on the site, flagged for the owner to verify.
Values are **not** changed to "look better" — they are centralized in
`lib/business-facts.ts` and only flipped to `verified` (with a source) once you
provide an authoritative source. The `scripts/claims-check.mjs` guard fails the
build if any `unverified`/`pending` value is emitted into JSON-LD schema or
rendered as an animated numeric stat.

Legend for **Action pending**:
- REMOVED-FROM-SCHEMA — no longer in JSON-LD; awaiting verification to reinstate.
- UI-ONLY — wording kept in plain marketing copy; kept out of schema + counters.
- COUNTER-PLACEHOLDER — animated stat shows a neutral word until verified.
- AWAITING-INPUT — blocked on data only you can provide.

| Claim | Current value | Files / pages | Verifying source needed | Status | Action pending |
|---|---|---|---|---|---|
| Star reviews (named) | 4× 5★ "Sarah M./David K./Lisa R./Tom W.", 2026 dates | `app/page.tsx` (homeReviewSchema) | Real Google Business Profile reviews | unverified | REMOVED-FROM-SCHEMA (P0-T4). Re-add only after Google-eligibility check. |
| Aggregate rating | 4.9 / 127 | `app/layout.tsx` (LocalBusiness `aggregateRating`) | GBP rating + review count | unverified | REMOVED-FROM-SCHEMA (P0-T4). |
| On-page rating | "4.9 Customer Rating" | `components/HomeContent.tsx` (Why Choose Us) | GBP | unverified | Replaced with non-numeric trust item (P0-T4). |
| Response time | "under 15 minutes" | `components/HomeContent.tsx` (hero, stat, How-It-Works), `lib/service-areas.ts` (Surrey/Burnaby FAQ + summaries), `app/page.tsx` (homeFaqSchema), `app/locations/[city]/page.tsx` (sidebar), 7 service pages, `components/ContactContent.tsx` (FAQ), `app/blog/[slug]/page.tsx` (CTA), blog post #1 | Dispatch-log / GBP timing data | unverified | UI-ONLY marketing copy kept; COUNTER-PLACEHOLDER for the animated stat; removed from FAQ/Service **schema** (P1-T8/T12). |
| Years in business | "15+" | `components/AboutContent.tsx` (stat) | Business licence / incorporation date | unverified | COUNTER-PLACEHOLDER (P0-T5). |
| Founded | "2010" | `app/layout.tsx` (`foundingDate` ×2), `app/about/page.tsx` (metadata), `components/AboutContent.tsx`, `app/services/page.tsx` + `app/services/emergency-towing/page.tsx` (hero) | Business registration | unverified | REMOVED-FROM-SCHEMA `foundingDate` (P0-T4); UI-ONLY "since 2010" wording retained + flagged. |
| Happy customers | "5000+" | `components/AboutContent.tsx` (stat) | Internal job records | unverified | COUNTER-PLACEHOLDER (P0-T5). |
| Trucks in fleet | "20+" | `components/AboutContent.tsx` (stat) | Fleet / insurance records | unverified | COUNTER-PLACEHOLDER (P0-T5). |
| Licensed & insured | "licensed and insured" | `app/layout.tsx` (schema descriptions), several service `Service` schema descriptions, `AboutContent`, `ContactContent` FAQ, `HomeContent` badges, `app/about` metadata, `lib/service-areas.ts` | Business licence # + insurance policy | unverified | Removed from **schema** descriptions (P1-T9/T17); UI-ONLY badge/prose retained + flagged. Do NOT add a licence number unless provided. |
| "Top-rated in BC" / "thousands of drivers" | superlatives | `components/AboutContent.tsx` | — (unsupported superlative) | unverified | Soften wording (P2-T17) unless a real award/volume source is provided. |
| Blog publish dates | all 2026 (future) | `lib/blog-posts.ts` | Real publish dates | pending | AWAITING-INPUT; interim: no future dates shipped (P1-T7). |
| priceRange / payments | "$$", cash/credit/debit | `app/layout.tsx` | Owner confirmation | pending | Low risk; confirm. Left as-is. |

## Inputs required from the business (unblock work)

1. **Google reviews / rating** — a GBP link or export. Gates any future review/rating markup (subject to a Google-eligibility check first; self-serving review restrictions apply).
2. **Google Ads conversion label** — from Ads account `AW-17934610144`. Gates the Ads conversion event (P1-T10 ships GA4 events + a clearly-marked placeholder label).
3. **Verified numbers** — response time, years in business / founding year, customers served, fleet size, licence # + insurer. Gate rendering these as numbers and emitting them in schema.
4. **Real blog publish dates** — current dates are placeholders in the future.

## How to mark something verified

In `lib/business-facts.ts`, change the fact's `status` to `"verified"` and add
`source` + `verifiedAt`. For animated stats in `stats`, also confirm the
`value` is correct. Rebuild and run `npm run seo:guard` — verified facts are
then allowed in schema and rendered as real numbers automatically.
