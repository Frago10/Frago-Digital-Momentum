import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : null;
const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  VERCEL_URL ||
  "https://frago10.github.io/Frago-Digital-Momentum"
).replace(/\/$/, "");

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
