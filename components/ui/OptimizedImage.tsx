"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { resolveImageUrl } from "@/lib/utils";

// Global cache for loaded image URLs to skip skeleton overlays on subsequent renders in the same session
const loadedCache = new Set<string>();

export interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt = "image",
  fallbackSrc = "/not-found.png",
  className = "",
  style,
  onLoad,
  onError,
  placeholder,
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const resolvedSrc = src ? resolveImageUrl(src) : fallbackSrc;

  // Images routed through our /api/image-proxy are already optimized —
  // skip Next.js's built-in /_next/image optimizer to avoid double processing.
  const isProxied = resolvedSrc.startsWith("/api/image-proxy");

  // Initialize loading state: skip loading skeleton if already cached in session
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !loadedCache.has(resolvedSrc);
    }
    return true; // server side renders skeleton as fallback
  });

  const [error, setError] = useState(false);

  // Sync state if src changes
  useEffect(() => {
    if (loadedCache.has(resolvedSrc)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(false);
  }, [resolvedSrc]);

  const handleLoad = (e: any) => {
    loadedCache.add(resolvedSrc);
    setLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: any) => {
    setError(true);
    setLoading(false);
    if (onError) onError(e);
  };

  const showPlaceholder =
    placeholder === "blur" && blurDataURL ? "blur" : undefined;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Premium Skeleton/Pulse loader */}
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-brand-bg/50 dark:bg-brand-dark/20 flex items-center justify-center z-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-active border-t-transparent opacity-40" />
        </div>
      )}

      <Image
        {...props}
        src={error ? fallbackSrc : resolvedSrc}
        alt={alt}
        onLoad={handleLoad}
        placeholder={showPlaceholder}
        blurDataURL={blurDataURL}
        onError={handleError}
        unoptimized={isProxied}
        className={`${className} transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        style={style}
      />
    </div>
  );
}