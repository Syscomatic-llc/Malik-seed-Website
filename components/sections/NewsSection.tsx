"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { newsData, NewsArticle } from "@/data/sections-data";

// Production Constants
const CARD_WIDTH = 361;
const CARD_GAP = 25;
const CARD_SLOT_WIDTH = CARD_WIDTH + CARD_GAP; // 386px

interface NewsCardProps {
  article: NewsArticle;
}

/**
 * Reusable, memoized NewsCard component to avoid unneeded re-renders during slide transitions
 */
const NewsCard = memo(function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="border-brand-border-light bg-brand-neutral-light flex h-[434px] w-[330px] shrink-0 snap-center flex-col overflow-hidden rounded-[24px] border transition-opacity duration-300 xl:h-[488px] xl:w-[361px]">
      {/* Card Image */}
      <div className="relative h-[256px] w-full bg-neutral-100 xl:h-[264px]">
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
      <div className="flex flex-1 flex-col justify-between p-4 pb-8 xl:p-6 xl:pb-8">
        {/* Category & Date Row */}
        <div className="flex h-[26px] items-center gap-3 xl:h-[29px]">
          <span className="font-inter text-brand-dark/60 text-[12px] leading-normal xl:text-[14px]">
            {article.date}
          </span>
          {article.category ? (
            <>
              <span className="text-brand-dark/40 text-sm">•</span>
              <div className="border-brand-border bg-brand-bg text-brand-active inline-flex h-[26px] items-center justify-center rounded-[8px] border px-3 text-[12px] font-medium xl:h-[29px] xl:px-4 xl:text-[14px]">
                {article.category}
              </div>
            </>
          ) : null}
        </div>

        {/* Card Title */}
        <h3 className="text-brand-dark line-clamp-3 font-sans text-[20px] leading-[24px] font-medium xl:text-[24px] xl:leading-[29px]">
          {article.title}
        </h3>
      </div>
    </div>
  );
});

export default function NewsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const maxIdx = newsData.items.length - 2; // On desktop, 2 cards are visible at a time

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => Math.min(maxIdx, prev + 1));
  }, [maxIdx]);

  return (
    // Figma desktop section: height 688px, bg #F2F7F1 (bg-brand-bg), mobile padding py-10
    <section className="bg-brand-bg w-full py-10 xl:py-[100px]" id="news">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Responsive Grid System */}
        <div className="flex flex-col xl:flex-row xl:gap-[64px]">
          {/* Left Column — Sticky info on desktop, standard flow on mobile/tablet */}
          <div className="mb-8 flex w-full shrink-0 flex-col items-start justify-between gap-8 xl:mb-0 xl:h-[319px] xl:w-[429px]">
            <div className="flex w-full flex-col items-start gap-4">
              {/* Badge — Figma: bg #F9FAFB, border #E4E7EC, radius 30px */}
              <SectionBadge
                variant="outline"
                showDot
                className="h-[30px] gap-[8px] px-4 text-[12px] leading-[18px] xl:h-[33px] xl:gap-[8px] xl:text-[14px] xl:leading-[21px]"
              >
                {newsData.badge}
              </SectionBadge>

              {/* Title — Figma: "Insights from agricultural research & field experts" (48px / line-height 58px on desktop, 32px / 38px on mobile) */}
              <h2
                className="text-brand-dark max-w-[466px] text-[32px] leading-[38px] font-medium xl:text-[48px] xl:leading-[58px]"
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontWeight: 500,
                }}
              >
                {newsData.title}
              </h2>
            </div>

            {/* Navigation buttons — Figma: 2x 48x48 circles with 16px gap (hidden on mobile/tablet) */}
            <div className="hidden gap-4 xl:flex">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous articles"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                  activeIdx === 0
                    ? "border-brand-border text-brand-dark/30 cursor-not-allowed bg-transparent"
                    : "border-brand-border text-brand-dark hover:bg-brand-active hover:border-brand-active hover:text-white"
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
                    : "border-brand-border text-brand-dark hover:bg-brand-active hover:border-brand-active hover:text-white"
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
          <div className="relative h-auto w-full overflow-hidden xl:h-[488px] xl:w-[748px]">
            {/* Side Fade Mask — Smoothly fades cards out on the right edge */}
            <div className="from-brand-bg pointer-events-none absolute top-0 right-0 z-20 hidden h-full w-[120px] bg-gradient-to-l to-transparent xl:block" />

            {/* Desktop Sliding Container (>=1280px) */}
            <div className="hidden h-full w-full overflow-hidden xl:block">
              <div
                className="flex gap-[25px] transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${activeIdx * CARD_SLOT_WIDTH}px)`,
                }}
              >
                {newsData.items.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Native Swipe Container (<1280px) */}
            <div className="block w-full snap-x snap-mandatory scrollbar-none overflow-x-auto pb-4 xl:hidden">
              <div className="flex gap-4 pr-8">
                {newsData.items.map((article) => (
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
