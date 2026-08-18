"use client";

import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  duration: string;
  focus: string;
  location: string;
  donor: string;
}

const PROJECTS: Project[] = [
  {
    title: "Agro-logistic Impact Cluster",
    duration: "(Jan 2026 – Dec 2029)",
    focus:
      "Reducing post-harvest loss · Capacity development on advanced post-harvest management · CA storage · MAP line · Traceability · Mini-labs for MRL testing",
    location: "Rajshahi & Rangpur Division",
    donor: "Netherlands Enterprise Agency (RVO)",
  },
  {
    title: "Climate-Adaptive Cold Storage Initiative",
    duration: "(May 2026 - Oct 2027)",
    focus:
      "Strengthening value chain of vegetables, onion & potato · Renewable energy · Cool chain management · Traceability",
    location: "Rajshahi & Rangpur Division",
    donor: "DFCD-SNV Netherlands",
  },
  {
    title:
      "Building an Inclusive & Sustainable Supply Chain for Responsibly Produced, High-Quality Vegetables (ISCHV)",
    duration: "(Jan 2023 – Dec 2026)",
    focus:
      "Capacity building of farmers & stakeholders on GAP · GAP certification · Vegetable processing plant · HACCP certification · Cool chain · Traceability · Sales & marketing",
    location: "Bogura & Gaibandha",
    donor: "KFW-DEG Impulse, Germany",
  },
  {
    title:
      "Technical Service for GAP Certification Framework (SD/Partner-DAE/06)",
    duration: "(Nov 2024 – Dec 2027)",
    focus:
      "Policy / regulatory framework & strategic action plan development · SOP for certification · BACB capacity building & auditor training · PFS piloting · Marketing & media message preparation",
    location: "National level",
    donor: "PARTNER – Department of Agriculture Extension (DAE)",
  },
  {
    title: "On-the-job training for youth & women entrepreneurs",
    duration: "(Jul 2024 – Jun 2028)",
    focus:
      "Training rural agro-entrepreneurs on post-harvest management · GAP handling · Business planning · Incubation support on agro-input business & vegetable production",
    location: "Rangpur Division",
    donor: "PARTNER Programme – Department of Marketing (DAM)",
  },
  {
    title: "Onion Impact Cluster Project",
    duration: "(Jan 2022 – Dec 2025)",
    focus:
      "Post-harvest management of onion · Grading, sorting & packaging · Cool storage system",
    location: "Pabna District",
    donor: "Netherlands Enterprise Agency (RVO)",
  },
  {
    title: "Smallholder Horticulture Empowerment Project (Bangla-SHEP)",
    duration: "(2019 – 2026)",
    focus:
      "Capacity building of farmers on market-oriented horticulture production",
    location: "Dinajpur, Rangpur, Bogura, Pabna & Rajshahi",
    donor: "JICA and DAE",
  },
  {
    title:
      "Raising Economic & Social Security for Child Labour Eradication (RESOURCE)",
    duration: "(Mar 2024 – May 2026)",
    focus:
      "Homestead food production & livelihoods improvement in saline-prone areas of Bagerhat district",
    location: "Bagerhat, Khulna Division",
    donor: "Cordaid – Netherlands",
  },
  {
    title:
      "Sustained Fresh Vegetable Supply Chain for Healthy & Prosperous Citizens (SVC4HPC)",
    duration: "(Jul 2023 – Jun 2024)",
    focus:
      "GAP cluster formation · Facilitation to obtain Global GAP certification",
    location: "Northern Bangladesh",
    donor: "BAEN (Bangladesh Agriculture Extension Network)",
  },
  {
    title: "Making Market Work for Char (M4C)",
    duration: "(Feb 2021 – Jun 2024)",
    focus:
      "Make next-generation seed available in remote Char areas of Teesta and Jamuna",
    location: "Northern Bangladesh",
    donor: "Swisscontact",
  },
  {
    title: "Agro-entrepreneurship creation with market linkage",
    duration: "(Mar 2020 – Feb 2022)",
    focus: "Make next-generation seed available to homestead farmers",
    location: "Gaibandha & Kurigram Districts",
    donor: "Cordaid under SONGO project",
  },
  {
    title:
      "Collective Responsibility, Action & Accountability for Improved Nutrition (CRAAIN)",
    duration: "(Aug 2021 – Jan 2023)",
    focus: "Technical support, training, and saline-tolerant vegetable seeds",
    location: "Bagerhat District",
    donor: "European Union – Concern Worldwide",
  },
  {
    title:
      "High-value quality vegetable seeds & technical support grant to marginal farmers of northern char areas",
    duration: "(Ongoing)",
    focus: "Next-generation seed as input grant with technical support",
    location: "Northern Bangladesh",
    donor: "SAKATA, BSA and ODSD",
  },
];

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, "..."];
  }

  if (currentPage >= totalPages - 1) {
    return ["...", totalPages - 2, totalPages - 1, totalPages];
  }

  return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
}

