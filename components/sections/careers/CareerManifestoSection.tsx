"use client";

import { memo } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import ActionButton from "@/components/ActionButton";
import type { careerManifestoData } from "@/data/career-data";

// ── CareerManifestoSection: Section 3 ───────────────────────────────────────
// Figma node 2424:13861 — 1440×1105, bg #0D1A14, borderRadius 40px on top
// Inner: 1240×905, centered
// Top half (481px): center badge "CAREERS" (dark variant) + accent subtitle
//   "It's Your Turn" in brand-light-green 48px + 5 paragraph body texts 16px
//   + green CTA button "View Open Positions"
// Bottom half (360px): infinite auto-scrolling strip of image cards (608×360)
//   each with white bg / radius 24, some with gradient overlay fade
// ────────────────────────────────────────────────────────────────────────────

// Inline fake placeholder images using green gradient (since Figma images need download)
const MANIFESTO_IMAGES = [
  {
    src: "/images/team/malik_farm_grid.png",
    alt: "Malik Seeds farm — aerial view grid",
    hasLeftFade: true,
    widthClass: "w-[310px] lg:w-[608px]",
  },
  {
    src: "/images/team/malik_seeds_team-5.png",
    alt: "Malik Seeds team",
    hasLeftFade: false,
    widthClass: "w-[348px] lg:w-[608px]",
  },
  {
    src: "/images/team/maliks_farm_rd.png",
    alt: "Malik Seeds R&D farm",
    hasLeftFade: true,
    widthClass: "w-[310px] lg:w-[608px]",
  },
];

// Static style objects for the slider side fades (using #0D1A14 / rgb(13,26,20) to blend with bg-brand-dark)
const LEFT_FADE_STYLE = {
  background: "linear-gradient(270deg, rgba(13, 26, 20, 0.00) 0%, rgba(13, 26, 20, 0.75) 65.43%, #0D1A14 100%)",
} as const;

const RIGHT_FADE_STYLE = {
  background: "linear-gradient(90deg, rgba(13, 26, 20, 0.00) 0%, rgba(13, 26, 20, 0.75) 65.43%, #0D1A14 100%)",
} as const;

export default memo(function CareerManifestoSection({ data }: { data: typeof careerManifestoData }) {
  return (
    <section
      id="career-manifesto"
      aria-label="It's Your Turn — Career Manifesto"
      className="w-full overflow-hidden bg-brand-dark"
      style={{ borderRadius: "40px 40px 0 0" }}
    >
      <div className="mx-auto w-full max-w-[1440px]">

        {/* ── Top content block ── */}
        <div className="mx-auto max-w-[1240px] px-4 xl:px-0">
          <div
            className="flex flex-col items-center gap-8 pt-[100px] pb-0"
          >
            {/* Section label badge — dark variant */}
            <SectionBadge variant="dark" showDot dotSize="8px" className="uppercase tracking-wider">
              {data.badge}
            </SectionBadge>

            {/* Main text block */}
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Accent subtitle — brand-light-green 48px */}
              <h2
                className="font-inter-tight text-[32px] font-medium leading-[150%] text-brand-light-green md:text-[48px] md:leading-[58px]"
              >
                {data.subtitle}
              </h2>

              {/* 5-paragraph body — white, 16px/24px, centered, max-w 770px */}
              <div className="mt-4 flex max-w-[770px] flex-col gap-2">
                {data.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-inter text-[16px] leading-[24px] text-brand-bg text-center mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* CTA button — green (#A9E179) with dark text */}
            <ActionButton
              href={data.cta.href}
              label={data.cta.label}
              variant="primary"
              className="h-[46px] px-6 text-[16px] !text-brand-dark"
            />
          </div>
        </div>

        {/* ── Bottom image strip: Infinite auto-scroll Marquee ── */}
        <div className="relative w-full overflow-hidden mt-[60px] pb-[100px] lg:pb-[104px]">
          {/* Side Fades — gradient overlays to smoothly transition images in/out */}
          <div
            className="pointer-events-none absolute top-0 left-0 z-20 h-[280px] lg:h-[360px] w-24 lg:w-[214px]"
            style={LEFT_FADE_STYLE}
          />
          <div
            className="pointer-events-none absolute top-0 -right-1 z-20 h-[280px] lg:h-[360px] w-24  lg:w-[214px]"
            style={RIGHT_FADE_STYLE}
          />

          <div className="animate-marquee hover:[animation-play-state:paused] flex gap-4 lg:gap-6">
            {[...MANIFESTO_IMAGES, ...MANIFESTO_IMAGES].map((img, i) => (
              <div
                key={i}
                className={`relative flex-shrink-0 overflow-hidden rounded-[20px] lg:rounded-[24px] bg-white h-[280px] lg:h-[360px] ${img.widthClass}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 608px, 348px"
                  className="object-cover object-center"
                />
                {/* Left-side gradient fade overlay on specific cards */}
                {img.hasLeftFade && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[96px] lg:w-[214px]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
