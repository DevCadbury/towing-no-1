import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Main crawlers — full access
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI crawlers — allow for LLM / AI-search visibility
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Meta-ExternalAgent",
          "cohere-ai",
          "YouBot",
        ],
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
    // host is a Yandex-only directive — omitted to avoid the malformed
    // "host: https://..." that previously appeared in the live robots.txt.
  };
}
