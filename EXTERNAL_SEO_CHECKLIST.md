# External SEO Checklist — data & tools to run outside this repo

Everything below needs a live crawl, live credentials, or the claude-seo tooling
that is not available in this environment. Nothing here has been fabricated —
run these and fold the real results back into the plan.

## 1. claude-seo commands (run against the live site)

Run each and capture output:

```
/seo doctor
/seo audit https://www.towingno1.com/
/seo technical https://www.towingno1.com/
/seo content https://www.towingno1.com/
/seo schema https://www.towingno1.com/
/seo geo https://www.towingno1.com/
/seo local https://www.towingno1.com/
/seo maps https://www.towingno1.com/
/seo sxo https://www.towingno1.com/
/seo sitemap https://www.towingno1.com/
/seo images https://www.towingno1.com/
/seo backlinks https://www.towingno1.com/
```
Per-page + cluster:
```
/seo page https://www.towingno1.com/                     (and /services/emergency-towing, /locations/surrey, /about, /contact, key blog posts)
/seo cluster "tow truck surrey"                          (also: towing surrey, roadside assistance surrey, emergency towing surrey, flat tire assistance surrey, battery boost surrey, car lockout surrey, accident towing surrey)
/seo programmatic https://www.towingno1.com/locations
/seo drift baseline https://www.towingno1.com/
```

## 2. Google tools (need account access)

- **Search Console:** verify the property (the site already supports
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`); submit `sitemap.xml`; review Coverage/
  Indexing, Core Web Vitals report, and Performance (queries, CTR, position).
  Use **URL Inspection** on key URLs after deploy.
- **Rich Results Test** (search.google.com/test/rich-results): validate the
  JSON-LD on `/`, a service page, a location page, and a blog post
  (LocalBusiness/Organization, Service, FAQPage, BreadcrumbList, BlogPosting).
- **PageSpeed Insights** (mobile + desktop) for `/`, `/services/emergency-towing`,
  `/locations/surrey`, a blog post — record LCP / INP / CLS.
- **CrUX** (field data) once the site has enough traffic.

## 3. Structured-data validation (post-deploy)

- Rich Results Test + Schema Markup Validator (validator.schema.org) on the URLs
  above. Confirm no Review/AggregateRating markup reappears (removed by policy —
  see VERIFICATION_REPORT.md), and that FAQPage matches visible text.

## 4. Rank / SERP / AI-surface observations (live)

- Rank tracking for the target intents (tow truck surrey, emergency towing
  surrey, roadside assistance surrey, tow truck near me, per-city terms).
- SERP feature presence (local pack, sitelinks).
- AI-surface spot checks: Google AI Overviews / AI Mode, Bing Copilot, ChatGPT
  search, Perplexity, Gemini — ask "who provides emergency towing in Surrey?",
  "how fast can a tow truck reach me in Surrey?", "do they tow EVs?" and see
  whether TowingNo.1 is surfaced/cited.

## 5. Backlinks / citations (live tools)

- Referring domains via GSC Links + Ahrefs/Semrush/Moz.
- Citation audit (NAP consistency) via a local tool (BrightLocal/Whitespring) or
  manual per AUTHORITY_PLAN.md.

## 6. Deployment env values to set (owner)

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — GSC verification token.
- `TEST_EMAIL_SECRET` — leave UNSET in prod to keep `/api/test-email` disabled
  (it returns 404 without it); set only when you need to run a mail test.
- Google Ads **conversion label** — provide it so the Ads conversion in
  `lib/analytics.ts` fires (currently GA4-only until the label is set).
- `RESEND_*` / `RECAPTCHA_*` — as already configured for the contact form.
