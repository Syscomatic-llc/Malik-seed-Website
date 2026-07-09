import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_ORIGIN = "https://apimalikseed.syscomatic.cloud";

/**
 * Returns true when `cleanPath` (no leading slash) points to a file/folder
 * inside /public that should be served directly by Next.js.
 */
function isLocalStaticAsset(cleanPath: string): boolean {
  return (
    cleanPath.startsWith("images/") ||
    cleanPath.startsWith("favicons/") ||
    cleanPath.startsWith("assets/") ||
    /^[^/]+\.(svg|png|ico|jpg|jpeg|webp|gif)$/i.test(cleanPath)
  );
}

/** Build a `/api/image-proxy?url=…&w=…&q=…` URL. */
function buildProxyUrl(
  originUrl: string,
  width?: number,
  quality?: number,
): string {
  const params = new URLSearchParams({ url: originUrl });
  if (width) params.set("w", String(width));
  if (quality) params.set("q", String(quality));
  return `/api/image-proxy?${params.toString()}`;
}

/**
 * Resolve an image path coming from the CMS or static data:
 *
 * 1. Empty/undefined paths → returned as-is.
 * 2. Already proxied URLs → returned as-is.
 * 3. Absolute URLs (http/https/data) → returned as-is, except API origin URLs
 *    which are routed through the local `/api/image-proxy` endpoint.
 * 4. Local static paths (e.g. `/images/hero/hero-bg.png`) → returned with leading slash.
 * 5. API-origin paths (e.g. `uploads/homepage/image.png`) → routed through the local
 *    `/api/image-proxy` endpoint so the image is fetched once, resized, and disk-cached.
 */
export function resolveImageUrl(
  path?: string | null,
  width?: number,
  quality?: number,
): string {
  if (!path) return "";

  // Already routed through the proxy — do not wrap again.
  if (path.startsWith("/api/image-proxy") || path.startsWith("api/image-proxy")) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  // Absolute URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    // If the full URL points at the CMS backend origin, proxy it.
    if (path.startsWith(API_ORIGIN)) {
      return buildProxyUrl(path, width, quality);
    }
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Local static assets inside /public — serve directly from Next.js.
  if (isLocalStaticAsset(cleanPath)) {
    return `/${cleanPath}`;
  }

  // Everything else is a CMS-hosted media path — proxy it.
  const fullUrl = `${API_ORIGIN}/${cleanPath}`;
  return buildProxyUrl(fullUrl, width, quality);
}
