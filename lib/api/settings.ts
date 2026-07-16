import { apiGet, RequestOptions } from "./client";
import { ApiSiteSettings, SiteSettings } from "./types";

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Malik Seeds",
  siteTagline: "Helping Farmers Grow with Confidence Since 1969",
  siteDescription: "Malik Seeds has been empowering farmers with high-quality seed varieties since 1969. Discover our products, success stories, and agricultural innovations.",
  logoUrl: "",
  googleAnalyticsId: "",
  googleSearchConsoleVerification: "",
  maintenanceMode: false,
};

export function extractVerificationCode(value: string | null): string {
  if (!value) return "";
  // Check if it's a full meta tag, e.g. <meta name="google-site-verification" content="CODE" />
  const match = value.match(/content="([^"]+)"/i);
  if (match) {
    return match[1];
  }
  return value.trim();
}

function normalizeLogoUrl(url: string | null): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // The API_BACKEND_URL or NEXT_PUBLIC_API_BASE_URL can serve as the root origin
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BACKEND_URL;
  // Remove /api/v1 from the end of the base URL to point to the host root
  const rootOrigin = base?.replace(/\/api\/v1\/?$/, "");
  return `${rootOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const settingsApi = {
  async getSettings(options?: RequestOptions): Promise<SiteSettings> {
    try {
      const data = await apiGet<ApiSiteSettings>("/api/v1/site-settings", options);
      if (!data) return DEFAULT_SETTINGS;

      return {
        siteName: data.site_name || DEFAULT_SETTINGS.siteName,
        siteTagline: data.site_tagline || DEFAULT_SETTINGS.siteTagline,
        siteDescription: data.site_description || DEFAULT_SETTINGS.siteDescription,
        logoUrl: normalizeLogoUrl(data.logo_url),
        googleAnalyticsId: data.google_analytics_id || "",
        googleSearchConsoleVerification: extractVerificationCode(data.google_search_console_verification),
        maintenanceMode: !!data.maintenance_mode,
      };
    } catch (error) {
      console.error("Failed to fetch site settings from CMS API, falling back to default settings:", error);
      return DEFAULT_SETTINGS;
    }
  },
};
