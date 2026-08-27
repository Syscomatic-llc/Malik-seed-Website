import { MetadataRoute } from "next";
import { sitemapApi, parseSitemapXml } from "@/lib/api/sitemap";
import { newsApi } from "@/lib/api/newspage";
import { hiringApi } from "@/lib/api/hiring";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Try to fetch fully dynamic sitemap from CMS endpoint /api/v1/sitemap.xml
  try {
    const xml = await sitemapApi.getSitemapXml({
      revalidate: 3600,
      tags: ["sitemap", "seo"],
    });

    if (xml && xml.trim() !== "") {
      const dynamicEntries = parseSitemapXml(xml, BASE_URL);
      if (dynamicEntries.length > 0) {
        return dynamicEntries;
      }
    }
  } catch (error) {
    console.error(
      "Sitemap: Failed to fetch dynamic XML sitemap from CMS, using fallback generation:",
      error
    );
  }

  // 2. Fallback: Generate sitemap from static routes + dynamic news/careers
  const staticRoutes = [
    "",
    "/about",
    "/careers",
    "/careers/open-positions",
    "/contact",
    "/our-brands",
    "/our-brands/vegetable-seeds",
    "/our-brands/potato-seeds",
    "/our-brands/origene",
    "/our-brands/maliks-flower",
    "/our-brands/maliks-farm",
    "/our-brands/innovation-development",
    "/our-products",
    "/our-gallery",
    "/news",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/our-brands") ? 0.8 : 0.6,
  }));

  // Fetch dynamic news article routes
  try {
    const articles = await newsApi.getArticles({ limit: 100 }, { revalidate: 3600 });
    if (articles && Array.isArray(articles)) {
      articles.forEach((article) => {
        const slug = (article as any).slug || (article as any).article_slug;
        const rawDate =
          (article as any).updated_at ||
          (article as any).updatedAt ||
          (article as any).created_at;
        if (slug) {
          sitemapEntries.push({
            url: `${BASE_URL}/news/${slug}`,
            lastModified: rawDate ? new Date(rawDate) : new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
          });
        }
      });
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch news articles for sitemap", error);
  }

  // Fetch dynamic career routes
  try {
    const positions = await hiringApi.getPositions({}, { revalidate: 3600 });
    if (positions && Array.isArray(positions)) {
      positions.forEach((pos) => {
        if (pos.id) {
          sitemapEntries.push({
            url: `${BASE_URL}/careers/${pos.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
          });
        }
      });
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch jobs for sitemap", error);
  }

  return sitemapEntries;
}
