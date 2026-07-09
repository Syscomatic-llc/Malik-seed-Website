import type { Metadata } from "next";
import OpenPositionsSection from "@/components/sections/careers/OpenPositionsSection";
import CVDropSection from "@/components/sections/careers/CVDropSection";
import { openPositionsData } from "@/data/career-data";

export const metadata: Metadata = {
  title: "Open Positions - Malik Seeds",
  description:
    "Explore open roles and career opportunities at Malik Seeds. Join our team and shape the future of agriculture.",
};

export default function OpenPositionsPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1] pt-[120px] lg:pt-[160px]">
      {/* Offset the built-in top padding of OpenPositionsSection to align with back link */}
      <div className="-mt-16 lg:-mt-24">
        <OpenPositionsSection data={openPositionsData} />
      </div>

      <CVDropSection />
    </div>
  );
}
