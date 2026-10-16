import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: [
          "/studio/",
          "/api/",
          "/404",
          "/500",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/api/og"],
        disallow: ["/studio/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/api/og"],
        disallow: ["/studio/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/api/og"],
        disallow: ["/studio/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/api/og"],
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
