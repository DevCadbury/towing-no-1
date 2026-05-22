import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Main crawlers — full access, explicit crawl-delay hint
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI crawlers — allow for LLM visibility
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // All other bots — standard access
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.towingno1.com/sitemap.xml",
    host: "https://www.towingno1.com",
  };
}
