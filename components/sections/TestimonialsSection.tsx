"use client";

import { useState, useEffect, useCallback } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { testimonialsData, TestimonialItem } from "@/data/sections-data";
import { ApiTestimonial } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

// Redesign Constants (Desktop & Mobile sizing configurations)
const CARD_WIDTH_DESKTOP = 398;
const GAP_DESKTOP = 24;
const SLOT_WIDTH_DESKTOP = CARD_WIDTH_DESKTOP + GAP_DESKTOP; // 422px
const HALF_CARD_DESKTOP = CARD_WIDTH_DESKTOP / 2; // 199px

const CARD_WIDTH_MOBILE = 310;
const GAP_MOBILE = 16;
const SLOT_WIDTH_MOBILE = CARD_WIDTH_MOBILE + GAP_MOBILE; // 326px
const HALF_CARD_MOBILE = CARD_WIDTH_MOBILE / 2; // 155px

interface TestimonialCardProps {
  testimonial: TestimonialItem;
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
    ? isActive
      ? "h-[450px]"
      : "h-[400px]"
    : isActive
      ? "h-[560px]"
      : "h-[480px]";

  const overlayHeightClass = isMobile ? "h-[221px] p-6" : "h-[234px] p-8";
  const quoteTextSizeClass = isMobile
    ? "text-[14px] leading-[21px]"
    : "text-[16px] leading-[24px]";
  const authorNameSizeClass = isMobile
    ? "text-[16px] leading-[19px]"
    : "text-[18px] leading-[22px]";
  const locationSizeClass = isMobile
    ? "text-[14px] leading-[21px]"
    : "text-[16px] leading-[24px]";

  const imageSizes = isMobile ? "310px" : "398px";

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative shrink-0 cursor-pointer overflow-hidden shadow-md",
        isMobile ? "rounded-[20px]" : "rounded-[32px] hover:shadow-lg",
        widthClass,
        heightClass,
        isResetting
          ? "transition-none"
          : "transition-[height,box-shadow] duration-500 ease-out"
      )}
    >
      {/* Zoom scale binds automatically to active state */}
      <div
        className={cn(
          "absolute inset-0",
          isResetting
            ? "transition-none"
            : "transition-transform duration-500 ease-out",
          isActive ? "scale-[1.02]" : "scale-100"
        )}
      >
        <OptimizedImage
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="object-cover object-center"
          sizes={imageSizes}
          quality={50}
          priority={priority}
        />
      </div>

      {/* Bottom Gradient overlay & text */}
      <div
        className={cn(
          "absolute right-0 bottom-0 left-0 flex flex-col justify-between text-white",
          overlayHeightClass
        )}
        style={{
          background:
            "linear-gradient(180deg, rgba(13, 26, 20, 0) 0%, rgba(13, 26, 20, 0.64) 34%, var(--brand-dark) 100%)",
        }}
      >
        <p
          className={cn("font-sans font-normal text-white", quoteTextSizeClass)}
        >
          {testimonial.quote}
        </p>
        <div className="flex flex-col gap-1">
          <h4
            className={cn(
              "font-sans font-medium text-white",
              authorNameSizeClass
            )}
          >
            {testimonial.name}
          </h4>
          <p
            className={cn(
              "font-inter font-normal text-white/80",
              locationSizeClass
            )}
          >
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface TestimonialsSectionProps {
  apiData?: ApiTestimonial[];
}

/**
 * Convert API testimonials to the shape the carousel expects.
 * Uses only API data — no mixing with static images.
 */
function buildTestimonials(apiData?: ApiTestimonial[]): TestimonialItem[] {
  if (!Array.isArray(apiData) || apiData.length === 0) return testimonialsData.items;

  return apiData.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.company
      ? `${t.designation}, ${t.company}`
      : t.designation || "Farmer",
    quote: t.content,
    image: resolveImageUrl(t.avatar_url),
  }));
}

