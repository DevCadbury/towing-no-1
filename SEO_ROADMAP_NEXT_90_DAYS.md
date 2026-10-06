# SEO_ROADMAP_NEXT_90_DAYS.md — TowingNo.1

**Prepared:** 2026-10-05  
**Horizon:** 90 days from deploy date  
**Principle:** Fix existing pages before creating new ones. No fabricated facts, no doorway pages, no mass AI content.

---

## IMMEDIATE — Deploy within 48 hours

These are already implemented in `F:\town` and are waiting on a Vercel deploy.

| # | Item | Why urgent |
|---|---|---|
| 1 | **Deploy all round-1 and round-2 fixes** | Live site still serves broken blog images, "under 15 minutes" CTAs, "15-minute arrival" on /contact, double gtag.js, priceRange in schema, hidden EmbedSocial link, old robots.txt |
| 2 | **Submit updated sitemap via IndexNow / GSC** | After deploy, ping `https://www.towingno1.com/sitemap.xml` via the `/api/indexnow` endpoint and submit to Google Search Console |
| 3 | **Add Google Search Console verification token** | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is empty — GSC ownership is unconfirmed. Add real token to Vercel env + `.env.local` |

---

## WEEK 1–2 — Owner verification inputs

These unblock schema and stat improvements that are already gated in `lib/business-facts.ts`.

| # | Item | Action required | Unlocks |
|---|---|---|---|
| 4 | **Confirm founding year** | Provide BC business registration date | `claims.foundingYear` → verified; "years in business" stat; About page copy |
| 5 | **Confirm response time** | Provide dispatch-log / GBP timing data | `claims.responseTimeClaim` → verified; can restore specific time in CTAs |
| 6 | **Confirm licence # + insurer** | Provide CVSE licence and insurance policy details | `claims.licensedInsured` → verified; can move from soft marketing claim to substantiated fact |
| 7 | **Confirm real blog publish dates** | Provide actual dates for all 13 posts | `pendingInputs.blogPublishDates` → verified; `datePublished` / `dateModified` schema becomes accurate |
| 8 | **Google Ads conversion label** | Retrieve from Google Ads account AW-17934610144 | `pendingInputs.googleAdsConversionLabel` → activates Ads conversion firing |
| 9 | **Rotate Resend API key** | In Resend dashboard + update Vercel env | Remove exposure risk (file comment itself warns to rotate if shared) |
| 10 | **Remove legacy `.env.local` credentials** | Delete `AZURE_CLIENT_ID/TENANT_ID/SECRET` + `MAIL_PASSWORD` (own comment: "no longer used") | Reduces credential surface area |

---

## WEEK 2–4 — Schema and entity quality

| # | Item | File | Priority |
|---|---|---|---|
| 11 | **Fix Surrey/Langley FAQ schema ↔ component drift** | `components/SurreyPage.tsx`, `components/LangleyPage.tsx`, `app/locations/[city]/page.tsx` | P2 — FAQPage schema built from `service-areas.ts` but visible FAQ from the hardcoded component; answers have drifted apart, violating FAQPage guidelines |
| 12 | **Replace placeholder blog dates with real dates** | `lib/blog-posts.ts` (once owner confirms per item 7) | P1 after owner input |
| 13 | **Add `Google-Extended` / `OAI-SearchBot` confirmation** | Already done in `app/robots.ts` — verify post-deploy that new crawlers appear in GSC crawl stats | P2 — verify only |
| 14 | **EmbedSocial upgrade or removal decision** | Contact EmbedSocial re: paid plan to legitimately remove branding, OR replace with a different review widget | P2 — CSS hide rule removed; attribution now visible |

---

## WEEK 3–5 — Content depth on existing pages

No new URLs. Improve what exists.

| # | Item | Target page | Priority |
|---|---|---|---|
| 15 | **`vehicle-transport` content parity** | `/services/vehicle-transport` | P2 — only service page missing the "How It Works" process block; weakest body content; no deep-link to towing-vehicle-recovery-terminology blog post |
| 16 | **Deepen generic location page FAQs from 4 → 6 city-specific Q&As** | 10 generic location pages in `lib/service-areas.ts` | P2 — cheapest differentiation win; reduces templated-FAQ near-duplicate score |
| 17 | **Confirm real GBP reviews data; add EmbedSocial or schema review link** | Homepage trust strip | P2 — only trust signal is the EmbedSocial embed; once GBP reviews are verified, surface the count/rating honestly |
| 18 | **Add `vehicle-transport` → blog cross-links** | `app/services/vehicle-transport/page.tsx` | P3 — link to `/blog/understanding-towing-services` and `/blog/towing-vehicle-recovery-terminology` which are directly on-topic |
| 19 | **Roadside-assistance cannibalization decision** | `/services/roadside-assistance` | P2 — **requires GSC data first.** Check which queries drive impressions to /roadside-assistance vs. the 5 child service pages. Options: (a) keep as is if it ranks for distinct "roadside assistance Surrey" intent, (b) redirect 301 → /services if it cannibalizes children |

---

## WEEK 4–6 — Performance wins

