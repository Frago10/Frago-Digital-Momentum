import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/cases";

export const dynamic = "force-static";

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : null;
const BASE = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  VERCEL_URL ||
  "https://frago10.github.io/Frago-Digital-Momentum"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${BASE}/work/${c.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
