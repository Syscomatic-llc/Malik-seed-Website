"use client";

import { useState, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SectionBadge } from "@/components/ui/SectionBadge";
import LoadmoreButton from "../LoadmoreButton";
import OptimizedImage from "../ui/OptimizedImage";

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
const INITIAL_VISIBLE = 9; // aligned to multiple of 3 for grid completeness
const MOBILE_INITIAL_VISIBLE = 9; // aligned to multiple of 3 for mobile grid completeness
const LOAD_MORE_STEP = 9;
const ANIMATION_DELAY_MS = 800;
const COUNT_PARAM = "count"; // URL query param that persists "load more" progress

export const FALLBACK_GALLERY_IMAGES: GalleryImage[] = [];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const GalleryHeroSection = ({
  initialImages = [],
  isHero = true,
}: GalleryHeroSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive the initial visible count from the URL (?count=16), clamped to a
  // safe range. This is what makes "Load more" progress survive a reload —
  // on remount, we read where the user left off instead of always starting
  // at INITIAL_VISIBLE.
  const getInitialCount = useCallback(() => {
    const raw = Number(searchParams.get(COUNT_PARAM));
    if (!Number.isFinite(raw) || raw <= INITIAL_VISIBLE) {
      return INITIAL_VISIBLE;
    }
    return Math.min(raw, initialImages.length);
  }, [searchParams, initialImages.length]);

  const [visibleCount, setVisibleCount] = useState(getInitialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Derived, not separate state — this guarantees it's always consistent
  // with visibleCount, including right after a reload restores a count > 12.
  const hasExpanded = visibleCount > INITIAL_VISIBLE;

  const visibleImages = initialImages.slice(0, visibleCount);
  const hasMore = visibleCount < initialImages.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const next = Math.min(
        visibleCount + LOAD_MORE_STEP,
        initialImages.length
      );
      setVisibleCount(next);
      setIsLoading(false);

      // Sync progress into the URL without a server round-trip or scroll
      // jump. router.replace (not push) keeps "Load more" clicks out of
      // browser history, so the back button doesn't step through them.
      const params = new URLSearchParams(searchParams.toString());
      params.set(COUNT_PARAM, String(next));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, ANIMATION_DELAY_MS);
  };

  // About-page variant: always show exactly 6 images + a "View Gallery" link
  if (!isHero) {
    const previewImages = initialImages.slice(0, 6);
    return (
      <section className="w-full bg-[#F2F7F1] pt-10 pb-20 md:pt-16 md:pb-[80px] xl:pt-[100px] xl:pb-[120px]">
        <div className="mx-auto flex w-full max-w-[1242px] flex-col items-center gap-12 px-4 sm:px-6 md:px-8 xl:gap-16 xl:px-0">
          {/* Header — always centered */}
          <div
            className={`flex w-full flex-col gap-4 xl:gap-8 ${!isHero ? "items-left" : "items-center"}`}
          >
            <SectionBadge
              variant="outline"
              showDot
              className="font-heading h-[30px] gap-2 border-[#E4E7EC] px-4 text-[12px] leading-[18px] xl:h-[33px] xl:text-[14px] xl:leading-[21px]"
            >
              Gallery
            </SectionBadge>

            <h2 className="font-heading text-[34px] leading-[41px] font-semibold tracking-tight text-[#0D1A14] xl:text-[48px] xl:leading-[58px]">
              Our Journey in Pictures
            </h2>
          </div>

          {/* 3-column square preview grid */}
          <div className="flex w-full flex-col items-center gap-12 xl:gap-[48px]">
            <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {previewImages.map((image, index) => {
                return (
                  <div
                    key={image.id}
                    className="aspect-square group relative overflow-hidden rounded-[16px] bg-neutral-100 xl:rounded-[24px]"
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 400px"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      priority={index < 3}
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
                <NextImage
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

  // Gallery-page variant: full 3-column grid with load-more
  return (
    <section className="w-full bg-[#F2F7F1] pt-[100px] pb-20 xl:pt-[180px] xl:pb-[120px]">
      <div className="mx-auto flex w-full max-w-[1242px] flex-col items-center gap-12 px-4 sm:px-6 md:px-8 xl:gap-16 xl:px-0">
        {/* Header Badge & Title */}
        <div className="flex w-full flex-col items-center gap-4 xl:gap-8">
          <SectionBadge
            variant="outline"
            showDot
            className="font-heading h-[30px] gap-2 border-[#E4E7EC] px-4 text-[12px] leading-[18px] xl:h-[33px] xl:text-[14px] xl:leading-[21px]"
          >
            Gallery
          </SectionBadge>

          <h1 className="font-heading text-center text-[34px] leading-[41px] font-semibold tracking-tight text-[#0D1A14] xl:text-[48px] xl:leading-[58px]">
            Our Journey in Pictures
          </h1>
        </div>

        {/* 3-column square grid */}
        <div className="flex w-full flex-col items-center gap-12 xl:gap-[48px]">
          <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {visibleImages.map((image, index) => {
              const mobileHideClass =
                !hasExpanded &&
                index >= MOBILE_INITIAL_VISIBLE &&
                index < INITIAL_VISIBLE
                  ? "hidden xl:block"
                  : "";

              return (
                <div
                  key={image.id}
                  className={`${mobileHideClass} aspect-square group relative overflow-hidden rounded-[16px] bg-neutral-100 xl:rounded-[24px]`}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 400px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <LoadmoreButton
              handleLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryHeroSection;
