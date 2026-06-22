"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/SectionBadge";

// Redesign Constants (Desktop & Mobile sizing configurations)
const CARD_WIDTH_DESKTOP = 398;
const GAP_DESKTOP = 24;
const SLOT_WIDTH_DESKTOP = CARD_WIDTH_DESKTOP + GAP_DESKTOP; // 422px
const HALF_CARD_DESKTOP = CARD_WIDTH_DESKTOP / 2; // 199px

const CARD_WIDTH_MOBILE = 310;
const GAP_MOBILE = 16;
const SLOT_WIDTH_MOBILE = CARD_WIDTH_MOBILE + GAP_MOBILE; // 326px
const HALF_CARD_MOBILE = CARD_WIDTH_MOBILE / 2; // 155px

const TESTIMONIALS_COUNT = 5;
const LOOP_SET_START = TESTIMONIALS_COUNT; // Index 5 (start of middle main set)
const LOOP_RESET_LIMIT = TESTIMONIALS_COUNT * 2; // Index 10 (start of duplicate set)

const testimonials = [
  {
    id: 1,
    name: "Md. Kobbat Hossain Ovi",
    location: "Maitka, Hemayetpur, Savar",
    quote:
      "After losing his father in 2003, he carried my family through farming and Malik Seeds has been with him all the way. Green Crown variety has a special place in his broccoli project.",
    images: ["/images/testimonials/ovi.png"],
  },
  {
    id: 2,
    name: "Md. Rafiqul Islam Rafiq",
    location: "Nabagram, Baldhara, Singair",
    quote:
      "22 years abroad, then back to the soil. He learned about companion cropping from our FB page and now farms multiple varieties successfully.",
    images: ["/images/testimonials/rafiq-alt.png"],
  },
  {
    id: 3,
    name: "Md. Rafiqul Islam Rafiq",
    location: "Nabagram, Baldhara, Singair",
    quote:
      "22 years abroad, then back to the soil. He learned about companion cropping from our FB page and now farms multiple varieties successfully.",
    images: ["/images/testimonials/rafiq.png"],
  },
  {
    id: 4,
    name: "Md. Jangir Alam",
    location: "Brahmankanda",
    quote:
      "Became talk of the town after harvesting PurpleBeauty in only 60 days, and within 120 days, total production reached 4.5 tons.",
    images: ["/images/testimonials/jangir.png"],
  },
  {
    id: 5,
    name: "Md. Saiful Islam",
    location: "Sakrail, Garpara, Sadar, Manikganj",
    quote:
      "Ex-electrician turned farmer. In 2021, I bet 1.3 lakh on Malik Seeds' Ice Green cucumber and walked away with 3.0 lakh revenue.",
    images: [
      "/images/testimonials/saiful-1.png",
      "/images/testimonials/saiful-2.png",
    ],
  },
];

// Tripled extended array for loop sliding
const extendedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
  isResetting: boolean;
  isMobile?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

/**
 * Reusable focused testimonial card component
 */
