"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

// Production Constants
const CARD_WIDTH = 361;
const CARD_GAP = 25;
const CARD_SLOT_WIDTH = CARD_WIDTH + CARD_GAP; // 386px

const articles = [
  {
    id: 1,
    category: "Climate",
    date: "SEP 12, 2024",
    title: "Strengthening Climate-Resilient Farming Through Hybrid Innovation",
    image: "/images/news/news-1.png",
  },
  {
    id: 2,
    category: "Commercial Growers",
    date: "JUN 18, 2024",
    title: "Introducing High-Yield Pumpkin Variety for Commercial Growers",
    image: "/images/news/news-2.png",
  },
  {
    id: 3,
    category: "",
    date: "AUG 03, 2024",
    title: "Expanding Farmer Training Programs Across Northern Regions",
    image: "/images/news/news-3.png",
  },
];

interface NewsCardProps {
  article: typeof articles[0];
}

/**
 * Reusable, memoized NewsCard component to avoid unneeded re-renders during slide transitions
 */
const NewsCard = memo(function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="flex flex-col w-[330px] h-[434px] xl:w-[361px] xl:h-[488px] rounded-[24px] border border-brand-border-light bg-brand-neutral-light overflow-hidden shrink-0 snap-center transition-opacity duration-300">
      {/* Card Image */}
      <div className="relative w-full h-[256px] xl:h-[264px] bg-neutral-100">
        <Image
          src={article.image}
          alt={article.title}
          loading="eager"
          fill
          sizes="(max-width: 1280px) 330px, 361px"
          className="object-cover object-center"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between flex-1 p-4 pb-8 xl:p-6 xl:pb-8">
        {/* Category & Date Row */}
        <div className="flex items-center gap-3 h-[26px] xl:h-[29px]">
          <span className="font-inter text-[12px] xl:text-[14px] leading-normal text-brand-dark/60">
            {article.date}
          </span>
          {article.category ? (
            <>
              <span className="text-brand-dark/40 text-sm">
                •
              </span>
              <div className="inline-flex h-[26px] xl:h-[29px] items-center justify-center rounded-[8px] border border-brand-border bg-brand-bg px-3 xl:px-4 text-[12px] xl:text-[14px] font-medium text-brand-active">
                {article.category}
              </div>
            </>
          ) : null}
        </div>

        {/* Card Title */}
        <h3 className="font-sans text-[20px] leading-[24px] xl:text-[24px] xl:leading-[29px] font-medium text-brand-dark line-clamp-3">
          {article.title}
        </h3>
      </div>
    </div>
  );
});

export default function NewsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const maxIdx = articles.length - 2; // On desktop, 2 cards are visible at a time

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => Math.min(maxIdx, prev + 1));
  }, [maxIdx]);

  return (
    // Figma desktop section: height 688px, bg #F2F7F1 (bg-brand-bg), mobile padding py-10
    <section className="w-full bg-brand-bg py-10 xl:py-[100px]" id="news">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        
        {/* Responsive Grid System */}
        <div className="flex flex-col xl:flex-row xl:gap-[64px]">
          
          {/* Left Column — Sticky info on desktop, standard flow on mobile/tablet */}
          <div className="flex flex-col justify-between items-start gap-8 shrink-0 w-full xl:w-[429px] xl:h-[319px] mb-8 xl:mb-0">
            <div className="flex flex-col gap-4 items-start w-full">
              {/* Badge — Figma: bg #F9FAFB, border #E4E7EC, radius 30px */}
              <SectionBadge variant="outline" showDot className="h-[30px] text-[12px] leading-[18px] px-4 gap-[8px] xl:h-[33px] xl:text-[14px] xl:leading-[21px] xl:gap-[8px]">
                News & Stories
              </SectionBadge>

              {/* Title — Figma: "Insights from agricultural research & field experts" (48px / line-height 58px on desktop, 32px / 38px on mobile) */}
              <h2 
                className="text-[32px] leading-[38px] xl:text-[48px] xl:leading-[58px] font-medium text-brand-dark max-w-[466px]"
                style={{ fontFamily: "var(--font-inter-tight)", fontWeight: 500 }}
              >
                Insights from agricultural research &amp; field experts
              </h2>
            </div>

            {/* Navigation buttons — Figma: 2x 48x48 circles with 16px gap (hidden on mobile/tablet) */}
            <div className="hidden xl:flex gap-4">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous articles"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                  activeIdx === 0
                    ? "border-brand-border text-brand-dark/30 cursor-not-allowed bg-transparent"
                    : "border-brand-border text-brand-dark hover:bg-brand-active hover:text-white hover:border-brand-active"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={activeIdx === maxIdx}
                aria-label="Next articles"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                  activeIdx === maxIdx
                    ? "border-brand-border text-brand-dark/30 cursor-not-allowed bg-transparent"
                    : "border-brand-border text-brand-dark hover:bg-brand-active hover:text-white hover:border-brand-active"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column — Horizontal slider on desktop, native snap scroll on mobile/tablet */}
          <div className="relative w-full xl:w-[748px] h-auto xl:h-[488px] overflow-hidden">
            
            {/* Side Fade Mask — Smoothly fades cards out on the right edge */}
            <div
              className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[120px] bg-gradient-to-l from-brand-bg to-transparent hidden xl:block"
            />

            {/* Desktop Sliding Container (>=1280px) */}
            <div className="hidden xl:block w-full h-full overflow-hidden">
              <div
                className="flex gap-[25px] transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${activeIdx * CARD_SLOT_WIDTH}px)`,
                }}
              >
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Native Swipe Container (<1280px) */}
            <div className="block xl:hidden w-full overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4">
              <div className="flex gap-4 pr-8">
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
