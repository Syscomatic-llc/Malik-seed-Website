import { NextRequest, NextResponse } from "next/server";
import { settingsApi } from "@/lib/api";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Double-check matching criteria to prevent infinite loops or blocking critical assets & static images
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicons") ||
    pathname === "/maintenance" ||
    pathname.startsWith("/contact") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(png|jpe?g|svg|webp|ico|gif|css|js|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch settings with a short 15-second TTL cache to prevent API rate-limit issues while keeping updates fast
    const settings = await settingsApi.getSettings({ revalidate: 15 });

    if (settings.maintenanceMode) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    console.error("Error in maintenance mode proxy checker:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|images|favicons|maintenance|contact|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|svg|webp|ico|gif|css|js|woff2?)$).*)",
  ],
};
