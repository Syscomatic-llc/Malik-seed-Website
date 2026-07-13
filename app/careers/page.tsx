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
import { hiringApi, mapApiPositionToJobPosition, ApiJobPosition, ApiHiringTestimonial } from "@/lib/api";
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
  let apiPositions: ApiJobPosition[] = [];
  let apiTestimonials: ApiHiringTestimonial[] = [];

  try {
    const [positionsRes, testimonialsRes] = await Promise.all([
      hiringApi.getPositions(undefined, { revalidate: 60 }),
      hiringApi.getTestimonials({ revalidate: 60 }),
    ]);
    apiPositions = positionsRes || [];
    apiTestimonials = testimonialsRes || [];
  } catch (err) {
    console.error("Failed to fetch hiring content:", err);
  }

  const resolvedPositions =
    apiPositions && apiPositions.length > 0
      ? apiPositions.map(mapApiPositionToJobPosition)
      : openPositionsData.positions;

  const resolvedTestimonialsData = {
    ...employeeTestimonialsData,
    testimonials:
      apiTestimonials && apiTestimonials.length > 0
        ? apiTestimonials.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.designation,
            quote: t.content,
            avatar: t.avatar_url ? resolveImageUrl(t.avatar_url) : undefined,
          }))
        : employeeTestimonialsData.testimonials,
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <CareerHero data={careerHeroData} />
      <TalentStandardsSection data={talentStandardsData} />
      <CareerManifestoSection data={careerManifestoData} />
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
