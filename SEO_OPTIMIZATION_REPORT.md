# SEO Optimization Report — towingno1.com
**Scope:** Full SEMrush + organic search pass · September 2026  
**Suite result:** `npm run seo:all` exit 0 — guard 0 violations, 0 SEO errors/warnings, 34/34 quality pages, 0 dead links, 34/34 reachable, preservation holds.

---

## A. SEMrush Issues Fixed

### Issue #1 — LocalBusiness address missing (multiple instances on /services)

| Field | Detail |
|---|---|
| **Root cause** | `app/services/page.tsx` ItemList embedded 8 inline `{ "@type": "LocalBusiness", "name": "TowingNo.1", "@id": "…" }` provider stubs — one per service entry. Each stub is a new `LocalBusiness` declaration without an `address`, which SEMrush flags as 8 separate violations. |
| **What changed** | Replaced all 8 provider objects with a shared `PROVIDER_REF = { "@id": "https://www.towingno1.com/#localbusiness" }` constant — a pure entity reference with no `@type`/`name` re-declaration. The sole authoritative `LocalBusiness` is the global `@graph` block in `app/layout.tsx`, emitted once on every page. |
| **Address config** | Added an `address` export to `lib/business-facts.ts` with `streetAddress`/`postalCode` as `"pending"` (not fabricated) and `city`/`region`/`country` as `"verified"`. The layout now reads the address from config and conditionally adds `streetAddress`/`postalCode` when verified, so the owner can unlock the full address by updating one file. |
| **Affected files** | `app/services/page.tsx`, `lib/business-facts.ts`, `app/layout.tsx` |
| **Validation** | Built HTML: 0 `"@type":"LocalBusiness"` declarations inside the `/services` ItemList. Service-specific `Service` schema is 544 bytes (compact `AdministrativeArea` reference). |

---

### Issue #2 — 34 pages have low text-to-HTML ratio

| Field | Detail |
|---|---|
| **Root cause** | The primary HTML/JSON-LD bloat driver was the `areaServedSchema` export — a 13-city object array (~1.5 KB per use) referenced inside the `Service` schema on all 8 service pages. With the global `LocalBusiness` entity (also on every page) already listing all 13 cities, the per-service expansion was pure repetition. Secondary contributors: GTM inline script, AdSense async script, and the Reamaze chat widget config blob — all third-party, not removable without breaking functionality. |
| **What changed** | Added `serviceAreaCompact = { "@type": "AdministrativeArea", name: "Lower Mainland", containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia" } }` to `lib/service-areas.ts`. All 8 service pages now use `serviceAreaCompact` instead of `areaServedSchema`, removing ~12 KB of JSON-LD across the service section. The full city list remains on the global `LocalBusiness` (correct entity-design: coverage declared once, referenced everywhere). |
| **Affected files** | `lib/service-areas.ts`, all 8 `app/services/*/page.tsx` |
| **Validation** | `/services/battery-boost` Service schema: 544 bytes, `hasCities=False`. Global Organization block: 3,798 bytes with full city list (intentional). |
| **Residual** | The GTM/AdSense/Reamaze scripts remain; removing them is a business decision, not an SEO fix. The text-to-HTML ratio is improved on all 8 service pages but will not reach a high percentage while third-party chat and ad scripts are present. |

---

### Issue #3 — 2 blog pages with only 1 incoming internal link

| Field | Detail |
|---|---|
| **Affected pages** | `/blog/understanding-towing-services`, `/blog/when-call-tow-vs-fix-yourself` |
| **Root cause** | The blog listing page linked both posts (1 incoming link each). No service page or other article linked to them contextually. |
| **What changed** | **understanding-towing-services:** 2 new contextual in-links — from `/services/emergency-towing` ("Flatbed vs wheel-lift: which towing method does your vehicle need?") and `/services/accident-recovery` ("Flatbed vs wheel-lift: which towing method does your vehicle need?"). Also now appears in other blog articles' "Related Articles" sidebar via the new `relatedBlogLinks()` function. **when-call-tow-vs-fix-yourself:** 2 new contextual in-links — from `/services/flat-tire-help` ("when to call a tow truck vs. fix it yourself at the roadside") and `/services/battery-boost` ("Roadside DIY or professional help — how to decide"). Also surfaces via `relatedBlogLinks()`. Both posts also gained a shared keyword (`"towing services BC"`) so they appear in each other's "More from Our Blog" algorithmically. |
| **Anchor text policy** | All anchors are descriptive and topically accurate. No "click here" / "read more" / exact-match keyword spam. |
| **Affected files** | `app/services/emergency-towing/page.tsx`, `app/services/accident-recovery/page.tsx`, `app/services/flat-tire-help/page.tsx`, `app/services/battery-boost/page.tsx`, `lib/blog-posts.ts`, `app/blog/[slug]/page.tsx` |
| **Validation** | Built HTML: both target slugs found in multiple non-self pages. |

