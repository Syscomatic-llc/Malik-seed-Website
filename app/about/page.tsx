import { Suspense } from "react";
import AboutHero from "@/components/sections/AboutHero";
import AboutMissionOne from "@/components/sections/AboutMissionOne";
import AboutValues from "@/components/sections/AboutValues";
import TimelineStory from "@/components/TimelineStory";
import AboutMissionTwo from "@/components/sections/AboutMissionTwo";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { timelineItems } from "@/data/sections-data";
import { galleryApi, aboutpageApi, getPageMetadata } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "Our Story - Malik Seeds",
    description:
      "Discover the historical journey of A.R. Malik, our mission, core brand values, and agricultural milestones from 1962 to today.",
  };
  return getPageMetadata("/about", fallback, { revalidate: 15, tags: ["about", "seo"] });
}


export default async function AboutPage() {
  let ourStoryData = null;
  try {
    ourStoryData = await aboutpageApi.getAll({ revalidate: 15, tags: ["about"] });
  } catch (err) {
    console.error("Failed to fetch our story data from API:", err);
  }

  let galleryData = null;
  try {
    galleryData = await galleryApi.getAll({ revalidate: 15, tags: ["gallery"] });
  } catch (err) {
    console.error("Failed to fetch gallery data from API:", err);
  }

  const mappedGalleryImages =
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
    <div className="bg-brand-bg min-h-screen">
      <AboutHero apiData={ourStoryData?.hero} />
      <AboutMissionOne apiData={ourStoryData?.mission} />
      <AboutValues apiData={ourStoryData?.values} />
      <TimelineStory
        items={timelineItems}
        apiData={ourStoryData?.timeline ? (ourStoryData.timeline as any) : undefined}
      />
      <AboutMissionTwo apiData={ourStoryData?.mission} />
      <Suspense fallback={null}>
        <GalleryHeroSection isHero={false} initialImages={mappedGalleryImages} />
      </Suspense>
      <JoinTeamSection />
    </div>
  );
}
