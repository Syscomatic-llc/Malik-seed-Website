"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandCropPortfolio from "@/components/sections/brand/BrandCropPortfolio";
import BrandTraining from "@/components/sections/brand/BrandTraining";
import { maliksFarmData } from "@/data/brands/maliks-farm";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function MaliksFarmPage() {
  const bottomImagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bottomImagesContainerRef.current;
    if (container) {
      const secondElement = container.children[1] as HTMLElement;
      if (secondElement) {
        const containerWidth = container.offsetWidth;
        const elementWidth = secondElement.offsetWidth;
        const elementLeft = secondElement.offsetLeft;
        container.scrollLeft =
          elementLeft - (containerWidth - elementWidth) / 2;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      {/* 1. Brand Hero (Untouched) */}
      <BrandHero {...maliksFarmData.hero} />

      {/* 2. Brand Intro (Untouched) */}
      <BrandIntro {...maliksFarmData.intro} />

      {/* 3. Custom Brand Split 1 (The Farm) */}
      <section className="w-full bg-[#F2F7F1] px-4 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-[100px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 lg:gap-[64px]">
          {/* Left: Text */}
          <div className="flex max-w-[863px] shrink-0 flex-col items-center justify-center gap-6">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.split1.badge}
            </SectionBadge>
            <div className="flex flex-col gap-4">
              <h2 className="text-center font-sans text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px] lg:text-left">
                {maliksFarmData.split1.title}
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-center font-sans text-[16px] leading-[24px] text-[#0D1A14]/70 lg:text-left">
              <p className="text-center">{maliksFarmData.split1.description}</p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-neutral-200 lg:rounded-[24px]">
            <Image
              src={maliksFarmData.split1.image}
              alt={maliksFarmData.split1.title}
              fill
              className="object-cover"
              sizes="(max-width: 1240px) 100vw, 608px"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. Research & Trialling Process Section */}
      <section className="w-full bg-[#F2F7F1] px-4 py-[80px] md:px-8 md:py-[100px] lg:px-[100px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12 md:gap-16">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 text-center">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.process.badge}
            </SectionBadge>
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[862px] font-sans text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px]">
                {maliksFarmData.process.title}
              </h2>
              <p className="mx-auto max-w-[770px] font-sans text-[15px] leading-[24px] text-[#0D1A14]/65 md:text-[16px]">
                {maliksFarmData.process.description}
              </p>
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="mx-auto flex w-full max-w-[728px] flex-col items-start gap-8">
            {maliksFarmData.process.steps.map((step, i) => (
              <div key={i} className="flex w-full items-start gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0F3221] font-sans text-[18px] leading-[22px] font-medium text-[#F2F7F1]">
                  {step.number}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-[20px] leading-[29px] font-medium text-[#0D1A14] md:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-[24px] text-[#0D1A14]/65 md:text-[16px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* R&D Images Row */}
          <div className="flex w-full snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto pb-4 md:gap-6">
            <div className="group relative h-[290px] w-[280px] shrink-0 snap-center overflow-hidden rounded-[24px] bg-neutral-200 md:h-[377px] md:w-[608px]">
              <Image
                src={maliksFarmData.process.images[0]}
                alt="Structured field trials variety check"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 608px"
              />
            </div>
            <div className="group relative h-[290px] w-[280px] shrink-0 snap-center overflow-hidden rounded-[24px] bg-neutral-200 md:h-[377px] md:w-[608px]">
              <Image
                src={maliksFarmData.process.images[1]}
                alt="Product evaluation during harvest"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 608px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Commercial Farming Section */}
      <section className="w-full bg-[#F2F7F1] px-4 pt-[80px] pb-6 md:px-8 md:pt-[100px] lg:px-[100px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12 md:gap-16">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 text-center">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.split2.badge}
            </SectionBadge>
            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px]">
                {maliksFarmData.split2.title}
              </h2>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-4">
            {/* GAP card details */}
            <div className="flex flex-col justify-between gap-8 rounded-[24px] border border-[#E4E7EC] bg-white p-4 md:p-6 lg:col-span-2">
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative h-14 w-14 shrink-0 md:h-20 md:w-20">
                    <Image
                      src={maliksFarmData.split2.gapLogo}
                      alt="Global GAP badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-sans text-[24px] leading-[36px] font-medium text-[#0D1A14]">
                    What is GAP?
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-[15px] leading-[24px] text-[#0D1A14]/65 md:text-[16px]">
                {maliksFarmData.split2.description
                  .split("\n\n")
                  .map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
              </div>
            </div>

            {/* Small image card 1 */}
            <div className="group relative aspect-square min-h-[320px] overflow-hidden rounded-[24px] bg-neutral-200 lg:aspect-auto lg:h-full">
              <Image
                src={maliksFarmData.split2.images[0]}
                alt="GAP Certified field crop"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 292px"
              />
            </div>

            {/* Small image card 2 */}
            <div className="group relative aspect-square min-h-[320px] overflow-hidden rounded-[24px] bg-neutral-200 lg:aspect-auto lg:h-full">
              <Image
                src={maliksFarmData.split2.images[1]}
                alt="Quality control checking"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 292px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Crop Portfolio for Malik's Farm */}
      <BrandCropPortfolio {...maliksFarmData.cropPortfolio} />

      {/* Commercial Farming Gallery Row */}
      <section className="w-full bg-[#F2F7F1] px-4 pb-[80px] md:px-8 md:pb-[100px] lg:px-[100px]">
        <div className="mx-auto max-w-[1240px]">
          <div
            ref={bottomImagesContainerRef}
            className="flex w-full snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-10 pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-x-visible md:px-0 md:pb-0"
          >
            {maliksFarmData.split2.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative h-[290px] w-[280px] shrink-0 snap-center overflow-hidden rounded-[24px] bg-neutral-200 md:h-[377px] md:w-full md:shrink"
              >
                <Image
                  src={imgUrl}
                  alt={`Agricultural field view ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 397px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Training Centre, Facilities & Visitor Testimonial Scans */}
      <BrandTraining />
    </div>
  );
}
