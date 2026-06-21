"use client";

import { memo } from "react";
import Image from "next/image";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import ActionButton from "@/components/ActionButton";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";


interface HeroSlide {
  src: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero_bg.png",
    alt: "hero image 1",
  },
  {
    src: "/hero_image2.jpg",
    alt: "hero image 2",
  },
  {
    src: "/hero_image4.jpg",
    alt: "hero image 4",
  },
  {
    src: "/hero_image3.jpg",
    alt: "hero image 3",
  },

];

const HERO_INTERVAL_MS = 7500;

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
              isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              quality={90}
              className="object-cover object-center bg-no-repeat"
              style={{
                backgroundColor: "lightgray"
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
      {/* Rectangle 30: gradient fade from transparent to #050D07 with 0.61 opacity */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 hidden w-full md:block"
        style={{
          height: 543,
          opacity: 0.61,
          background:
            "linear-gradient(180deg, rgba(5, 13, 7, 0.00) 0%, #050D07 61.12%, #050D07 100%)",
        }}
      />
      {/* Rectangle 1: blur overlay at very bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 hidden w-full md:block"
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
        className="absolute bottom-0 left-0 right-0 z-20 w-full md:hidden"
        style={{
          height: 389,
          opacity: 0.61,
          background:
            "linear-gradient(180deg, rgba(5, 13, 7, 0.00) 0%, #050D07 61.12%, #050D07 100%)",
        }}
      />
      {/* Rectangle 1 mobile: bottom-0 h:204px, blur */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-20 w-full md:hidden"
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
      className="absolute left-0 right-0 mx-auto z-30 hidden w-full max-w-[786px] px-6 flex-col items-center md:flex"
      style={{
        top: "min(426px, 45vh)",
        gap: "clamp(24px, 4vh, 48px)",
      }}
    >
      {/* Frame 2147229465 — text stack */}
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
        <h1 className="w-full text-center text-display text-[#F2F7F1]">
          Helping Farmers Grow
          <br />
          with Confidence
        </h1>
        <p
          className="text-center text-[16px] lg:text-[18px] font-semibold leading-[24px] lg:leading-[27px] text-[#F2F7F1]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Since 1969
        </p>
      </div>

      {/* Frame 2147229466 — CTA row */}
      <div className="flex items-center gap-4">
        <ActionButton
          href="/products"
          label="Our Products"
          variant="primary"
          className="h-[44px] w-[152px] text-[14px] leading-[17px]"
          iconSize={20}
        />
        <ActionButton
          href="/about"
          label="Learn More"
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
      className="absolute left-0 right-0 mx-auto z-30 flex w-full max-w-[358px] px-4 flex-col md:hidden"
      style={{
        top: "min(313px, 45vh)",
        gap: 32,
      }}
    >
      {/* Text block: col, gap:8, items-center */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="w-full text-center text-h2-title font-semibold text-[#F2F7F1]">
          Helping Farmers Grow with Confidence
        </h1>
        <p
          className="text-center text-[14px] sm:text-[16px] font-semibold leading-[20px] sm:leading-[24px] text-[#F2F7F1]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Since 1969
        </p>
      </div>

      {/* CTA row: 358×41, gap:8 */}
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
        <ActionButton
          href="/products"
          label="Our Products"
          variant="primary"
          className="h-[41px] w-[132px] text-[14px] leading-[17px]"
          iconSize={16}
        />
        <ActionButton
          href="/about"
          label="Learn More"
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
        aria-label="Scroll to explore"
        className="absolute left-0 right-0 mx-auto w-fit bottom-[85px] z-30 hidden items-center gap-[10px] md:flex"
      >
        <span
          className="text-[18px] font-medium leading-[22px] text-[#F2F7F1]"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          Scroll to explore
        </span>
        <ArrowIcon direction="down" size={20} className="text-[#F2F7F1]" />
      </div>

      {/* Mobile */}
      <Link
        href="#about"
        aria-label="Scroll to explore"
        className="absolute left-0 cursor-pointer right-0 mx-auto w-fit bottom-[67px] z-30 flex items-center gap-[10px] md:hidden"
      >
        <span
          className="text-[14px] font-medium leading-[17px] text-[#F2F7F1]"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          Scroll to explore
        </span>
        <ArrowIcon direction="down" size={16} className="text-[#F2F7F1]" />
      </Link>
    </>
  );
});

export default function HeroSection() {
  const { currentIndex } = useAutoSlide({
    count: HERO_SLIDES.length,
    interval: HERO_INTERVAL_MS,
  });

  return (
    <section
      id="hero"
      aria-label="Hero section — Helping Farmers Grow with Confidence"
      className="relative h-screen w-full overflow-hidden bg-[#050D07]"
    >
      <HeroSlideshow slides={HERO_SLIDES} currentIndex={currentIndex} />
      <HeroOverlays />
      <HeroContentDesktop />
      <HeroContentMobile />
      <ScrollIndicator />
    </section>
  );
}
