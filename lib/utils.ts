import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isHtmlContent(str?: string | null): boolean {
  if (!str) return false;
  return /<[a-z][\s\S]*>/i.test(str);
}

/**
 * Validates Bangladeshi mobile phone numbers:
 * Accepts formats like:
 * - 01712345678 (11 digits starting with 013-019)
 * - +8801712345678 or 8801712345678 (with country code)
 * - Allows spaces and hyphens e.g. "+880 1712-345678" or "01712 345678"
 */
export function isValidBangladeshiPhone(phone?: string | null): boolean {
  if (!phone) return false;
  const clean = phone.trim().replace(/[\s\-\(\)]/g, "");
  return /^(?:\+88|88)?01[3-9]\d{8}$/.test(clean);
}

export {
  formatRichText,
  formatRichTextWithHeadings,
  type FormatRichTextOptions,
  type FormatRichTextResult,
  type HeadingItem,
  type RichTextMode,
} from "./rich-text-formatter";
import { formatRichText, type FormatRichTextOptions } from "./rich-text-formatter";

export function cleanHtml(html?: string | null, options?: FormatRichTextOptions): string {
  return formatRichText(html, options);
}

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

/** Build a `/api/image-proxy?path=…&w=…&q=…` URL. */
function buildProxyUrl(
  pathOrUrl: string,
  width?: number,
  quality?: number
): string {
  const params = new URLSearchParams();
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://") || pathOrUrl.startsWith("data:")) {
    params.set("url", pathOrUrl);
  } else {
    params.set("path", pathOrUrl);
  }
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
 *    which are routed through the local `/api/image-proxy` endpoint by path.
 * 4. Local static paths (e.g. `/images/hero/hero-bg.png`) → returned with leading slash.
 * 5. API-origin paths (e.g. `uploads/homepage/image.png`) → routed through the local
 *    `/api/image-proxy` endpoint so the image is fetched once, resized, and disk-cached.
 */
export function resolveImageUrl(
  path?: string | null,
  width?: number,
  quality?: number
): string {
  if (!path) return "";

  // Already routed through the proxy — do not wrap again.
  if (
    path.startsWith("/api/image-proxy") ||
    path.startsWith("api/image-proxy")
  ) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  // Absolute URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    // If the full URL points at the CMS backend origin, proxy it by relative path.
    const uploadsIndex = path.indexOf("/uploads/");
    if (uploadsIndex !== -1) {
      const relativePath = path.slice(uploadsIndex + 1);
      return buildProxyUrl(relativePath, width || 1920, quality || 75);
    }

    const publicBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (publicBaseUrl) {
      try {
        const origin = new URL(publicBaseUrl).origin;
        if (path.startsWith(origin)) {
          const relativePath = path.slice(origin.length);
          return buildProxyUrl(relativePath, width || 1920, quality || 75);
        }
      } catch {}
    }

    return path;
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Local static assets inside /public — serve directly from Next.js.
  if (isLocalStaticAsset(cleanPath)) {
    return `/${cleanPath}`;
  }

  // Everything else is a CMS-hosted media path — proxy it.
  return buildProxyUrl(cleanPath, width || 1920, quality || 75);
}
