import type { Metadata } from "next";
import CareerHero from "@/components/sections/careers/CareerHero";
import TalentStandardsSection from "@/components/sections/careers/TalentStandardsSection";
import CareerManifestoSection from "@/components/sections/careers/CareerManifestoSection";
import OpenPositionsCardsSection from "@/components/sections/careers/OpenPositionsCardsSection";
import TeamCultureSection from "@/components/sections/careers/TeamCultureSection";
import FutureProgramSection from "@/components/sections/careers/FutureProgramSection";
import EmployeeTestimonialsSection from "@/components/sections/careers/EmployeeTestimonialsSection";
import {
  careerHeroData,
  talentStandardsData,
  careerManifestoData,
  openPositionsData,
  teamCultureData,
  futureProgramData,
  employeeTestimonialsData,
} from "@/data/career-data";
import { hiringApi, mapApiPositionToJobPosition } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers - Malik Seeds",
  description:
    "Join Malik Seeds and help build the future of agriculture in Bangladesh. Explore open positions and apply to join our team.",
  openGraph: {
    title: "Careers at Malik Seeds",
    description:
      "We are assembling a team of builders with high agency. Explore our open roles and drop your CV.",
    type: "website",
  },
};

export default async function CareersPage() {
  let apiData = null;
  try {
    apiData = await hiringApi.getAllHiringContent({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch hiring content:", err);
  }

  const resolvedHeroData = {
    ...careerHeroData,
    badge: apiData?.page_content?.hero_title || careerHeroData.badge,
    titleLine1: apiData?.page_content?.hero_subtitle || careerHeroData.titleLine1,
    teamImage: apiData?.page_content?.hero_image
      ? resolveImageUrl(apiData.page_content.hero_image)
      : careerHeroData.teamImage,
  };

  const resolvedManifestoData = {
    ...careerManifestoData,
    subtitle: apiData?.page_content?.manifesto_title || careerManifestoData.subtitle,
    paragraphs: apiData?.page_content?.manifesto_description
      ? apiData.page_content.manifesto_description.split("\n\n").filter(Boolean)
      : careerManifestoData.paragraphs,
  };

  const resolvedPositions =
    apiData?.positions && apiData.positions.length > 0
      ? apiData.positions.map(mapApiPositionToJobPosition)
      : openPositionsData.positions;

  const resolvedTestimonialsData = {
    ...employeeTestimonialsData,
    testimonials:
      apiData?.testimonials && apiData.testimonials.length > 0
        ? apiData.testimonials.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            quote: t.quote,
            avatar: t.avatar ? resolveImageUrl(t.avatar) : undefined,
          }))
        : employeeTestimonialsData.testimonials,
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <CareerHero data={resolvedHeroData} />
      <TalentStandardsSection data={talentStandardsData} />
      <CareerManifestoSection data={resolvedManifestoData} />
      <OpenPositionsCardsSection
        data={{
          ...openPositionsData,
          positions: resolvedPositions.slice(0, 3),
        }}
      />
      <TeamCultureSection data={teamCultureData} />
      <FutureProgramSection data={futureProgramData} />
      <EmployeeTestimonialsSection data={resolvedTestimonialsData} />
    </div>
  );
}
