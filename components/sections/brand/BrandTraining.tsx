"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "@/components/ui/OptimizedImage";
import Link from "next/link";
import NextImage from "next/image";
import { maliksFarmData } from "@/data/brands/maliks-farm";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ApiContactInfo } from "@/lib/api";
import OptimizedImage from "@/components/ui/OptimizedImage";

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
  facility: (typeof maliksFarmData.training.facilities)[0];
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
      <div className="relative h-[200px] w-[310px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F3221] lg:h-[240px] lg:w-[372px] lg:rounded-3xl">
        <OptimizedImage
          src={facility.image}
          alt={facility.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 310px, 372px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 pb-2 lg:items-start">
        <h3 className="font-sans text-xl leading-tight font-medium text-[#A9E179] lg:text-2xl">
          {facility.title}
        </h3>
        <p className="max-w-[297px] font-sans text-[15px] leading-relaxed font-normal text-[#F2F7F1]/70 lg:max-w-none lg:text-base">
          {facility.description}
        </p>
      </div>
    </div>
  );
}

export default function BrandTraining({
  contactInfo,
}: {
  contactInfo?: ApiContactInfo | null;
}) {
  const [activeTab, setActiveTab] = useState("global-gap");
  const facilities = maliksFarmData.training.facilities;

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

  // Scans carousel constants derived dynamically from maliksFarmData
  const visitorScans = maliksFarmData.testimonials.visitorScans;
  const scansCount = visitorScans.length;
  const scanLoopStart = scansCount; // index into middle set
  const scanLoopLimit = scansCount * 2;
  const extendedScans = [...visitorScans, ...visitorScans, ...visitorScans];

  // ── Scans Carousel (setTimeout & useEffect based Infinite Scroll) ──
  const [scanIndex, setScanIndex] = useState(scanLoopStart);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scanPaused, setScanPaused] = useState(false);
  const [scanTouchStart, setScanTouchStart] = useState<number | null>(null);
  const [scanTouchEnd, setScanTouchEnd] = useState<number | null>(null);

  const scanNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setScanIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const scanPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsTransitionEnabled(true);
    setScanIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Handle jump wrapping after transition finishes (700ms duration)
  useEffect(() => {
    if (!isTransitioning) return;

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
    if (scanPaused || isTransitioning) return;

    const interval = setInterval(() => {
      scanNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [scanNext, scanPaused, isTransitioning]);

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
    if (!scanTouchStart || !scanTouchEnd || isTransitioning) return;
    const d = scanTouchStart - scanTouchEnd;
    if (d > 50) {
      scanNext();
    } else if (d < -50) {
      scanPrev();
    }
  }, [scanTouchStart, scanTouchEnd, scanNext, scanPrev, isTransitioning]);

  const currentProgram =
    maliksFarmData.training.programs.find((p) => p.id === activeTab) ||
    maliksFarmData.training.programs[0];

  return (
    <>
      {/* 6. Training Centre & Facilities Section */}
      <section className="w-full bg-[#0D1A14] px-4 py-12 text-[#F2F7F1] md:px-8 md:py-[100px] lg:px-[100px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12 md:gap-20">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 text-center">
            <SectionBadge variant="dark" showDot>
              {maliksFarmData.training.badge}
            </SectionBadge>
            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[32px] leading-[38px] font-medium text-[#F2F7F1] md:text-[48px] md:leading-[58px]">
                {maliksFarmData.training.title}
              </h2>
            </div>
          </div>

          {/* Interactive Program Tabs */}
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full max-w-[851px] flex-col items-center justify-between gap-2 rounded-[16px] bg-[#112019] p-2 md:flex-row">
              {maliksFarmData.training.programs.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setActiveTab(prog.id)}
                  className={cn(
                    "flex h-[39px] w-full items-center justify-center rounded-[10px] px-4 py-2 text-center font-sans text-[14px] whitespace-nowrap transition-colors duration-300 ease-in-out select-none md:h-auto md:flex-1 md:py-3.5 md:text-[16px]",
                    activeTab === prog.id
                      ? "bg-[#A9E179] font-medium text-[#0D1A14]"
                      : "bg-[#0D291C] text-[#F2F7F1] hover:bg-white/5 hover:text-white md:bg-transparent md:text-white/70"
                  )}
                >
                  {prog.title}
                </button>
              ))}
            </div>
            {/* Active Tab Image Frame */}
            <div className="group relative h-[350px] w-full max-w-[1030px] overflow-hidden rounded-[20px] bg-[#112019] shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:aspect-[1030/475] md:h-auto md:rounded-[24px]">
              {maliksFarmData.training.programs.map((prog) => {
                const isSelected = prog.id === activeTab;
                return (
                  <div
                    key={prog.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 ease-in-out",
                      isSelected ? "opacity-90 z-10" : "opacity-0 z-0"
                    )}
                  >
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                      priority={prog.id === "global-gap"}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Facilities Grid with Sticky Header and Scroll-in Card Animations */}
          <div className="mt-12 grid w-full grid-cols-1 items-start gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12">
            {/* Sticky title column */}
            <div
              ref={titleRef}
              className="w-full flex-shrink-0 text-center transition-all duration-700 ease-out lg:sticky lg:top-32 lg:col-span-4 lg:text-left"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <h3 className="font-sans text-[32px] leading-[38px] font-medium whitespace-pre-line text-[#F2F7F1] lg:text-[48px] lg:leading-[58px]">
                {maliksFarmData.training.facilitiesHeader}
              </h3>
            </div>

            {/* Cards column */}
            <div className="grid w-full min-w-0 flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:col-span-8 lg:flex lg:flex-col">
              {facilities.map((facility, index) => (
                <FacilityCard key={index} facility={facility} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials from Malik's Farm guests */}
      <section className="w-full overflow-hidden bg-[#DCF3C7] py-[80px] text-[#0D1A14] md:py-[130px]">
        {/* Constrained Header */}
        <div className="mx-auto mb-16 flex max-w-[1240px] flex-col items-center gap-8 px-4 text-center md:mb-20 md:px-8 lg:px-[100px]">
          <SectionBadge variant="outline" showDot>
            {maliksFarmData.testimonials.badge}
          </SectionBadge>
          <h2 className="font-sans text-[32px] leading-[38px] font-medium tracking-tight text-black md:text-[48px] md:leading-[58px]">
            {maliksFarmData.testimonials.title}
          </h2>
        </div>

        {/* ── Scans Carousel ── */}

        {/* Desktop (≥768px) */}
        <div
          className="hidden w-full overflow-hidden md:block"
          onMouseEnter={() => setScanPaused(true)}
          onMouseLeave={() => setScanPaused(false)}
        >
          <div className="relative h-[598px] w-full overflow-visible">
            <div
              className={cn(
                "flex items-center gap-6 overflow-visible",
                isTransitionEnabled
                  ? "transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  : "transition-none"
              )}
              style={{
                transform: `translateX(calc(50vw - ${SCAN_HALF_DESKTOP}px - (${scanIndex} * ${SCAN_SLOT_DESKTOP}px)))`,
                willChange: "transform",
              }}
            >
              {extendedScans.map((scan, idx) => {
                const isActive = idx % scansCount === scanIndex % scansCount;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isTransitioning) return;
                      setScanIndex(idx);
                    }}
                    className="group relative h-[598px] w-[398px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white"
                    style={{
                      border: "1.5px solid rgba(25, 82, 54, 0.2)",
                    }}
                  >
                    <div className="absolute inset-0">
                      <Image
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
          <div className="relative h-[420px] w-full touch-pan-y overflow-visible">
            <div
              className={cn(
                "flex items-center gap-4 overflow-visible",
                isTransitionEnabled
                  ? "transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  : "transition-none"
              )}
              style={{
                transform: `translateX(calc(50vw - ${SCAN_HALF_MOBILE}px - (${scanIndex} * ${SCAN_SLOT_MOBILE}px)))`,
                willChange: "transform",
              }}
            >
              {extendedScans.map((scan, idx) => {
                const isActive = idx % scansCount === scanIndex % scansCount;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isTransitioning) return;
                      setScanIndex(idx);
                    }}
                    className="group relative h-[420px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white"
                    style={{
                      border: "1.5px solid rgba(25, 82, 54, 0.2)",
                    }}
                  >
                    <div className="absolute inset-0">
                      <Image
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

        {/* Navigation Arrows - Figma: w-12 h-12, rounded-full bg-brand-active, arrows from /arrow.svg, 16px gap, hidden on mobile */}
        <div
          className="mt-[48px] hidden justify-center gap-4 sm:flex"
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

        {/* Contact Call to Action Banner */}
        <div className="mx-auto mt-16 max-w-[1240px] px-4 md:mt-24 md:px-8 lg:px-[100px]">
          <div className="mx-auto flex w-full max-w-[784px] items-center justify-center rounded-[24px] bg-[#0D1A14] p-6 text-center text-[#F2F7F1] md:p-10">
            <p className="max-w-[677px] font-sans text-[18px] leading-[28px] text-white/90 md:text-[20px] md:leading-[30px]">
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
    </>
  );
}