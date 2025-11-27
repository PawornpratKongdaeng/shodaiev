// app/sitemap.ts
import type { MetadataRoute } from "next";
import { loadSiteData } from "@/lib/server/siteData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shodaiev.com";

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const data = await loadSiteData();
  const topics = Array.isArray(data.topics) ? data.topics : [];

  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/page/product`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const t of topics) {
    urls.push({
      url: `${SITE_URL}/page/product/${encodeURIComponent(t.id)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return urls;
}
