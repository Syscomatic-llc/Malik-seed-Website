import type { NextConfig } from "next";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats — WebP is ~30% smaller than JPEG at same quality.
    formats: ["image/webp"],

    // Quality levels Next.js will use (maps to the `quality` prop on <Image>).
    qualities: [50, 75],

    // Breakpoints that Next.js generates srcset widths for.
    // Tuned to actual viewport widths used in the design system.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Extend fetch timeout for the slow API origin (default is ~7s).
    // The origin serves 8MB+ PNGs at ~500KB/s. Keep cache fresh (1 hour TTL).
    minimumCacheTTL: 3600, // 1 hour — allows updated CMS images to refresh within 1 hour.

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apimalikseed.syscomatic.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    // Server-only env var — never exposed to the browser bundle.
    const backendUrl = process.env.API_BACKEND_URL;
    const destination = backendUrl?.endsWith("/api/v1")
      ? `${backendUrl}/:path*`
      : `${backendUrl}/api/v1/:path*`;

    return [
      {
        source: "/api/v1/:path*",
        destination,
      },
    ];
  },
};

export default nextConfig;
