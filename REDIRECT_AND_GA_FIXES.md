# Redirect and Google Analytics Fixes

## Date: June 1, 2026

## Issues Identified

### 1. Google Analytics Not Working
- **Problem**: Google Analytics tag (G-30WWS5SMCS) was not being detected by Google
- **Root Cause**: GA scripts were placed in `<head>` using regular `<script>` tags instead of Next.js `Script` component
- **Impact**: No analytics data being collected

### 2. Page Redirect Issues
- **Problem**: 30 pages showing "Page with redirect" error in Google Search Console
- **Root Cause**: Multiple redirect issues:
  - HTTP to HTTPS redirects not properly configured
  - Non-www to www redirects causing redirect chains
  - Inconsistent redirect handling across different layers (Vercel, Next.js)
- **Impact**: Pages not being indexed by Google (all showing "1970-01-01" last crawled date)

### 3. URL Indexing Issues
- **Problem**: Pages showing as "URL is unknown to Google"
- **Root Cause**: Redirect loops preventing Googlebot from successfully crawling pages
- **Impact**: Zero pages indexed in Google Search Console

---

## Fixes Applied

### 1. Google Analytics Fix

**Changed in `app/layout.tsx`:**
- Moved Google Analytics scripts from `<head>` to `<body>`
- Changed from regular `<script>` tags to Next.js `Script` component
- Added `strategy="afterInteractive"` for optimal loading
- Added unique `id="google-analytics"` to inline script

**Before:**
```tsx
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-30WWS5SMCS" />
  <script dangerouslySetInnerHTML={{...}} />
</head>
```

**After:**
```tsx
<body>
  <Script
    strategy="afterInteractive"
    src="https://www.googletagmanager.com/gtag/js?id=G-30WWS5SMCS"
  />
  <Script
    id="google-analytics"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{...}}
  />
</body>
```

**Why this works:**
- Next.js `Script` component optimizes script loading
- `afterInteractive` strategy loads scripts after page becomes interactive
- Placing in `<body>` ensures proper hydration and execution
- Unique `id` prevents duplicate script execution

---

### 2. Redirect Configuration - Three Layers

#### Layer 1: Next.js Middleware (`middleware.ts`)
**Created new file** to handle redirects at the application level:

```typescript
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const canonicalDomain = 'www.towingno1.com';
  
  // Redirect non-www and old domains to www
  if (hostname !== canonicalDomain) {
    url.host = canonicalDomain;
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // Ensure HTTPS in production
  if (url.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }
}
```

**Benefits:**
- Handles redirects before page rendering
- Works in development and production
- Single 301 redirect (no chains)

#### Layer 2: Next.js Config (`next.config.mjs`)
**Added redirect rules** to Next.js configuration:

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'towingno1.com' }],
      destination: 'https://www.towingno1.com/:path*',
      permanent: true,
    },
    // ... other domain variants
  ];
}
```

**Benefits:**
- Built-in Next.js redirect handling
- Automatic redirect optimization
- Works with static and dynamic routes

#### Layer 3: Vercel Config (`vercel.json`)
**Updated redirect rules** with proper syntax:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "towingno1.com" }],
      "destination": "https://www.towingno1.com/:path*",
      "permanent": true,
      "statusCode": 301
    }
  ]
}
```

