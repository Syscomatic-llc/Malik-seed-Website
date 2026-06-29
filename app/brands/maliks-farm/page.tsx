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
        container.scrollLeft = elementLeft - (containerWidth - elementWidth) / 2;
      }
    }
  }, []);

  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      {/* 1. Brand Hero (Untouched) */}
      <BrandHero {...maliksFarmData.hero} />

      {/* 2. Brand Intro (Untouched) */}
      <BrandIntro {...maliksFarmData.intro} />

      {/* 3. Custom Brand Split 1 (The Farm) */}
      <section className="w-full py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px] bg-[#F2F7F1]">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 lg:gap-[64px]">
          {/* Left: Text */}
          <div className="max-w-[863px] flex shrink-0 flex-col items-center justify-center gap-6">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.split1.badge}
            </SectionBadge>
            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-center lg:text-left text-[#0D1A14]">
                {maliksFarmData.split1.title}
              </h2>
            </div>
            <div className="font-sans text-[16px] leading-[24px] flex flex-col gap-4 text-center lg:text-left text-[#0D1A14]/70">
              <p className="text-center">
                {maliksFarmData.split1.description}
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full aspect-[16/9] relative overflow-hidden rounded-[20px] lg:rounded-[24px] bg-neutral-200">
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
      <section className="w-full bg-[#F2F7F1] py-[80px] md:py-[100px] px-4 md:px-8 lg:px-[100px]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[900px] mx-auto w-full">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.process.badge}
            </SectionBadge>
            <div className="flex flex-col gap-4">
              <h2 className="font-sans max-w-[862px] text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14]">
                {maliksFarmData.process.title}
              </h2>
              <p className="font-sans max-w-[770px] text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/65 mx-auto">
                {maliksFarmData.process.description}
              </p>
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="max-w-[728px] mx-auto w-full flex flex-col gap-8 items-start">
            {maliksFarmData.process.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 items-start w-full"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] font-sans font-medium text-[18px] leading-[22px] bg-[#0F3221] text-[#F2F7F1]">
                  {step.number}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-[20px] md:text-[24px] font-medium leading-[29px] text-[#0D1A14]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/65">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* R&D Images Row */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory w-full">
            <div className="group relative w-[280px] h-[290px] md:w-[608px] md:h-[377px] shrink-0 overflow-hidden rounded-[24px] bg-neutral-200 snap-center">
              <Image
                src={maliksFarmData.process.images[0]}
                alt="Structured field trials variety check"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 608px"
              />
            </div>
            <div className="group relative w-[280px] h-[290px] md:w-[608px] md:h-[377px] shrink-0 overflow-hidden rounded-[24px] bg-neutral-200 snap-center">
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
      <section className="w-full bg-[#F2F7F1] pt-[80px] md:pt-[100px] pb-6 px-4 md:px-8 lg:px-[100px]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[900px] mx-auto w-full">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {maliksFarmData.split2.badge}
            </SectionBadge>
            <div className="flex flex-col gap-3">
              <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14]">
                {maliksFarmData.split2.title}
              </h2>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
            {/* GAP card details */}
            <div className="lg:col-span-2 bg-white rounded-[24px] border border-[#E4E7EC] p-4 md:p-6 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
                    <Image
                      src={maliksFarmData.split2.gapLogo}
                      alt="Global GAP badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-sans text-[24px] font-medium leading-[36px] text-[#0D1A14]">
                    What is GAP?
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/65">
                {maliksFarmData.split2.description.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Small image card 1 */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[320px] group bg-neutral-200">
              <Image
                src={maliksFarmData.split2.images[0]}
                alt="GAP Certified field crop"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 292px"
              />
            </div>

            {/* Small image card 2 */}
            <div className="relative rounded-[24px] overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[320px] group bg-neutral-200">
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
      <section className="w-full bg-[#F2F7F1] pb-[80px] md:pb-[100px] px-4 md:px-8 lg:px-[100px]">
        <div className="max-w-[1240px] mx-auto">
          <div ref={bottomImagesContainerRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible px-10 md:px-0 pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory w-full">
            {maliksFarmData.split2.gallery.map((imgUrl, idx) => (
              <div key={idx} className="group relative w-[280px] h-[290px] md:w-full md:h-[377px] shrink-0 md:shrink overflow-hidden rounded-[24px] bg-neutral-200 snap-center">
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
