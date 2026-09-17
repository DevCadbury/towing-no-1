# Performance / Core Web Vitals notes — TowingNo.1

Field CWV (LCP/INP/CLS) can only be measured on the live site — run PageSpeed
Insights (mobile + desktop) and check CrUX (see EXTERNAL_SEO_CHECKLIST.md). This
file records the code-level posture verified locally and the remaining
recommendations.

## Verified good (no change needed)

- **Rendering:** static/SSG (43 prerendered routes) → fast TTFB from the Vercel CDN.
- **Images:** every image uses `next/image` (no raw `<img>` → no dimensionless CLS).
  `next.config.mjs` serves AVIF/WebP with `deviceSizes`/`imageSizes` and quality 75/90,
  so delivered images are optimized regardless of source size.
- **LCP:** hero (`/background_home.png`), service/blog hero images, and the services
  hero use `priority` + `sizes` (next/image emits a high-priority preload).
- **Fonts:** `next/font` (Outfit) self-hosts + `display: swap` (no CLS, no external
  render-blocking request). All 7 loaded weights (300–900) are in use
  (`font-light` in About/Contact, `font-black` on 404), so none were trimmed.
- **Third-party scripts:** GA4, Google Ads, Reamaze, and EmbedSocial load via
  `next/script strategy="afterInteractive"` (non-blocking). GTM + AdSense load async.

## Done in this pass

- Removed an orphaned **1.8 MB** junk asset served at `/.png` (unreferenced,
  malformed filename).

## Completed in the polish pass (see `SEO_CHANGE_LOG.md` → POLISH)

- **Compressed `public/blog/when-to-call-tow.jpg`:** re-encoded in place at JPEG
  q82, **1.6 MB → 144 KB** (kept 1200×1500; no visible quality loss). All blog
  images are now 89–144 KB.
- **Favicon:** replaced the raw 307 KB `/logo.png` favicon with file-convention
  icons — `app/icon.png` (128×128, 18 KB) + `app/apple-icon.png` (180×180 on brand
  navy, 24 KB); removed the redundant `metadata.icons` and manual `<head>` icon
  tags so Next.js auto-generates the `<link>`s (`/icon.png`, `/apple-icon.png`).
- **Desktop floating elements:** the FloatingCallButton is now pinned bottom-LEFT at
  every breakpoint, so it no longer overlaps the bottom-right Reamaze chat widget.

## Remaining recommendation (owner decision)

- **Unused assets** (verified unreferenced, safe to delete): `public/preview copy.jpg`
  (146 KB), `public/image/Roadside_Assistanc.png` (98 KB). Left in place pending owner
  confirmation.

## AdSense vs. conversion tradeoff (kept — documented, not removed)

The site loads Google AdSense (`ca-pub-2962382436663193`). On a lead-gen emergency
towing site the primary conversion is the phone call, and display ads (especially
Auto Ads) can (a) compete visually with the "Call Now" CTA and (b) introduce CLS/LCP
cost by injecting late-loading ad slots. Per the engagement constraints AdSense was
**not removed**. Recommendation for the owner: evaluate whether AdSense revenue
justifies the conversion/CWV cost, and if kept, constrain ad placements away from the
hero and primary CTA and reserve fixed slot sizes to avoid layout shift.
