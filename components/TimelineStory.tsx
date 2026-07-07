"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { TimelineItem } from "@/data/sections-data";
import { SectionBadge } from "./ui/SectionBadge";

/* ────────────────── sub‑components ────────────────── */

/**
 * Vertical spine per timeline item: dot + dotted line below it.
 * Fixed 72px wide container — the dot sits at left:27px, line at left:35.5px.
 * Heights match original Figma: 456 normal, 518 for last item.
 */

function TimelineLine() {
  return (
    <svg
      width="1"
      height="438"
      viewBox="0 0 1 438"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="437.5"
        stroke="var(--brand-bg)"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function TimelineLineLast() {
  return (
    <svg
      width="1"
      height="500"
      viewBox="0 0 1 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="499.5"
        stroke="url(#timelineGradient)"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      <defs>
        <linearGradient
          id="timelineGradient"
          x1="-0.5"
          y1="0"
          x2="-0.5"
          y2="436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnimatedSpineLine({
  isLast = false,
  isFirst = false,
  height,
  overallProgress,
  index,
  totalItems,
}: {
  isLast?: boolean;
  isFirst?: boolean;
  height: number;
  overallProgress: any;
  index: number;
  totalItems: number;
}) {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;
  const heightVal = useTransform(overallProgress, [start, end], ["0%", "100%"]);

  const lineTop = isFirst ? 18 : 0;
  const lineHeight = height - lineTop;

  return (
    <div
      className="absolute left-[35.5px] w-[1px] overflow-hidden"
      style={{
        top: lineTop,
        height: lineHeight,
      }}
    >
      {/* Faint background line placeholder */}
      <div className="absolute inset-0 opacity-30">
        {!isFirst && (
          <div className="absolute top-0 left-0 h-[18px] w-[1px]">
            <svg className="h-full w-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="var(--brand-bg)" strokeLinecap="round" strokeDasharray="3 3" />
            </svg>
          </div>
        )}
        <div style={{ position: "absolute", top: isFirst ? 0 : 18 }}>
          {isLast ? <TimelineLineLast /> : <TimelineLine />}
        </div>
      </div>

      {/* Animated line reveal */}
      <motion.div
        style={{ height: heightVal }}
        className="absolute top-0 left-0 w-full overflow-hidden origin-top"
      >
        <div style={{ height: lineHeight, width: 1, overflow: "hidden", position: "relative" }}>
          {!isFirst && (
            <div className="absolute top-0 left-0 h-[18px] w-[1px]">
              <svg className="h-full w-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="var(--brand-bg)" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>
            </div>
          )}
          <div style={{ position: "absolute", top: isFirst ? 0 : 18 }}>
            {isLast ? <TimelineLineLast /> : <TimelineLine />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineSpine({
  isLast = false,
  isFirst = false,
  overallProgress,
  index,
  totalItems,
}: {
  isLast?: boolean;
  isFirst?: boolean;
  overallProgress: any;
  index: number;
  totalItems: number;
}) {
  const height = isLast ? 518 : 456;
  return (
    <div className="relative shrink-0" style={{ width: 72, height }}>
      {/* Dot */}
      {isFirst && (
        <Image
          src="/images/timeline/Ellipse.svg"
          alt="Dot"
          width={18}
          height={18}
          className="absolute top-0 left-[27px]"
        />
      )}
      {/* Dotted line — starts just below the dot */}
      <AnimatedSpineLine
        isLast={isLast}
        isFirst={isFirst}
        height={height}
        overallProgress={overallProgress}
        index={index}
        totalItems={totalItems}
      />
    </div>
  );
}

/** Year label centered above the spine column */
function YearLabel({ year }: { year: string }) {
  return (
    <div className="flex w-full justify-center">
      <span
        className="font-anton text-brand-light-green text-center text-5xl leading-[58px] whitespace-nowrap"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        {year}
      </span>
    </div>
  );
}

/** Image panel — 503 × 372, rounded‑[32px], overflow hidden */
function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[503/372] w-full max-w-[503px] shrink-0 overflow-hidden rounded-[32px] bg-[#E4E7EC]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 45vw, 503px"
      />
    </div>
  );
}

/** Content card — title + description, with glow overlay */
function ContentCard({
  title,
  description,
  glow,
  cardTop,
  cardHeight,
}: {
  title: string;
  description: string;
  glow: string;
  cardTop?: string;
  cardHeight?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[474px] rounded-[24px] ${cardTop ?? "top-[-44px]"} ${cardHeight ?? "h-[462px]"}`}
    >
      {/* Glow overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
        <Image
          src={glow}
          alt=""
          width={252}
          height={186}
          style={{ width: "252px", height: "186px" }}
          className="absolute top-0 right-0 opacity-70 mix-blend-screen"
          aria-hidden="true"
        />
      </div>

      {/* Text content — vertically centered inside the card */}
      <div className="absolute top-1/2 left-[32px] flex max-w-[410px] -translate-y-1/2 flex-col gap-4">
        <h3
          className="font-anton text-brand-bg text-[44px] leading-[53px] whitespace-pre-line"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {title}
        </h3>
        <p
          className="text-brand-bg text-xl leading-[30px] whitespace-pre-line"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ────────────────── Desktop row layouts ────────────────── */

/**
 * Each row uses CSS Grid: [1fr] [72px spine] [1fr]
 * This guarantees the spine column is always at the exact same
 * horizontal centre regardless of how wide the card or image is.
 *
 * "left"  → card on left, spine in centre, image on right
 * "right" → image on left, spine in centre, card on right
 */
function TimelineRow({
  item,
  isLast,
  isFirst = false,
  overallProgress,
  index,
  totalItems,
}: {
  item: TimelineItem;
  isLast: boolean;
  isFirst?: boolean;
  overallProgress: any;
  index: number;
  totalItems: number;
}) {
  const spine = (
    <TimelineSpine
      isLast={isLast}
      isFirst={isFirst}
      overallProgress={overallProgress}
      index={index}
      totalItems={totalItems}
    />
  );

  if (item.side === "left") {
    return (
      <div className="grid w-full grid-cols-[1fr_72px_1fr] items-start">
        {/* Left: card */}
        <div className="flex justify-start">
          <ContentCard
            title={item.title}
            description={item.description}
            glow={item.glow}
            cardTop={item.cardTop}
            cardHeight={item.cardHeight}
          />
        </div>
        {/* Centre: spine */}
        {spine}
        {/* Right: image */}
        <div className="flex justify-end">
          <ImagePanel src={item.image} alt={item.title} />
        </div>
      </div>
    );
  }

  // side === "right"
  return (
    <div className="grid w-full grid-cols-[1fr_72px_1fr] items-start">
      {/* Left: image */}
      <div className="flex justify-start pl-[15px]">
        <ImagePanel src={item.image} alt={item.title} />
      </div>
      {/* Centre: spine */}
      {spine}
      {/* Right: card */}
      <div className="flex justify-end pr-[15px]">
        <ContentCard
          title={item.title}
          description={item.description}
          glow={item.glow}
          cardTop={item.cardTop}
          cardHeight={item.cardHeight}
        />
      </div>
    </div>
  );
}

/* ────────────────── Tablet row layout (md → lg) ────────────────── */

function AnimatedTabletSpineLine({
  isLast = false,
  isFirst = false,
  overallProgress,
  index,
  totalItems,
}: {
  isLast?: boolean;
  isFirst?: boolean;
  overallProgress: any;
  index: number;
  totalItems: number;
}) {
  const start = index / totalItems;
  const end = (index + 1) / totalItems;
  const heightVal = useTransform(overallProgress, [start, end], ["0%", "100%"]);

  const top = isFirst ? "14px" : "0px";
  const bottom = isLast ? "auto" : "64px"; // bottom-16 is 64px
  const height = isLast ? "200px" : "auto";

  return (
    <div
      className="absolute left-[19px] w-[1px] overflow-hidden"
      style={{
        top,
        bottom: isLast ? "auto" : bottom,
        height: isLast ? height : "auto",
      }}
    >
      {/* Faint background line */}
      <div className="absolute inset-0 opacity-30 h-[1000px] w-full">
        <svg className="h-full w-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="var(--brand-bg)"
            strokeLinecap="round"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Animated line */}
      <motion.div
        style={{ height: heightVal }}
        className="absolute top-0 left-0 w-full overflow-hidden origin-top"
      >
        <div className="w-full h-[1000px]">
          <svg className="h-full w-[1px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="var(--brand-bg)"
              strokeLinecap="round"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedMobileLine({
  idx,
  totalItems,
  overallProgress,
  isLast,
}: {
  idx: number;
  totalItems: number;
  overallProgress: any;
  isLast: boolean;
}) {
  const start = idx / totalItems;
  const end = (idx + 1) / totalItems;
  const widthVal = useTransform(overallProgress, [start, end], ["0%", "100%"]);

  const width = isLast ? "200px" : "405px";

  return (
    <div
      className="absolute left-[50%] z-0 h-[1px] overflow-hidden"
      style={{ width }}
    >
      {/* Faint background line */}
      <div className="absolute inset-0 border-t border-dashed border-brand-bg opacity-30" />

      {/* Animated line */}
      <motion.div
        style={{ width: widthVal }}
        className="absolute top-0 left-0 h-full overflow-hidden origin-left"
      >
        <div
          className="border-t border-dashed border-brand-bg h-full"
          style={{ width }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Single-column layout with a left-aligned spine.
 * Each item: year + dot, then image, then text card — all stacked.
 */
function TabletTimelineRow({
  item,
  isLast,
  isFirst = false,
  overallProgress,
  index,
  totalItems,
}: {
  item: TimelineItem;
  isLast: boolean;
  isFirst?: boolean;
  overallProgress: any;
  index: number;
  totalItems: number;
}) {
  return (
    <div className="grid w-full grid-cols-[40px_1fr] items-stretch">
      {/* Left: spine */}
      <div className="relative w-10 shrink-0">
        {isFirst && (
          <Image
            src="/images/timeline/Ellipse.svg"
            alt="Dot"
            width={14}
            height={14}
            className="absolute top-0 left-[13px] z-10"
          />
        )}
        <AnimatedTabletSpineLine
          isLast={isLast}
          isFirst={isFirst}
          overallProgress={overallProgress}
          index={index}
          totalItems={totalItems}
        />
      </div>
      {/* Right: content */}
      <div className="flex flex-col gap-5 pb-16">
        {/* Year */}
        <span
          className="font-anton text-brand-light-green text-3xl leading-tight whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {item.year}
        </span>
        {/* Image */}
        <div className="relative aspect-[503/372] w-full overflow-hidden rounded-[24px] bg-[#E4E7EC]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 55vw, 503px"
          />
        </div>
        {/* Text card */}
        <div className="relative overflow-hidden rounded-[24px]">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={item.glow}
              alt=""
              width={200}
              height={148}
              style={{ width: "200px", height: "148px" }}
              className="absolute top-0 right-0 opacity-70 mix-blend-screen"
              aria-hidden="true"
            />
          </div>
          <div className="relative flex flex-col gap-3 p-6">
            <h3
              className="font-anton text-brand-bg text-[32px] leading-tight whitespace-pre-line"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {item.title}
            </h3>
            <p
              className="text-brand-bg text-lg leading-[28px] whitespace-pre-line"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── main section ────────────────── */

export default function TimelineStory({
  items = [],
}: {
  items?: TimelineItem[];
}) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: desktopScroll } = useScroll({
    target: desktopRef,
    offset: ["start 80%", "end 20%"],
  });
  const desktopScrollSpring = useSpring(desktopScroll, {
    stiffness: 30,
    damping: 15,
  });

  const tabletRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tabletScroll } = useScroll({
    target: tabletRef,
    offset: ["start 80%", "end 20%"],
  });
  const tabletScrollSpring = useSpring(tabletScroll, {
    stiffness: 30,
    damping: 15,
  });

  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress: mobileScroll } = useScroll({
    container: mobileRef,
  });
  const mobileScrollSpring = useSpring(mobileScroll, {
    stiffness: 30,
    damping: 15,
  });

  return (
    <section className="bg-brand-dark w-full overflow-hidden" id="timeline">
      {/* ===== Desktop View (lg+) — two-column alternating with per-item spine ===== */}
      <div ref={desktopRef} className="hidden flex-col justify-end bg-white lg:flex">
        <div className="bg-brand-dark self-stretch px-[99px] pt-[100px]">
          <div className="mx-auto flex max-w-[1242px] flex-col items-center self-stretch">
            {/* ── Header ── */}
            <div className="mb-[63px] ml-[1px] flex flex-col items-start gap-8 self-start">
              <SectionBadge variant="dark" showDot>
                Timeline
              </SectionBadge>
              <span
                className="text-brand-bg text-5xl leading-[58px] font-medium"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                From Humble Beginnings
              </span>
            </div>

            {/* ── Timeline items ── */}
            <div className="flex flex-col items-center gap-6 self-stretch">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <div
                    key={item.year}
                    className="flex flex-col items-center self-stretch"
                  >
                    {/* Year label — centred above the spine column via grid */}
                    <div className="mb-6 grid w-full grid-cols-[1fr_72px_1fr]">
                      <div />
                      <YearLabel year={item.year} />
                      <div />
                    </div>
                    {/* Content row with spine */}
                    <TimelineRow
                      item={item}
                      isLast={isLast}
                      isFirst={idx === 0}
                      overallProgress={desktopScrollSpring}
                      index={idx}
                      totalItems={items.length}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tablet View (md → lg) — single-column with left spine ===== */}
      <div ref={tabletRef} className="hidden flex-col bg-white md:flex lg:hidden">
        <div className="bg-brand-dark self-stretch px-6 pt-[80px] sm:px-10">
          <div className="mx-auto flex max-w-[700px] flex-col items-start">
            {/* ── Header ── */}
            <div className="mb-12 flex flex-col items-start gap-6">
              <SectionBadge variant="dark" showDot>
                Timeline
              </SectionBadge>
              <h2
                className="text-brand-bg text-4xl leading-[44px] font-medium"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                From Humble Beginnings
              </h2>
            </div>

            {/* ── Timeline items ── */}
            <div className="flex flex-col self-stretch">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <TabletTimelineRow
                    key={item.year}
                    item={item}
                    isLast={isLast}
                    isFirst={idx === 0}
                    overallProgress={tabletScrollSpring}
                    index={idx}
                    totalItems={items.length}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile View (<md) — horizontal scroll ===== */}
      <div className="block w-full pt-[54px] pb-[74px] md:hidden">
        <div className="flex flex-col items-center gap-[48px] px-4">
          {/* Header */}
          <div className="flex max-w-[358px] flex-col items-center gap-6 text-center">
            <SectionBadge variant="dark" showDot>
              Timeline
            </SectionBadge>
            <h2
              className="text-brand-bg text-[32px] leading-[38px] font-medium"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              From Humble Beginnings
            </h2>
          </div>

          {/* Horizontal Scroll Track */}
          <div ref={mobileRef} className="flex w-full snap-x snap-mandatory scrollbar-none flex-row gap-[95px] overflow-x-auto px-6 pb-8">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;

              const imageEl = (
                <div className="relative h-[240px] w-[310px] shrink-0 overflow-hidden rounded-[24px] bg-[#F2F4F7]">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="310px"
                    />
                  )}
                </div>
              );

              const textEl = (
                <div className="relative flex h-[240px] w-[310px] flex-col items-center justify-center overflow-hidden text-center">
                  {/* Glow overlay */}
                  <Image
                    src={item.glow}
                    alt=""
                    width={140}
                    height={100}
                    style={{ width: "140px", height: "100px" }}
                    className={`pointer-events-none absolute z-0 opacity-70 mix-blend-screen ${
                      isEven ? "bottom-0 left-0" : "top-0 right-0"
                    }`}
                    aria-hidden="true"
                  />
                  <h3
                    className="font-anton text-brand-bg relative z-10 mb-4 text-[32px] leading-[38px] whitespace-pre-line"
                    style={{ fontFamily: "var(--font-anton)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-brand-bg/95 relative z-10 text-base leading-[24px] whitespace-pre-line"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.description}
                  </p>
                </div>
              );

              return (
                <div
                  key={item.year}
                  className="flex w-[310px] shrink-0 snap-center flex-col items-center"
                >
                  {isEven ? imageEl : textEl}

                  {/* Year & Connecting Line (Middle) */}
                  <div className="relative mt-[54px] mb-[70px] flex h-[48px] w-full items-center justify-center">
                    <AnimatedMobileLine
                      idx={idx}
                      totalItems={items.length}
                      overallProgress={mobileScrollSpring}
                      isLast={idx === items.length - 1}
                    />
                    {/* Year & Dot centered, Year masks the line while Dot sits on it */}
                    <div className="relative z-10 flex items-center select-none">
                      <span
                        className="font-anton text-brand-light-green bg-brand-dark px-[2rem] text-[40px] leading-[48px]"
                        style={{ fontFamily: "var(--font-anton)" }}
                      >
                        {item.year}
                      </span>
                      {idx === 0 && (
                        <Image
                          src="/images/timeline/Ellipse.svg"
                          alt="Dot"
                          width={16}
                          height={16}
                          className="bg-brand-dark relative z-10 shrink-0 rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  {isEven ? textEl : imageEl}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