| # | Item | File | Impact |
|---|---|---|---|
| 20 | **Convert `public/image/*.png` service cards to JPEG/WebP sources** | 9 × `public/image/*.png` (100–198 KB) | Medium — reduces source file size; next/image still re-encodes but source-file cost is lower |
| 21 | **Replace `logo.png` (307 KB) with SVG or compressed WebP** | `public/logo.png` | Low-medium — served resized by next/image but large source adds build cost |
| 22 | **Evaluate AdSense removal** | `app/layout.tsx:399-403` | High for performance — loads `adsbygoogle.js` on every page; for a phone-lead towing site the revenue/cost ratio is likely negative |
| 23 | **Migrate `middleware.ts` → `proxy.ts`** | `middleware.ts` | P3 — deprecated in Next 16; functional now but will break in a future major |
| 24 | **Lazy-load Reamaze on interaction (not afterInteractive)** | `app/layout.tsx:468-491` | P3 — reduces initial JS cost; use `lazyOnload` or trigger on first user interaction |

---

## WEEK 5–8 — Backlink acquisition (start immediately, harvest over time)

Prioritised by legitimacy + local relevance first, then authority.

| # | Opportunity | Type | Action |
|---|---|---|---|
| 25 | **Surrey Board of Trade** (`businessinsurrey.com`) | Chamber membership | Join + complete member profile with NAP + services + website link |
| 26 | **Langley Chamber of Commerce** (`business.langleychamber.com`) | Chamber membership | Join + member directory listing |
| 27 | **South Surrey & White Rock Board of Trade** (`swrbot.com`) | Chamber membership | Join + member directory listing |
| 28 | **BBB Mainland BC** (`bbb.org/ca/bc`) | Business accreditation | Apply — trusted NAP citation + trust signal |
| 29 | **Automotive Retailers Association of BC** (`arabconline.com`) | Trade association | Membership application |
| 30 | **Yellow Pages CA / 411.ca / Cylex / N49** | Core citations | Create/claim listings — NAP consistency |
| 31 | **Surrey Now-Leader** (`surreynowleader.com`) | Local media | Pitch BC highway breakdown guide or EV-towing article as a local safety resource |
| 32 | **Langley Advance Times** (`langleyadvancetimes.com`) | Local media | Pitch winter safety checklist ahead of winter season (October is ideal timing) |
| 33 | **Peace Arch News** (`peacearchnews.com`) | Local media | Pitch White Rock/Peace Arch corridor towing story |
| 34 | **DriveSmartBC.ca** | Road safety editorial | Request resource link on their breakdown/towing guidance pages |
| 35 | **Auto dealerships (Surrey/Langley Toyota, Honda, Ford)** | Partner/referral | Offer mutual referral arrangement; ask for "recommended towing" page link |

**Backlink velocity rule:** add 2–4 new referring domains per month, earned naturally through outreach and genuine value — not a bulk campaign.

---

## WEEK 6–10 — AI / GEO improvements

| # | Item | Action |
|---|---|---|
| 36 | **Verify GSC AI-crawler stats post-deploy** | After deploying the expanded robots.txt, check GSC crawl stats for Google-Extended and OAI-SearchBot activity |
| 37 | **Add structured "About" FAQ block to /about** | 3–5 short Q&As about the business (what area you serve, how to get a quote, what vehicle types) — improves AEO for "about TowingNo.1" queries |
| 38 | **Confirm EmbedSocial reviews are live** | Browser-test the homepage review widget; verify it actually loads and displays real reviews |
| 39 | **Once real GBP reviews exist: add aggregate rating to LocalBusiness schema** | Only after verifying (a) Google's current eligibility rules, (b) reviews are genuinely on GBP, (c) you are not self-serving. Follow the gating comment at `app/layout.tsx:214-221` |

---

## MONTH 2–3 — Content gaps (only where intent is genuinely distinct)

Do not create these until owner confirms the business actually serves these cases.

| # | Proposed content | Intent | Gate |
|---|---|---|---|
| 40 | **"Does ICBC cover towing?" FAQ / resource** | Informational — high search volume, directly relevant, no existing page | Confirm factual ICBC coverage details before writing |
| 41 | **Pricing explainer page** ("How does towing pricing work in BC?") | Informational + commercial — addresses price-sensitive queries without publishing specific rates | Owner approval; must not invent prices |
| 42 | **Motorcycle towing page** | Distinct service intent — flatbed-only requirement differentiates from standard towing | Only if the business actively serves motorcycles |

---

## SUCCESS METRICS — What to measure (not guarantees)

| Metric | How to measure | Frequency |
|---|---|---|
| GSC impressions + clicks (Surrey / towing queries) | Google Search Console → Performance | Weekly |
| GSC index coverage | GSC → Index → Pages | After each deploy |
| GSC Core Web Vitals | GSC → Experience | Monthly |
| `npm run seo:all` | Local audit pipeline | Every code change |
| Referring-domain count | Semrush → Backlinks → Overview (when access available) | Monthly |
| Phone call volume | Google Ads / GA4 → call_click events | Weekly |
| GBP profile views + calls | Google Business Profile Insights | Weekly |

---

*This roadmap is a living document. Re-prioritise after each GSC data pull, owner-input update, or significant algorithm change. Run `npm run seo:all` after every code change — it enforces build + guard + metadata + content + links + navigation + preservation.*
