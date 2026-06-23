"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

const HERO_IMAGES = [
  {
    id: 1,
    src: "/images/about/hero-rd-9.png",
    alt: "Malik's Farm R&D crops and green tunnels",
  },
  {
    id: 2,
    src: "/images/about/hero-dscf8697.png",
    alt: "High-yield cabbage crops inspection",
  },
  {
    id: 3,
    src: "/images/about/hero-field-67.png",
    alt: "Farmers working actively in the hybrid seed production fields",
  },
  {
    id: 4,
    src: "/images/hero/hero-bg.png",
    alt: "hero image 1",
  },
  {
    id: 5,
    src: "/images/hero/hero-slide-1.jpg",
    alt: "hero image 2",
  },
  {
    id: 6,
    src: "/images/hero/hero-slide-2.jpg",
    alt: "hero image 4",
  },
  {
    id: 7,
    src: "/images/hero/hero-slide-3.jpg",
    alt: "hero image 3",
  },
];

// Duplicate images for seamless infinite loop
const LOOPED_IMAGES = [...HERO_IMAGES, ...HERO_IMAGES];

/** Pixels per second the strip scrolls */
const SCROLL_SPEED = 60;

export default function AboutHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Keep pausedRef in sync so the rAF loop doesn't close over stale state
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!pausedRef.current && track) {
        track.scrollLeft += (SCROLL_SPEED * delta) / 1000;

        // Seamless loop: once we've scrolled past the first set of images,
        // jump back by exactly one set width (scrollWidth / 2)
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

  return (
    <section className="w-full bg-[#F2F7F1] pt-[120px] pb-12 md:pt-[150px] md:pb-[80px] xl:pt-[180px] xl:pb-[100px] overflow-hidden">
      <div className="mx-auto flex flex-col items-center max-w-full">
        {/* Title & Badge */}
        <div className="flex flex-col items-center gap-4 px-4 md:gap-8 md:px-[100px]">
          <SectionBadge variant="outline" showDot className="h-[30px] md:h-[33px] px-4">
            Our Story
          </SectionBadge>

          <h1 className="text-brand-dark text-center font-medium tracking-tight max-w-[844px] text-[38px] leading-[46px] md:text-[54px] md:leading-[64px] xl:text-[64px] xl:leading-[77px] font-sans">
            Cultivating the Future <br className="hidden md:inline" />
            of Agriculture in Bangladesh
          </h1>
        </div>

        {/* Auto-scroll gallery strip */}
        <div className="w-full mt-[32px] md:mt-[48px]">
          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            // overflow-x-scroll (not auto) keeps the scrollbar hidden but
            // lets JS set scrollLeft freely; scrollbar-none hides it visually
            className="w-full overflow-x-scroll scrollbar-none flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "auto" }}
            aria-label="Image gallery, scrolls automatically"
          >
            {LOOPED_IMAGES.map((img, i) => (
              <div
                key={`${img.id}-${i}`}
                className="w-[310px] h-[240px] md:w-[548px] md:h-[420px] relative rounded-[20px] md:rounded-[24px] overflow-hidden shrink-0 bg-white shadow-sm"
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
        </div>
      </div>
    </section>
  );
}
