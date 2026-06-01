# 🚀 Deployment Guide - Google Indexing Fixes

## Quick Start

### 1. Deploy to Vercel
```bash
git add .
git commit -m "Fix Google Analytics and redirect issues for indexing"
git push origin main
```

Vercel will automatically deploy. Wait 2-3 minutes for deployment to complete.

### 2. Verify Deployment
```bash
npm run verify:deployment
```

This will check:
- ✅ Google Analytics is loading
- ✅ Redirects are working (HTTP→HTTPS, non-www→www)
- ✅ Sitemap is accessible
- ✅ robots.txt is configured correctly

### 3. Request Indexing in Google Search Console

**Priority Pages (Request these first):**

1. Homepage: `https://www.towingno1.com`
2. Services: `https://www.towingno1.com/services`
3. Locations: `https://www.towingno1.com/locations`
4. Surrey: `https://www.towingno1.com/locations/surrey`
5. Vancouver: `https://www.towingno1.com/locations/vancouver`
6. Emergency Towing: `https://www.towingno1.com/services/emergency-towing`
7. Battery Boost: `https://www.towingno1.com/services/battery-boost`
8. Contact: `https://www.towingno1.com/contact`

**How to Request:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click the search bar at top (URL Inspection)
3. Paste the URL
4. Click "Request Indexing"
5. Wait for confirmation (takes 1-2 minutes per URL)

**Note:** Google limits ~10 indexing requests per day. Spread them out if needed.

---

## What Was Fixed

### ✅ Google Analytics (G-30WWS5SMCS)
**Problem:** Tag wasn't being detected

**Solution:**
- Moved from `<head>` to `<body>` using Next.js `<Script>` component
- Used `strategy="afterInteractive"` for proper loading
- Added proper configuration with page tracking

**File:** `app/layout.tsx`

### ✅ Redirect Issues
**Problem:** Pages showing "Page with redirect" errors

**Solution:**
- Added explicit HTTP→HTTPS redirect in `vercel.json`
- Changed redirect patterns from `(.*)` to `:path*`
- Configured trailing slash behavior in `next.config.mjs`
- Eliminated redirect chains

**Files:** `vercel.json`, `next.config.mjs`

### ✅ URL Structure
**Problem:** Inconsistent URLs causing indexing issues

**Solution:**
- All URLs now use canonical format: `https://www.towingno1.com`
- Single redirect hop for all variations
- Consistent trailing slash handling

---

## Verification Steps

### After Deployment (5-10 minutes)

#### 1. Test Google Analytics
```bash
# Visit your site
# Open DevTools > Network tab
# Look for: gtag/js?id=G-30WWS5SMCS
# Should see requests to google-analytics.com
```

Or use the automated script:
```bash
npm run verify:deployment
```

#### 2. Test Redirects Manually
```bash
# HTTP to HTTPS
curl -I http://www.towingno1.com
# Should return: 301/308 → https://www.towingno1.com

# Non-www to www
curl -I https://towingno1.com
# Should return: 301/308 → https://www.towingno1.com

# Canonical (should NOT redirect)
curl -I https://www.towingno1.com
# Should return: 200 OK
```

#### 3. Check Google Analytics Real-Time
1. Go to [Google Analytics](https://analytics.google.com)
2. Select property G-30WWS5SMCS
3. Go to Reports > Realtime
4. Visit your site in another tab
5. You should see your visit appear within 10 seconds

---

## Timeline

| Time | Expected Result |
|------|----------------|
| **Immediately** | Google Analytics tracking starts |
| **1-2 hours** | Redirects fully propagated |
| **24-48 hours** | Google re-crawls sitemap |
| **3-7 days** | Priority pages indexed |
| **2-4 weeks** | All 29 pages indexed |

---

## Monitoring

### Daily (First Week)
- [ ] Check Google Analytics for traffic
- [ ] Check Search Console for crawl errors
- [ ] Monitor "Page Indexing" report

### Weekly
- [ ] Review "Performance" report
- [ ] Check which pages have impressions
- [ ] Request indexing for "Discovered - not indexed" pages

### Monthly
- [ ] Review overall search performance
- [ ] Analyze keyword performance
- [ ] Optimize low-performing pages

---

## Troubleshooting

### Google Analytics Not Working?

**Check:**
1. Is G-30WWS5SMCS the correct property ID?
2. Are ad blockers interfering? (test in incognito)
3. Check browser console for errors
4. Wait 24 hours for data to appear in reports

**Fix:**
```bash
# Re-run verification
npm run verify:deployment

# Check if script is in HTML
curl https://www.towingno1.com | grep "G-30WWS5SMCS"
```

### Pages Still Not Indexed After 2 Weeks?

**Check:**
1. Go to Search Console > Page Indexing
2. Look for specific error messages
3. Use URL Inspection tool for details

**Common Issues:**
- "Discovered - currently not indexed" → Request indexing again
- "Crawled - currently not indexed" → Improve content quality
- "Page with redirect" → Check redirects with curl
- "Soft 404" → Add more content to the page

**Fix:**
```bash
# Verify redirects are working
npm run verify:deployment

# Check specific page
curl -I https://www.towingno1.com/services/battery-boost
# Should return: 200 OK (no redirect)
```

### Redirect Errors Persist?

**Check:**
1. Verify deployment completed successfully
2. Check Vercel deployment logs
3. Clear Vercel cache

**Fix:**
```bash
# Force new deployment
vercel --prod --force

# Or via git
git commit --allow-empty -m "Force redeploy"
git push origin main
```

---

## Files Modified

| File | Changes |
|------|---------|
| `app/layout.tsx` | Google Analytics moved to body with Script component |
| `vercel.json` | Added HTTP→HTTPS redirect, updated patterns |
| `next.config.mjs` | Added trailing slash configuration |
| `package.json` | Added `verify:deployment` script |
| `scripts/verify-deployment.mjs` | New verification script |

---

## Support Resources

### Google Search Console
- [URL Inspection Tool](https://search.google.com/search-console)
- [Page Indexing Report](https://search.google.com/search-console/index)
- [Sitemaps Report](https://search.google.com/search-console/sitemaps)

### Google Analytics
- [Real-Time Reports](https://analytics.google.com)
- [Property: G-30WWS5SMCS](https://analytics.google.com)

### Documentation
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Vercel Redirects](https://vercel.com/docs/edge-network/redirects)
- [Google Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)

---

## Success Criteria

✅ **Deployment Successful When:**
- [ ] `npm run verify:deployment` passes all checks
- [ ] Google Analytics shows real-time visitors
- [ ] No redirect chains (single hop only)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt shows correct sitemap URL

✅ **Indexing Successful When:**
- [ ] Pages show "Indexed" status in Search Console
- [ ] Pages appear in Google search results
- [ ] No crawl errors in Search Console
- [ ] Impressions showing in Performance report

---

## Next Steps After Indexing

1. **Set up Google Business Profile**
   - Claim your business listing
   - Add photos and business hours
   - Link to your website

2. **Monitor Performance**
   - Track keyword rankings
   - Analyze click-through rates
   - Identify top-performing pages

3. **Optimize Content**
   - Update pages with low CTR
   - Add more location-specific content
   - Create more blog posts

4. **Build Backlinks**
   - List in local directories
   - Partner with local businesses
   - Create shareable content

---

## Questions?

If you encounter issues not covered here:

1. Check `INDEXING_FIXES.md` for detailed technical information
2. Review Vercel deployment logs
3. Use Google Search Console's URL Inspection tool
4. Check browser console for JavaScript errors

---

**Last Updated:** June 1, 2026
**Status:** Ready for deployment ✅
