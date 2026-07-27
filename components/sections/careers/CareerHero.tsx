"use client";

import { memo, useState, useEffect } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/SectionBadge";
import ActionButton from "@/components/ActionButton";
import type { careerHeroData } from "@/data/career-data";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface TypewriterTextProps {
  words: string[];
}

const TypewriterText = memo(function TypewriterText({
  words,
}: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 25 : 50
    );

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words]);

  useEffect(() => {
    if (words.length === 0) return;
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);

  return (
    <span className="text-brand-light-green relative inline-block min-h-[36px] pr-[4px] md:min-h-[58px] lg:min-h-[62px] xl:min-h-[77px]">
      {text}
      <span className="bg-brand-light-green animate-cursor-blink ml-1 inline-block h-[0.8em] w-[3px] align-middle" />
    </span>
  );
});

export default memo(function CareerHero({
  data,
}: {
  data: typeof careerHeroData;
}) {
  return (
    <section
      id="career-hero"
      aria-label="Career Hero - Come build the future of agriculture with us"
      className="bg-brand-dark relative w-full overflow-hidden"
    >
      {/* Inner wrapper: max-w-[1240px] centered, 100px horizontal gutters at xl */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 xl:px-[100px]">
        <div className="flex w-full flex-col items-center justify-between gap-10 pt-[120px] pb-16 lg:flex-row lg:items-end lg:gap-8 lg:pt-[180px] lg:pb-[100px]">
          {/* ── Left column ── */}
          <div className="flex w-full max-w-[358px] flex-col items-center gap-8 md:max-w-[540px] lg:w-auto lg:max-w-none lg:flex-1 lg:items-start lg:gap-12">
            {/* Breadcrumb — Home / Hiring */}
            <Breadcrumb className="hidden text-[#F2F7F1] md:block">
              <BreadcrumbList className="gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href="/" />}
                    className="font-inter-tight text-[16px] leading-[24px] text-white/70 transition-colors hover:text-white"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/40" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-inter-tight text-[16px] leading-[24px] text-[#F2F7F1]">
                    Hiring
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Badge pill ── */}
            <SectionBadge variant="dark" showDot dotSize="8px">
              {data.badge}
            </SectionBadge>

            {/* 3-line headline — responsively scaling font-size */}
            <h1 className="font-inter-tight text-center text-[28px] leading-[36px] font-medium tracking-tight text-white/70 md:text-[48px] md:leading-[58px] lg:text-left lg:text-[52px] lg:leading-[62px] xl:text-[64px] xl:leading-[77px]">
              {data.titleLine1}
              <br />
              <TypewriterText words={data.titleLine2 || []} />
              <br />
              {data.titleLine3}
            </h1>

            {/* CTA row — CSS Grid layout on mobile (resolves to exactly 175px button width), flex-row on desktop */}
            <div className="flex w-full max-w-[358px] flex-row items-stretch justify-center gap-2 lg:w-auto lg:max-w-none lg:items-center lg:justify-start lg:gap-4">
              <ActionButton
                href={data.ctaPrimary.href}
                label={data.ctaPrimary.label}
                variant="dark"
                iconSize={16}
                containerClassName="w-full lg:w-auto"
                className="w-full justify-center gap-[6px] px-[13px] py-[13px] text-[14px] leading-[120%] lg:w-auto lg:gap-[10px] lg:px-6 lg:py-[16px] lg:text-[16px]"
              />
              <ActionButton
                href={data.ctaSecondary.href}
                label={data.ctaSecondary.label}
                variant="secondary"
                iconSize={16}
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="w-full lg:w-auto"
                className="w-full justify-center gap-[6px] !border !border-[rgba(255,255,255,0.1)] !bg-[rgba(255,255,255,0.06)] px-[13px] py-[13px] text-[14px] leading-[120%] !text-[#F2F7F1] hover:!bg-[rgba(255,255,255,0.12)] lg:w-auto lg:gap-[10px] lg:px-6 lg:py-[16px] lg:text-[16px]"
              />
            </div>
          </div>

          {/* ── Right column: team photo card ── */}
          {/* Figma: 503×520 (Desktop) / 358x260 (Mobile), bg white, radius 24/20 */}
          <div className="relative h-[260px] w-full max-w-[358px] flex-shrink-0 overflow-hidden rounded-[20px] bg-white md:h-[360px] md:max-w-[540px] lg:h-[420px] lg:w-[400px] lg:max-w-none lg:rounded-[24px] xl:h-[520px] xl:w-[503px]">
            {/* Mobile view image */}
            <div className="relative h-full w-full lg:hidden">
              <OptimizedImage
                src={data.teamImage}
                alt="Malik Seeds team"
                fill
                sizes="(max-width: 768px) 358px, 540px"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Desktop view image */}
            <div className="relative hidden h-full w-full lg:block">
              <OptimizedImage
                src={data.teamImage}
                alt="Malik Seeds team"
                fill
                sizes="(max-width: 1280px) 400px, 503px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
