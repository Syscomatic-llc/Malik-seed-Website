"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/SectionBadge";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
export interface GalleryImage {
  readonly id: number;
  readonly src: string;
  readonly alt: string;
}

interface GalleryHeroSectionProps {
  readonly initialImages?: readonly GalleryImage[];
  readonly isHero?: boolean;
}

// ---------------------------------------------------------------------------
// Production-Grade Static Configurations (Architectural Cleanliness)
// ---------------------------------------------------------------------------
const INITIAL_VISIBLE = 10; // same slice for all breakpoints (SSR-safe)
const MOBILE_INITIAL_VISIBLE = 5; // CSS-only cutoff for small screens
const LOAD_MORE_STEP = 6;
const ANIMATION_DELAY_MS = 800;

// Pixel-perfect image fallback assets mapped from Figma Design Node 2691:17850
const FALLBACK_GALLERY_IMAGES: readonly GalleryImage[] = [
  { id: 1, src: "/images/gallery/061_1.png", alt: "Healthy green crops field" },
  { id: 2, src: "/images/gallery/055_1.png", alt: "Fresh cabbage head" },
  { id: 3, src: "/images/gallery/057_2.png", alt: "Farmer examining plants" },
  { id: 4, src: "/images/gallery/006_1.png", alt: "Rich vegetable harvest" },
  { id: 5, src: "/images/gallery/009_1.png", alt: "Potato crop cultivation" },
  {
    id: 6,
    src: "/images/gallery/image_29.png",
    alt: "Cabbage seedlings growing",
  },
  {
    id: 7,
    src: "/images/gallery/image_32.png",
    alt: "Harvesting in the greenhouse",
  },
  {
    id: 8,
    src: "/images/gallery/056_1.png",
    alt: "Selecting seeds for planting",
  },
  { id: 9, src: "/images/gallery/070.png", alt: "Happy farming team" },
  {
    id: 10,
    src: "/images/gallery/image_31.png",
    alt: "Fresh green cabbage fields",
  },
  // Back-filled timeline images to demonstrate dynamic load-more functionality
  {
    id: 11,
    src: "/images/timeline/001_(1)_1.png",
    alt: "Modern agricultural machinery",
  },
  { id: 12, src: "/images/timeline/005_1.png", alt: "Field crop inspection" },
  {
    id: 13,
    src: "/images/timeline/distributor_picture_1_1.png",
    alt: "Seed distribution warehouse",
  },
  {
    id: 14,
    src: "/images/timeline/field_activities-49_1.png",
    alt: "Planting season fields",
  },
  {
    id: 15,
    src: "/images/timeline/malik_seeds_team-4_1.png",
    alt: "R&D team in the laboratory",
  },
  {
    id: 16,
    src: "/images/timeline/image_30.png",
    alt: "High-yield potato harvest",
  },
] as const;

// O(1) Pre-compiled responsive grid layouts matching Figma specs (xl breakpoint for widescreen desktop)
const DESKTOP_WIDTH_CLASSES: readonly string[] = [
  "xl:w-[calc(63.15%-12px)]", // Index 0: Large
  "xl:w-[calc(36.85%-12px)]", // Index 1: Medium
  "xl:w-[calc(33.33%-16px)]", // Index 2: Small
  "xl:w-[calc(33.33%-16px)]", // Index 3: Small
  "xl:w-[calc(33.33%-16px)]", // Index 4: Small
  "xl:w-[calc(36.85%-12px)]", // Index 5: Medium
  "xl:w-[calc(63.15%-12px)]", // Index 6: Large
  "xl:w-[calc(33.33%-16px)]", // Index 7: Small
  "xl:w-[calc(33.33%-16px)]", // Index 8: Small
  "xl:w-[calc(33.33%-16px)]", // Index 9: Small
] as const;

