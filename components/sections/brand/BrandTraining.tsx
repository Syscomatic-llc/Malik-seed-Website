"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { maliksFarmData } from "@/data/brands/maliks-farm";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/SectionBadge";

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
  facility: typeof maliksFarmData.training.facilities[0];
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
      className="flex flex-col lg:flex-row items-center lg:items-end gap-5 lg:gap-8 transition-all duration-700 ease-out w-full text-center lg:text-left group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="w-[310px] lg:w-[372px] h-[200px] lg:h-[240px] flex-shrink-0 rounded-2xl lg:rounded-3xl bg-[#0F3221] overflow-hidden relative border border-white/5">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 310px, 372px"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0 pb-2 items-center lg:items-start">
        <h3 className="font-sans font-medium text-[#A9E179] text-xl lg:text-2xl leading-tight">
          {facility.title}
        </h3>
        <p className="font-sans font-normal text-[#F2F7F1]/70 text-[15px] lg:text-base leading-relaxed max-w-[297px] lg:max-w-none">
          {facility.description}
        </p>
      </div>
    </div>
  );
}

export default function BrandTraining() {
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

  // ── Scans Carousel (same pattern as TestimonialsSection) ──
  const [scanIndex, setScanIndex] = useState(scanLoopStart);
  const [scanResetting, setScanResetting] = useState(false);
  const [scanPaused, setScanPaused] = useState(false);
  const [scanTouchStart, setScanTouchStart] = useState<number | null>(null);
  const [scanTouchEnd, setScanTouchEnd] = useState<number | null>(null);

  const scanNext = useCallback(() => {
    if (scanResetting) return;
    setScanIndex((p) => p + 1);
  }, [scanResetting]);

  const scanPrev = useCallback(() => {
    if (scanResetting) return;
    setScanIndex((p) => p - 1);
  }, [scanResetting]);

  const handleScanTransitionEnd = useCallback(() => {
    if (scanIndex >= scanLoopLimit) {
      setScanResetting(true);
      setScanIndex(scanIndex - scansCount);
    } else if (scanIndex < scanLoopStart) {
      setScanResetting(true);
      setScanIndex(scanIndex + scansCount);
    }
  }, [scanIndex, scanLoopLimit, scanLoopStart, scansCount]);

  useEffect(() => {
    if (scanResetting) {
      const t = setTimeout(() => setScanResetting(false), 30);
      return () => clearTimeout(t);
    }
  }, [scanResetting]);

  // Auto-advance scans every 3 s (paused on hover)
  useEffect(() => {
    if (scanPaused) return;
    const interval = setInterval(() => scanNext(), 3000);
    return () => clearInterval(interval);
  }, [scanNext, scanPaused]);

  const handleScanTouchStart = useCallback((e: React.TouchEvent) => {
    if (scanResetting) return;
    setScanTouchEnd(null);
    setScanTouchStart(e.targetTouches[0].clientX);
  }, [scanResetting]);

  const handleScanTouchMove = useCallback((e: React.TouchEvent) => {
    if (scanResetting) return;
    setScanTouchEnd(e.targetTouches[0].clientX);
  }, [scanResetting]);

  const handleScanTouchEnd = useCallback(() => {
    if (!scanTouchStart || !scanTouchEnd) return;
    const d = scanTouchStart - scanTouchEnd;
    if (d > 50) scanNext();
    else if (d < -50) scanPrev();
  }, [scanTouchStart, scanTouchEnd, scanNext, scanPrev]);

  const currentProgram =
    maliksFarmData.training.programs.find((p) => p.id === activeTab) ||
    maliksFarmData.training.programs[0];

  return (
    <>
      {/* 6. Training Centre & Facilities Section */}
      <section className="w-full bg-[#0D1A14] py-12 md:py-[100px] px-4 md:px-8 lg:px-[100px] text-[#F2F7F1]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-20">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[900px] mx-auto w-full">
            <SectionBadge variant="dark" showDot>
              {maliksFarmData.training.badge}
            </SectionBadge>
            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#F2F7F1]">
                {maliksFarmData.training.title}
              </h2>
            </div>
          </div>

          {/* Interactive Program Tabs */}
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="w-full max-w-[851px] bg-[#112019] rounded-[16px] p-2 flex flex-col md:flex-row gap-2 justify-between items-center">
              {maliksFarmData.training.programs.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setActiveTab(prog.id)}
                  className={cn(
                    "w-full md:flex-1 text-center font-sans text-[14px] md:text-[16px] rounded-[10px] h-[39px] md:h-auto flex items-center justify-center py-2 md:py-3.5 px-4 transition-all duration-300 select-none whitespace-nowrap",
                    activeTab === prog.id
                      ? "bg-[#A9E179] text-[#0D1A14] font-medium"
                      : "bg-[#0D291C] md:bg-transparent text-[#F2F7F1] md:text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {prog.title}
                </button>
              ))}
            </div>

            {/* Active Tab Image Frame */}
            <div className="relative w-full max-w-[1030px] h-[350px] md:h-auto md:aspect-[1030/475] rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#112019] group shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
              <Image
                src={currentProgram.image}
                alt={currentProgram.title}
                fill
                className="object-cover opacity-90 transition-all duration-1000 ease-out group-hover:scale-103"
                priority
              />

              {/* Decorative SVG group icon at bottom-right */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-[46px] h-8 transition-opacity duration-300">
                <Image
                  src="/images/brand/group_4.svg"
                  alt="Decorative icon"
                  width={46}
                  height={32}
                  className="brightness-0 invert opacity-75"
                />
              </div>
            </div>
          </div>

          {/* Facilities Grid with Sticky Header and Scroll-in Card Animations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12 md:mt-20 w-full">
            {/* Sticky title column */}
            <div
              ref={titleRef}
              className="lg:col-span-4 lg:sticky lg:top-32 flex-shrink-0 transition-all duration-700 ease-out text-center lg:text-left w-full"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <h3 className="font-sans text-[32px] lg:text-[48px] font-medium leading-[38px] lg:leading-[58px] text-[#F2F7F1] whitespace-pre-line">
                {maliksFarmData.training.facilitiesHeader}
              </h3>
            </div>

            {/* Cards column */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-8 md:gap-12 flex-1 min-w-0 w-full">
              {facilities.map((facility, index) => (
                <FacilityCard key={index} facility={facility} index={index} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Testimonials from Malik's Farm guests */}
      <section className="w-full bg-[#DCF3C7] py-[80px] md:py-[130px] text-[#0D1A14] overflow-hidden">
        {/* Constrained Header */}
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-[100px] flex flex-col items-center text-center gap-8 mb-16 md:mb-20">
          {/* Badge — light variant: #F9FAFB bg, #E4E7EC border, #195236 text */}
          <div className="inline-flex h-[33px] items-center justify-center gap-2 rounded-[30px] px-4 font-sans text-[14px] font-medium leading-[21px] capitalize shrink-0 bg-[#F9FAFB] border border-[#E4E7EC] text-[#195236]">
            <span className="h-[6px] w-[6px] rounded-[2px] bg-[#195236] shrink-0" />
            {maliksFarmData.testimonials.badge}
          </div>
          <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-black tracking-tight">
            {maliksFarmData.testimonials.title}
          </h2>
        </div>

        {/* ── Scans Carousel ── */}

        {/* Desktop (≥768px) */}
        <div
          className="hidden md:block w-full overflow-hidden"
          onMouseEnter={() => setScanPaused(true)}
          onMouseLeave={() => setScanPaused(false)}
        >
          <div className="relative h-[598px] w-full overflow-visible">
            <div
              className={cn(
                "flex items-center gap-6 overflow-visible",
                scanResetting ? "transition-none" : "transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              )}
              style={{
                transform: `translateX(calc(50vw - ${SCAN_HALF_DESKTOP}px - (${scanIndex} * ${SCAN_SLOT_DESKTOP}px)))`,
                willChange: "transform",
              }}
              onTransitionEnd={(e) => {
                if (e.target !== e.currentTarget) return;
                if (e.propertyName !== "transform") return;
                handleScanTransitionEnd();
              }}
            >
              {extendedScans.map((scan, idx) => {
                const isActive = idx % scansCount === scanIndex % scansCount;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (scanResetting) return;
                      setScanIndex(idx);
                    }}
                    className="relative shrink-0 w-[398px] h-[598px] rounded-[20px] bg-white overflow-hidden cursor-pointer"
                    style={{
                      border: "1.5px solid rgba(25, 82, 54, 0.2)",
                    }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={scan.image}
                        alt={scan.title}
                        fill
                        className="object-cover"
                        sizes="398px"
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
          className="block md:hidden w-full overflow-hidden"
          onTouchStart={handleScanTouchStart}
          onTouchMove={handleScanTouchMove}
          onTouchEnd={handleScanTouchEnd}
        >
          <div className="relative h-[420px] w-full overflow-visible touch-pan-y">
            <div
              className={cn(
                "flex items-center gap-4 overflow-visible",
                scanResetting ? "transition-none" : "transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              )}
              style={{
                transform: `translateX(calc(50vw - ${SCAN_HALF_MOBILE}px - (${scanIndex} * ${SCAN_SLOT_MOBILE}px)))`,
                willChange: "transform",
              }}
              onTransitionEnd={(e) => {
                if (e.target !== e.currentTarget) return;
                if (e.propertyName !== "transform") return;
                handleScanTransitionEnd();
              }}
            >
              {extendedScans.map((scan, idx) => {
                const isActive = idx % scansCount === scanIndex % scansCount;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (scanResetting) return;
                      setScanIndex(idx);
                    }}
                    className="relative shrink-0 w-[280px] h-[420px] rounded-[20px] bg-white overflow-hidden cursor-pointer"
                    style={{
                      border: "1.5px solid rgba(25, 82, 54, 0.2)",
                    }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={scan.image}
                        alt={scan.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Call to Action Banner */}
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-[100px] mt-16 md:mt-24">
          <div className="max-w-[784px] w-full mx-auto bg-[#0D1A14] text-[#F2F7F1] rounded-[24px] p-6 md:p-10 flex items-center justify-center text-center">
            <p className="font-sans text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-white/90 max-w-[677px]">
              If you are interested in hosting a program at our facility or purchasing GAP certified fruits and vegetables, contact us at{" "}
              <Link href={`mailto:${maliksFarmData.contact.email}`} className="text-[#A9E179] hover:underline font-semibold transition-all">
                {maliksFarmData.contact.email}
              </Link>{" "}
              or hotline at{" "}
              <span className="text-[#A9E179] font-semibold">
                {maliksFarmData.contact.hotline}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
