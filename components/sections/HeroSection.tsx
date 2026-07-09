"use client";

import { memo, Fragment, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import ActionButton from "@/components/ActionButton";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { heroData, HeroSlide, HeroData } from "@/data/sections-data";
import { ApiHeroSlide } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Background image slideshow */
const HeroSlideshow = memo(function HeroSlideshow({
  slides,
  currentIndex,
}: {
  slides: HeroSlide[];
  currentIndex: number;
}) {
  if (slides.length === 0) return null;

  if (slides.length === 1) {
    const slide = slides[0];
    const isProxied = slide.src.startsWith("/api/image-proxy");
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority
          quality={50}
          unoptimized={isProxied}
          className="object-cover object-center"
          style={{ backgroundColor: "lightgray" }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const isProxied = slide.src.startsWith("/api/image-proxy");
        return (
          <div
            key={slide.src + index}
            className={[
              "absolute inset-0 transition-opacity duration-[2000ms] ease-in-out",
              isActive
                ? "z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0",
            ].join(" ")}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              quality={50}
              unoptimized={isProxied}
              className="bg-no-repeat object-cover object-center"
              style={{
                backgroundColor: "lightgray",
              }}
            />
          </div>
        );
      })}
    </div>
  );
});

/**
 * Gradient overlays – exactly as in Figma:
 *  - Rectangle 30: top:363px h:543px  — dark bottom fade
 *  - Rectangle 1:  top:693px h:213px  — backdrop-blur area
 */
