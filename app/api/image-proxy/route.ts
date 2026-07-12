import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// Helper to extract hostname from URL
function getHostname(urlStr: string | undefined): string {
  if (!urlStr) return "";
  try {
    return new URL(urlStr).hostname;
  } catch {
    return urlStr;
  }
}

// Allow proxying from our CMS domain
const ALLOWED_HOSTNAME = getHostname(process.env.API_BACKEND_URL);
const CACHE_DIR = path.join(process.cwd(), ".image-cache");

// The CMS serves files slowly (e.g. 569 KB/s for 8MB+ PNGs), so we use a 45s timeout
const FETCH_TIMEOUT_MS = 45000;
const CACHE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days cache

function getCacheKey(url: string, width: number, quality: number) {
  return crypto
    .createHash("sha1")
    .update(`${url}|${width}|${quality}`)
    .digest("hex");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("url");
  const widthParam = searchParams.get("w");
  const qualityParam = searchParams.get("q");

  if (!src) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Parse and validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsedUrl.hostname !== ALLOWED_HOSTNAME) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  // Determine width and quality
  const width = widthParam
    ? Math.min(1920, Math.max(16, parseInt(widthParam, 10)))
    : 1200;
  const quality = qualityParam
    ? Math.min(100, Math.max(10, parseInt(qualityParam, 10)))
    : 75;

  // Check disk cache
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const key = getCacheKey(src, width, quality);
  const cachePath = path.join(CACHE_DIR, `${key}.webp`);

  try {
    const cached = await fs.readFile(cachePath);
    return new NextResponse(cached, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, immutable`,
        "X-Image-Proxy-Cache": "HIT",
      },
    });
  } catch {
    // Cache miss, proceed to fetch
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(src, { signal: controller.signal });
    clearTimeout(timeout);

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream returned status ${upstream.status}` },
        { status: 502 }
      );
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optimize with sharp
    let optimized: Buffer;
    try {
      optimized = await sharp(buffer)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    } catch (sharpError) {
      console.error(
        "[image-proxy] sharp optimization failed, serving raw image:",
        sharpError
      );
      // Fallback: serve raw buffer if sharp fails (e.g. unsupported format/corrupted file)
      const contentType = upstream.headers.get("content-type") || "image/png";
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store",
          "X-Image-Proxy-Cache": "BYPASS",
        },
      });
    }

    // Write to disk cache in background
    fs.writeFile(cachePath, optimized).catch((err) => {
      console.error("[image-proxy] failed to write cache file:", err);
    });

    return new NextResponse(new Uint8Array(optimized), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, immutable`,
        "X-Image-Proxy-Cache": "MISS",
      },
    });
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      return NextResponse.json(
        { error: "Upstream request timed out" },
        { status: 504 }
      );
    }
    console.error("[image-proxy] error:", err);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