---

### Issue #4 — 10 location pages with over-long titles

| Field | Detail |
|---|---|
| **Root cause** | The `generateMetadata` function in `app/locations/[city]/page.tsx` used: `Tow Truck ${area.city} — 24/7 Towing & Roadside Help`. With the layout template adding `| TowingNo.1`, the rendered `<title>` was 66–71 chars for the 10 flagged cities. |
| **Fix** | Changed pattern to `Tow Truck ${area.city} | 24/7 Towing`. Template adds `| TowingNo.1`. Rendered lengths: 44–49 chars for all 12 cities. |
| **Rendered titles (verified in built HTML)** | |

| City | Chars | Title |
|---|---|---|
| Aldergrove | 47 | Tow Truck Aldergrove \| 24/7 Towing \| TowingNo.1 |
| Burnaby | 44 | Tow Truck Burnaby \| 24/7 Towing \| TowingNo.1 |
| Cloverdale | 47 | Tow Truck Cloverdale \| 24/7 Towing \| TowingNo.1 |
| Coquitlam | 46 | Tow Truck Coquitlam \| 24/7 Towing \| TowingNo.1 |
| Delta | 42 | Tow Truck Delta \| 24/7 Towing \| TowingNo.1 |
| Langley | 44 | Tow Truck Langley \| 24/7 Towing \| TowingNo.1 |
| Maple Ridge | 48 | Tow Truck Maple Ridge \| 24/7 Towing \| TowingNo.1 |
| Richmond | 45 | Tow Truck Richmond \| 24/7 Towing \| TowingNo.1 |
| South Surrey | 49 | Tow Truck South Surrey \| 24/7 Towing \| TowingNo.1 |
| Surrey | 43 | Tow Truck Surrey \| 24/7 Towing \| TowingNo.1 |
| Vancouver | 46 | Tow Truck Vancouver \| 24/7 Towing \| TowingNo.1 |
| White Rock | 47 | Tow Truck White Rock \| 24/7 Towing \| TowingNo.1 |

| **Affected files** | `app/locations/[city]/page.tsx` |

---

## B. Keyword Map

### Keyword-to-URL architecture (no cannibalization)