const MOBILE_SPAN_CLASSES: readonly string[] = [
  "col-span-1 h-[180px] sm:h-[240px] md:h-[320px]", // Index 0: Half width (responsively scaled for iPad/tablets)
  "col-span-1 h-[180px] sm:h-[240px] md:h-[320px]", // Index 1: Half width (responsively scaled for iPad/tablets)
  "col-span-2 h-[220px] sm:h-[300px] md:h-[420px]", // Index 2: Full width (responsively scaled for iPad/tablets)
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const GalleryHeroSection = ({
  initialImages = FALLBACK_GALLERY_IMAGES,
  isHero = true,
}: GalleryHeroSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLoading, setIsLoading] = useState(false);
  const [hasExpanded, setHasExpanded] = useState(false); // tracks first "Load More" click

  const visibleImages = initialImages.slice(0, visibleCount);
  const hasMore = visibleCount < initialImages.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setHasExpanded(true);
    setTimeout(() => {
      setVisibleCount((count) =>
        Math.min(count + LOAD_MORE_STEP, initialImages.length)
      );
      setIsLoading(false);
    }, ANIMATION_DELAY_MS);
  };

  // About-page variant: always show exactly 5 images + a "View Gallery" link
  if (!isHero) {
    const previewImages = initialImages.slice(0, 5);
    return (
      <section className="w-full bg-[#F2F7F1] pt-10 pb-20 md:pt-16 md:pb-[80px] xl:pt-[100px] xl:pb-[120px]">
        <div className="mx-auto flex w-full max-w-[1242px] flex-col items-center gap-12 px-4 sm:px-6 md:px-8 xl:gap-16 xl:px-0">
          {/* Header — always centered */}
          <div
            className={`flex w-full flex-col gap-4 xl:gap-8 ${!isHero ? "items-left" : "items-center"}`}
          >
            <SectionBadge
              variant="outline"
              showDot={false}
              className="font-heading h-[30px] gap-2 border-[#E4E7EC] px-4 text-[12px] leading-[18px] xl:h-[33px] xl:text-[14px] xl:leading-[21px]"
            >
              <span className="h-[6px] w-[6px] shrink-0 rounded-[2px] bg-[#195236]" />
              <span className="font-medium text-[#195236]">Gallery</span>
            </SectionBadge>

            <h2 className="font-heading text-[34px] leading-[41px] font-semibold tracking-tight text-[#0D1A14] xl:text-[48px] xl:leading-[58px]">
              Our Journey in Pictures
            </h2>
          </div>

          {/* 5-image bento preview grid */}
          <div className="flex w-full flex-col items-center gap-12 xl:gap-[48px]">
            <div className="grid w-full grid-cols-2 gap-4 md:gap-6 xl:flex xl:flex-wrap xl:justify-start">
              {previewImages.map((image, index) => {
                const widthClass =
                  DESKTOP_WIDTH_CLASSES[index % DESKTOP_WIDTH_CLASSES.length];
                const mobileClass =
                  MOBILE_SPAN_CLASSES[index % MOBILE_SPAN_CLASSES.length];
                return (
                  <div
                    key={image.id}
                    className={`${mobileClass} ${widthClass} group relative overflow-hidden rounded-[16px] bg-neutral-100 xl:h-[450px] xl:rounded-[24px]`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 768px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      priority={index < 4}
                    />
                  </div>
                );
              })}
            </div>

            {/* View Gallery CTA */}
            <div className="flex w-full justify-center">
              <Link
                href="/our-gallery"
                className="font-heading inline-flex items-center gap-2 rounded-[60px] bg-[#195236] px-6 py-2.5 text-sm font-medium text-[#F2F7F1] transition-all duration-200 hover:bg-[#153e28] active:scale-95 xl:px-8 xl:py-3 xl:text-base"
              >
                <span>View Gallery</span>
                <Image
                  src="/arrow.svg"
                  alt="view gallery"
                  width={16}
                  height={16}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Gallery-page variant: full bento with load-more
  return (
    <section className="w-full bg-[#F2F7F1] pt-[100px] pb-20 xl:pt-[180px] xl:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1242px] flex-col items-center gap-12 px-4 sm:px-6 md:px-8 xl:gap-16 xl:px-0">
        {/* Header Badge & Title */}
        <div className="flex w-full flex-col items-center gap-4 xl:gap-8">
          <SectionBadge
            variant="outline"
            showDot={false}
            className="font-heading h-[30px] gap-2 border-[#E4E7EC] px-4 text-[12px] leading-[18px] xl:h-[33px] xl:text-[14px] xl:leading-[21px]"
          >
            <span className="h-[6px] w-[6px] shrink-0 rounded-[2px] bg-[#195236]" />
            <span className="font-medium text-[#195236]">Gallery</span>
          </SectionBadge>

          <h1 className="font-heading text-center text-[34px] leading-[41px] font-semibold tracking-tight text-[#0D1A14] xl:text-[48px] xl:leading-[58px]">
            Our Journey in Pictures
          </h1>
        </div>

        {/* Bento gallery grid */}
        <div className="flex w-full flex-col items-center gap-12 xl:gap-[48px]">
          <div className="grid w-full grid-cols-2 gap-4 md:gap-6 xl:flex xl:flex-wrap xl:justify-start">
            {visibleImages.map((image, index) => {
              const widthClass =
                DESKTOP_WIDTH_CLASSES[index % DESKTOP_WIDTH_CLASSES.length];
              const mobileClass =
                MOBILE_SPAN_CLASSES[index % MOBILE_SPAN_CLASSES.length];
              const mobileHideClass =
                !hasExpanded &&
                index >= MOBILE_INITIAL_VISIBLE &&
                index < INITIAL_VISIBLE
                  ? "hidden xl:flex"
                  : "";

              return (
                <div
                  key={image.id}
                  className={`${mobileClass} ${widthClass} ${mobileHideClass} group relative overflow-hidden rounded-[16px] bg-neutral-100 xl:h-[450px] xl:rounded-[24px]`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 768px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={index < 4}
                  />
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-4 flex w-full justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="text-button font-heading flex h-[41px] w-[118px] cursor-pointer items-center justify-center gap-[6px] rounded-[60px] border-0 bg-[#195236] px-4 text-sm font-medium text-[#F2F7F1] transition-all duration-200 select-none hover:bg-[#153e28] active:scale-95 disabled:pointer-events-none disabled:opacity-85 xl:h-[46px] xl:w-[154px] xl:gap-[10px] xl:px-6 xl:text-base"
              >
                <span className="font-medium">Load More</span>
                {isLoading && (
                  <span className="flex h-4 w-4 items-center justify-center xl:h-5 xl:w-5">
                    <Image
                      src="/loading.svg"
                      alt="loading"
                      width={20}
                      height={20}
                      className="animate-spin"
                    />
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryHeroSection;
