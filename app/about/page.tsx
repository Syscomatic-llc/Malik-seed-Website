import { Suspense } from "react";
import AboutHero from "@/components/sections/AboutHero";
import AboutMissionOne from "@/components/sections/AboutMissionOne";
import AboutValues from "@/components/sections/AboutValues";
import TimelineStory from "@/components/TimelineStory";
import AboutMissionTwo from "@/components/sections/AboutMissionTwo";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { timelineItems } from "@/data/sections-data";
import { homepageApi, galleryApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export const metadata = {
  title: "Our Story - Malik Seeds",
  description:
    "Discover the historical journey of A.R. Malik, our mission, core brand values, and agricultural milestones from 1962 to today.",
};

export default async function AboutPage() {
  let apiTimeline = undefined;
  try {
    apiTimeline = await homepageApi.getTimeline({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch timeline data from API:", err);
  }

  let galleryData = null;
  try {
    galleryData = await galleryApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch gallery data from API:", err);
  }

  const mappedGalleryImages =
    galleryData?.items?.map((item) => ({
      id: item.id,
      src: resolveImageUrl(item.image_url),
      alt: item.title || "Gallery Image",
    })) || [];

  return (
    <div className="bg-brand-bg min-h-screen">
      <AboutHero />
      <AboutMissionOne />
      <AboutValues />
      <TimelineStory items={timelineItems} apiData={apiTimeline} />
      <AboutMissionTwo />
      <Suspense fallback={null}>
        <GalleryHeroSection isHero={false} initialImages={mappedGalleryImages} />
      </Suspense>
      <JoinTeamSection />
    </div>
  );
}

