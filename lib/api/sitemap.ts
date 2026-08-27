import { MetadataRoute } from "next";
import { apiGetText, RequestOptions } from "./client";

/**
 * Parses XML sitemap text into Next.js MetadataRoute.Sitemap array.
 * Replaces CMS backend domain in <loc> with canonical frontend siteUrl.
 */
export function parseSitemapXml(
  xml: string,
  siteUrl: string
): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];
  if (!xml || typeof xml !== "string") return sitemap;

  const urlBlocks = xml.match(/<url>([\s\S]*?)<\/url>/gi);
  if (!urlBlocks) return sitemap;

  const cleanSiteUrl = siteUrl.replace(/\/$/, "");

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([\s\S]*?)<\/loc>/i);
    const lastmodMatch = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/i);
    const changefreqMatch = block.match(/<changefreq>([\s\S]*?)<\/changefreq>/i);
    const priorityMatch = block.match(/<priority>([\s\S]*?)<\/priority>/i);

    if (!locMatch || !locMatch[1]) continue;

    const rawLoc = locMatch[1].trim();
    let normalizedUrl = rawLoc;

    try {
      if (rawLoc.startsWith("http://") || rawLoc.startsWith("https://")) {
        const parsed = new URL(rawLoc);
        const pathAndQuery = `${parsed.pathname}${parsed.search}`;
        normalizedUrl = `${cleanSiteUrl}${pathAndQuery === "/" ? "" : pathAndQuery}`;
      } else {
        const cleanPath = rawLoc.startsWith("/") ? rawLoc : `/${rawLoc}`;
        normalizedUrl = `${cleanSiteUrl}${cleanPath === "/" ? "" : cleanPath}`;
      }
    } catch {
      normalizedUrl = rawLoc;
    }

    let lastModified: Date | undefined = undefined;
    if (lastmodMatch && lastmodMatch[1]) {
      const parsedDate = new Date(lastmodMatch[1].trim());
      if (!isNaN(parsedDate.getTime())) {
        lastModified = parsedDate;
      }
    }

    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      undefined;
    if (changefreqMatch && changefreqMatch[1]) {
      const freq = changefreqMatch[1].trim().toLowerCase();
      const validFreqs: Array<
        MetadataRoute.Sitemap[number]["changeFrequency"]
      > = [
        "always",
        "hourly",
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "never",
      ];
      if (validFreqs.includes(freq as any)) {
        changeFrequency = freq as any;
      }
    }

    let priority: number | undefined = undefined;
    if (priorityMatch && priorityMatch[1]) {
      const p = parseFloat(priorityMatch[1].trim());
      if (!isNaN(p) && p >= 0 && p <= 1) {
        priority = p;
      }
    }

    sitemap.push({
      url: normalizedUrl,
      ...(lastModified ? { lastModified } : {}),
      ...(changeFrequency ? { changeFrequency } : {}),
      ...(priority !== undefined ? { priority } : {}),
    });
  }

  return sitemap;
}

export const sitemapApi = {
  /**
   * Fetches raw XML sitemap from CMS backend endpoint /api/v1/sitemap.xml
   */
  getSitemapXml(options?: RequestOptions): Promise<string> {
    return apiGetText("/api/v1/sitemap.xml", options);
  },
};
