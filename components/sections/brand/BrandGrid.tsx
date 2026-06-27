"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

interface BrandGridProps {
  badge: string;
  title: string;
  description: string;
  images: string[];
}

// Carousel Constants
const CARD_WIDTH_MOBILE = 280;
const GAP_MOBILE = 16;
const SLOT_WIDTH_MOBILE = CARD_WIDTH_MOBILE + GAP_MOBILE; // 296px
const HALF_CARD_MOBILE = CARD_WIDTH_MOBILE / 2; // 140px

export default function BrandGrid({
  badge,
  title,
  description,
  images,
}: BrandGridProps) {
  const IMAGES_COUNT = images.length;
  const LOOP_SET_START = IMAGES_COUNT;
  const LOOP_RESET_LIMIT = IMAGES_COUNT * 2;

  const extendedImages =
    IMAGES_COUNT > 0
      ? [...images, ...images, ...images]
      : [];

  const [activeIndex, setActiveIndex] = useState(LOOP_SET_START);
  const [isResetting, setIsResetting] = useState(false);

  const prev = useCallback(() => {
    if (isResetting || IMAGES_COUNT === 0) return;
    setActiveIndex((prevIndex) => prevIndex - 1);
  }, [isResetting, IMAGES_COUNT]);

  const next = useCallback(() => {
    if (isResetting || IMAGES_COUNT === 0) return;
    setActiveIndex((prevIndex) => prevIndex + 1);
  }, [isResetting, IMAGES_COUNT]);

  // Mobile Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Track width — used to center the active card against the actual
  // visible track instead of 50vw (which is wrong once the section
  // has horizontal padding, causing uneven left/right peek widths)
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setTrackWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Touch Swipe handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isResetting) return;
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    },
    [isResetting]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isResetting) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    [isResetting]
  );

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
      setActiveIndex(activeIndex - IMAGES_COUNT);
    } else if (activeIndex < LOOP_SET_START) {
      setIsResetting(true);
      setActiveIndex(activeIndex + IMAGES_COUNT);
    }
  }, [activeIndex, IMAGES_COUNT, LOOP_RESET_LIMIT, LOOP_SET_START]);

  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  const gridCols =
    images.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-[#F2F7F1] py-[40px] px-[16px] md:py-[60px] md:px-[48px] lg:p-[100px] overflow-hidden">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-[32px] md:gap-[48px]">
        {/* Header */}
        <div className="flex flex-col text-center gap-[24px] md:gap-[32px] items-center mx-auto max-w-[700px]">
          <SectionBadge showDot={true} className="bg-white">{badge}</SectionBadge>
          <div>
            <h2 className="font-sans text-[32px] md:text-[40px] font-medium leading-[120%] md:leading-[48px] text-[#0D1A14]">
              {title}
            </h2>
            <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-[#0D1A14]/65">
              {description}
            </p>
          </div>
        </div>

        {/* Mobile View: Carousel (below md) */}
        <div className="block w-full overflow-visible md:hidden">
          <div
            ref={trackRef}
            className="relative h-[290px] w-full touch-pan-y overflow-visible flex items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={cn(
                "flex items-center gap-4 overflow-visible",
                isResetting
                  ? "transition-none"
                  : "transition-transform duration-500 ease-out"
              )}
              style={{
                transform: `translateX(calc(${trackWidth / 2}px - ${HALF_CARD_MOBILE}px - (${activeIndex} * ${SLOT_WIDTH_MOBILE}px)))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedImages.map((image, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isResetting) setActiveIndex(idx);
                    }}
                    className={cn(
                      "group relative shrink-0 cursor-pointer overflow-hidden rounded-[24px] bg-neutral-200 w-[280px] h-[290px] transition-all duration-500 ease-out",
                      isResetting ? "transition-none" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 transition-transform duration-500 ease-out",
                        isActive ? "scale-105" : "scale-100"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${title} — image ${(idx % IMAGES_COUNT) + 1}`}
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

        {/* Desktop/Tablet View: Grid (md and up) */}
        <div className={`hidden md:grid ${gridCols} gap-5 md:gap-6`}>
          {images.map((image, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[20px] bg-neutral-200 aspect-[4/3]"
            >
              <Image
                src={image}
                alt={`${title} — image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 387px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}