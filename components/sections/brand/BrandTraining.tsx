"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "motion/react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import NextImage from "next/image";
import { maliksFarmData } from "@/data/brands/maliks-farm";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ApiContactInfo } from "@/lib/api";

// Scans carousel sizing constants
const SCAN_CARD_WIDTH_DESKTOP = 398;
const SCAN_GAP_DESKTOP = 24;
const SCAN_SLOT_DESKTOP = SCAN_CARD_WIDTH_DESKTOP + SCAN_GAP_DESKTOP; // 422px
const SCAN_HALF_DESKTOP = SCAN_CARD_WIDTH_DESKTOP / 2; // 199px

const SCAN_CARD_WIDTH_MOBILE = 280;
const SCAN_GAP_MOBILE = 16;
const SCAN_SLOT_MOBILE = SCAN_CARD_WIDTH_MOBILE + SCAN_GAP_MOBILE; // 296px
const SCAN_HALF_MOBILE = SCAN_CARD_WIDTH_MOBILE / 2; // 140px

function FacilityCard({
  facility,
  index,
}: {
  facility: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group flex w-full flex-col items-center gap-5 text-center transition-all duration-700 ease-out lg:flex-row lg:items-end lg:gap-8 lg:text-left"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {facility.image && (
        <div className="relative h-50 w-77.5 shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F3221] lg:h-60 lg:w-93 lg:rounded-3xl">
          <OptimizedImage
            src={facility.image}
            alt={facility.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 310px, 372px"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 pb-2 lg:items-start">
        <h3 className="font-sans text-xl leading-tight font-medium text-[#A9E179] lg:text-2xl">
          {facility.title}
        </h3>
        <p className="max-w-74.25 font-sans text-[15px] leading-relaxed font-normal text-[#F2F7F1]/70 lg:max-w-none lg:text-base">
          {facility.description}
        </p>
      </div>
    </div>
  );
}

export interface BrandTrainingProps {
  contactInfo?: ApiContactInfo | null;
  trainingData?: {
    badge?: string;
    title?: string;
    facilitiesHeader?: string;
    programs?: Array<{
      id: string;
      title: string;
      image: string;
    }>;
    facilities?: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
  testimonialsData?: {
    badge?: string;
    title?: string;
    images?: string[];
    visitorScans?:
      | Array<{
          image: string;
          title?: string;
        }>
      | {
          image?: string[];
          images?: string[];
        };
  };
  showTestimonials?: boolean;
}

export default function BrandTraining({
  contactInfo,
  trainingData,
  testimonialsData,
  showTestimonials = true,
}: BrandTrainingProps) {
  const badge = trainingData?.badge || "";
  const programs = useMemo(() => trainingData?.programs || [], [trainingData?.programs]);
  const facilities = trainingData?.facilities || [];

  const [activeTab, setActiveTab] = useState<string>(() => {
    return programs.length > 0 ? programs[0].id : "";
  });

  useEffect(() => {
    if (programs.length > 0 && activeTab && !programs.some((p) => p.id === activeTab)) {
      setActiveTab(programs[0].id);
    }
  }, [programs]);

  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  let derivedScans: Array<{ image: string; title: string }> = [];

  if (testimonialsData?.images && testimonialsData.images.length > 0) {
    derivedScans = testimonialsData.images.filter(Boolean).map((img, idx) => ({
      image: img,
      title: `Visitor Log Entry ${idx + 1}`,
    }));
  } else if (Array.isArray(testimonialsData?.visitorScans)) {
    derivedScans = testimonialsData.visitorScans
      .filter((s): s is { image: string; title?: string } => Boolean(s?.image))
      .map((s, idx) => ({
        image: s.image,
        title: s.title || `Visitor Log Entry ${idx + 1}`,
      }));
  } else if (testimonialsData?.visitorScans && typeof testimonialsData.visitorScans === "object") {
    const scanObj = testimonialsData.visitorScans as { image?: string[]; images?: string[] };
    const scanImgs = scanObj.image || scanObj.images || [];
    if (Array.isArray(scanImgs)) {
      derivedScans = scanImgs.filter(Boolean).map((img, idx) => ({
        image: img,
        title: `Visitor Log Entry ${idx + 1}`,
      }));
    }
  }

  const visitorScans = derivedScans;

  const scansCount = visitorScans.length;
  const scanLoopStart = scansCount; // index into middle set
  const scanLoopLimit = scansCount * 2;
  const extendedScans = scansCount > 0 ? [...visitorScans, ...visitorScans, ...visitorScans] : [];

  // ── Scans Carousel (setTimeout & useEffect based Infinite Scroll) ──
  const [scanIndex, setScanIndex] = useState(scanLoopStart);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scanPaused, setScanPaused] = useState(false);
  const [scanTouchStart, setScanTouchStart] = useState<number | null>(null);
  const [scanTouchEnd, setScanTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (scansCount > 0) {
      setScanIndex(scanLoopStart);
    }
  }, [scansCount, scanLoopStart]);

  const scanNext = useCallback(() => {
    if (isTransitioning || scansCount <= 1) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setScanIndex((prev) => prev + 1);
  }, [isTransitioning, scansCount]);

  const scanPrev = useCallback(() => {
    if (isTransitioning || scansCount <= 1) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setScanIndex((prev) => prev - 1);
  }, [isTransitioning, scansCount]);

  // Handle jump wrapping after transition finishes (400ms duration)
  useEffect(() => {
    if (!isTransitioning || scansCount === 0) return;

    const timer = setTimeout(() => {
      let targetIndex = scanIndex;
      let shouldJump = false;

      if (scanIndex >= scanLoopLimit) {
        targetIndex = scanIndex - scansCount;
        shouldJump = true;
      } else if (scanIndex < scanLoopStart) {
        targetIndex = scanIndex + scansCount;
        shouldJump = true;
      }

      if (shouldJump) {
        setIsTransitionEnabled(false);
        setScanIndex(targetIndex);
        setTimeout(() => {
          setIsTransitionEnabled(true);
          setIsTransitioning(false);
        }, 50);
      } else {
        setIsTransitioning(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [scanIndex, isTransitioning, scanLoopLimit, scanLoopStart, scansCount]);

  // Auto-scroll effect (fires every 3 seconds unless hovered or transitioning)
  useEffect(() => {
    if (scanPaused || isTransitioning || scansCount <= 1) return;

    const interval = setInterval(() => {
      scanNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [scanNext, scanPaused, isTransitioning, scansCount]);

  const handleScanTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isTransitioning) return;
      setScanTouchEnd(null);
      setScanTouchStart(e.targetTouches[0].clientX);
    },
    [isTransitioning]
  );

  const handleScanTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isTransitioning) return;
      setScanTouchEnd(e.targetTouches[0].clientX);
    },
    [isTransitioning]
  );

  const handleScanTouchEnd = useCallback(() => {
    if (!scanTouchStart || !scanTouchEnd || isTransitioning || scansCount <= 1) return;
    const d = scanTouchStart - scanTouchEnd;
    if (d > 50) {
      scanNext();
    } else if (d < -50) {
      scanPrev();
    }
  }, [scanTouchStart, scanTouchEnd, scanNext, scanPrev, isTransitioning, scansCount]);

  return (
    <>
      {/* 6. Training Centre & Facilities Section */}
      {(badge || programs.length > 0 || facilities.length > 0) && (
        <section className="w-full bg-[#0D1A14] px-4 py-12 text-[#F2F7F1] md:px-8 md:py-25 lg:px-25">
          <div className="mx-auto flex max-w-310 flex-col gap-12 md:gap-20">
            {/* Header */}
            <div className="mx-auto flex w-full max-w-225 flex-col items-center gap-6 text-center">
              {badge && (
                <SectionBadge variant="dark" showDot>
                  {badge}
                </SectionBadge>
              )}
              <div className="flex flex-col gap-3">
                <h2 className="font-sans text-[32px] leading-9.5 font-medium text-[#F2F7F1] md:text-[48px] md:leading-14.5">
                  {trainingData?.title || maliksFarmData.training.title}
                </h2>
              </div>
            </div>

            {/* Interactive Program Tabs */}
            {programs.length > 0 && (
              <div className="flex w-full flex-col items-center gap-8">
                <div className="flex w-full max-w-212.75 flex-col items-center justify-between gap-2 rounded-[16px] bg-[#112019] p-2 md:flex-row">
                  {programs.map((prog) => {
                    const isActive = activeTab === prog.id;
                    return (
                      <button
                        key={prog.id}
                        onClick={() => setActiveTab(prog.id)}
                        className={cn(
                          "relative flex h-9.75 w-full items-center justify-center rounded-[10px] px-4 py-2 text-center font-sans text-[14px] whitespace-nowrap transition-colors duration-300 ease-in-out select-none md:h-auto md:flex-1 md:py-3.5 md:text-[16px]",
                          isActive
                            ? "font-medium text-[#0D1A14]"
                            : "bg-[#0D291C] text-[#F2F7F1] hover:bg-white/5 hover:text-white md:bg-transparent md:text-white/70"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTrainingTab"
                            className="absolute inset-0 rounded-[10px] bg-[#A9E179]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{prog.title}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Active Tab Image Frame */}
                <div className="group relative h-87.5 w-full max-w-257.5 overflow-hidden rounded-[20px] bg-[#112019] shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:aspect-1030/475 md:h-auto md:rounded-[24px]">
                  {programs.map((prog, idx) => {
                    const isSelected = prog.id === activeTab || (!activeTab && idx === 0);
                    if (!prog.image) return null;
                    return (
                      <div
                        key={prog.id}
                        className={cn(
                          "absolute inset-0 transition-opacity duration-500 ease-in-out",
                          isSelected ? "opacity-90 z-10" : "opacity-0 z-0"
                        )}
                      >
                        <OptimizedImage
                          src={prog.image}
                          alt={prog.title}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                          priority={idx === 0}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Facilities Grid with Sticky Header and Scroll-in Card Animations */}
            {facilities.length > 0 && (
              <div className="mt-12 grid w-full grid-cols-1 items-start gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12">
                {/* Sticky title column */}
                <div
                  ref={titleRef}
                  className="w-full shrink-0 text-center transition-all duration-700 ease-out lg:sticky lg:top-32 lg:col-span-4 lg:text-left"
                  style={{
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible ? "translateY(0)" : "translateY(30px)",
                  }}
                >
                  <h3 className="font-sans text-[32px] leading-9.5 font-medium whitespace-pre-line text-[#F2F7F1] lg:text-[48px] lg:leading-14.5">
                    {trainingData?.facilitiesHeader || maliksFarmData.training.facilitiesHeader}
                  </h3>
                </div>

                {/* Cards column */}
                <div className="grid w-full min-w-0 flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:col-span-8 lg:flex lg:flex-col">
                  {facilities.map((facility, index) => (
                    <FacilityCard key={index} facility={facility} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Testimonials & Contact CTA */}
      {showTestimonials ? (
        <section className="w-full overflow-hidden bg-[#DCF3C7] py-20 text-[#0D1A14] md:py-32.5">
          {/* Constrained Header */}
          <div className="mx-auto mb-16 flex max-w-310 flex-col items-center gap-8 px-4 text-center md:mb-20 md:px-8 lg:px-25">
            {(testimonialsData?.badge || maliksFarmData.testimonials.badge) && (
              <SectionBadge variant="outline" showDot>
                {testimonialsData?.badge || maliksFarmData.testimonials.badge}
              </SectionBadge>
            )}
            <h2 className="font-sans text-[32px] leading-9.5 font-medium tracking-tight text-black md:text-[48px] md:leading-14.5">
              {testimonialsData?.title || maliksFarmData.testimonials.title}
            </h2>
          </div>

          {/* ── Scans Carousel ── */}
          {scansCount > 0 && (
            <>
              {/* Desktop (≥768px) */}
              <div
                className="hidden w-full overflow-hidden md:block"
                onMouseEnter={() => setScanPaused(true)}
                onMouseLeave={() => setScanPaused(false)}
              >
                <div className="relative h-149.5 w-full overflow-visible">
                  <div
                    className={cn(
                      "flex items-center gap-6 overflow-visible",
                      isTransitionEnabled
                        ? "transition-transform duration-400 ease-in-out"
                        : "transition-none"
                    )}
                    style={{
                      transform: `translateX(calc(50vw - ${SCAN_HALF_DESKTOP}px - (${scanIndex} * ${SCAN_SLOT_DESKTOP}px)))`,
                      willChange: "transform",
                    }}
                  >
                    {extendedScans.map((scan, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isTransitioning) return;
                            setScanIndex(idx);
                          }}
                          className="group relative h-149.5 w-99.5 shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white"
                          style={{
                            border: "1.5px solid rgba(25, 82, 54, 0.2)",
                          }}
                        >
                          <div className="absolute inset-0">
                            <OptimizedImage
                              src={scan.image}
                              alt={scan.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              sizes="398px"
                              priority={idx === scanLoopStart}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile (<768px) */}
              <div
                className="block w-full overflow-hidden md:hidden"
                onTouchStart={handleScanTouchStart}
                onTouchMove={handleScanTouchMove}
                onTouchEnd={handleScanTouchEnd}
              >
                <div className="relative h-105 w-full touch-pan-y overflow-visible">
                  <div
                    className={cn(
                      "flex items-center gap-4 overflow-visible",
                      isTransitionEnabled
                        ? "transition-transform duration-400 ease-in-out"
                        : "transition-none"
                    )}
                    style={{
                      transform: `translateX(calc(50vw - ${SCAN_HALF_MOBILE}px - (${scanIndex} * ${SCAN_SLOT_MOBILE}px)))`,
                      willChange: "transform",
                    }}
                  >
                    {extendedScans.map((scan, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isTransitioning) return;
                            setScanIndex(idx);
                          }}
                          className="group relative h-105 w-70 shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white"
                          style={{
                            border: "1.5px solid rgba(25, 82, 54, 0.2)",
                          }}
                        >
                          <div className="absolute inset-0">
                            <OptimizedImage
                              src={scan.image}
                              alt={scan.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              sizes="280px"
                              priority={idx === scanLoopStart}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {scansCount > 1 && (
                <div
                  className="mt-12 hidden justify-center gap-4 sm:flex"
                  onMouseEnter={() => setScanPaused(true)}
                  onMouseLeave={() => setScanPaused(false)}
                >
                  <button
                    onClick={scanPrev}
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
                    onClick={scanNext}
                    aria-label="Next testimonial"
                    className="bg-brand-active hover:bg-brand-primary-hover flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95"
                  >
                    <NextImage src="/arrow.svg" alt="Next" width={24} height={24} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Contact Call to Action Banner */}
          <div className="mx-auto mt-16 max-w-310 px-4 md:mt-24 md:px-8 lg:px-25">
            <div className="mx-auto flex w-full max-w-196 items-center justify-center rounded-[24px] bg-[#0D1A14] p-6 text-center text-[#F2F7F1] md:p-10">
              <p className="max-w-169.25 font-sans text-[18px] leading-7 text-white/90 md:text-[20px] md:leading-7.5">
                If you are interested in hosting a program at our facility or
                purchasing GAP certified fruits and vegetables, contact us at{" "}
                <Link
                  href={`mailto:${contactInfo?.email_primary || maliksFarmData.contact.email}`}
                  className="font-semibold text-[#A9E179] transition-all hover:underline"
                >
                  {contactInfo?.email_primary || maliksFarmData.contact.email}
                </Link>{" "}
                or hotline at{" "}
                <span className="font-semibold text-[#A9E179]">
                  {contactInfo?.phone_primary || maliksFarmData.contact.hotline}
                </span>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full bg-[#F2F7F1] py-12 md:py-16">
          <div className="mx-auto max-w-310 px-4 md:px-8 lg:px-25">
            <div className="mx-auto flex w-full max-w-196 items-center justify-center rounded-[24px] bg-[#0D1A14] p-6 text-center text-[#F2F7F1] md:p-10">
              <p className="max-w-169.25 font-sans text-[18px] leading-7 text-white/90 md:text-[20px] md:leading-7.5">
                If you are interested in hosting a program at our facility or
                purchasing GAP certified fruits and vegetables, contact us at{" "}
                <Link
                  href={`mailto:${contactInfo?.email_primary || maliksFarmData.contact.email}`}
                  className="font-semibold text-[#A9E179] transition-all hover:underline"
                >
                  {contactInfo?.email_primary || maliksFarmData.contact.email}
                </Link>{" "}
                or hotline at{" "}
                <span className="font-semibold text-[#A9E179]">
                  {contactInfo?.phone_primary || maliksFarmData.contact.hotline}
                </span>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}