import { Metadata } from "next";
import { apiGet, RequestOptions } from "./client";
import { settingsApi } from "./settings";
import { ApiPageSeo } from "./types";

/**
 * Normalizes relative image URLs to absolute ones pointing to the CMS backend,
 * ensuring social media scrapers (Facebook, Twitter, etc.) can fetch them.
 */
function normalizeImageUrl(url: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = process.env.API_BACKEND_URL;
  if (!base) {
    return url;
  }
  // Remove /api/v1 from the end of the base URL to get the root origin
  const rootOrigin = base.replace(/\/api\/v1\/?$/, "");
  return `${rootOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const seoApi = {
  /**
   * Fetches SEO metadata for a given page path from the CMS.
   */
  async getPageSeo(pagePath: string, options?: RequestOptions): Promise<ApiPageSeo | null> {
    try {
      // Clean up multiple slashes or leading/trailing spaces if any
      let path = pagePath.trim();
      
      // Query the dynamic page SEO endpoint. Encode path to handle slashes correctly.
      const data = await apiGet<ApiPageSeo>(`/api/v1/page-seo/${encodeURIComponent(path)}`, options);
      return data;
    } catch (error) {
      // Silence expected 404s for pages not configured in the CMS yet
      // console.warn(`No page SEO configured for path: ${pagePath}`);
      return null;
    }
  },
};

/**
 * Resolves the final Next.js Metadata object by merging custom CMS SEO data with fallbacks.
 * Ensures openGraph.siteName is always included for social preview cards (Discord, Twitter, etc.).
 */
export async function getPageMetadata(
  pagePath: string,
  fallback: Metadata,
  options?: RequestOptions
): Promise<Metadata> {
  const [seoData, settings] = await Promise.all([
    seoApi.getPageSeo(pagePath, options),
    settingsApi.getSettings(options).catch(() => null),
  ]);

  const siteName =
    (fallback.openGraph as any)?.siteName ||
    settings?.siteName ||
    "Malik Seeds";

  const siteTagline = settings?.siteTagline || "";
  const defaultRootTitle = siteTagline ? `${siteName} - ${siteTagline}` : siteName;
  const defaultRootDescription = settings?.siteDescription || "";

  const resolvedFallbackTitle =
    typeof fallback.title === "string"
      ? fallback.title
      : (fallback.title as any)?.absolute ||
        (fallback.title as any)?.default ||
        "";

  const isRootPage = pagePath === "/";

  const title =
    seoData?.meta_title ||
    seoData?.title ||
    resolvedFallbackTitle ||
    (isRootPage ? defaultRootTitle : siteName);

  const description =
    seoData?.meta_description ||
    (fallback.description as string) ||
    (isRootPage ? defaultRootDescription : "");

  // Format keywords: support string (split/clean) or keep as array if fallback has it
  let keywords: string | string[] = fallback.keywords || "";
  if (seoData?.meta_keywords) {
    keywords = seoData.meta_keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
  }

  const ogTitle =
    seoData?.og_title || (fallback.openGraph as any)?.title || title;
  const ogDescription =
    seoData?.og_description ||
    (fallback.openGraph as any)?.description ||
    description;

  const defaultOgImage = settings?.logoUrl || "";
  const ogImageUrl = seoData?.og_image
    ? normalizeImageUrl(seoData.og_image)
    : (Array.isArray((fallback.openGraph as any)?.images)
        ? (fallback.openGraph as any).images[0]?.url || (fallback.openGraph as any).images[0]
        : defaultOgImage);

  // Deeply merge fallback metadata to retain viewport, manifest, icons, etc.
  const resolvedMetadata: Metadata = {
    ...fallback,
    title,
    description: description || undefined,
    keywords,
    openGraph: {
      siteName,
      ...fallback.openGraph,
      title: ogTitle,
      description: ogDescription || undefined,
      type: (fallback.openGraph as any)?.type || "website",
    },
    twitter: {
      ...fallback.twitter,
      title: ogTitle,
      description: ogDescription || undefined,
      card: (fallback.twitter as any)?.card || "summary_large_image",
    },
  };

  if (ogImageUrl) {
    if (resolvedMetadata.openGraph) {
      resolvedMetadata.openGraph.images = [
        {
          url: ogImageUrl,
          alt: title,
        },
      ];
    }
    if (resolvedMetadata.twitter) {
      resolvedMetadata.twitter.images = [ogImageUrl];
    }
  }

  return resolvedMetadata;
}
