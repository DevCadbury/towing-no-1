# SEO Iteration Playbook — TowingNo.1

The continuous loop that keeps the site technically clean, honest, and growing.

## One-command health check

```
npm run seo:all
```
Runs: production build → `claims-check` (anti-drift guard) → `seo-check`
(metadata) → `content-audit` (word count + near-duplicates) → `link-check`
(dead/placeholder links) → `nav-reachability` (orphans) → `preservation-baseline`
(behavioral drift vs. the captured baseline). Exit code is non-zero if anything
regresses. Run it before every deploy.

Individual scripts: `npm run seo:guard`, `seo:check`, `audit:content`,
`audit:links`, `audit:nav`, `preservation:baseline`.

## Drift detection (what the guards protect)

- **`claims-check.mjs`** fails on: fabricated review authors, `aggregateRating`/
  `Review` markup, any `unverified`/`pending` fact from `lib/business-facts.ts`
  emitted into JSON-LD, any response-time figure in schema, `<0`/`0+`/`NaN`
  render placeholders, empty blog CTA boxes, literal `**`, and future-dated blog
  posts. This is the trust + render safety net.
- **`preservation-baseline.mjs`** flags changes to protected behavior (routes,
  `tel:` links, GTM/GA/Ads/AdSense/Reamaze integrations, conversion tracking,
  contact-form flow, sitemap/robots). After an INTENDED change, review the diff,
  then re-capture with `node scripts/preservation-baseline.mjs --update`.

## Monitoring cadence

- **Every deploy:** `npm run seo:all`; Rich Results Test + URL Inspection on any
  changed template.
- **Weekly:** GSC Performance (queries/CTR/position), Coverage, GBP Insights
  (calls, direction requests), GA4 `call_click` + `generate_lead` events.
- **Monthly:** PageSpeed/CrUX (LCP/INP/CLS), rank check for target intents,
  backlink/citation review (AUTHORITY_PLAN.md), AI-surface spot checks
  (EXTERNAL_SEO_CHECKLIST.md).
- **Seasonally (pre-October):** refresh winter posts; confirm the winter-tire rule
  dates; verify the winter-driving citations still resolve.

## Content refresh (honest freshness only)

- Update a blog post's `updatedDate` in `lib/blog-posts.ts` ONLY on a real
  content revision (drives `dateModified` + the visible "Updated" label). Never a
  future date. Build the BLOG_CONTENT_PLAN.md backlog one quality article at a
  time; no mass AI generation.

## Review acquisition (feeds the homepage widget)

- Ask satisfied customers for a Google review after each job; respond to all.
- The homepage shows REAL reviews via the EmbedSocial Google widget. Do NOT add
  `Review`/`AggregateRating` JSON-LD back without first checking current Google
  eligibility (self-serving-review restrictions; no aggregating third-party
  reviews) — see the note in `app/page.tsx` / `app/layout.tsx`.

## Conversion experiments (SXO)

- With GA4 `call_click` (by `data-call-location`) + `generate_lead` now firing,
  A/B test CTA copy/placement, the mobile sticky button, and form length. Wire the
  Google Ads conversion label to optimize ad spend against real leads.

## Verification-pending items (owner input required — see VERIFICATION_REPORT.md)

These are flagged and kept OUT of schema until confirmed; the site shows neutral
placeholders / marketing copy meanwhile:
- Response time (currently no number in schema; marketing "under 15 minutes" only in non-schema copy).
- Years in business / founding year (2010) — removed from schema; UI wording flagged.
- Fleet size, customers served — animated stats show placeholders until verified.
- Licensing/insurance — kept out of schema descriptions; add a licence number only if provided.
- Real blog publish dates; Google reviews/rating; Google Ads conversion label.
When a value is confirmed, set it (and `status: "verified"` + `source`) in
`lib/business-facts.ts` — it then flows to UI/metadata/schema automatically and
the guard permits it.

## The four-perspective quality gate (run before declaring a change done)

1. **Search engine** — crawlable, indexable, unique metadata, valid schema.
2. **Answer engine** — self-contained, accurate FAQ/answer passages.
3. **Generative engine** — clear entity (brand→service→geography→contact), cited facts.
4. **Human** — fast, mobile-first, obvious "Call Now" + quote path.
