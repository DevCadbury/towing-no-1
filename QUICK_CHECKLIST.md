# ✅ Quick Deployment Checklist

## Pre-Deployment
- [x] Google Analytics script updated in `app/layout.tsx`
- [x] HTTP→HTTPS redirect added to `vercel.json`
- [x] Redirect patterns updated (`:path*` instead of `(.*)`)
- [x] Trailing slash config added to `next.config.mjs`
- [x] All URLs use `https://www.towingno1.com` format

## Deploy
```bash
git add .
git commit -m "Fix Google Analytics and redirect issues for indexing"
git push origin main
```

⏱️ **Wait 2-3 minutes for Vercel deployment**

## Verify (5-10 minutes after deploy)
```bash
npm run verify:deployment
```

Expected output:
- ✅ Google Analytics script found
- ✅ Google Analytics config found
- ✅ HTTP to HTTPS redirect working
- ✅ Non-www to www redirect working
- ✅ Canonical URL returns 200 OK
- ✅ Sitemap accessible
- ✅ robots.txt configured

## Request Indexing (Day 1)

### Priority 1 (Request immediately)
- [ ] `https://www.towingno1.com` (Homepage)
- [ ] `https://www.towingno1.com/services` (Services)
- [ ] `https://www.towingno1.com/locations` (Locations)
- [ ] `https://www.towingno1.com/locations/surrey` (Main area)
- [ ] `https://www.towingno1.com/locations/vancouver`

### Priority 2 (Request next day)
- [ ] `https://www.towingno1.com/services/emergency-towing`
- [ ] `https://www.towingno1.com/services/battery-boost`
- [ ] `https://www.towingno1.com/services/lockout-service`
- [ ] `https://www.towingno1.com/services/flat-tire-help`
- [ ] `https://www.towingno1.com/contact`

### Priority 3 (Request day 3-4)
- [ ] All other location pages
- [ ] All other service pages
- [ ] Blog pages
- [ ] About page

**How to Request:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Use URL Inspection tool (search bar at top)
3. Paste URL → Click "Request Indexing"
4. Limit: ~10 requests per day

## Monitor

### Day 1-2
- [ ] Check Google Analytics real-time (should see visits immediately)
- [ ] Verify no new crawl errors in Search Console

### Day 3-7
- [ ] Check "Page Indexing" report daily
- [ ] Look for status changes from "Pending" to "Indexed"
- [ ] Request indexing for any "Discovered - not indexed" pages

### Week 2-4
- [ ] Monitor "Performance" report for impressions
- [ ] Check which pages are getting clicks
- [ ] Optimize pages with low CTR

## Success Indicators

✅ **Immediate (0-1 hour)**
- Google Analytics tracking visits
- No redirect chains
- All verification checks pass

✅ **Short-term (1-7 days)**
- Pages showing "Indexed" in Search Console
- Impressions appearing in Performance report
- No crawl errors

✅ **Long-term (2-4 weeks)**
- All 29 pages indexed
- Consistent organic traffic
- Pages ranking for target keywords

## Troubleshooting Quick Fixes

### GA not working?
```bash
curl https://www.towingno1.com | grep "G-30WWS5SMCS"
# Should find the script
```

### Redirects not working?
```bash
curl -I http://www.towingno1.com
# Should return 301/308 to https://www.towingno1.com
```

### Pages not indexing?
1. Check Search Console for specific errors
2. Use URL Inspection tool
3. Request indexing again
4. Wait 48 hours and check again

## Important Links

- **Search Console:** https://search.google.com/search-console
- **Analytics:** https://analytics.google.com (Property: G-30WWS5SMCS)
- **Your Site:** https://www.towingno1.com
- **Sitemap:** https://www.towingno1.com/sitemap.xml

## Files to Reference

- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `INDEXING_FIXES.md` - Technical details of all fixes
- `GOOGLE_INDEXING_GUIDE.md` - Original indexing guide

---

**Status:** Ready to deploy ✅
**Next Action:** Run deployment commands above
