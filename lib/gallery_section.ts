import {
  FALLBACK_GALLERY_IMAGES,
  type GalleryImage,
} from "@/components/sections/GalleryHeroSection";

export interface GalleryImagesResult {
  images: GalleryImage[];
  hasMore: boolean;
  total: number;
}

/**
 * Today: slices the static FALLBACK_GALLERY_IMAGES array.
 * Tomorrow: swap the body for a DB query (Prisma/Supabase) or CMS SDK call.
 * Because this is already async and returns the same shape, no call site
 * needs to change when you make that swap.
 */
export async function getGalleryImages(
  take: number
): Promise<GalleryImagesResult> {
  const images = FALLBACK_GALLERY_IMAGES.slice(0, take);
  return {
    images: [...images],
    hasMore: take < FALLBACK_GALLERY_IMAGES.length,
    total: FALLBACK_GALLERY_IMAGES.length,
  };
}

// ---------------------------------------------------------------------------
// Future DB version (uncomment and adapt when you wire up a real database):
// ---------------------------------------------------------------------------
// import { db } from "@/lib/db";
//
// export async function getGalleryImages(take: number): Promise<GalleryImagesResult> {
//   const [images, total] = await Promise.all([
//     db.image.findMany({ take, orderBy: { createdAt: "desc" } }),
//     db.image.count(),
//   ]);
//   return { images, hasMore: take < total, total };
// }
