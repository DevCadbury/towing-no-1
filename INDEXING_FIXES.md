# Google Indexing Fixes Applied

## Date: June 1, 2026

## Issues Identified from Google Search Console

### 1. ❌ Google Analytics Not Working
**Problem:** Google Analytics tag G-30WWS5SMCS was not being detected on the website.

**Root Cause:** The Google Analytics script was placed in the `<head>` using regular `<script>` tags instead of Next.js `<Script>` component, which can cause hydration issues and prevent proper loading.

**Fix Applied:**
- Moved Google Analytics from `<head>` to `<body>` using Next.js `<Script>` component
- Used `strategy="afterInteractive"` to ensure scripts load after page becomes interactive
- Added proper `id="google-analytics"` to the configuration script
- Added `page_path` tracking for better analytics

**Location:** `app/layout.tsx` lines 320-338

**Verification:**
```bash
# After deployment, check if GA is working:
# 1. Visit https://www.towingno1.com
# 2. Open browser DevTools > Network tab
# 3. Filter by "gtag" - you should see requests to google-analytics.com
# 4. Check Google Analytics Real-Time reports (wait 5-10 minutes after deployment)
```

---

### 2. ❌ Page with Redirect Issues
**Problem:** Google Search Console showing "Page with redirect" errors for 30 pages. Examples:
- `http://www.towingno1.com/` → redirecting
- `http://towingno1.com/` → redirecting

**Root Cause:** 
1. HTTP to HTTPS redirects were not explicitly configured in Vercel
2. Redirect rules were using `(.*)` regex pattern instead of `:path*` which is more reliable
3. Multiple redirect chains could occur (HTTP → HTTPS → www)

**Fix Applied:**

#### A. Updated `vercel.json` redirects:
```json
{
  "source": "/:path*",
  "has": [
    { "type": "header", "key": "x-forwarded-proto", "value": "http" }
  ],
  "destination": "https://www.towingno1.com/:path*",
  "permanent": true
}
```
- Added explicit HTTP to HTTPS redirect using `x-forwarded-proto` header
- Changed from `(.*)` to `:path*` for better path matching
- Ensures single redirect hop instead of multiple

#### B. Updated `next.config.mjs`:
```javascript
trailingSlash: false,
skipTrailingSlashRedirect: false,
```
- Explicitly set trailing slash behavior to prevent inconsistent URLs
- Ensures `/page` and `/page/` are handled consistently

**Location:** 
- `vercel.json` lines 6-28
- `next.config.mjs` lines 4-5

**Why This Matters:**
- Google penalizes pages with redirect chains
- Each redirect adds latency and can prevent indexing
- Consistent URL structure improves SEO

---

### 3. ⚠️ URLs Unknown to Google
**Problem:** All 29 pages showing "Last crawled: 1970-01-01" (never crawled) with status "Pending"

**Root Cause:**
1. Pages were just submitted to Google Search Console
2. Redirect issues were preventing Google from crawling
3. Sitemap may not have been properly submitted

**Fix Applied:**
1. Fixed redirect issues (see above)
2. Verified sitemap is accessible at `https://www.towingno1.com/sitemap.xml`
3. All URLs in sitemap use canonical `https://www.towingno1.com` format

**Next Steps Required:**
1. **Deploy these changes to Vercel**
2. **Wait 24-48 hours** for Google to re-crawl
3. **Request indexing** for key pages in Google Search Console:
   - Homepage: `https://www.towingno1.com`
   - Services: `https://www.towingno1.com/services`
   - Each location page
4. **Verify in Google Search Console:**
   - Go to URL Inspection tool
   - Enter each URL
   - Click "Request Indexing"

---

## Deployment Checklist

### Before Deployment
- [x] Google Analytics script moved to `<body>` with Next.js Script component
- [x] HTTP to HTTPS redirect added to `vercel.json`
- [x] Redirect patterns changed from `(.*)` to `:path*`
- [x] Trailing slash behavior configured in `next.config.mjs`
- [x] All URLs use `https://www.towingno1.com` format

### Deploy to Vercel
```bash
# Commit changes
git add .
git commit -m "Fix Google Analytics and redirect issues for indexing"
git push origin main

# Vercel will auto-deploy
# Or manually deploy:
vercel --prod
```

### After Deployment (Wait 5-10 minutes)

