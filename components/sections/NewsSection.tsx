"use client";

import { useState } from "react";

const articles = [
  {
    id: 1,
    category: "Climate",
    date: "September 12, 2024",
    title: "Strengthening Climate-Resilient Farming Through Hybrid Innovation",
    excerpt:
      "Malik Seeds is developing hybrid varieties with higher resilience to extreme climate events, assisting local growers in securing their yields.",
    readTime: "4 min read",
  },
  {
    id: 2,
    category: "Commercial Growers",
    date: "June 18, 2024",
    title: "Introducing High-Yield Pumpkin Variety for Commercial Growers",
    excerpt:
      "Our new hybrid pumpkin variety provides uniform size, disease resistance, and longer shelf-life, maximizing profits for commercial growers.",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "Training",
    date: "August 03, 2024",
    title: "Expanding Farmer Training Programs Across Northern Regions",
    excerpt:
      "With support from development partners, we're expanding our agronomist training sessions to teach modern seed selection and cultivation techniques.",
    readTime: "5 min read",
  },
];


export default function NewsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    // Desktop: 1439x688, bg #F2F7F1
    <section className="w-full bg-brand-bg py-16 md:py-[100px]" id="news">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Header row */}
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            {/* Badge — Figma: 163x33, bg #F9FAFB, border #E4E7EC, radius 30px */}
            <div className="flex w-fit items-center gap-2 rounded-[30px] border border-neutral-200 bg-[#F9FAFB] px-4 py-2">
              <div className="h-[6px] w-[6px] rounded-sm bg-brand-active" />
              <span className="font-inter text-[14px] font-medium leading-[21px] text-brand-active">
                News & Stories
              </span>
            </div>

            {/* Title — Figma: "Insights from agricultural research & field experts", 48px */}
            <h2 className="text-h2-title text-brand-dark max-w-[466px]">
              Insights from agricultural research &amp; field experts
            </h2>
          </div>

          {/* Navigation arrows — Figma: 2× 48x48 circle */}
          <div className="flex gap-4">
            <button
              onClick={() =>
                setActiveIdx(
                  (i) => (i - 1 + articles.length) % articles.length
                )
              }
              aria-label="Previous article"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-200 transition-colors hover:bg-brand-active hover:text-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveIdx((i) => (i + 1) % articles.length)
              }
              aria-label="Next article"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-active text-white transition-opacity hover:opacity-90"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Article cards — Figma: 361x488 each, bg #F9FAFB, border #F2F4F7, radius 24px */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-[25px]">
          {articles.map((article, idx) => (
            <div
              key={article.id}
              className={`flex flex-col gap-6 rounded-[24px] border border-[#F2F4F7] bg-[#F9FAFB] p-6 transition-opacity md:flex-1 md:p-8 ${
                idx === activeIdx ? "opacity-100" : "opacity-60 md:opacity-60"
              }`}
            >
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="font-inter rounded-full bg-brand-light-green/30 px-3 py-1 text-[12px] font-medium text-brand-active">
                  {article.category}
                </span>
                <span className="font-inter text-[13px] text-brand-dark/40">
                  {article.date}
                </span>
              </div>

              {/* Article image placeholder */}
              <div className="h-[160px] w-full rounded-[16px] bg-neutral-200 md:h-[200px]" />

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-h3-title font-semibold text-brand-dark">
                  {article.title}
                </h3>
                <p className="font-inter text-[14px] leading-[22px] text-brand-dark/60 md:text-[15px]">
                  {article.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between">
                <span className="font-inter text-[13px] text-brand-dark/40">
                  {article.readTime}
                </span>
                <a
                  href="/news"
                  className="font-sans flex items-center gap-1.5 text-[14px] font-medium text-brand-active hover:underline"
                >
                  Read more
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
