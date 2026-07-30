"use client";

import { useEffect, useRef } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { resolveImageUrl } from "@/lib/utils";
import { ApiOurStoryHero } from "@/lib/api";

interface AboutHeroProps {
  apiData?: ApiOurStoryHero | null;
}

const DEFAULT_HERO_IMAGES = [
  { id: 0, src: "/images/about/hero-dscf8697.png", alt: "Our story image 1" },
  { id: 1, src: "/images/about/hero-field-67.png", alt: "Our story image 2" },
  { id: 2, src: "/images/about/hero-rd-9.png", alt: "Our story image 3" },
];

export default function AboutHero({ apiData }: AboutHeroProps) {
  const badgeText = apiData?.title || "Our Story";
  const titleText =
    apiData?.subtitle ||
    "Cultivating the Future of Agriculture in Bangladesh";
  
  const rawImages = apiData?.background_images?.length
    ? apiData.background_images.map((img, i) => ({
        id: i,
        src: resolveImageUrl(img),
        alt: `Our story image ${i + 1}`,
      }))
    : [];

  const images = rawImages.length > 0 ? rawImages : DEFAULT_HERO_IMAGES;

  return (
    <section className="bg-brand-bg w-full overflow-hidden pt-[120px] pb-12 md:pt-[150px] md:pb-[80px] xl:pt-[180px] xl:pb-[100px]">
      {/* Title & Badge — constrained only for readability */}
      <div className="flex flex-col items-center gap-4 px-4 md:gap-8 md:px-[100px]">
        <SectionBadge
          variant="outline"
          showDot
          className="h-[30px] px-4 md:h-[33px]"
        >
          {badgeText}
        </SectionBadge>

        <h1 className="text-brand-dark max-w-[844px] text-center font-sans text-[38px] leading-[46px] font-medium tracking-tight md:text-[54px] md:leading-[64px] xl:text-[64px] xl:leading-[77px] whitespace-pre-line">
          {titleText}
        </h1>
      </div>

      {/* Desktop & Tablet 3-image row — static row on desktop (>= md) */}
      <div className="hidden md:flex mt-12 w-full justify-center overflow-x-hidden py-0 px-0">
        <div className="flex shrink-0 items-center justify-center gap-6">
          {images.map((img, i) => (
            <div
              key={`desktop-${img.id}-${i}`}
              className="relative aspect-[548/420] h-auto w-[42vw] shrink-0 overflow-hidden rounded-[24px] bg-white shadow-sm"
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                fill
                priority={i < 3}
                sizes="42vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile (< md) — Infinite Scroll Auto Slider */}
      <MobileHeroSlider images={images} />
    </section>
  );
}

function MobileHeroSlider({
  images,
}: {
  images: { id: number; src: string; alt: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate images list for seamless infinite loop (4 sets)
  const displayImages =
    images.length > 0
      ? [...images, ...images, ...images, ...images]
      : [];

  useEffect(() => {
    let animId: number;

    const autoScroll = () => {
      const container = containerRef.current;
      if (container) {
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0) {
          container.scrollLeft += 0.55;

          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth;
          }
        }
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [displayImages.length]);

  if (displayImages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{ WebkitTapHighlightColor: "transparent" }}
      className="md:hidden mt-8 flex w-full overflow-x-hidden pointer-events-none scrollbar-none py-2 px-4 select-none"
    >
      <div className="flex shrink-0 items-center gap-4">
        {displayImages.map((img, i) => (
          <div
            key={`mobile-${img.id}-${i}`}
            className="relative h-[240px] w-[310px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-sm select-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <OptimizedImage
              src={img.src}
              alt={img.alt}
              fill
              priority={i < 3}
              sizes="310px"
              className="object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}



