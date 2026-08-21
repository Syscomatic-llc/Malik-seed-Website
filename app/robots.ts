import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/careers/*/apply/",
        "/careers/*/exam/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