#### 1. Verify Google Analytics
```bash
# Visit your site
open https://www.towingno1.com

# Check DevTools > Network tab for:
# - gtag/js?id=G-30WWS5SMCS (should load)
# - collect requests to google-analytics.com

# Check Google Analytics:
# - Go to https://analytics.google.com
# - Select property G-30WWS5SMCS
# - Go to Reports > Realtime
# - You should see your visit
```

#### 2. Verify Redirects
```bash
# Test HTTP to HTTPS redirect
curl -I http://www.towingno1.com
# Should return: 301 or 308 redirect to https://www.towingno1.com

# Test non-www to www redirect
curl -I https://towingno1.com
# Should return: 301 or 308 redirect to https://www.towingno1.com

# Test final URL (should NOT redirect)
curl -I https://www.towingno1.com
# Should return: 200 OK (no redirect)
```

#### 3. Verify Sitemap
```bash
# Check sitemap is accessible
curl -I https://www.towingno1.com/sitemap.xml
# Should return: 200 OK

# Check robots.txt
curl https://www.towingno1.com/robots.txt
# Should show:
# Sitemap: https://www.towingno1.com/sitemap.xml
# Host: https://www.towingno1.com
```

#### 4. Request Indexing in Google Search Console

**Priority Pages (Request these first):**
1. `https://www.towingno1.com` (Homepage)
2. `https://www.towingno1.com/services` (Services overview)
3. `https://www.towingno1.com/locations` (Locations overview)
4. `https://www.towingno1.com/locations/surrey` (Main service area)
5. `https://www.towingno1.com/locations/vancouver`
6. `https://www.towingno1.com/services/emergency-towing`
7. `https://www.towingno1.com/services/battery-boost`
8. `https://www.towingno1.com/contact`

**How to Request Indexing:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (www.towingno1.com)
3. Use URL Inspection tool (top search bar)
4. Enter the URL
5. Click "Request Indexing"
6. Wait for confirmation

**Note:** You can only request ~10 URLs per day. Prioritize high-value pages.

---

## Expected Timeline

| Time | Expected Result |
|------|----------------|
| Immediately after deploy | Google Analytics starts tracking visits |
| 1-2 hours | Redirects working properly, no more redirect chains |
| 24-48 hours | Google re-crawls sitemap and discovers pages |
| 3-7 days | Priority pages start appearing in Google Search |
| 2-4 weeks | All 29 pages indexed and appearing in search results |

---

## Monitoring

### Daily (First Week)
1. Check Google Analytics for traffic
2. Check Google Search Console for crawl errors
3. Monitor "Page Indexing" report for status changes

### Weekly
1. Review "Performance" report in Search Console
2. Check which pages are getting impressions
3. Request indexing for any pages still showing "Discovered - currently not indexed"

### Monthly
1. Review overall search performance
2. Analyze which keywords are driving traffic
3. Optimize pages with low click-through rates

---

## Troubleshooting

### If Google Analytics Still Not Working
1. Check browser console for errors
2. Verify G-30WWS5SMCS is the correct property ID
3. Check if ad blockers are interfering
4. Wait 24 hours for data to appear in reports

### If Pages Still Not Indexed After 2 Weeks
1. Check for crawl errors in Search Console
2. Verify robots.txt is not blocking pages
3. Check if pages have "noindex" meta tags
4. Ensure pages return 200 status code
5. Request indexing again for problem pages

### If Redirect Errors Persist
1. Check Vercel deployment logs
2. Verify vercel.json was deployed correctly
3. Test redirects with curl (see verification steps above)
4. Clear Vercel cache: `vercel --prod --force`

---

## Files Modified

1. **app/layout.tsx**
   - Moved Google Analytics to body with Script component
   - Already had proper canonical URLs (https://www.towingno1.com)

2. **vercel.json**
   - Added HTTP to HTTPS redirect
   - Changed redirect patterns from `(.*)` to `:path*`
   - Maintained all security headers

3. **next.config.mjs**
   - Added `trailingSlash: false`
   - Added `skipTrailingSlashRedirect: false`

4. **app/robots.ts** (no changes needed)
   - Already configured correctly with sitemap URL
   - Already using canonical domain

5. **app/sitemap.ts** (no changes needed)
   - Already using https://www.towingno1.com
   - All 29 pages included

---

## Summary

✅ **Fixed:** Google Analytics implementation
✅ **Fixed:** HTTP to HTTPS redirects
✅ **Fixed:** Redirect chain issues
✅ **Fixed:** Trailing slash inconsistencies
⏳ **Pending:** Google to crawl and index pages (requires deployment + 24-48 hours)

**Next Action:** Deploy to Vercel and follow the "After Deployment" checklist above.
