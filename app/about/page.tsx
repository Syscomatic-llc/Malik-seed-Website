import AboutHero from "@/components/sections/AboutHero";
import AboutMissionOne from "@/components/sections/AboutMissionOne";
import AboutValues from "@/components/sections/AboutValues";
import TimelineStory from "@/components/TimelineStory";
import AboutMissionTwo from "@/components/sections/AboutMissionTwo";
import GalleryHeroSection from "@/components/sections/GalleryHeroSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { timelineItems } from "@/data/sections-data";

export const metadata = {
  title: "Our Story — Malik Seeds",
  description:
    "Discover the historical journey of A.R. Malik, our mission, core brand values, and agricultural milestones from 1962 to today.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-bg min-h-screen">
      <AboutHero />
      <AboutMissionOne />
      <AboutValues />
      <TimelineStory items={timelineItems} />
      <AboutMissionTwo />
      <GalleryHeroSection isHero={false} />
      <JoinTeamSection />
    </div>
  );
}