export default function TestimonialsSection({
  apiData,
}: TestimonialsSectionProps) {
  const items = buildTestimonials(apiData);

  const TESTIMONIALS_COUNT = items.length;
  const LOOP_SET_START = TESTIMONIALS_COUNT;
  const LOOP_RESET_LIMIT = TESTIMONIALS_COUNT * 2;

  const extendedTestimonials = [...items, ...items, ...items];

  const [activeIndex, setActiveIndex] = useState(LOOP_SET_START);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setActiveIndex((prevIndex) => prevIndex - 1);
  }, [isTransitioning]);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setActiveIndex((prevIndex) => prevIndex + 1);
  }, [isTransitioning]);

  // Mobile Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Touch Swipe handlers for mobile (useCallback for performance stability)
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isTransitioning) return;
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    },
    [isTransitioning]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isTransitioning) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [isTransitioning]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  }, [touchStart, touchEnd, next, prev, isTransitioning]);

  // Handle jump wrapping after transition finishes (400ms duration)
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      let targetIndex = activeIndex;
      let shouldJump = false;

      if (activeIndex >= LOOP_RESET_LIMIT) {
        targetIndex = activeIndex - TESTIMONIALS_COUNT;
        shouldJump = true;
      } else if (activeIndex < LOOP_SET_START) {
        targetIndex = activeIndex + TESTIMONIALS_COUNT;
        shouldJump = true;
      }

      if (shouldJump) {
        setIsTransitionEnabled(false);
        setActiveIndex(targetIndex);
        setTimeout(() => {
          setIsTransitionEnabled(true);
          setIsTransitioning(false);
        }, 50);
      } else {
        setIsTransitioning(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [activeIndex, isTransitioning, LOOP_RESET_LIMIT, LOOP_SET_START, TESTIMONIALS_COUNT]);

  return (
    <section
      className="bg-brand-bg w-full overflow-hidden py-[40px] md:py-[100px]"
      id="testimonials"
    >
      <div className="mx-auto max-w-full">
        {/* Header - Figma centered, with Success Stories badge */}
        <div className="mb-[48px] flex flex-col items-center gap-6 md:mb-[64px] md:gap-4">
          {/* Badge - Figma: Success stories */}
          <SectionBadge variant="outline" showDot>
            {testimonialsData.badge}
          </SectionBadge>

          {/* Title - Figma: "Voice of Impact", 48px/32px */}
          <h2 className="text-brand-dark font-sans text-[32px] leading-[38px] font-medium md:text-[48px] md:leading-[58px]">
            {testimonialsData.title}
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
                  isTransitionEnabled
                    ? "transition-transform duration-[400ms] ease-out"
                    : "transition-none"
                )}
                style={{
                  transform: `translateX(calc(50vw - ${HALF_CARD_DESKTOP}px - (${activeIndex} * ${SLOT_WIDTH_DESKTOP}px)))`,
                }}
              >
                {extendedTestimonials.map((t, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <TestimonialCard
                      key={`${t.id}-dt-${idx}`}
                      testimonial={t}
                      isActive={isActive}
                      isResetting={!isTransitionEnabled}
                      priority={idx === LOOP_SET_START}
                      onClick={() => {
                        if (!isTransitioning && activeIndex !== idx) {
                          setIsTransitioning(true);
                          setIsTransitionEnabled(true);
                          setActiveIndex(idx);
                        }
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
              className="relative h-[450px] w-full touch-pan-y overflow-visible"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={cn(
                  "flex items-center gap-4 overflow-visible",
                  isTransitionEnabled
                    ? "transition-transform duration-[400ms] ease-out"
                    : "transition-none"
                )}
                style={{
                  transform: `translateX(calc(50vw - ${HALF_CARD_MOBILE}px - (${activeIndex} * ${SLOT_WIDTH_MOBILE}px)))`,
                }}
              >
                {extendedTestimonials.map((t, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <TestimonialCard
                      key={`${t.id}-mob-${idx}`}
                      testimonial={t}
                      isActive={isActive}
                      isResetting={!isTransitionEnabled}
                      isMobile={true}
                      priority={idx === LOOP_SET_START}
                      onClick={() => {
                        if (!isTransitioning && activeIndex !== idx) {
                          setIsTransitioning(true);
                          setIsTransitionEnabled(true);
                          setActiveIndex(idx);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Figma: w-12 h-12, rounded-full bg-brand-active, arrows from /arrow.svg, 16px gap, hidden on mobile */}
        <div className="mt-[48px] hidden justify-center gap-4 sm:flex">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="bg-brand-active hover:bg-brand-primary-hover flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95"
          >
            <NextImage
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
            className="bg-brand-active hover:bg-brand-primary-hover flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95"
          >
            <NextImage src="/arrow.svg" alt="Next" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
