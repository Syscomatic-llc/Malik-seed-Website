/**
 * Resolves the canonical base URL of the site.
 * Priority:
 * 1. process.env.NEXT_PUBLIC_SITE_URL (Explicit configuration, e.g. https://malikseed.com)
 * 2. process.env.VERCEL_URL (Automatic Vercel deployment hostname, prefixed with https://)
 * 3. Fallback: "http://localhost:3000" (Local development)
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url.replace(/\/$/, "");
    }
    return `https://${url}`.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
