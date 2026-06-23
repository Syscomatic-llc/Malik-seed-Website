"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const HERO_IMAGES = [
  { id: 1, src: "/images/about/hero-rd-9.png",    alt: "Malik's Farm R&D crops and green tunnels" },
  { id: 2, src: "/images/about/hero-dscf8697.png", alt: "High-yield cabbage crops inspection" },
  { id: 3, src: "/images/about/hero-field-67.png", alt: "Farmers working actively in the hybrid seed production fields" },
  { id: 4, src: "/images/hero/hero-bg.png",        alt: "Malik Seeds aerial field view" },
  { id: 5, src: "/images/hero/hero-slide-1.jpg",   alt: "Season crop in full bloom" },
  { id: 6, src: "/images/hero/hero-slide-2.jpg",   alt: "Seed trial plots in cultivation" },
  { id: 7, src: "/images/hero/hero-slide-3.jpg",   alt: "Agricultural research team at work" },
] as const;

// Duplicate for seamless infinite loop — no JS clone needed
const LOOPED_IMAGES = [...HERO_IMAGES, ...HERO_IMAGES] as const;

/** Scroll velocity in px/second — tweak to taste */
const SCROLL_SPEED_PX_PER_S = 60;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutHero() {
  const trackRef    = useRef<HTMLDivElement>(null);
  // Using a plain ref for paused state avoids a re-render + sync effect cycle
  const pausedRef   = useRef(false);
  const rafRef      = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // requestAnimationFrame loop — runs once on mount, cleans up on unmount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!pausedRef.current) {
        track.scrollLeft += (SCROLL_SPEED_PX_PER_S * delta) / 1000;

        // Seamless reset: once past the first set, jump back by its width
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Stable handler references — no re-renders triggered
  const pause  = useCallback(() => { pausedRef.current = true;  }, []);
  const resume = useCallback(() => { pausedRef.current = false; }, []);

  return (
    <section className="w-full bg-brand-bg pt-[120px] pb-12 overflow-hidden md:pt-[150px] md:pb-[80px] xl:pt-[180px] xl:pb-[100px]">

      {/* Title & Badge — constrained only for readability */}
      <div className="flex flex-col items-center gap-4 px-4 md:gap-8 md:px-[100px]">
        <SectionBadge variant="outline" showDot className="h-[30px] md:h-[33px] px-4">
          Our Story
        </SectionBadge>

        <h1 className="text-brand-dark text-center font-sans font-medium tracking-tight max-w-[844px] text-[38px] leading-[46px] md:text-[54px] md:leading-[64px] xl:text-[64px] xl:leading-[77px]">
          Cultivating the Future{" "}
          <br className="hidden md:inline" />
          of Agriculture in Bangladesh
        </h1>
      </div>

      {/* Auto-scrolling gallery strip — merged wrapper+track into one element */}
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="w-full mt-8 overflow-x-scroll scrollbar-none flex gap-4 cursor-grab active:cursor-grabbing md:mt-12 md:gap-6"
        aria-label="Image gallery, scrolls automatically. Hover or touch to pause."
        role="region"
      >
        {LOOPED_IMAGES.map((img, i) => (
          <div
            key={`${img.id}-${i}`}
            className="w-[310px] h-[240px] shrink-0 relative rounded-[20px] overflow-hidden bg-white shadow-sm md:w-[548px] md:h-[420px] md:rounded-[24px]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i < 3}
              sizes="(max-width: 768px) 310px, 548px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
