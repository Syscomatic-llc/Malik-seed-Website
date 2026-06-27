"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";

interface BrandGridProps {
  badge: string;
  title: string;
  description: string;
  images: string[];
}

export default function BrandGrid({
  badge,
  title,
  description,
  images,
}: BrandGridProps) {
  const gridCols =
    images.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  const scrollRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 280;
  const GAP = 16;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || images.length < 2) return;
    const centerIndex = 1;
    const scrollTo =
      centerIndex * (CARD_WIDTH + GAP) -
      (container.clientWidth / 2 - CARD_WIDTH / 2);
    container.scrollTo({ left: scrollTo, behavior: "instant" });
  }, [images.length]);

  return (
    <section className="w-full bg-[#F2F7F1] py-[40px] px-[16px] md:py-[60px] md:px-[48px] lg:p-[100px]">
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

        {/* Mobile View: Horizontal Scroll (below md) */}
        <div
          ref={scrollRef}
          className="flex md:hidden flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-4 px-[calc(50vw-140px)]"
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[24px] bg-neutral-200 w-[280px] h-[290px] shrink-0 snap-center"
            >
              <Image
                src={image}
                alt={`${title} — image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="280px"
              />
            </div>
          ))}
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