import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  const position = openPositionsData.positions.find((pos) => pos.id.toString() === id);

  if (!position) {
    return { title: `Position Not Found — ${SITE_NAME}` };
  }

  return {
    title: `${position.title} — ${SITE_NAME}`,
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
  const position = openPositionsData.positions.find((pos) => pos.id.toString() === id);

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
                  <BreadcrumbPage className="font-semibold text-[#0D1A14]">
                    {position.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Header Content (Title, Salary, Action Button) */}
            <div className="flex gap-6 flex-col gap-6">
              <div className="flex flex-col gap-4 max-w-[844px]">
                <h1 className="font-inter-tight text-[38px] lg:text-[64px] font-medium leading-[46px] lg:leading-[77px] text-[#141C24] tracking-tight">
                  {position.title}
                </h1>

                {position.salary && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="font-inter-tight text-[24px] font-semibold leading-[24px] text-[#0D1A14]">
                      {position.salary}
                    </span>
                    {position.salaryNote && (
                      <span className="font-inter-tight text-[14px] lg:text-[16px] leading-[24px] text-[#0D1A14]/70">
                        {position.salaryNote}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {position.location && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] lg:text-[16px] text-[#0D1A14]/60">
                      Location
                    </span>
                    <span className="font-inter-tight text-[18px] lg:text-[24px] font-medium text-[#0D1A14]">
                      {position.location}
                    </span>
                  </div>
                )}
                {position.jobType && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] lg:text-[16px] text-[#0D1A14]/60">
                      Job Type
                    </span>
                    <span className="font-inter-tight text-[18px] lg:text-[24px] font-medium text-[#0D1A14]">
                      {position.jobType}
                    </span>
                  </div>
                )}
                {position.experience && (
                  <div className="flex flex-col gap-2">
                    <span className="font-inter-tight text-[14px] lg:text-[16px] text-[#0D1A14]/60">
                      Experience
                    </span>
                    <span className="font-inter-tight text-[18px] lg:text-[24px] font-medium text-[#0D1A14]">
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
              className="h-[41px] lg:h-[46px] px-6 text-[14px] lg:text-[16px]"
            />

          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT SECTION ─── */}
      <section className="w-full bg-[#F2F7F1] py-12 lg:py-20" aria-label="Job details description">
        <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
          <div className="flex flex-col gap-12 lg:gap-16">

            {/* Full description / intro */}
            {position.fullDescription && (
              <p className="font-inter text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] text-[#0D1A14]">
                {position.fullDescription}
              </p>
            )}

            {/* Grid for two column lists if desired, otherwise standard single column stacked layout as in figma */}
            <div className="flex flex-col gap-12 lg:gap-14 max-w-[800px]">
              {/* What You'll Do */}
              {position.whatYoullDo && position.whatYoullDo.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter-tight text-[22px] lg:text-[24px] font-medium leading-[24px] text-[#0D1A14]">
                    What You’ll Do
                  </h2>
                  <ul className="list-disc pl-5 flex flex-col gap-3 font-inter text-[16px] leading-[24px] text-[#0D1A14]/80">
                    {position.whatYoullDo.map((item, index) => (
                      <li key={index} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We're Looking For */}
              {position.whatWereLookingFor && position.whatWereLookingFor.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter-tight text-[22px] lg:text-[24px] font-medium leading-[24px] text-[#0D1A14]">
                    What We’re Looking For
                  </h2>
                  <ul className="list-disc pl-5 flex flex-col gap-3 font-inter text-[16px] leading-[24px] text-[#0D1A14]/80">
                    {position.whatWereLookingFor.map((item, index) => (
                      <li key={index} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills & Competencies */}
              {position.skillsAndCompetencies && position.skillsAndCompetencies.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter-tight text-[22px] lg:text-[24px] font-medium leading-[24px] text-[#0D1A14]">
                    Skills & Competencies
                  </h2>
                  <ul className="list-disc pl-5 flex flex-col gap-3 font-inter text-[16px] leading-[24px] text-[#0D1A14]/80">
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
                  <h2 className="font-inter-tight text-[22px] lg:text-[24px] font-medium leading-[24px] text-[#0D1A14]">
                    Why Join Malik Seeds?
                  </h2>
                  <ul className="list-disc pl-5 flex flex-col gap-3 font-inter text-[16px] leading-[24px] text-[#0D1A14]/80">
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
                  <h2 className="font-inter-tight text-[22px] lg:text-[24px] font-medium leading-[24px] text-[#0D1A14]">
                    Basics & Benefits
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {position.benefitsList.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 lg:gap-[10px] rounded-[40px] border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-2 lg:px-4 lg:py-2"
                      >
                        <span className="font-inter text-[14px] lg:text-[16px] leading-[21px] lg:leading-[24px] text-[#0D1A14]">
                          {benefit.text}
                        </span>
                        <div className="relative h-[14px] w-[14px] lg:h-[18px] lg:w-[18px] shrink-0">
                          <Image
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
            <hr className="w-full border-t border-[#CED2DA] my-4" />

            {/* Ready to apply call to action */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 w-full">
              <div className="flex flex-col gap-4 max-w-[548px]">
                <h3 className="font-inter-tight text-[28px] lg:text-[32px] font-medium leading-[34px] lg:leading-[38px] text-[#0D1A14]">
                  Ready to apply?
                </h3>
                <p className="font-inter text-[16px] lg:text-[18px] leading-[24px] lg:leading-[27px] text-[#0D1A14]/80">
                  If you are passionate about advancing agricultural innovation and making a measurable impact in the field, we encourage you to apply.
                </p>
              </div>

              {/* Scroll back to CV Drop form at bottom */}
              <ActionButton
                href={`/careers/${id}/apply`}
                label="Apply Now"
                variant="dark"
                className="h-[41px] lg:h-[46px] px-6 text-[14px] lg:text-[16px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
