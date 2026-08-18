"use client";

import { memo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
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


// Side-fade gradients blend into the section bg (#0D1A14) — matches Figma exactly
const LEFT_FADE =
  "linear-gradient(270deg, rgba(13,26,20,0) 0%, rgba(13,26,20,0.75) 65%, #0D1A14 100%)";
const RIGHT_FADE =
  "linear-gradient(90deg, rgba(13,26,20,0) 0%, rgba(13,26,20,0.75) 65%, #0D1A14 100%)";

export default memo(function CareerManifestoSection({
  data,
}: {
  data: typeof careerManifestoData & { images?: string[] };
}) {
  return (
    <section
      id="career-manifesto"
      aria-label="It's Your Turn - Career Manifesto"
      className="bg-brand-dark w-full overflow-hidden"
      style={{ borderRadius: "40px 40px 0 0" }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* ── Top content block ── */}
        <div className="mx-auto max-w-[1240px] px-4 xl:px-0">
          <div className="flex flex-col items-center gap-8 pt-[100px] pb-0">
            {/* Section label badge — dark variant */}
            <SectionBadge
              variant="dark"
              showDot
              dotSize="8px"
              className="tracking-wider uppercase"
            >
              {data.badge}
            </SectionBadge>

            {/* Main text block */}
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Accent subtitle — brand-light-green 48px */}
              <h2 className="font-inter-tight text-brand-light-green text-[32px] leading-[150%] font-medium md:text-[48px] md:leading-[58px]">
                {data.subtitle}
              </h2>

              {/* 5-paragraph body — white, 16px/24px, centered, max-w 770px */}
              <div className="mt-4 flex max-w-[770px] flex-col gap-2">
                {data.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-inter text-brand-bg mb-0 text-center text-[16px] leading-[24px]"
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
              className="!text-brand-dark h-[46px] px-6 text-[16px]"
            />
          </div>
        </div>

        {/* ── Bottom image strip ── */}
        {data.images && data.images.length > 0 ? (
          <div className="relative mt-16 w-full overflow-hidden pb-[100px] lg:pb-[104px]">
            {/* Deep left-edge fade — blends first card into bg */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 z-10 h-[280px] w-[96px] lg:h-[360px] lg:w-[214px]"
              style={{ background: LEFT_FADE }}
            />
            {/* Deep right-edge fade — blends last card into bg */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 z-10 h-[280px] w-[96px] lg:h-[360px] lg:w-[214px]"
              style={{ background: RIGHT_FADE }}
            />

            {/* Centered strip — all cards are 616×360px (aspect 77/45). */}
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              {data.images.map((src, i) => (
                <div
                  key={i}
                  className="group relative h-[280px] w-[348px] shrink-0 overflow-hidden rounded-[20px] bg-[#1a2d24] lg:h-[360px] lg:w-[616px] lg:rounded-[24px]"
                  style={{ aspectRatio: "12/7" }}
                >
                  <OptimizedImage
                    src={src}
                    alt={`Manifesto image ${i + 1}`}
                    fill
                    sizes="616px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pb-[100px] lg:pb-[104px]" />
        )}
      </div>
    </section>
  );
});
