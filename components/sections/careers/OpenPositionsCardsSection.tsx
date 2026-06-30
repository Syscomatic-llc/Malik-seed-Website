"use client";

import { memo } from "react";
import ActionButton from "@/components/ActionButton";
import type { openPositionsData, JobPosition } from "@/data/career-data";
import { SectionBadge } from "@/components/ui/SectionBadge";

const PositionCard = memo(function PositionCard({ position }: { position: JobPosition }) {
  return (
    <article
      className="flex flex-col justify-between gap-6 md:gap-10 rounded-[24px] border border-[#E4E7EC] bg-white p-8 max-h-[361px] w-full"
      aria-label={`Job opportunity: ${position.title}`}
    >
      {/* Top half: Title, description, tags */}
      <div className="flex flex-col gap-8">
        {/* Title & description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-inter-tight text-[24px] font-medium leading-[36px] text-[#0D1A14]">
            {position.title}
          </h3>
          <p className="font-inter text-[16px] leading-[24px] text-[#0D1A14]/70 line-clamp-2">
            {position.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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

      {/* Bottom half: Divider + Button */}
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="h-px w-full bg-[#CED2DA]" />
        <ActionButton
          href={`/careers/${position.id}`}
          label="View Details"
          variant="dark"
          className="h-[46px] w-[165px] text-[16px]"
          showArrow={true}
        />
      </div>
    </article>
  );
});

export default memo(function OpenPositionsCardsSection({ data }: { data: typeof openPositionsData }) {
  return (
    <section
      id="open-positions-cards"
      aria-label="Career Opportunities at Malik Seeds"
      className="w-full bg-[#F2F7F1] pt-[100px] pb-12 lg:pt-[120px] lg:pb-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 xl:px-0">
        
        {/* Header Block: Badge + Title */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          {/* Badge */}
          <SectionBadge variant="outline" showDot dotSize="6px">
            {data.badge}
          </SectionBadge>

          {/* Title */}
          <h2 className="font-inter-tight text-[32px] font-medium leading-[38px] text-[#0D1A14] md:text-[48px] md:leading-[58px]">
            {data.title}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.positions.map((pos) => (
            <PositionCard key={pos.id} position={pos} />
          ))}
        </div>

      </div>
    </section>
  );
});
