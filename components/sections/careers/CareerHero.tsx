"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
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

const TypewriterText = memo(function TypewriterText({ words }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words]);

  useEffect(() => {
    if (words.length === 0) return;
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);

  return (
    <span className="relative inline-block text-brand-light-green min-h-[46px] md:min-h-[58px] lg:min-h-[62px] xl:min-h-[77px] pr-[4px]">
      {text}
      <span className="inline-block ml-1 w-[3px] h-[0.8em] bg-brand-light-green align-middle animate-cursor-blink" />
    </span>
  );
});

export default memo(function CareerHero({ data }: { data: typeof careerHeroData }) {
  return (
    <section
      id="career-hero"
      aria-label="Career Hero - Come build the future of agriculture with us"
      className="relative w-full overflow-hidden bg-brand-dark"
    >
      {/* Inner wrapper: max-w-[1240px] centered, 100px horizontal gutters at xl */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 xl:px-[100px]">
        <div className="flex w-full flex-col items-center lg:items-end justify-between gap-10 pt-[120px] pb-16 lg:flex-row lg:gap-8 lg:pt-[180px] lg:pb-[100px]">

          {/* ── Left column ── */}
          <div
            className="flex w-full flex-col items-center lg:items-start gap-8 lg:flex-1 lg:gap-12 max-w-[358px] md:max-w-[540px] lg:max-w-none lg:w-auto"
          >
            {/* Breadcrumb — Home / Hiring */}
            <Breadcrumb className="text-[#F2F7F1] hidden md:block">
              <BreadcrumbList className="gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    render={<Link href="/" />}
                    className="font-inter-tight text-[16px] leading-[24px] text-white/70 hover:text-white transition-colors"
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
            <h1
              className="font-inter-tight text-[38px] md:text-[48px] lg:text-[52px] xl:text-[64px] font-medium leading-[46px] md:leading-[58px] lg:leading-[62px] xl:leading-[77px] tracking-tight text-white/70 text-center lg:text-left"
            >
              {data.titleLine1}
              <br />
              <TypewriterText words={data.titleLine2 || []} />
              <br />
              {data.titleLine3}
            </h1>

            {/* CTA row — CSS Grid layout on mobile (resolves to exactly 175px button width), flex-row on desktop */}
            <div className=" flex flex-row items-stretch lg:items-center gap-2 lg:gap-4 justify-center lg:justify-start w-full lg:w-auto max-w-[358px] lg:max-w-none">
              <ActionButton
                href={data.ctaPrimary.href}
                label={data.ctaPrimary.label}
                variant="dark"
                iconSize={16}
                containerClassName="w-full lg:w-auto"
                className="w-full lg:w-auto py-[13px] px-[13px] lg:py-[16px] lg:px-6 leading-[120%] gap-[6px] lg:gap-[10px] justify-center text-[14px] lg:text-[16px]"
              />
              <ActionButton
                href={data.ctaSecondary.href}
                label={data.ctaSecondary.label}
                variant="secondary"
                iconSize={16}
                containerClassName="w-full lg:w-auto"
                className="w-full lg:w-auto py-[13px] px-[13px] lg:py-[16px] lg:px-6 leading-[120%] gap-[6px] lg:gap-[10px] justify-center text-[14px] lg:text-[16px] !bg-[rgba(255,255,255,0.06)] !border !border-[rgba(255,255,255,0.1)] !text-[#F2F7F1] hover:!bg-[rgba(255,255,255,0.12)]"
              />
            </div>
          </div>

          {/* ── Right column: team photo card ── */}
          {/* Figma: 503×520 (Desktop) / 358x260 (Mobile), bg white, radius 24/20 */}
          <div
            className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] bg-white w-full max-w-[358px] md:max-w-[540px] lg:max-w-none lg:w-[400px] xl:w-[503px] h-[260px] md:h-[360px] lg:h-[420px] xl:h-[520px] flex-shrink-0"
          >
            {/* Mobile view image */}
            <div className="relative w-full h-full lg:hidden">
              <Image
                src={data.teamImage}
                alt="Malik Seeds team"
                fill
                sizes="(max-width: 768px) 358px, 540px"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Desktop view image */}
            <div className="relative w-full h-full hidden lg:block">
              <Image
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
