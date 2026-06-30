"use client";

import { memo } from "react";
import ActionButton from "@/components/ActionButton";
import type { openPositionsData, JobPosition } from "@/data/career-data";

// ── JobRow Component (handles both desktop row and mobile stack responsive layout) ──
const JobRow = memo(function JobRow({ position }: { position: JobPosition }) {
  return (
    <article
      className="flex w-full flex-col gap-6 border-b border-[#CED2DA] pb-8 pt-6 first:pt-0"
      aria-label={`Job opening: ${position.title}`}
    >
      {/* Upper part: Title and Tags */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <h3 className="font-inter-tight text-[20px] font-medium leading-[30px] text-[#0D1A14] lg:text-[24px] lg:leading-[36px]">
          {position.title}
        </h3>

        {/* Tags (Desktop: inline right) */}
        <div className="hidden flex-wrap gap-2 lg:flex">
          {position.tags.map((tag) => (
            <span
              key={tag}
              className="flex h-[33px] items-center justify-center rounded-[16px] bg-[#DCF3C7] px-4 font-inter text-[14px] leading-[17px] font-medium text-[#195236]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="font-inter text-[16px] leading-[24px] text-[#0D1A14] lg:-mt-2">
        {position.description}
      </p>

      {/* Tags (Mobile: below description) */}
      <div className="flex flex-wrap gap-2 lg:hidden">
        {position.tags.map((tag) => (
          <span
            key={tag}
            className="flex h-[33px] items-center justify-center rounded-[16px] bg-[#DCF3C7] px-4 font-inter text-[14px] leading-[17px] font-medium text-[#195236]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <ActionButton
        href={`/careers/${position.id}`}
        label="View Details"
        variant="dark"
        className="h-[41px] w-[130px] text-[14px] lg:h-[46px] lg:w-[165px] lg:text-[16px]"
        showArrow={true}
      />
    </article>
  );
});

export default memo(function OpenPositionsSection({ data }: { data: typeof openPositionsData }) {
  return (
    <section
      id="open-positions"
      aria-label="Career Opportunities at Malik Seeds"
      className="w-full bg-[#F2F7F1] pt-[120px] pb-12 lg:pt-[180px] lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
        
        {/* Header Block: Badge + Title */}
        <div className="flex flex-col items-start gap-8">
          {/* Badge */}
          <div className="inline-flex h-[30px] items-center gap-2 rounded-[30px] border border-[#E4E7EC] bg-[#F9FAFB] px-4 lg:h-[33px]">
            <span className="font-inter text-[12px] font-medium leading-[18px] text-[#195236] lg:text-[14px] lg:leading-[21px]">
              {data.badge}
            </span>
            <span className="h-1.5 w-1.5 rounded-[2px] bg-[#195236]" />
          </div>

          {/* Title */}
          <h2 className="max-w-[358px] font-inter-tight text-[34px] font-medium leading-[41px] text-[#0D1A14] md:max-w-[633px] lg:text-[64px] lg:leading-[77px]">
            {data.title}
          </h2>
        </div>

        {/* Positions List */}
        <div className="mt-12 flex flex-col gap-8 lg:gap-10">
          {data.positions.map((pos) => (
            <JobRow key={pos.id} position={pos} />
          ))}
        </div>

      </div>
    </section>
  );
});