const HeroOverlays = memo(function HeroOverlays() {
  return (
    <>
      {/* --- Desktop overlays --- */}
      {/* Rectangle 30: gradient fade from transparent to brand-hero-dark with 0.61 opacity */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 left-0 z-20 hidden w-full md:block"
        style={{
          height: 543,
          opacity: 0.61,
          background:
            "linear-gradient(180deg, rgba(5, 13, 7, 0.00) 0%, var(--brand-hero-dark) 61.12%, var(--brand-hero-dark) 100%)",
        }}
      />
      {/* Rectangle 1: blur overlay at very bottom */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 left-0 z-20 hidden w-full md:block"
        style={{
          height: 213,
          background:
            "linear-gradient(180deg, rgba(13, 26, 20, 0.00) 0%, rgba(13, 26, 20, 0.50) 100%)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
        }}
      />

      {/* --- Mobile overlays --- */}
      {/* Rectangle 30 mobile: bottom-0 h:389px */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 left-0 z-20 w-full md:hidden"
        style={{
          height: 389,
          opacity: 0.61,
          background:
            "linear-gradient(180deg, rgba(5, 13, 7, 0.00) 0%, var(--brand-hero-dark) 61.12%, var(--brand-hero-dark) 100%)",
        }}
      />
      {/* Rectangle 1 mobile: bottom-0 h:204px, blur */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 left-0 z-20 w-full md:hidden"
        style={{
          height: 204,
          background:
            "linear-gradient(180deg, rgba(13, 26, 20, 0.00) 0%, rgba(13, 26, 20, 0.50) 100%)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
        }}
      />
    </>
  );
});

/**
 * Desktop hero content.
 * Figma: Frame 2147229467 — 786×289 at left:327, top:426
 * Children: title frame (786×197, gap:16) + button row (311×44, gap:16)
 */
const HeroContentDesktop = memo(function HeroContentDesktop({
  data,
}: {
  data: HeroData;
}) {
  return (
    <div
      className="absolute right-0 left-0 z-30 mx-auto hidden w-full max-w-[786px] flex-col items-center px-6 md:flex"
      style={{
        top: "45vh",
        gap: "clamp(24px, 4vh, 48px)",
      }}
    >
      {/* Frame 2147229465 — text stack */}
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
        <h1 className="text-display text-brand-bg w-full text-center">
          {(data.titleDesktop || "").split("\n").map((line, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        {data.subtitle && (
          <p
            className="text-brand-bg text-center text-[16px] leading-[24px] font-semibold lg:text-[18px] lg:leading-[27px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Frame 2147229466 — CTA row */}
      <div className="flex items-center gap-4">
        {data.ctaProducts?.label && data.ctaProducts?.href && (
          <ActionButton
            href={data.ctaProducts.href}
            label={data.ctaProducts.label}
            variant="primary"
            className="h-[44px] w-[152px] text-[14px] leading-[17px]"
            iconSize={20}
          />
        )}
        {data.ctaAbout?.label && data.ctaAbout?.href && (
          <ActionButton
            href={data.ctaAbout.href}
            label={data.ctaAbout.label}
            variant="secondary"
            className="h-[44px] w-[143px] text-[14px] leading-[17px]"
            iconSize={20}
          />
        )}
      </div>
    </div>
  );
});

/**
 * Mobile hero content.
 * Figma: Frame left:16, top:313, width:358, height:249, col, gap:32
 */
const HeroContentMobile = memo(function HeroContentMobile({
  data,
}: {
  data: HeroData;
}) {
  return (
    <div
      className="absolute right-0 left-0 z-30 mx-auto flex w-full max-w-[358px] flex-col px-4 md:hidden"
      style={{
        top: "55vh",
        gap: 32,
      }}
    >
      {/* Text block: col, gap:8, items-center */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-h2-title text-brand-bg w-full text-center font-semibold">
          {data.titleMobile || ""}
        </h1>
        {data.subtitle && (
          <p
            className="text-brand-bg text-center text-[14px] leading-[20px] font-semibold sm:text-[16px] sm:leading-[24px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {data.subtitle}
          </p>
        )}
      </div>

      {/* CTA row: 358×41, gap:8 */}
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
        {data.ctaProducts?.label && data.ctaProducts?.href && (
          <ActionButton
            href={data.ctaProducts.href}
            label={data.ctaProducts.label}
            variant="primary"
            className="h-[41px] w-[132px] text-[14px] leading-[17px]"
            iconSize={16}
          />
        )}
        {data.ctaAbout?.label && data.ctaAbout?.href && (
          <ActionButton
            href={data.ctaAbout.href}
            label={data.ctaAbout.label}
            variant="secondary"
            className="h-[41px] w-[121px] text-[14px] leading-[17px]"
            iconSize={16}
          />
        )}
      </div>
    </div>
  );
});

/**
 * "Scroll to explore" scroll indicator.
 * Desktop: Figma Frame 6 — 204×48 at left:618, top:815
 * Mobile:  Figma Frame 6 — 172×43 at left:109, top:613
 */
export const ScrollIndicator = memo(function ScrollIndicator({
  scrollText = heroData.scrollText,
}: {
  scrollText?: string;
}) {
  return (
    <>
      {/* Desktop */}
      <div
        aria-label={scrollText}
        className="absolute right-0 bottom-[85px] left-0 z-30 mx-auto hidden w-fit items-center gap-[10px] px-[24px] py-[13px] md:flex"
      >
        <span
          className="text-brand-bg text-[18px] leading-[22px] font-medium"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {scrollText}
        </span>
        <ArrowIcon direction="down" size={20} className="text-brand-bg" />
      </div>

      {/* Mobile */}
      <Link
        href="#about"
        aria-label={scrollText}
        className="absolute right-0 bottom-[67px] left-0 z-30 mx-auto flex w-fit cursor-pointer items-center gap-[10px] px-[24px] py-[13px] md:hidden"
      >
        <span
          className="text-brand-bg text-[14px] leading-[17px] font-medium"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {scrollText}
        </span>
        <ArrowIcon direction="down" size={16} className="text-brand-bg" />
      </Link>
    </>
  );
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface HeroSectionProps {
  data?: HeroData;
  apiData?: ApiHeroSlide[];
}

/**
 * Merge API slides into the shape the sub-components expect.
 * Falls back to static data if the API returned nothing.
 */
function buildSlides(
  apiData: ApiHeroSlide[] | undefined,
  fallback: HeroSlide[],
): HeroSlide[] {
  if (!apiData || apiData.length === 0) return fallback;

  return apiData.map((slide) => ({
    src: resolveImageUrl(slide.background_image),
    alt: slide.title || "hero image",
  }));
}

export default function HeroSection({
  data = heroData,
  apiData,
}: HeroSectionProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [showOverlay, setShowOverlay] = useState(true);

  const finalSlides = useMemo(() => buildSlides(apiData, data.slides), [apiData, data.slides]);

  // Preload all slideshow images immediately in the browser cache
  useEffect(() => {
    if (typeof window !== "undefined") {
      finalSlides.forEach((slide) => {
        const img = new window.Image();
        img.src = slide.src;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [slide.src]: true }));
        };
        img.onerror = () => {
          // Count as loaded on error to prevent blocking page loads
          setLoadedImages((prev) => ({ ...prev, [slide.src]: true }));
        };
      });
    }
  }, [finalSlides]);

  // Check if all slides are loaded
  const allLoaded = finalSlides.every((slide) => loadedImages[slide.src]);

  useEffect(() => {
    if (allLoaded) {
      setShowOverlay(false);
    }
  }, [allLoaded]);

  // Timeout safety fallback (3 seconds max)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const { currentIndex } = useAutoSlide({
    count: finalSlides.length,
    interval: apiData && apiData.length > 0 ? 7500 : data.intervalMs,
  });

  const activeSlide =
    apiData && apiData.length > 0 ? apiData[currentIndex] : null;

  const finalData: HeroData = activeSlide
    ? {
        slides: finalSlides,
        intervalMs: 7500,
        titleDesktop: activeSlide.title || "",
        titleMobile: activeSlide.title || "",
        subtitle: activeSlide.subtitle || "",
        ctaProducts: {
          label: activeSlide.primary_cta_text || "",
          href: activeSlide.primary_cta_link || "",
        },
        ctaAbout: {
          label: activeSlide.secondary_cta_text || "",
          href: activeSlide.secondary_cta_link || "",
        },
        scrollText: data.scrollText,
      }
    : data;

  return (
    <section
      id="hero"
      aria-label={`Hero section - ${finalData.titleMobile}`}
      className="bg-brand-hero-dark relative h-screen w-full overflow-hidden"
    >
      <HeroSlideshow slides={finalSlides} currentIndex={currentIndex} />
      <HeroOverlays />
      <HeroContentDesktop data={finalData} />
      <HeroContentMobile data={finalData} />
      <ScrollIndicator scrollText={finalData.scrollText} />

      {/* Premium loading overlay matching brand styles */}
      {showOverlay && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ease-out"
          style={{ backgroundColor: "#050d07" }}
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <span
              className="text-[12px] font-medium tracking-[0.2em] text-emerald-500/80 uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loading Experience
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
