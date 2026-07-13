import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"
import { tools } from "@/data/tools"
import { categories } from "@/data/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ferramentas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/ferramentas/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...toolPages]
}