function PaginationControls({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
  className,
}: {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 bg-white select-none sm:flex-row",
        className
      )}
    >
      <div className="text-[13px] sm:text-[14px] font-sans text-[#0D1A14]/70 order-2 sm:order-1">
        Showing <span className="font-medium text-[#0D1A14]">{startIndex + 1}</span> to{" "}
        <span className="font-medium text-[#0D1A14]">
          {Math.min(startIndex + itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-medium text-[#0D1A14]">{totalItems}</span> projects
      </div>

      <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#0D1A14] hover:bg-[#F2F7F1]/60 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page buttons / Ellipsis */}
        {pageNumbers.map((page, i) => {
          if (typeof page === "string") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="flex h-8 w-6 sm:h-9 sm:w-8 items-center justify-center text-xs sm:text-sm font-medium text-[#0D1A14]/40 select-none"
              >
                •••
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer",
                currentPage === page
                  ? "bg-[#0F3221] text-[#F2F7F1] font-semibold"
                  : "border border-[#E4E7EC] text-[#0D1A14] hover:bg-[#F2F7F1]/60"
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-[#E4E7EC] text-[#0D1A14] hover:bg-[#F2F7F1]/60 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

interface BrandProjectsTableProps {
  projects?: Project[];
}

export default function BrandProjectsTable({ projects }: BrandProjectsTableProps = {}) {
  if (projects && projects.length === 0) return null;

  const projectList = projects && projects.length > 0 ? projects : PROJECTS;

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(projectList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projectList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setExpandedIdx(0);
      setIsLoading(false);
    }, 300);
  };

  return (
    <section className="w-full bg-[#F2F7F1] px-4 py-[48px] md:px-8 md:py-[100px] lg:px-[100px]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 md:gap-16">
        {/* Header */}
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center md:gap-8">
          <SectionBadge variant="outline" showDot>
            projects
          </SectionBadge>
          <h2 className="text-center font-sans text-[32px] leading-[120%] font-medium text-[#0D1A14] md:text-[48px]">
            Implemented and ongoing projects
          </h2>
        </div>

        {/* Desktop Table View (lg and above) */}
        <div className="hidden w-full flex-col overflow-hidden rounded-[20px] border border-[#F2F4F7] bg-white shadow-xs lg:flex">
          {/* Header Row */}
          <div className="flex h-[64px] w-full items-center bg-[#0F3221] font-sans text-[16px] font-medium text-[#F2F7F1] select-none">
            <div className="w-[314px] shrink-0 pl-8">Projects</div>
            <div className="w-[386px] shrink-0 pl-8">Focus Areas</div>
            <div className="w-[270px] shrink-0 pl-8">Location</div>
            <div className="w-[270px] shrink-0 pl-8">Donor</div>
          </div>

          {/* Body Rows */}
          <div className="relative flex w-full flex-col min-h-[300px]">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px] transition-all duration-200">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#0F3221]/20 border-t-[#0F3221]" />
                  <span className="text-sm font-sans font-medium text-[#0F3221]/70 animate-pulse">Loading...</span>
                </div>
              </div>
            )}
            {paginatedProjects.map((project, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex min-h-[160px] w-full items-center border-b border-[#F2F4F7] py-6 font-sans text-[16px] transition-colors duration-200 last:border-b-0 hover:bg-[#F2F7F1]/40",
                  idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                )}
              >
                <div className="flex w-[314px] shrink-0 flex-col justify-center gap-1 pr-6 pl-8 align-top">
                  <span className="font-sans leading-[24px] font-medium text-[#0D1A14]">
                    {project.title}
                  </span>
                  <span className="font-sans text-[16px] leading-[24px] text-[#0D1A14]/70">
                    {project.duration}
                  </span>
                </div>
                <div className="w-[386px] shrink-0 pr-6 pl-8 align-top leading-[24px] text-[#0D1A14]">
                  {project.focus}
                </div>
                <div className="w-[270px] shrink-0 pr-6 pl-8 align-top leading-[24px] text-[#0D1A14]">
                  {project.location}
                </div>
                <div className="w-[270px] shrink-0 pr-6 pl-8 align-top leading-[24px] text-[#0D1A14]">
                  {project.donor}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="w-full border-t border-[#F2F4F7]" />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={PROJECTS.length}
            onPageChange={handlePageChange}
            className="px-8 py-5"
          />
        </div>

        {/* Mobile Accordion View (below lg) */}
        <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-[#F2F4F7] bg-white lg:hidden">
          {/* Header Row */}
          <div className="flex h-[55px] w-full items-center bg-[#0F3221] px-6 font-sans text-[16px] font-medium text-[#F2F7F1] select-none">
            Projects
          </div>

          {/* Body Rows */}
          <div className="relative flex w-full flex-col min-h-[300px]">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px] transition-all duration-200">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#0F3221]/20 border-t-[#0F3221]" />
                  <span className="text-sm font-sans font-medium text-[#0F3221]/70 animate-pulse">Loading...</span>
                </div>
              </div>
            )}
            {paginatedProjects.map((project, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <div
                  key={idx}
                  className="flex w-full flex-col border-b border-[#F2F4F7] bg-white last:border-b-0"
                >
                  {/* Clickable Row Header */}
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-150 hover:bg-neutral-50 focus:outline-none"
                  >
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="font-sans text-[16px] leading-[24px] font-medium text-[#195236]">
                        {project.title}
                      </span>
                      <span className="font-sans text-[14px] leading-[21px] text-[#0D1A14]/70">
                        {project.duration}
                      </span>
                    </div>
                    {/* Arrow chevron */}
                    <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                      <svg
                        className={cn(
                          "h-[18px] w-[18px] text-[#0D1A14] transition-transform duration-300",
                          isExpanded ? "rotate-180" : "rotate-0"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[500px] px-6 py-5" : "max-h-0"
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Focus Areas */}
                      <p className="font-sans text-[14px] leading-[21px] text-[#0D1A14]">
                        {project.focus}
                      </p>

                      {/* Location with Pin on right */}
                      <div className="flex items-center gap-2">
                        <div className="h-[14px] w-[14px] shrink-0">
                          <OptimizedImage
                            src={"/location.svg"}
                            alt="Location"
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="font-sans text-[14px] leading-[21px] font-[400] text-[#0D1A14]">
                          {project.location}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="w-full border-t border-[#E4E7EC]" />

                      {/* Donor */}
                      <div className="flex flex-col gap-1 pb-1">
                        <span className="font-sans text-[14px] leading-[21px] font-medium text-[#0D1A14]/70">
                          Donor
                        </span>
                        <span className="font-sans text-[14px] leading-[21px] text-[#0D1A14]">
                          {project.donor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="w-full border-t border-[#F2F4F7]" />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={PROJECTS.length}
            onPageChange={handlePageChange}
            className="px-6 py-4"
          />
        </div>
      </div>
    </section>
  );
}
