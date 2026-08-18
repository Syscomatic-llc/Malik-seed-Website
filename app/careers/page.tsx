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
import { hiringApi, mapApiPositionToJobPosition, ApiJobPosition, ApiHiringTestimonial, ApiHiringBenefit, ApiHiringPageContent, getPageMetadata } from "@/lib/api";
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
  return getPageMetadata("/careers", fallback, { revalidate: 15, tags: ["careers", "seo"] });
}


export default async function CareersPage() {
  let apiPositions: ApiJobPosition[] = [];
  let apiTestimonials: ApiHiringTestimonial[] = [];
  let apiBenefits: ApiHiringBenefit[] = [];
  let pageContentRes: ApiHiringPageContent | null = null;

  try {
    const [positionsRes, testimonialsRes, benefitsRes, pageRes] = await Promise.all([
      hiringApi.getPositions(undefined, { revalidate: 15, tags: ["careers"] }),
      hiringApi.getTestimonials({ revalidate: 15, tags: ["careers"] }),
      hiringApi.getBenefits({ revalidate: 15, tags: ["careers"] }),
      hiringApi.getPageContent({ revalidate: 15, tags: ["careers"] }),
    ]);
    apiPositions = positionsRes || [];
    apiTestimonials = testimonialsRes || [];
    apiBenefits = benefitsRes || [];
    pageContentRes = pageRes || null;
  } catch (err) {
    console.error("Failed to fetch hiring content:", err);
  }

  const sortedApiPositions = [...apiPositions].sort((a, b) => {
    const orderA = a.sort_order ?? a.id;
    const orderB = b.sort_order ?? b.id;
    return orderA - orderB;
  });

  const activeApiPositions = sortedApiPositions.filter((p) => p.is_active !== false);

  const resolvedPositions = activeApiPositions.map(mapApiPositionToJobPosition);

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

  const heroSectionApi = pageContentRes?.heroSection;
  const resolvedCareerHeroData = {
    ...careerHeroData,
    badge: heroSectionApi?.badge || careerHeroData.badge,
    ctaSecondary: heroSectionApi?.ctaSecondary
      ? {
          href: heroSectionApi.ctaSecondary.href || careerHeroData.ctaSecondary.href,
          label: heroSectionApi.ctaSecondary.label || careerHeroData.ctaSecondary.label,
        }
      : careerHeroData.ctaSecondary,
    teamImage: heroSectionApi?.teamImage
      ? resolveImageUrl(heroSectionApi.teamImage)
      : "",
  };

  const manifestoApi = pageContentRes?.careerManifesto;
  const resolvedManifestoData = {
    ...careerManifestoData,
    badge: manifestoApi?.badge || careerManifestoData.badge,
    images: manifestoApi?.images
      ? manifestoApi.images.map((img) => resolveImageUrl(img))
      : [],
  };

  const teamCultureApi = pageContentRes?.teamCulture;
  const resolvedTeamCultureData = {
    ...teamCultureData,
    badge: teamCultureApi?.badge || teamCultureData.badge,
    images: teamCultureApi?.images
      ? teamCultureApi.images.map((img, i) => ({
          src: resolveImageUrl(img),
          alt: `Team culture photo ${i + 1}`,
          colSpan: (i === 0 ? "wide" : i === 1 ? "narrow" : "third") as "wide" | "narrow" | "third",
        }))
      : [],
  };

  const futureProgramApi = pageContentRes?.futureProgram;
  const resolvedFutureProgramData = {
    ...futureProgramData,
    badge: futureProgramApi?.badge || futureProgramData.badge,
    image: futureProgramApi?.image
      ? resolveImageUrl(futureProgramApi.image)
      : "",
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <CareerHero data={resolvedCareerHeroData} />
      <TalentStandardsSection data={resolvedStandardsData} />
      <CareerManifestoSection data={resolvedManifestoData} />
      <OpenPositionsCardsSection
        data={{
          ...openPositionsData,
          positions: resolvedPositions.slice(0, 3),
        }}
      />
      <TeamCultureSection data={resolvedTeamCultureData} />
      <FutureProgramSection data={resolvedFutureProgramData} />
      <EmployeeTestimonialsSection data={resolvedTestimonialsData} />
    </div>
  );
}
