# SEO Baseline — TowingNo.1 (before-state)

Captured at the start of the unified SEO/AEO/GEO/SXO engagement, against the
current (unmodified) code in `f:\town`. This is the reference the work is
measured against. Do not edit retroactively.

## Build

- `npm run build` — PASS. Next.js 16.1.6 (Turbopack). 43 prerendered entries.
- Deprecation notice (non-blocking): the `middleware` file convention is
  deprecated in Next 16 in favour of `proxy`. Left as-is (works; canonical
  redirects are also duplicated in `next.config.mjs` + `vercel.json`). Tracked
  as a low-risk follow-up — not changed, to avoid disturbing redirects.

## Route inventory (34 content routes)

- Static: `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/services`,
  `/locations`, `/blog`.
- Services (8): emergency-towing, battery-boost, lockout-service,
  flat-tire-help, fuel-delivery, winching-extraction, vehicle-transport,
  accident-recovery.
- **Locations (12, not 9)**: surrey, langley, burnaby, coquitlam, richmond,
  white-rock, vancouver, delta, maple-ridge, cloverdale, south-surrey,
  aldergrove. All 12 are preserved. (The homepage "featured areas" grid shows
  9 of the 12; the plan's "9-city" wording refers to that grid, not the route
  set.)
- Blog (6): what-to-do-car-breaks-down-highway, prepare-vehicle-winter-bc,
  signs-car-battery-dying, emergency-kit-essentials, when-call-tow-vs-fix-yourself,
  understanding-towing-services.
- API (dynamic): `/api/indexnow`, `/api/send-email`, `/api/test-email`.

## Audit scripts (before)

| Script | Result | Notes |
|---|---|---|
| `seo:check` | PASS (0 errors, 23 warnings) | Title/description over recommended length on `/`, `/services`, `/locations`, `/about`; missing Twitter card on the 8 service sub-pages. |
| `audit:content` | PASS | All 34 routes ≥ 500 words; 0 near-duplicate prose pairs. |
| `audit:links` | PASS | 0 dead links, 0 placeholder `#`, 0 missing assets. |
| `audit:nav` | PASS | 34/34 routes reachable from nav/footer. |
| `preservation:baseline` | RE-CAPTURED | Stored baseline was stale (captured against an earlier ~9-city version → index misalignment + a crash on the length mismatch). Hardened the `collapse` helper and re-captured a clean baseline for this engagement. |
| `seo:guard` (new) | FAIL — 63 violations | Documented before-state, below. |

## Guard before-state (63 violations)

| Category | Count | Meaning |
|---|---|---|
| RENDER_ZERO | 5 | Homepage renders `<0 min` and `<0+`; About renders `0+`, `0/7` (Counter stuck at SSR 0). |
| BLOG_LITERAL_BOLD | 6 | Every blog post renders literal `**` (inline-bold not parsed). |
| BLOG_EMPTY_CTA | 6 | Every blog post renders an empty amber CTA box. |
| AGGREGATE_RATING | 36 | `aggregateRating 4.9/127` in the global LocalBusiness schema → emitted on every page. Unverified/self-serving. |
| FABRICATED_REVIEW | 8 | 4 named reviews (Sarah M., David K., Lisa R., Tom W.) dated 2026 in homepage JSON-LD. |
| REVIEW_MARKUP | 2 | Self-emitted `Review` nodes present. |

## Metadata patterns (before)

- Root `layout.tsx`: default title template `%s | TowingNo.1`, `metadataBase`
  set, OG + Twitter defaults, robots index/follow, large `keywords` array.
- Every route has a unique `title`, `description`, self-referential
  `alternates.canonical`, and `openGraph`. The 8 service sub-pages lack a
  `twitter` block and a per-page `openGraph.images` (addressed in P1-T9).

## Schema inventory (before)

- Global (`layout.tsx`): `Organization` + `["LocalBusiness","AutomotiveBusiness"]`
  with `aggregateRating` (to remove), `foundingDate 2010` (unverified),
  `areaServed` (10 cities), `hasOfferCatalog`.
- Home: `Service`, `FAQPage` (8 Q&A), `Review` ×4 + review LocalBusiness
  (to remove), `ItemList`, `WebPage`+`speakable` (selectors `#hero-summary`,
  `#faq-section`).
- Services hub: `ItemList` + `BreadcrumbList`.
- Service pages: `Service` + `BreadcrumbList`; `FAQPage` on only 4 of 8.
- Location pages: `Service` + `FAQPage` + `BreadcrumbList`.
- Blog post: `Article` (datePublished == dateModified; Organization author) +
  `BreadcrumbList`. Blog dates are all in 2026 (future/placeholder).

## Analytics / integrations (preserve)

GTM `GTM-5G2X36L7`, GA4 `G-30WWS5SMCS`, Google Ads `AW-17934610144`, AdSense
`ca-pub-2962382436663193`, Reamaze chat. Only one custom event exists today:
`call_dialog_open` (misnamed; fires from the homepage hero + one bottom CTA).
Contact form → `POST /api/send-email` (Resend + reCAPTCHA v3).
