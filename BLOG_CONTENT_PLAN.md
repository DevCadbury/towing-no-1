# Blog / Content Plan — TowingNo.1

Topical-authority plan for the blog. Build clusters around real customer
problems in the Surrey / Lower Mainland market. Every new article must have a
clear search intent, unique first-hand value, correct facts, and contextual
internal links to the relevant service + location pages. Do NOT mass-produce
generic AI articles.

## Existing posts → clusters (6)

| Post | Category | Links to (service / location) |
|---|---|---|
| What to Do When Your Car Breaks Down on the Highway | Road Safety | emergency-towing, locations |
| Emergency Kit Essentials Every Driver Needs | Road Safety | emergency-towing, battery-boost |
| How to Prepare Your Vehicle for Winter in BC | Seasonal | winching-extraction, battery-boost, flat-tire-help |
| 5 Signs Your Car Battery is Dying | Maintenance | battery-boost |
| When to Call for a Tow vs. Fix it Yourself | Towing Advice | emergency-towing, flat-tire-help, fuel-delivery |
| Understanding Different Types of Towing Services | Towing Advice | emergency-towing, vehicle-transport, winching-extraction |

Categories are shown as badges on the blog index + article hero. We deliberately
do **not** create per-category index routes yet — with 6 posts they would be thin
(the engagement avoids thin/doorway pages). Revisit once a cluster has ~5+ posts.

## Internal linking (implemented)

- Article "Related Services & Areas" is derived from each post's topic (keywords/title) — no longer an identical static list.
- "More from Our Blog" is ranked by shared-keyword relevance, then recency.
- The footer "Service Areas" strip links all 12 location pages from every page.

## Backlog — high-intent articles (build only with accurate, first-hand content)

Priority order. Each maps to a distinct, non-duplicative search intent.

### Towing / cost (transactional-adjacent)
1. **How much does towing cost in Surrey / BC?** — informational + cost intent. Link: emergency-towing, contact. (No invented prices; explain the flat-rate model + what affects cost.)
2. **Flatbed vs. wheel-lift towing: which does your vehicle need?** — link: emergency-towing, vehicle-transport.
3. **Can electric vehicles (Tesla, Rivian) be towed? EV towing explained** — high-interest, EV owners. Link: emergency-towing.
4. **AWD / 4WD towing: why it must go on a flatbed** — link: emergency-towing, vehicle-transport.

### Accident / recovery
5. **What to do after a car accident in BC (step-by-step + ICBC)** — cite ICBC. Link: accident-recovery.
6. **Ditch, mud, and snow recovery: how winching works** — link: winching-extraction; cite DriveBC.

### Roadside
7. **Dead battery in cold weather: jump-start vs. replace** — link: battery-boost.
8. **Locked out of your car? Options and what a pro does** — link: lockout-service.
9. **Ran out of gas: what to do and does fuel delivery help** — link: fuel-delivery.

### Local (one per major market, only if genuinely unique)
10. **Common breakdown spots on Highway 1 / Highway 99 through the Lower Mainland** — link: emergency-towing + surrey/burnaby/langley locations.
11. **Winter driving on the Coquihalla / Sea-to-Sky: staying safe** — Seasonal; cite gov.bc.ca winter driving.

## Freshness / update strategy

- Set a post's `updatedDate` in `lib/blog-posts.ts` ONLY when its content is meaningfully revised — it drives `dateModified` + the visible "Updated" label. Never set a future date (guarded by `claims-check`).
- Review seasonal posts (winter prep, winter driving) before each October.

## Resolved

- The blog **newsletter form** (`app/blog/page.tsx`) — a static `<form>` with no handler — was **removed** in the polish pass (it sat directly above the phone CTA and misled users). If a real newsletter is wanted later, wire a mailing provider (e.g. Mailchimp or Resend Audiences) behind a dedicated, reCAPTCHA-protected endpoint — do not reuse the contact `/api/send-email` route.
