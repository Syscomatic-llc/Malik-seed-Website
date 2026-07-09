import { Suspense } from "react";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";

export default function OurGalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryHeroSection />
    </Suspense>
  );
}
