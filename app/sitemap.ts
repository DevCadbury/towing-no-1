import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts'
import { serviceAreas } from '@/lib/service-areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://towing-no-1.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsedDate = new Date(post.date)

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  const locationRoutes: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/locations/${area.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...locationRoutes, ...blogRoutes]
}