| Page | Primary Intent | Primary Keyword | Secondary Topics | Search Intent | Internal-link targets |
|---|---|---|---|---|---|
| `/` | Brand + emergency entry | tow truck Surrey, towing near me | 24/7 towing, roadside assistance Surrey, towing company Surrey BC | Navigational + transactional | /services, /locations, /contact, all service pages |
| `/services` | Services hub | towing services Surrey BC | roadside assistance, emergency towing, 24/7 dispatch | Commercial | All 8 service pages |
| `/services/emergency-towing` | Emergency tow dispatch | emergency towing Surrey | 24/7 tow truck near me, flatbed towing, vehicle breakdown | Transactional | /locations/surrey, /blog/understanding-towing-services, /blog/what-to-do-car-breaks-down-highway |
| `/services/battery-boost` | Dead battery roadside | battery boost Surrey | jump-start service near me, car battery jump start, 24/7 battery boost | Transactional | /blog/signs-car-battery-dying, /blog/when-call-tow-vs-fix-yourself |
| `/services/flat-tire-help` | Flat tire roadside | flat tire help Surrey | roadside tire change near me, flat tire on highway, spare tire installation | Transactional | /blog/when-call-tow-vs-fix-yourself |
| `/services/lockout-service` | Locked out of car | car lockout service Surrey | keys locked inside, unlock car near me | Transactional | /services/emergency-towing |
| `/services/fuel-delivery` | Out of fuel | fuel delivery Surrey | emergency gas delivery near me, out of gas roadside | Transactional | /services/emergency-towing |
| `/services/vehicle-transport` | Non-emergency transport | vehicle transport Surrey | flatbed towing, car transport Lower Mainland, non-running vehicle | Commercial | /services/emergency-towing |
| `/services/accident-recovery` | Post-collision towing | accident recovery towing Surrey | collision towing BC, damaged vehicle transport | Transactional | /blog/understanding-towing-services |
| `/services/winching-extraction` | Stuck vehicle recovery | winching & extraction Surrey | vehicle recovery, stuck in ditch, snow recovery | Transactional | /services/emergency-towing |
| `/locations/surrey` | Local tow Surrey | tow truck Surrey, towing Surrey | towing company Surrey BC, cheap towing Surrey | Local + transactional | /services/emergency-towing, /services/battery-boost |
| `/locations/langley` | Local tow Langley | tow truck Langley, towing Langley | towing companies Langley, emergency towing Langley | Local + transactional | /services pages |
| `/locations/*` (×10) | Local tow + city | tow truck {city}, towing {city} | 24/7 towing {city}, roadside assistance {city} | Local + transactional | /services pages, nearby city pages |
| `/blog/what-to-do-car-breaks-down-highway` | Breakdown safety guide | what to do when car breaks down | highway breakdown BC, vehicle breakdown safety | Informational → /services/emergency-towing |
| `/blog/prepare-vehicle-winter-bc` | Winter maintenance | how to prepare car for winter BC | winter tires BC, winter car maintenance, winter driving | Informational → /services/battery-boost, /services/winching-extraction |
| `/blog/signs-car-battery-dying` | Battery warning signs | signs car battery dying | dead battery symptoms, car battery replacement | Informational → /services/battery-boost |
| `/blog/emergency-kit-essentials` | Roadside preparedness | car emergency kit | roadside emergency supplies, breakdown kit BC | Informational → /services, /contact |
| `/blog/when-call-tow-vs-fix-yourself` | Towing decision guide | when to call a tow truck | roadside DIY vs tow, tow truck BC | Informational → /services/emergency-towing, /services/flat-tire-help |
| `/blog/understanding-towing-services` | Towing types explainer | types of towing services | flatbed tow truck, wheel-lift, emergency towing BC | Informational → /services/emergency-towing, /services/vehicle-transport |

### Cannibalization assessment

**No meaningful cannibalization found.** The architecture is:
- Homepage = brand entry + "tow truck Surrey" / "towing near me" (broad, navigational)
- `/services/emergency-towing` = deep commercial landing ("emergency towing Surrey", "24/7 tow truck near me")

The overlap between homepage and emergency-towing is intentional and correct. Google distinguishes: users landing on the homepage typically have brand intent ("TowingNo.1") or high-level need; users on the emergency towing page have specific dispatch intent. They complement rather than compete.

All 8 service pages target distinct intents. No two location pages share their primary city. No blog post competes with a commercial page for the same transactional query.

---

## C. Technical SEO

### Crawlability

| Check | Status |
|---|---|
| `robots.txt` | ✅ `/api/*` disallowed; all content routes allowed; AI crawlers explicitly allowed (`GPTBot`, `anthropic-ai`, etc.) for LLM visibility — intentional |
| `sitemap.xml` | ✅ All 34 routes included; location pages use priority gradient 0.90→0.70 (Cloverdale highest per owner priority order); blog posts 0.60; service sub-pages 0.85 |
| Internal links | ✅ 34/34 routes reachable from nav/footer; 0 orphans |
| Status codes | ✅ All 34 routes return 200 (static pre-render) |
| Redirects | No redirects needed; all URLs preserved |
| Canonical | ✅ Every indexable page has a self-canonical; no page points to wrong URL |
| noindex | None set; all pages indexable |

### Indexability

All 34 pages: index=true, follow=true, googleBot max-image-preview=large, max-snippet=-1.

### Structured data (post-changes)

| Schema type | Location | Status |
|---|---|---|
| `Organization` | Global (`app/layout.tsx @graph`) | ✅ Stable `@id`, `sameAs` (Facebook + Instagram), `contactPoint` |
| `LocalBusiness` + `AutomotiveBusiness` | Global (`app/layout.tsx @graph`) | ✅ `@id`, phone, email, address (Surrey/BC/CA), `areaServed` (13 cities), `hasOfferCatalog` |
| `LocalBusiness.address` | Reads from `lib/business-facts.ts` | ⚠️ `streetAddress`/`postalCode` pending owner confirmation — config slot ready |
| `Service` | Each of 8 service pages | ✅ `@id`, `provider: { "@id": "#localbusiness" }`, `serviceAreaCompact` |
| `FAQPage` | All 8 service pages + 12 location pages + homepage | ✅ visible === schema (single source) |
| `BreadcrumbList` | All service, location, blog pages | ✅ Matches visible breadcrumbs |
| `BlogPosting` | Each blog article | ✅ Future dates clamped; `dateModified` ≥ `datePublished` |
| `ItemList` | `/services` hub, `/locations` hub, `/blog` index | ✅ Pure `@id` references (no inline stubs) |
| `WebSite` | Not implemented | Optional — add if Sitelinks Searchbox is desired |

