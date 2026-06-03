import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://frago10.github.io/Frago-Digital-Momentum";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview/"], // hide internal explorations from crawlers
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
