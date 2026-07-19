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
import { hiringApi, mapApiPositionToJobPosition, ApiJobPosition, ApiHiringTestimonial, ApiHiringBenefit, getPageMetadata } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
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
  return getPageMetadata("/careers", fallback, { revalidate: 60 });
}


export default async function CareersPage() {
  let apiPositions: ApiJobPosition[] = [];
  let apiTestimonials: ApiHiringTestimonial[] = [];
  let apiBenefits: ApiHiringBenefit[] = [];

  try {
    const [positionsRes, testimonialsRes, benefitsRes] = await Promise.all([
      hiringApi.getPositions(undefined, { revalidate: 60 }),
      hiringApi.getTestimonials({ revalidate: 60 }),
      hiringApi.getBenefits({ revalidate: 60 }),
    ]);
    apiPositions = positionsRes || [];
    apiTestimonials = testimonialsRes || [];
    apiBenefits = benefitsRes || [];
  } catch (err) {
    console.error("Failed to fetch hiring content:", err);
  }

  const sortedApiPositions = [...apiPositions].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const resolvedPositions = sortedApiPositions.map(mapApiPositionToJobPosition);

  const resolvedTestimonialsData = {
    ...employeeTestimonialsData,
    testimonials: apiTestimonials.map((t) => ({
      id: t.id,
      name: t.name,
      designation: t.designation,
      department: t.department,
      quote: t.content,
      avatar: t.avatar_url ? resolveImageUrl(t.avatar_url) : undefined,
    })),
  };

  const sortedApiBenefits = [...apiBenefits].sort((a, b) => a.sort_order - b.sort_order);

  const resolvedStandardsData = {
    standards: sortedApiBenefits.map((b) => ({
      number: b.sort_order,
      title: b.title,
      description: b.description || "",
      icon: b.icon,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <CareerHero data={careerHeroData} />
      <TalentStandardsSection data={resolvedStandardsData} />
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
