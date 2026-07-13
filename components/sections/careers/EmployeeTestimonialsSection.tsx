"use client";

import { useState, useCallback, useEffect, memo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type {
  employeeTestimonialsData,
  EmployeeTestimonial,
} from "@/data/career-data";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// ── EmployeeTestimonialsSection: Section 7 ───────────────────────────────────
// Figma node 2424:14020 — 1440×722, bg #F2F7F1 (Desktop)
// Figma node 2425:15047 — 390×671, bg #F2F7F1 (Mobile)
// Seamless Infinite Carousel implementation
// ────────────────────────────────────────────────────────────────────────────

const AvatarInitials = memo(function AvatarInitials({
  name,
}: {
  name: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="bg-brand-active font-inter-tight flex h-full w-full items-center justify-center text-[24px] font-semibold text-white lg:text-[32px]">
      {initials}
    </div>
  );
});

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: EmployeeTestimonial;
  isActive: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex flex-shrink-0 flex-col gap-6 rounded-[20px] border border-[#F2F4F7] bg-white p-6 transition-all duration-300",
        "h-[451px] w-[310px]", // Mobile size
        "lg:h-[335px] lg:w-[608px] lg:flex-row lg:gap-8 lg:rounded-[28px]", // Desktop size
        isActive ? "shadow-md" : "opacity-90"
      )}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Avatar Image (80x80 on mobile, 180x180 on desktop) */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[20px] bg-[#F2F4F7] lg:h-[180px] lg:w-[180px] lg:rounded-[24px]">
        {testimonial.avatar ? (
          <OptimizedImage
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="(min-width: 1024px) 180px, 80px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <AvatarInitials name={testimonial.name} />
        )}
      </div>

      {/* Quote + Attribution */}
      <div className="flex flex-1 flex-col justify-between gap-6 lg:gap-10">
        <blockquote className="flex-1">
          <p className="font-inter-tight text-[14px] leading-[24px] text-[#0D1A14] md:text-[16px]">
            {testimonial.quote}
          </p>
        </blockquote>

        <footer className="flex flex-col gap-1">
          <cite className="font-inter-tight text-[16px] leading-[27px] font-medium text-[#0D1A14] not-italic md:text-[18px]">
            {testimonial.name}
          </cite>
          <span className="font-inter-tight text-[14px] leading-[24px] text-[#0D1A14]/70 md:text-[16px]">
            {testimonial.role}
          </span>
        </footer>
      </div>
    </article>
  );
});

export default memo(function EmployeeTestimonialsSection({
  data,
}: {
  data: typeof employeeTestimonialsData;
}) {
  const { testimonials } = data;

  // Triplicate the testimonials list for seamless infinite looping scroll behavior
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  const [activeIndex, setActiveIndex] = useState(testimonials.length); // Start at the first element of middle set
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardWidthWithGap, setCardWidthWithGap] = useState(326); // default to mobile (310 + 16)
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setCardWidthWithGap(desktop ? 608 + 24 : 310 + 16);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle jump wrapping after transition finishes
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      let targetIndex = activeIndex;
      let shouldJump = false;

      // Wrap right boundary (exceeded middle set)
      if (activeIndex >= testimonials.length * 2) {
        targetIndex = activeIndex - testimonials.length;
        shouldJump = true;
      }
      // Wrap left boundary (went below middle set)
      else if (activeIndex < testimonials.length) {
        targetIndex = activeIndex + testimonials.length;
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
    }, 400); // Wait for transition animation to complete

    return () => clearTimeout(timer);
  }, [activeIndex, isTransitioning, testimonials.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setActiveIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setActiveIndex((prev) => prev + 1);
  }, [isTransitioning]);

  // Auto-scroll effect (fires every 5 seconds unless hovered or transitioning)
  useEffect(() => {
    if (isHovered || isTransitioning) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext, isHovered, isTransitioning]);

  // Mobile touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  }, [touchStart, touchEnd, handleNext, handlePrev, isTransitioning]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIsTransitionEnabled(true);
      setActiveIndex(index + testimonials.length);
    },
    [isTransitioning, testimonials.length]
  );

  // Active dot page index
  const activeDotIndex = activeIndex % testimonials.length;

  return (
    <section
      id="employee-testimonials"
      aria-label="Employee Testimonials - Our Team's Stories"
      className="w-full overflow-hidden bg-[#F2F7F1]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto w-full px-4 py-12 md:p-[100px]">
        {/* ── Header row ── */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          {/* Left: badge + title */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {data.badge}
            </SectionBadge>
            <h2 className="font-inter-tight text-brand-dark text-[32px] leading-[1.2] font-medium tracking-tight lg:text-[48px] lg:leading-[58px]">
              {data.navLabel}
            </h2>
          </div>

          {/* Right: navigation arrows (visible on desktop only) */}
          <div
            className="hidden items-center gap-2 lg:flex"
            role="group"
            aria-label="Testimonial navigation"
          >
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="border-brand-border hover:border-brand-active focus-visible:ring-brand-active flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-[#195236] text-white transition-all hover:bg-[#195236] focus:outline-none focus-visible:ring-2 active:scale-95"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="border-brand-border hover:border-brand-active focus-visible:ring-brand-active flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-[#195236] text-white transition-all hover:bg-[#195236] focus:outline-none focus-visible:ring-2 active:scale-95"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        {/* ── Cards scroll area ── */}
        <div
          className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen touch-pan-y overflow-visible lg:static lg:m-0 lg:w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-4 lg:gap-6"
            style={{
              transform: isDesktop
                ? `translateX(-${activeIndex * cardWidthWithGap}px)`
                : `translateX(calc(50vw - 155px - ${activeIndex * cardWidthWithGap}px))`,
              transition: isTransitionEnabled
                ? "transform 400ms ease-in-out"
                : "none",
            }}
            role="list"
            aria-live="polite"
          >
            {extendedTestimonials.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                role="listitem"
                onClick={() => {
                  if (!isDesktop && i !== activeIndex && !isTransitioning) {
                    setIsTransitioning(true);
                    setIsTransitionEnabled(true);
                    setActiveIndex(i);
                  }
                }}
                className={cn(
                  !isDesktop && i !== activeIndex ? "cursor-pointer" : ""
                )}
              >
                <TestimonialCard testimonial={t} isActive={i === activeIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
