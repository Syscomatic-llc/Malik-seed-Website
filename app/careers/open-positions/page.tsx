import type { Metadata } from "next";
import OpenPositionsSection from "@/components/sections/careers/OpenPositionsSection";
import CVDropSection from "@/components/sections/careers/CVDropSection";
import Link from "next/link";
import { openPositionsData } from "@/data/career-data";

export const metadata: Metadata = {
  title: "Open Positions — Malik Seeds",
  description:
    "Explore open roles and career opportunities at Malik Seeds. Join our team and shape the future of agriculture.",
};

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function OpenPositionsPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1] pt-[120px] lg:pt-[160px]">
      {/* Breadcrumb / Back button */}
      <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
        <Breadcrumb className="text-[#0D1A14]">
          <BreadcrumbList className="gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/" />}
                className="font-inter-tight text-[16px] leading-[24px] text-[#0D1A14]/70 hover:text-[#0D1A14] transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#0D1A14]/40" />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href="/careers" />}
                className="font-inter-tight text-[16px] leading-[24px] text-[#0D1A14]/70 hover:text-[#0D1A14] transition-colors"
              >
                Hiring
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#0D1A14]/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-inter-tight text-[16px] leading-[24px] text-[#0D1A14] font-medium">
                Open Positions
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Offset the built-in top padding of OpenPositionsSection to align with back link */}
      <div className="-mt-16 lg:-mt-24">
        <OpenPositionsSection data={openPositionsData} />
      </div>

      <CVDropSection />
    </div>
  );
}
