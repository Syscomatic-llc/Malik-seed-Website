import type { Metadata } from "next";
import CareerHero from "@/components/sections/careers/CareerHero";
import TalentStandardsSection from "@/components/sections/careers/TalentStandardsSection";
import CareerManifestoSection from "@/components/sections/careers/CareerManifestoSection";
import OpenPositionsCardsSection from "@/components/sections/careers/OpenPositionsCardsSection";
import TeamCultureSection from "@/components/sections/careers/TeamCultureSection";
import FutureProgramSection from "@/components/sections/careers/FutureProgramSection";
import EmployeeTestimonialsSection from "@/components/sections/careers/EmployeeTestimonialsSection";
import CVDropSection from "@/components/sections/careers/CVDropSection";
import {
  careerHeroData,
  talentStandardsData,
  careerManifestoData,
  openPositionsData,
  teamCultureData,
  futureProgramData,
  employeeTestimonialsData,
} from "@/data/career-data";

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

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <CareerHero data={careerHeroData} />
      <TalentStandardsSection data={talentStandardsData} />
      <CareerManifestoSection data={careerManifestoData} />
      <OpenPositionsCardsSection data={{ ...openPositionsData, positions: openPositionsData.positions.slice(0, 3) }} />
      <TeamCultureSection data={teamCultureData} />
      <FutureProgramSection data={futureProgramData} />
      <EmployeeTestimonialsSection data={employeeTestimonialsData} />
    </div>
  );
}
