import { Suspense } from "react";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";
import { galleryApi, getPageMetadata } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "Our Gallery - Malik Seeds",
    description:
      "Explore the visual journey of Malik Seeds. Browse photos of our field activities, research and development, farmer training programs, and product showcase.",
  };
  return getPageMetadata("/our-gallery", fallback, { revalidate: 60 });
}


export default async function OurGalleryPage() {
  let galleryData = null;
  try {
    galleryData = await galleryApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch gallery data from API:", err);
  }

  const mappedImages =
    galleryData?.items
      ? [...galleryData.items]
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .map((item) => ({
            id: item.id,
            src: resolveImageUrl(item.image_url),
            alt: item.title || "Gallery Image",
          }))
      : [];

  return (
    <Suspense fallback={null}>
      <GalleryHeroSection initialImages={mappedImages} />
    </Suspense>
  );
}
