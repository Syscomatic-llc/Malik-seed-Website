"use client";

import { memo, Fragment } from "react";
import Image from "next/image";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import ActionButton from "@/components/ActionButton";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { heroData, HeroSlide } from "@/data/sections-data";

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
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority
          quality={90}
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
              quality={90}
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
const HeroContentDesktop = memo(function HeroContentDesktop() {
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
          {heroData.titleDesktop.split("\n").map((line, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p
          className="text-brand-bg text-center text-[16px] leading-[24px] font-semibold lg:text-[18px] lg:leading-[27px]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {heroData.subtitle}
        </p>
      </div>

      {/* Frame 2147229466 — CTA row */}
      <div className="flex items-center gap-4">
        <ActionButton
          href={heroData.ctaProducts.href}
          label={heroData.ctaProducts.label}
          variant="primary"
          className="h-[44px] w-[152px] text-[14px] leading-[17px]"
          iconSize={20}
        />
        <ActionButton
          href={heroData.ctaAbout.href}
          label={heroData.ctaAbout.label}
          variant="secondary"
          className="h-[44px] w-[143px] text-[14px] leading-[17px]"
          iconSize={20}
        />
      </div>
    </div>
  );
});

/**
 * Mobile hero content.
 * Figma: Frame left:16, top:313, width:358, height:249, col, gap:32
 */
const HeroContentMobile = memo(function HeroContentMobile() {
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
          {heroData.titleMobile}
        </h1>
        <p
          className="text-brand-bg text-center text-[14px] leading-[20px] font-semibold sm:text-[16px] sm:leading-[24px]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {heroData.subtitle}
        </p>
      </div>

      {/* CTA row: 358×41, gap:8 */}
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
        <ActionButton
          href={heroData.ctaProducts.href}
          label={heroData.ctaProducts.label}
          variant="primary"
          className="h-[41px] w-[132px] text-[14px] leading-[17px]"
          iconSize={16}
        />
        <ActionButton
          href={heroData.ctaAbout.href}
          label={heroData.ctaAbout.label}
          variant="secondary"
          className="h-[41px] w-[121px] text-[14px] leading-[17px]"
          iconSize={16}
        />
      </div>
    </div>
  );
});

/**
 * "Scroll to explore" scroll indicator.
 * Desktop: Figma Frame 6 — 204×48 at left:618, top:815
 * Mobile:  Figma Frame 6 — 172×43 at left:109, top:613
 */
const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <>
      {/* Desktop */}
      <div
        aria-label={heroData.scrollText}
        className="absolute right-0 bottom-[85px] left-0 z-30 mx-auto hidden w-fit items-center gap-[10px] md:flex"
      >
        <span
          className="text-brand-bg text-[18px] leading-[22px] font-medium"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {heroData.scrollText}
        </span>
        <ArrowIcon direction="down" size={20} className="text-brand-bg" />
      </div>

      {/* Mobile */}
      <Link
        href="#about"
        aria-label={heroData.scrollText}
        className="absolute right-0 bottom-[67px] left-0 z-30 mx-auto flex w-fit cursor-pointer items-center gap-[10px] md:hidden"
      >
        <span
          className="text-brand-bg text-[14px] leading-[17px] font-medium"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {heroData.scrollText}
        </span>
        <ArrowIcon direction="down" size={16} className="text-brand-bg" />
      </Link>
    </>
  );
});

export default function HeroSection() {
  const { currentIndex } = useAutoSlide({
    count: heroData.slides.length,
    interval: heroData.intervalMs,
  });

  return (
    <section
      id="hero"
      aria-label={`Hero section — ${heroData.titleMobile}`}
      className="bg-brand-hero-dark relative h-screen w-full overflow-hidden"
    >
      <HeroSlideshow slides={heroData.slides} currentIndex={currentIndex} />
      <HeroOverlays />
      <HeroContentDesktop />
      <HeroContentMobile />
      <ScrollIndicator />
    </section>
  );
}
