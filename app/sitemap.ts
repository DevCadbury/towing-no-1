import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { serviceAreas } from "@/lib/service-areas";
import { postDateISO } from "@/lib/post-dates";

/**
 * Fixed <lastmod> per route: the date of the last commit that changed the
 * route's own source files (`git log -1 --format=%cs -- <files>`), so the
 * sitemap no longer reports the build time on every deploy. Update the date
 * of a route when its content changes.
 *
 * Dates refreshed 2026-11-25 for the routes changed on the SEO branch
 * (A-050): `git log -1 --format=%cs` at f109b27; `/services/accident-recovery`
 * and `/services/winching-extraction` carry the wave-4 linking commit date.
 *
 * Dates refreshed 2026-11-25 for wave 5 (A-247): `git log -1 --format=%cs`
 * at 1f74d44. `/`, `/services`, `/about`, `/contact`, `/terms` and the 11
 * service routes (incl. the new `/services/underground-parking-towing`)
 * → 51fb838; `/locations` and the 12 location routes → 1f74d44. `/blog` and
 * `/privacy` unchanged (5e00eff).
 *
 * Source files per route (read 2026-11-24 at 96c9dd9):
 * - `/` app/page.tsx, components/HomeContent.tsx
 * - `/about` app/about/page.tsx, components/AboutContent.tsx
 * - `/contact` app/contact/page.tsx, components/ContactContent.tsx
 * - `/services`, `/blog`, `/locations`, `/privacy`, `/terms`, `/services/<slug>`:
 *   the route's page.tsx
 * - `/locations/<city>` app/locations/[city]/page.tsx, lib/service-areas.ts
 *   (plus components/SurreyPage.tsx for surrey, components/LangleyPage.tsx
 *   for langley)
 */
const ROUTE_LASTMOD: Record<string, string> = {
  "/": "2026-11-25",
  "/services": "2026-11-25",
  "/about": "2026-11-25",
  "/contact": "2026-11-25",
  "/blog": "2026-11-24",
  "/locations": "2026-11-25",
  "/privacy": "2026-11-24",
  "/terms": "2026-11-25",
  "/services/emergency-towing": "2026-11-25",
  "/services/battery-boost": "2026-11-25",
  "/services/lockout-service": "2026-11-25",
  "/services/flat-tire-help": "2026-11-25",
  "/services/fuel-delivery": "2026-11-25",
  "/services/winching-extraction": "2026-11-25",
  "/services/vehicle-transport": "2026-11-25",
  "/services/accident-recovery": "2026-11-25",
  "/services/roadside-assistance": "2026-11-25",
  "/services/cross-border-towing": "2026-11-25",
  "/services/underground-parking-towing": "2026-11-25",
  "/locations/surrey": "2026-11-25",
  "/locations/langley": "2026-11-25",
  "/locations/burnaby": "2026-11-25",
  "/locations/coquitlam": "2026-11-25",
  "/locations/richmond": "2026-11-25",
  "/locations/white-rock": "2026-11-25",
  "/locations/vancouver": "2026-11-25",
  "/locations/delta": "2026-11-25",
  "/locations/maple-ridge": "2026-11-25",
  "/locations/cloverdale": "2026-11-25",
  "/locations/south-surrey": "2026-11-25",
  "/locations/aldergrove": "2026-11-25",
};

// Used only for a route missing from ROUTE_LASTMOD: the latest date in the
// map, never the build time.
const FALLBACK_LASTMOD = Object.values(ROUTE_LASTMOD).sort().reverse()[0];

function lastmodFor(path: string): string {
  return ROUTE_LASTMOD[path] ?? FALLBACK_LASTMOD;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.towingno1.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastmodFor("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastmodFor("/services"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastmodFor("/about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastmodFor("/contact"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastmodFor("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: lastmodFor("/locations"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastmodFor("/privacy"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastmodFor("/terms"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Individual service pages
  const servicePageRoutes: MetadataRoute.Sitemap = [
    "emergency-towing",
    "battery-boost",
    "lockout-service",
    "flat-tire-help",
    "fuel-delivery",
    "winching-extraction",
    "vehicle-transport",
    "accident-recovery",
    "roadside-assistance",
    "cross-border-towing",
    "underground-parking-towing",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: lastmodFor(`/services/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Same helper as the post's BlogPosting/Open Graph dates (lib/post-dates.ts):
  // calendar date at 12:00 UTC, future dates clamped; updatedDate wins.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: postDateISO(post.updatedDate ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // serviceAreas is ordered by AREA_PRIORITY (lib/service-areas.ts). Reflect that
  // ranking in the sitemap priority with a gentle 0.90 → 0.70 gradient so the
  // highest-priority cities carry the strongest signal.
  const locationRoutes: MetadataRoute.Sitemap = serviceAreas.map((area, index) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: lastmodFor(`/locations/${area.slug}`),
    changeFrequency: "weekly" as const,
    priority: Math.max(0.7, Math.round((0.9 - index * 0.02) * 100) / 100),
  }));

  return [...staticRoutes, ...servicePageRoutes, ...locationRoutes, ...blogRoutes];
}