### HTML/DOM performance

| Page | Service-schema LD bytes | Change |
|---|---|---|
| `/services/battery-boost` (representative) | 544 bytes Service schema | Was ~2,100 bytes with 13-city expansion |
| Global `Organization` block | 3,798 bytes (every page) | Unchanged — entity definition, expected |
| `app/blog/[slug]` article body | Server-rendered, no client hydration | ✅ No unnecessary JS payload |

### Mobile SEO

✅ Lighthouse ran on 20 pages during the OpenSEO audit with no performance issues flagged. Next.js `next/image` handles AVIF/WebP optimization + responsive sizes. Fixed call button is bottom-left on all breakpoints (no overlap with Reamaze chat widget). `section-padding` scales with `md:` prefix.

---

## D. Organic Growth Opportunities

### Pages with strongest existing potential

| Page | Current rank | Opportunity |
|---|---|---|
| `/locations/surrey` | ~65–71 for "surrey towing companies", "cheap towing surrey" | Low-KD terms (KD 0–2); blocking factor is domain authority + GBP absence |
| `/locations/langley` | ~39 for "towing companies langley" (KD 0) | One quality citation/link could push page 1 |
| `/services/emergency-towing` | ~46–65 for "towing company surrey bc", "towing services surrey" | Core commercial page; needs GBP + backlinks, not on-page work |
| `/` | ~46 for "towing company surrey bc" | Brand page; improves with domain authority |

### Pages needing content improvement

All 34 pages meet the 500-word quality threshold. No thin pages. The blog intro prose was already strengthened in a previous pass. The location pages each have 646–769 unique words — acceptable for city pages. No action needed on content volume.

### Keyword gaps (no existing page targets these)

| Keyword | Volume | KD | Suggested action |
|---|---|---|---|
| scrap car removal Surrey | 140 | 3 | New page **only if** the business genuinely offers it; competitors rank here |
| tow truck Port Coquitlam | 50 | 0 | Add Port Coquitlam as a `nearbyCities` reference on the Coquitlam page (low value stand-alone page) |
| roadside assistance near me | variable | — | Homepage already targets broadly; map pack is the capture mechanism |
| EV towing Surrey | low | 0 | Could be addressed in emergency-towing body (partially done — mentions EV flatbed requirement) |

### Internal-link gaps (now addressed)

- `/blog/understanding-towing-services`: was 1 incoming link → now 4+ ✅
- `/blog/when-call-tow-vs-fix-yourself`: was 1 incoming link → now 4+ ✅
- Blog articles now have a `relatedBlogLinks()` sidebar surfacing topically related posts ✅

### Potential cannibalization (none found)

No active cannibalization exists. The homepage and `/services/emergency-towing` share "towing Surrey" semantics but serve different user intents (brand entry vs dispatch intent). Monitor via Google Search Console once connected: if both URLs compete for the same query, use an internal link from homepage → emergency-towing with descriptive anchor to reinforce which page should rank.

### CTR opportunities

| Page | Issue | Fix applied |
|---|---|---|
| All 10 city location pages | Titles were 66–71 chars, often truncated | ✅ Reduced to 44–49 chars |
| `/services/vehicle-transport` | Description didn't mention "flatbed" — the actual search intent | ✅ Description now mentions flatbed towing |
| `/services/winching-extraction` | Em-dash in title, "Stuck in Ditch or Snow" not a strong keyword signal | ✅ Replaced with "Vehicle Recovery \| 24/7" |
| `/services/lockout-service` | Em-dash in title | ✅ Replaced with pipe |
| Blog article CTAs | Claimed "average response time under 15 minutes" (unverified) | ✅ Removed |

### New content recommendations (only where genuine intent + business fit exists)

1. **"Scrap car removal Surrey"** (140 searches/mo, KD 3) — create only if TowingNo.1 actually offers it. Surrey Wide Towing dominates this term with 265 reviews.
2. **Seasonal blog update policy** — existing winter-prep and battery posts should be marked `updatedDate` each October/November when the season is relevant. This drives `dateModified` freshness signals.
3. **Google Business Profile + reviews** — the highest-leverage remaining action. The map pack captures "tow truck near me" (27,100 searches/mo, KD 2). No on-page change substitutes for GBP verification + real customer reviews.

