import type { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { notFound } from "next/navigation";
import { openPositionsData } from "@/data/career-data";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ActionButton from "@/components/ActionButton";
import CVDropSection from "@/components/sections/careers/CVDropSection";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const SITE_NAME = "Malik Seeds";

/** Statically pre-generate dynamic routes for all 6 job positions at build time. */
export async function generateStaticParams() {
  return openPositionsData.positions.map((pos) => ({
    id: pos.id.toString(),
  }));
}

/** Dynamic per-job SEO metadata. */
export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id
  );

  if (!position) {
    return { title: `Position Not Found - ${SITE_NAME}` };
  }

  return {
    title: `${position.title} - ${SITE_NAME}`,
    description: position.description,
    openGraph: {
      title: `${position.title} at ${SITE_NAME}`,
      description: position.description,
      type: "website",
    },
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id
  );

  if (!position) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      {/* ─── HERO SECTION ─── */}
      <section
        className="w-full bg-[#DCF3C7] pt-[120px] pb-12 lg:pt-[160px] lg:pb-16"
        aria-label={`Job opening: ${position.title}`}
      >
        <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Breadcrumbs */}
            <Breadcrumb className="text-[#0D1A14]">
              <BreadcrumbList className="font-inter-tight flex-wrap gap-1.5 text-[14px] leading-[24px] text-[#0D1A14] lg:text-[16px]">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href="/careers" />}
                    className="text-[#0D1A14]/70 transition-colors hover:text-[#0D1A14]"
                  >
                    Hiring
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#0D1A14]/40" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href="/careers/open-positions" />}
                    className="text-[#0D1A14]/70 transition-colors hover:text-[#0D1A14]"
                  >
                    Open Positions
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#0D1A14]/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-[#0D1A14]">
                    {position.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Header Content (Title, Salary, Action Button) */}
            <div className="flex flex-col gap-6">
              <div className="flex max-w-[844px] flex-col gap-4">
                <h1 className="font-inter-tight text-[38px] leading-[46px] font-medium tracking-tight text-[#141C24] lg:text-[64px] lg:leading-[77px]">
                  {position.title}
                </h1>

                {position.salary && (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
                    <span className="font-inter-tight text-[24px] leading-[24px] font-semibold text-[#0D1A14]">
                      {position.salary}
                    </span>
                    {position.salaryNote && (
                      <span className="font-inter-tight text-[14px] leading-[24px] text-[#0D1A14]/70 lg:text-[16px]">
                        {position.salaryNote}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {position.location && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] text-[#0D1A14]/60 lg:text-[16px]">
                      Location
                    </span>
                    <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14] lg:text-[24px]">
                      {position.location}
                    </span>
                  </div>
                )}
                {position.jobType && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] text-[#0D1A14]/60 lg:text-[16px]">
                      Job Type
                    </span>
                    <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14] lg:text-[24px]">
                      {position.jobType}
                    </span>
                  </div>
                )}
                {position.experience && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] text-[#0D1A14]/60 lg:text-[16px]">
                      Experience
                    </span>
                    <span className="font-inter-tight text-[18px] font-medium text-[#0D1A14] lg:text-[24px]">
                      {position.experience}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Now Button (Hero) */}
            <ActionButton
              href={`/careers/${id}/apply`}
              label="Apply Now"
              variant="dark"
              className="h-[41px] px-6 text-[14px] lg:h-[46px] lg:text-[16px]"
            />
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT SECTION ─── */}
      <section
        className="w-full bg-[#F2F7F1] py-12 lg:py-20"
        aria-label="Job details description"
      >
        <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
          <div className="flex flex-col gap-12 lg:gap-16">
            {/* Full description / intro */}
            {position.fullDescription && (
              <p className="font-inter text-[16px] leading-[24px] text-[#0D1A14] lg:text-[18px] lg:leading-[27px]">
                {position.fullDescription}
              </p>
            )}

            {/* Grid for two column lists if desired, otherwise standard single column stacked layout as in figma */}
            <div className="flex max-w-[800px] flex-col gap-12 lg:gap-14">
              {/* What You'll Do */}
              {position.whatYoullDo && position.whatYoullDo.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter-tight text-[22px] leading-[24px] font-medium text-[#0D1A14] lg:text-[24px]">
                    What You’ll Do
                  </h2>
                  <ul className="font-inter flex list-disc flex-col gap-3 pl-5 text-[16px] leading-[24px] text-[#0D1A14]/80">
                    {position.whatYoullDo.map((item, index) => (
                      <li key={index} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We're Looking For */}
              {position.whatWereLookingFor &&
                position.whatWereLookingFor.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="font-inter-tight text-[22px] leading-[24px] font-medium text-[#0D1A14] lg:text-[24px]">
                      What We’re Looking For
                    </h2>
                    <ul className="font-inter flex list-disc flex-col gap-3 pl-5 text-[16px] leading-[24px] text-[#0D1A14]/80">
                      {position.whatWereLookingFor.map((item, index) => (
                        <li key={index} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Skills & Competencies */}
              {position.skillsAndCompetencies &&
                position.skillsAndCompetencies.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="font-inter-tight text-[22px] leading-[24px] font-medium text-[#0D1A14] lg:text-[24px]">
                      Skills & Competencies
                    </h2>
                    <ul className="font-inter flex list-disc flex-col gap-3 pl-5 text-[16px] leading-[24px] text-[#0D1A14]/80">
                      {position.skillsAndCompetencies.map((item, index) => (
                        <li key={index} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Why Join Malik Seeds? */}
              {position.whyJoin && position.whyJoin.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter-tight text-[22px] leading-[24px] font-medium text-[#0D1A14] lg:text-[24px]">
                    Why Join Malik Seeds?
                  </h2>
                  <ul className="font-inter flex list-disc flex-col gap-3 pl-5 text-[16px] leading-[24px] text-[#0D1A14]/80">
                    {position.whyJoin.map((item, index) => (
                      <li key={index} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Basics & Benefits */}
              {position.benefitsList && position.benefitsList.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="font-inter-tight text-[22px] leading-[24px] font-medium text-[#0D1A14] lg:text-[24px]">
                    Basics & Benefits
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {position.benefitsList.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-[40px] border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-2 lg:gap-[10px] lg:px-4 lg:py-2"
                      >
                        <span className="font-inter text-[14px] leading-[21px] text-[#0D1A14] lg:text-[16px] lg:leading-[24px]">
                          {benefit.text}
                        </span>
                        <div className="relative h-[14px] w-[14px] shrink-0 lg:h-[18px] lg:w-[18px]">
                          <OptimizedImage
                            src={`/images/careers/${benefit.icon}`}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Separator line */}
            <hr className="my-4 w-full border-t border-[#CED2DA]" />

            {/* Ready to apply call to action */}
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="flex max-w-[548px] flex-col gap-4">
                <h3 className="font-inter-tight text-[28px] leading-[34px] font-medium text-[#0D1A14] lg:text-[32px] lg:leading-[38px]">
                  Ready to apply?
                </h3>
                <p className="font-inter text-[16px] leading-[24px] text-[#0D1A14]/80 lg:text-[18px] lg:leading-[27px]">
                  If you are passionate about advancing agricultural innovation
                  and making a measurable impact in the field, we encourage you
                  to apply.
                </p>
              </div>

              {/* Scroll back to CV Drop form at bottom */}
              <ActionButton
                href={`/careers/${id}/apply`}
                label="Apply Now"
                variant="dark"
                className="h-[41px] px-6 text-[14px] lg:h-[46px] lg:text-[16px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