**Changes made:**
- Changed `(.*)` to `:path*` (Vercel's proper syntax)
- Changed `$1` to `:path*` for path matching
- Added explicit `statusCode: 301`
- Removed redundant trailing slashes

**Benefits:**
- Edge-level redirects (fastest)
- Handles all traffic before reaching Next.js
- Explicit 301 status codes

---

## Redirect Flow

### Before (Problematic):
```
http://towingno1.com/services
  → http://www.towingno1.com/services (redirect 1)
  → https://www.towingno1.com/services (redirect 2)
  
Result: 2 redirects = redirect chain = indexing issues
```

### After (Fixed):
```
http://towingno1.com/services
  → https://www.towingno1.com/services (single 301 redirect)
  
Result: 1 redirect = clean = indexable
```

---

## Verification Steps

### 1. Test Google Analytics

**Method 1: Browser DevTools**
```bash
1. Open https://www.towingno1.com in Chrome
2. Open DevTools (F12) → Network tab
3. Filter by "gtag"
4. Refresh page
5. Look for: gtag/js?id=G-30WWS5SMCS (Status: 200)
```

**Method 2: Google Tag Assistant**
```bash
1. Install "Tag Assistant Legacy" Chrome extension
2. Visit https://www.towingno1.com
3. Click extension icon
4. Should show: "Google Analytics: G-30WWS5SMCS" with green checkmark
```

**Method 3: Real-time Reports**
```bash
1. Go to Google Analytics dashboard
2. Navigate to: Reports → Realtime → Overview
3. Open https://www.towingno1.com in another tab
4. Should see 1 active user in real-time report
```

### 2. Test Redirects

**Test non-www to www:**
```bash
curl -I http://towingno1.com
# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.towingno1.com/
```

**Test HTTPS redirect:**
```bash
curl -I http://www.towingno1.com
# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.towingno1.com/
```

**Test final destination:**
```bash
curl -I https://www.towingno1.com
# Should return:
# HTTP/2 200
```

### 3. Test All Pages

**Verify no redirect chains:**
```bash
# Test homepage
curl -IL https://www.towingno1.com | grep -E "HTTP|Location"

# Test service page
curl -IL https://www.towingno1.com/services | grep -E "HTTP|Location"

# Test location page
curl -IL https://www.towingno1.com/locations/surrey | grep -E "HTTP|Location"

# Expected output for all:
# HTTP/2 200 (no redirects)
```

---

## Google Search Console Actions

### 1. Request Re-indexing

After deploying these fixes:

1. **Go to Google Search Console**
   - URL: https://search.google.com/search-console

2. **Request indexing for key pages:**
   ```
   https://www.towingno1.com/
   https://www.towingno1.com/services
   https://www.towingno1.com/locations
   https://www.towingno1.com/locations/surrey
   https://www.towingno1.com/services/emergency-towing
   ```

3. **For each URL:**
   - Click "URL Inspection" at top
   - Paste URL
   - Click "Request Indexing"
   - Wait for confirmation

### 2. Validate Fixes

1. **Go to: Index → Pages**
2. **Click on "Page with redirect" issue**
3. **Click "Validate Fix"**
4. **Monitor validation progress** (takes 3-7 days)

### 3. Submit Sitemap

1. **Go to: Sitemaps**
2. **Add new sitemap:**
   ```
   https://www.towingno1.com/sitemap.xml
   ```
3. **Click "Submit"**
4. **Verify status shows "Success"**

---

## Expected Timeline

| Action | Timeline | Expected Result |
|--------|----------|-----------------|
| Deploy fixes | Immediate | Changes live on production |
| GA starts working | 1-2 hours | Real-time data in GA dashboard |
| Googlebot re-crawls | 1-3 days | Pages show recent crawl dates |
| Validation completes | 3-7 days | "Page with redirect" issue resolved |
| Pages indexed | 7-14 days | Pages appear in Google search |
| Full site indexed | 14-30 days | All 29 pages indexed |

---

## Monitoring

### Daily (First Week)
- Check Google Analytics real-time reports
- Monitor Google Search Console for crawl errors
- Check "Page with redirect" validation status

### Weekly (First Month)
- Review indexed pages count in GSC
- Check for new crawl errors
- Monitor organic search traffic in GA

### Monthly (Ongoing)
- Review overall indexing status
- Check for any new redirect issues
- Monitor site performance in search results

---

## Files Modified

1. **app/layout.tsx**
   - Moved GA scripts to body
   - Changed to Next.js Script component
   - Added proper strategy and IDs

2. **vercel.json**
   - Fixed redirect syntax (`:path*` instead of `(.*)`)
   - Added explicit statusCode: 301
   - Cleaned up redirect rules

3. **next.config.mjs**
   - Added async redirects() function
   - Configured domain redirects
   - Ensured proper permanent redirects

4. **middleware.ts** (NEW)
   - Created application-level redirect handler
   - Handles non-www to www
   - Ensures HTTPS in production

---

## Technical Details

### Why Three Layers?

1. **Vercel (Edge)**: Fastest, handles most traffic
2. **Next.js Config**: Backup, handles build-time redirects
3. **Middleware**: Runtime, handles dynamic cases

This redundancy ensures:
- No redirect chains
- Consistent behavior across environments
- Fallback if one layer fails

### Why Move GA to Body?

Next.js hydration works better with scripts in body:
- Scripts load after initial HTML
- No blocking of critical rendering path
- Better compatibility with React hydration
- Proper execution order guaranteed

---

## Troubleshooting

### If GA Still Not Working

1. **Check browser console for errors:**
   ```javascript
   // Open DevTools Console
   // Look for gtag errors
   ```

2. **Verify gtag is loaded:**
   ```javascript
   // In browser console:
   console.log(window.gtag);
   // Should show: function gtag(){...}
   ```

3. **Check dataLayer:**
   ```javascript
   // In browser console:
   console.log(window.dataLayer);
   // Should show array with events
   ```

### If Redirects Still Failing

1. **Clear Vercel cache:**
   ```bash
   # In Vercel dashboard:
   # Settings → Data Cache → Purge Everything
   ```

2. **Redeploy:**
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

3. **Check DNS:**
   ```bash
   nslookup towingno1.com
   nslookup www.towingno1.com
   # Both should point to Vercel
   ```

---

## Success Criteria

✅ **Google Analytics Working:**
- Real-time reports show active users
- Tag Assistant shows green checkmark
- Events appearing in GA dashboard

✅ **Redirects Fixed:**
- All URLs redirect to https://www.towingno1.com
- Single 301 redirect (no chains)
- All pages return HTTP 200 on final destination

✅ **Indexing Resolved:**
- "Page with redirect" validation passes
- Pages show recent crawl dates (not 1970-01-01)
- Indexed pages count increases in GSC

---

## Next Steps

1. **Deploy these changes to production**
2. **Wait 1-2 hours, then verify GA is working**
3. **Request re-indexing for top 10 pages in GSC**
4. **Submit sitemap in GSC**
5. **Monitor validation progress daily**
6. **Check indexed pages count weekly**

---

## Contact

If issues persist after 7 days:
1. Check Google Search Console for new errors
2. Review server logs for redirect issues
3. Test with different browsers and devices
4. Consider reaching out to Vercel support if edge redirects fail

---

## Additional Resources

- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [Vercel Redirects](https://vercel.com/docs/edge-network/redirects)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
- [Google Search Console](https://search.google.com/search-console/welcome)