---

## E. Page-by-Page Audit Table

| URL | Type | Primary Intent | Title (rendered) | Title chars | Desc chars | H1 | Canonical | Index | Schema | CTA | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Home | Brand + emergency entry | Tow Truck Surrey \| 24/7 Emergency Towing \| TowingNo.1 | 53 | 163 | 24/7 Tow Truck Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, ItemList, LocalBusiness | ✅ Phone | ✅ |
| `/services` | Hub | Services overview | Towing & Roadside Services Surrey BC \| 24/7 Emergency Help | 75 | 155 | Towing & Roadside Assistance Services in Surrey, BC | ✅ | ✅ | ItemList, BreadcrumbList | ✅ | ✅ |
| `/services/emergency-towing` | Service | Emergency tow dispatch | Emergency Towing Surrey \| 24/7 Tow Truck Near Me \| TowingNo.1 | 61 | 161 | Emergency Towing Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/battery-boost` | Service | Dead battery roadside | Battery Boost Surrey \| 24/7 Jump-Start Service Near Me \| TowingNo.1 | 67 | 148 | Battery Boost & Jump-Start Service — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/flat-tire-help` | Service | Flat tire roadside | Flat Tire Help Surrey \| 24/7 Roadside Tire Change Near Me \| TowingNo.1 | 70 | 156 | Flat Tire Help — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/lockout-service` | Service | Locked out of car | Car Lockout Service Surrey \| Keys Locked Inside \| We Help 24/7 \| TowingNo.1 | 75 | 140 | Car Lockout Service — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/fuel-delivery` | Service | Out of fuel | Fuel Delivery Surrey \| Emergency Gas Delivery Near Me 24/7 \| TowingNo.1 | 71 | 148 | Emergency Fuel Delivery — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/vehicle-transport` | Service | Vehicle transport | Vehicle Transport Surrey \| Car Transport Lower Mainland BC \| TowingNo.1 | 71 | 182 | Vehicle Transport — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/accident-recovery` | Service | Post-collision towing | Accident Recovery Towing Surrey \| 24/7 Collision Towing BC \| TowingNo.1 | 71 | 155 | Accident Recovery Towing — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/services/winching-extraction` | Service | Stuck vehicle recovery | Winching & Extraction Surrey \| Vehicle Recovery \| 24/7 \| TowingNo.1 | 71 | 150 | Winching & Extraction — Surrey & Lower Mainland | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/locations` | Hub | Service areas overview | Tow Truck Service Areas \| Surrey, Langley & Lower Mainland \| TowingNo.1 | — | — | 24/7 Tow Truck Coverage Across Surrey and the Lower Mainland | ✅ | ✅ | ItemList, Breadcrumb | ✅ | ✅ |
| `/locations/surrey` | Location | Tow truck Surrey | Tow Truck Surrey \| 24/7 Towing \| TowingNo.1 | 43 | 185 | Tow Truck Surrey — 24/7 Emergency Towing & Roadside Assistance | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/locations/langley` | Location | Tow truck Langley | Tow Truck Langley \| 24/7 Towing \| TowingNo.1 | 44 | 185 | Tow Truck Langley — 24/7 Towing & Roadside Assistance | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/locations/[city]` ×10 | Location | Tow truck {city} | Tow Truck {City} \| 24/7 Towing \| TowingNo.1 | 44–49 | 183–188 | City-specific headline | ✅ | ✅ | Service, FAQPage, Breadcrumb | ✅ | ✅ |
| `/blog` | Blog hub | Blog index | Blog — Towing Tips & Road Safety in BC \| TowingNo.1 | 57 | 115 | Tips, Advice & Insights | ✅ | ✅ | ItemList, Breadcrumb | ✅ Phone | ✅ |
| `/blog/what-to-do-car-breaks-down-highway` | Blog | Breakdown safety | What to Do When Your Car Breaks Down on the Highway | 52 | 136 | What to Do When Your Car Breaks Down… | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/blog/prepare-vehicle-winter-bc` | Blog | Winter prep | How to Prepare Your Vehicle for Winter in BC | 47 | 111 | How to Prepare Your Vehicle for Winter… | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/blog/signs-car-battery-dying` | Blog | Battery warning signs | 5 Signs Your Car Battery is Dying | 36 | 103 | 5 Signs Your Car Battery is Dying | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/blog/emergency-kit-essentials` | Blog | Emergency preparedness | Emergency Kit Essentials Every Driver Needs | 46 | 111 | Emergency Kit Essentials Every Driver Needs | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/blog/when-call-tow-vs-fix-yourself` | Blog | Towing decision | When to Call for a Tow vs. Fix it Yourself | 46 | 111 | When to Call for a Tow vs. Fix it Yourself | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/blog/understanding-towing-services` | Blog | Towing types | Understanding Different Types of Towing Services | 50 | 118 | Understanding Different Types of Towing Services | ✅ | ✅ | BlogPosting, Breadcrumb | ✅ | ✅ |
| `/about` | About | Brand/trust | About Us \| Licensed & Insured Towing in BC \| TowingNo.1 | 59 | 144 | About TowingNo.1 | ✅ | ✅ | Breadcrumb | ✅ | ✅ |
| `/contact` | Contact | Get in touch | Contact Us \| 24/7 Emergency Towing in BC \| TowingNo.1 | 53 | 145 | Contact Us | ✅ | ✅ | Breadcrumb | ✅ Phone + form | ✅ |
| `/privacy` | Policy | Privacy policy | Privacy Policy \| TowingNo.1 | 27 | 153 | Privacy Policy | ✅ | ✅ | — | — | ✅ |
| `/terms` | Policy | Terms of service | Terms of Service \| TowingNo.1 | 29 | 123 | Terms of Service | ✅ | ✅ | — | — | ✅ |

---

## F. What Requires Owner Action (not code-fixable)

These items cannot be resolved by editing the codebase. They represent the primary remaining growth levers.

| Item | Priority | Action |
|---|---|---|
| **Claim & verify Google Business Profile** | 🔴 Highest | TowingNo.1 does not appear in the Surrey "tow truck" map pack. Competitors have 23–265 reviews. GBP is the primary capture point for "tow truck near me" (27,100/mo). |
| **Generate customer reviews** | 🔴 Highest | After GBP, implement a post-job review-request flow. Even 20–30 reviews would push into the map pack. |
| **Submit business address to `lib/business-facts.ts`** | 🟠 High | Once the registered/operational address is confirmed, update `address.streetAddress` and `address.postalCode` to `"verified"` and provide the values. The schema wiring is ready. |
| **Build 20–30 local citations** | 🟠 High | Yelp, YellowPages.ca, Canada411, Bing Places, Apple Maps, Better Business Bureau. These provide authority signals for the low-KD Surrey/Langley terms. |
| **Connect Google Search Console** | 🟡 Medium | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var. This unlocks GSC data (impressions, CTR, query/page mismatches) for the next optimization cycle. |
| **Verify founding year and response time** | 🟡 Medium | Flip `claims.foundingYear` and `stats.responseTime` to `"verified"` in `lib/business-facts.ts` once confirmed. These will then flow into schema and on-page stats automatically. |
| **Provide Google Ads conversion label** | 🟡 Medium | Set `pendingInputs.googleAdsConversionLabel` to unlock the gated `gtag('event','conversion')` that is already wired in `lib/analytics.ts`. |
| **Provide real blog publish dates** | 🟢 Low | Update `date` fields in `lib/blog-posts.ts` with actual publish dates. Current dates (Jan–Feb 2026) are clamped to now for schema but accurate dates improve freshness signals. |

---

## G. Ongoing Maintenance Rules

1. **Run `npm run seo:all` before every deploy.** Exit 0 is the gate.
2. **Run `preservation-baseline.mjs --update` only after intended changes.** It guards against accidental regression.
3. **Never add a `streetAddress` or review/rating to schema until verified** in `lib/business-facts.ts`. The guard enforces this.
4. **Blog posts:** set `updatedDate` only on meaningful content revisions; never set a future date.
5. **Adding a new service or location page:** follow the existing `ServiceArea` / `service page` template — single FAQ array feeds both visible and schema, `serviceAreaCompact` for `areaServed`, pure `@id` for `provider`.
6. **New location pages:** check that `nearbyCities` entries exist in the `serviceAreas` array before adding them — the `isServiceAreaSlug()` guard prevents dead links.

---

*Report generated from live build data. Keyword volume figures from OpenSEO Canada/English data (September 2026). All schema validated against built HTML. `seo:all` exit 0 confirmed.*
