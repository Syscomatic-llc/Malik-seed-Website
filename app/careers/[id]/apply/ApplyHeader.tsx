"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Position {
  id: number;
  title: string;
  location?: string;
  jobType?: string;
  experience?: string;
}

interface ApplyHeaderProps {
  id: string;
  position: Position;
}

export default function ApplyHeader({ id, position }: ApplyHeaderProps) {
  const pathname = usePathname();

  // Routes where we do not display the breadcrumb and job details header
  const hiddenRoutes = [
    "/mcq",
    "/written",
    "/short-answers",
    "/long-answers",
    "/review",
    "/result",
    "/submitted",
    "/loading",
    "/confirmation",
  ];

  const shouldHide = hiddenRoutes.some((route) => pathname.endsWith(route));

  if (shouldHide) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {/* Breadcrumbs */}
      <Breadcrumb className="text-[#0D1A14]">
        <BreadcrumbList className="flex-wrap gap-1.5 font-inter-tight text-[14px] lg:text-[16px] leading-[24px] text-[#0D1A14]">
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href="/careers" />}
              className="text-[#0D1A14]/70 hover:text-[#0D1A14] transition-colors"
            >
              Hiring
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-[#0D1A14]/40" />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href="/careers/open-positions" />}
              className="text-[#0D1A14]/70 hover:text-[#0D1A14] transition-colors"
            >
              Open Positions
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-[#0D1A14]/40" />
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href={`/careers/${id}`} />}
              className="font-[400] text-[#0D1A14]"
            >
              {position.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header (Job info) */}
      <div className="flex flex-col gap-4">
        <h1 className="font-inter-tight text-[38px] lg:text-[48px] font-medium leading-[46px] lg:leading-[58px] text-[#141C24] tracking-tight">
          {position.title}
        </h1>
        <div className="flex gap-6 flex-col">
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {position.location && (
              <div className="flex flex-col gap-2">
                <span className="font-inter-tight text-[14px] text-[#0D1A14]/60">
                  Location
                </span>
                <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14]">
                  {position.location}
                </span>
              </div>
            )}
            {position.jobType && (
              <div className="flex flex-col gap-2">
                <span className="font-inter-tight text-[14px] text-[#0D1A14]/60">
                  Job Type
                </span>
                <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14]">
                  {position.jobType}
                </span>
              </div>
            )}
            {position.experience && (
              <div className="flex flex-col gap-2">
                <span className="font-inter-tight text-[14px] text-[#0D1A14]/60">
                  Experience
                </span>
                <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14]">
                  {position.experience}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