function TestimonialCard({
  testimonial,
  isActive,
  isResetting,
  isMobile = false,
  priority = false,
  onClick,
}: TestimonialCardProps) {
  // Sizing definitions
  const widthClass = isMobile ? "w-[310px]" : "w-[398px]";
  const heightClass = isMobile
    ? isActive ? "h-[450px]" : "h-[400px]"
    : isActive ? "h-[560px]" : "h-[480px]";

  const overlayHeightClass = isMobile ? "h-[221px] p-6" : "h-[234px] p-8";
  const quoteTextSizeClass = isMobile ? "text-[14px] leading-[21px]" : "text-[16px] leading-[24px]";
  const authorNameSizeClass = isMobile ? "text-[16px] leading-[19px]" : "text-[18px] leading-[22px]";
  const locationSizeClass = isMobile ? "text-[14px] leading-[21px]" : "text-[16px] leading-[24px]";

  const imageSizes = isMobile ? "310px" : "398px";

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative shrink-0 cursor-pointer overflow-hidden shadow-md transition-all duration-500 ease-out",
        isMobile ? "rounded-[20px]" : "rounded-[32px] hover:shadow-lg",
        widthClass,
        heightClass,
        isResetting ? "transition-none" : ""
      )}
    >
      {/* Zoom scale binds automatically to active state */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-out",
          isActive ? "scale-105" : "scale-100"
        )}
      >
        {testimonial.images.length === 2 ? (
          <div className="absolute inset-0 flex flex-col">
            <div className="relative h-1/2 w-full">
              <Image
                src={testimonial.images[0]}
                alt={testimonial.name}
                fill
                className="object-cover object-center"
                sizes={imageSizes}
              />
            </div>
            <div className="relative h-1/2 w-full">
              <Image
                src={testimonial.images[1]}
                alt={testimonial.name}
                fill
                className="object-cover object-center"
                sizes={imageSizes}
              />
            </div>
          </div>
        ) : (
          <Image
            src={testimonial.images[0]}
            alt={testimonial.name}
            fill
            className="object-cover object-center"
            sizes={imageSizes}
            priority={priority}
          />
        )}
      </div>

      {/* Bottom Gradient overlay & text */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 flex flex-col justify-between text-white",
          overlayHeightClass
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(13, 26, 20, 0) 0%, rgba(13, 26, 20, 0.64) 34%, var(--brand-dark) 100%)",
        }}
      >
        <p className={cn("font-sans text-white font-normal", quoteTextSizeClass)}>
          {testimonial.quote}
        </p>
        <div className="flex flex-col gap-1">
          <h4 className={cn("font-sans font-medium text-white", authorNameSizeClass)}>
            {testimonial.name}
          </h4>
          <p className={cn("font-inter text-white/80 font-normal", locationSizeClass)}>
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(LOOP_SET_START);
  const [isResetting, setIsResetting] = useState(false);

  const prev = useCallback(() => {
    if (isResetting) return;
    setActiveIndex((prevIndex) => prevIndex - 1);
  }, [isResetting]);

  const next = useCallback(() => {
    if (isResetting) return;
    setActiveIndex((prevIndex) => prevIndex + 1);
  }, [isResetting]);

  // Mobile Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Touch Swipe handlers for mobile (useCallback for performance stability)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isResetting) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [isResetting]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isResetting) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [isResetting]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  }, [touchStart, touchEnd, next, prev]);

  // Infinite wrap reset
  const handleTransitionEnd = useCallback(() => {
    if (activeIndex >= LOOP_RESET_LIMIT) {
      setIsResetting(true);
      setActiveIndex(activeIndex - TESTIMONIALS_COUNT);
    } else if (activeIndex < LOOP_SET_START) {
      setIsResetting(true);
      setActiveIndex(activeIndex + TESTIMONIALS_COUNT);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  return (
    <section
      className="w-full overflow-hidden bg-brand-bg py-[40px] md:py-[100px]"
      id="testimonials"
    >
      <div className="mx-auto max-w-full">
        {/* Header - Figma centered, with Success Stories badge */}
        <div className="mb-[48px] md:mb-[64px] flex flex-col items-center gap-6 md:gap-4">
          {/* Badge - Figma: Success stories */}
          <SectionBadge variant="outline" showDot>
            Success stories
          </SectionBadge>

          {/* Title - Figma: "Voice of Impact", 48px/32px */}
          <h2 className="font-sans text-[32px] font-medium leading-[38px] text-brand-dark md:text-[48px] md:leading-[58px]">
            Voice of Impact
          </h2>
        </div>

        {/* Carousel Tracks */}
        <div className="relative w-full">
          {/* Desktop Carousel View (>= 768px) */}
          <div className="hidden w-full overflow-visible md:block">
            <div className="relative h-[560px] w-full overflow-visible">
              <div
                className={cn(
                  "flex items-center gap-6 overflow-visible",
                  isResetting ? "transition-none" : "transition-transform duration-500 ease-out"
                )}
                style={{
                  transform: `translateX(calc(50vw - ${HALF_CARD_DESKTOP}px - (${activeIndex} * ${SLOT_WIDTH_DESKTOP}px)))`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedTestimonials.map((t, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <TestimonialCard
                      key={`${t.id}-dt-${idx}`}
                      testimonial={t}
                      isActive={isActive}
                      isResetting={isResetting}
                      priority={idx === LOOP_SET_START}
                      onClick={() => {
                        if (!isResetting) setActiveIndex(idx);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Carousel View (< 768px) */}
          <div className="block w-full overflow-visible md:hidden">
            <div
              className="relative h-[450px] w-full overflow-visible touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={cn(
                  "flex items-center gap-4 overflow-visible",
                  isResetting ? "transition-none" : "transition-transform duration-500 ease-out"
                )}
                style={{
                  transform: `translateX(calc(50vw - ${HALF_CARD_MOBILE}px - (${activeIndex} * ${SLOT_WIDTH_MOBILE}px)))`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedTestimonials.map((t, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <TestimonialCard
                      key={`${t.id}-mob-${idx}`}
                      testimonial={t}
                      isActive={isActive}
                      isResetting={isResetting}
                      isMobile={true}
                      priority={idx === LOOP_SET_START}
                      onClick={() => {
                        if (!isResetting) setActiveIndex(idx);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Figma: w-12 h-12, rounded-full bg-brand-active, arrows from /arrow.svg, 16px gap, hidden on mobile */}
        <div className="hidden sm:flex justify-center gap-4 mt-[48px]">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-active shadow-md transition-all duration-300 hover:bg-brand-primary-hover active:scale-95"
          >
            <Image
              src="/arrow.svg"
              alt="Previous"
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-active shadow-md transition-all duration-300 hover:bg-brand-primary-hover active:scale-95"
          >
            <Image
              src="/arrow.svg"
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
