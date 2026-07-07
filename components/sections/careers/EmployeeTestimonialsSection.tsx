"use client";

import { useState, useCallback, useEffect, memo } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { employeeTestimonialsData, EmployeeTestimonial } from "@/data/career-data";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// ── EmployeeTestimonialsSection: Section 7 ───────────────────────────────────
// Figma node 2424:14020 — 1440×722, bg #F2F7F1 (Desktop)
// Figma node 2425:15047 — 390×671, bg #F2F7F1 (Mobile)
// Seamless Infinite Carousel implementation
// ────────────────────────────────────────────────────────────────────────────

const AvatarInitials = memo(function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-active text-white font-inter-tight text-[24px] lg:text-[32px] font-semibold">
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
        "flex flex-shrink-0 flex-col gap-6 rounded-[20px] border border-[#F2F4F7] bg-white p-6 transition-all duration-300",
        "w-[310px] h-[451px]", // Mobile size
        "lg:w-[608px] lg:h-[335px] lg:flex-row lg:gap-8 lg:rounded-[28px]", // Desktop size
        isActive ? "shadow-md" : "opacity-90"
      )}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Avatar Image (80x80 on mobile, 180x180 on desktop) */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[20px] bg-[#F2F4F7] lg:h-[180px] lg:w-[180px] lg:rounded-[24px]">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="(min-width: 1024px) 180px, 80px"
            className="object-cover object-center"
          />
        ) : (
          <AvatarInitials name={testimonial.name} />
        )}
      </div>

      {/* Quote + Attribution */}
      <div className="flex flex-1 flex-col justify-between gap-6 lg:gap-10">
        <blockquote className="flex-1">
          <p className="font-inter-tight md:text-[16px] text-[14px] leading-[24px] text-[#0D1A14]">
            {testimonial.quote}
          </p>
        </blockquote>

        <footer className="flex flex-col gap-1">
          <cite className="font-inter-tight text-[16px] md:text-[18px] font-medium leading-[27px] text-[#0D1A14] not-italic">
            {testimonial.name}
          </cite>
          <span className="font-inter-tight text-[14px] md:text-[16px] leading-[24px] text-[#0D1A14]/70">
            {testimonial.role}
          </span>
        </footer>
      </div>
    </article>
  );
});

export default memo(function EmployeeTestimonialsSection({ data }: { data: typeof employeeTestimonialsData }) {
  const { testimonials } = data;

  // Triplicate the testimonials list for seamless infinite looping scroll behavior
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
    }, 500); // Wait for transition animation to complete

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [isTransitioning]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [isTransitioning]);

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

  const handleDotClick = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setActiveIndex(index + testimonials.length);
  }, [isTransitioning, testimonials.length]);

  // Active dot page index
  const activeDotIndex = activeIndex % testimonials.length;

  return (
    <section
      id="employee-testimonials"
      aria-label="Employee Testimonials - Our Team's Stories"
      className="w-full bg-[#F2F7F1] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto w-full md:p-[100px] px-4 py-12">

        {/* ── Header row ── */}
        <div className="mb-8 lg:mb-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
          {/* Left: badge + title */}
          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {data.badge}
            </SectionBadge>
            <h2 className="font-inter-tight text-[32px] font-medium leading-[1.2] tracking-tight text-brand-dark lg:text-[48px] lg:leading-[58px]">
              {data.navLabel}
            </h2>
          </div>

          {/* Right: navigation arrows (visible on desktop only) */}
          <div className="hidden lg:flex items-center gap-2" role="group" aria-label="Testimonial navigation">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-[#195236] text-white transition-all hover:bg-[#195236] hover:border-brand-active focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active active:scale-95 cursor-pointer"
            >
              <ArrowIcon direction="left"/>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-[#195236] text-white transition-all hover:bg-[#195236] hover:border-brand-active focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active active:scale-95 cursor-pointer"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        {/* ── Cards scroll area ── */}
        <div 
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible lg:w-full lg:static lg:m-0 touch-pan-y"
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
              transition: isTransitionEnabled ? "transform 500ms ease-in-out" : "none",
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
                className={cn(!isDesktop && i !== activeIndex ? "cursor-pointer" : "")}
              >
                <TestimonialCard
                  testimonial={t}
                  isActive={i === activeIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
