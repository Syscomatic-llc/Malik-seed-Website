import { Suspense } from "react";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";
import { galleryApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export const metadata = {
  title: "Our Gallery - Malik Seeds",
  description:
    "Explore the visual journey of Malik Seeds. Browse photos of our field activities, research and development, farmer training programs, and product showcase.",
};

export default async function OurGalleryPage() {
  let galleryData = null;
  try {
    galleryData = await galleryApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch gallery data from API:", err);
  }

  const mappedImages =
    galleryData?.items?.map((item) => ({
      id: item.id,
      src: resolveImageUrl(item.image_url),
      alt: item.title || "Gallery Image",
    })) || [];

  return (
    <Suspense fallback={null}>
      <GalleryHeroSection initialImages={mappedImages} />
    </Suspense>
  );
}
