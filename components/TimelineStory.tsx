"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { TimelineItem } from "@/data/sections-data";
import { SectionBadge } from "./ui/SectionBadge";

/* ────────────────── sub‑components ────────────────── */

const YEAR_GAP = 130; // space reserved at the top of each spine for the year label
const LINE_TOP = 82; // year block (58px) + 24px gap before the line starts
const TAIL_GAP = 24; // gap left between the line's end and the next year

/* Original dashed-line artwork, restored as-is. */
function TimelineLine() {
  return (
    <svg
      width="1"
      height="100%"
      viewBox="0 0 1 438"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="437.5"
        stroke="var(--brand-bg)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

function TimelineLineLast() {
  return (
    <svg
      width="1"
      height="100%"
      viewBox="0 0 1 500"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="499.5"
        stroke="url(#timelineGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
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

/**
 * Pixel height of each desktop row, matching TimelineSpine's own sizing.
 */
function getRowHeights(items: TimelineItem[]) {
  return items.map((_, idx) => (idx === items.length - 1 ? 518 : 456) + YEAR_GAP);
}

/**
 * For every row, the [start, end] fraction (0–1) of the *entire* desktop
 * timeline's height that its dashed line actually occupies — i.e. only the
 * pixels between LINE_TOP (below the year, with its 24px gap) and TAIL_GAP
 * before the next year. This is what preserves the 24px clearance on both
 * sides of every year label while still slicing one shared scroll value.
 */
function getRowLineRanges(items: TimelineItem[]): [number, number][] {
  const heights = getRowHeights(items);
  const total = heights.reduce((sum, h) => sum + h, 0);

  let rowTop = 0;
  return heights.map((h, idx) => {
    const isLast = idx === items.length - 1;
    const lineHeightPx = isLast ? h - LINE_TOP : h - LINE_TOP - TAIL_GAP;
    const start = (rowTop + LINE_TOP) / total;
    const end = (rowTop + LINE_TOP + lineHeightPx) / total;
    rowTop += h;
    return [start, end];
  });
}

/**
 * One scroll + one spring for the entire desktop timeline. Every row's
 * dashed-line reveal AND the single traveling dot are both derived from
 * this one MotionValue (just sliced to different ranges), so they're
 * mathematically locked to the same scroll speed — there's no separate
 * per-row scroll trigger left to drift out of sync.
 */
function useGlobalSpineProgress(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"],
  });

  return useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
  });
}

/** Dashed spine segment for one row, its reveal sliced from the shared progress. */
function SegmentSpineLine({
  isLast = false,
  height,
  smoothProgress,
  range,
}: {
  isLast?: boolean;
  height: number;
  smoothProgress: import("motion/react").MotionValue<number>;
  range: [number, number];
}) {
  const heightVal = useTransform(smoothProgress, range, ["0%", "100%"], {
    clamp: true,
  });

  const lineHeight = isLast ? height - LINE_TOP : height - LINE_TOP - TAIL_GAP;

  return (
    <div
      className="absolute left-[35.5px] w-[1px]"
      style={{ top: LINE_TOP, height: lineHeight }}
    >
      {/* Faint background dashes, continuous for the whole segment */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        {isLast ? <TimelineLineLast /> : <TimelineLine />}
      </div>

      {/* Animated dashed reveal */}
      <motion.div
        style={{ height: heightVal }}
        className="absolute top-0 left-0 w-full overflow-hidden origin-top"
      >
        <div style={{ height: lineHeight, width: 1, overflow: "hidden" }}>
          {isLast ? <TimelineLineLast /> : <TimelineLine />}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Single dot traveling the full desktop spine, positioned as a plain
 * percentage of the shared progress over the whole container. Because
 * every segment's line range above was derived from the exact same
 * cumulative pixel math, the dot's physical position always lines up with
 * whichever segment's line-tip it's currently passing — same speed, same
 * pixel, by construction. It sits below each year's z-30 backdrop, so it
 * simply ducks out of view behind each year and re-emerges after it.
 */
function GlobalTimelineDot({
  smoothProgress,
  rowRanges,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
  rowRanges: [number, number][];
}) {
  const startRange = rowRanges.length > 0 ? rowRanges[0][0] : 0;
  const lastRange = rowRanges.length > 0 ? rowRanges[rowRanges.length - 1] : [0, 1];
  const lastStart = lastRange[0];
  const lastEnd = lastRange[1];

  // The last line is rendered as a gradient in the last segment, fading out from y=0 to y=436 (out of 500)
  // which is 87.2% of the last segment's line height.
  const fadeOutPoint = lastStart + 0.872 * (lastEnd - lastStart);

  // Position of the dot starts at startRange and ends at lastEnd
  const dotTop = useTransform(
    smoothProgress,
    [0, startRange, lastEnd],
    [`${startRange * 100}%`, `${startRange * 100}%`, `${lastEnd * 100}%`]
  );

  // Construct strictly increasing keyframes for the opacity mapping
  const inputRange = [0];
  const outputRange = [1];

  if (lastStart > 0) {
    inputRange.push(lastStart);
    outputRange.push(1);
  }

  if (fadeOutPoint > (inputRange[inputRange.length - 1] ?? 0)) {
    inputRange.push(fadeOutPoint);
    outputRange.push(0);
  }

  if (1 > (inputRange[inputRange.length - 1] ?? 0)) {
    inputRange.push(1);
    outputRange.push(0);
  }

  const dotOpacity = useTransform(smoothProgress, inputRange, outputRange);

  return (
    <motion.div
      style={{ top: dotTop, opacity: dotOpacity }}
      className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[18px] h-[18px]"
    >
      <Image src="/images/timeline/Ellipse.svg" alt="Dot" width={18} height={18} />
    </motion.div>
  );
}

function TimelineSpine({
  year,
  isLast = false,
  smoothProgress,
  range,
}: {
  year: string;
  isLast?: boolean;
  smoothProgress: import("motion/react").MotionValue<number>;
  range: [number, number];
}) {
  const height = (isLast ? 518 : 456) + YEAR_GAP;
  return (
    <div className="relative shrink-0" style={{ width: 72, height }}>
      <SegmentSpineLine
        isLast={isLast}
        height={height}
        smoothProgress={smoothProgress}
        range={range}
      />

      {/* Year label overlay — sits directly on top of the line. The
          bg-brand-dark backdrop masks the dashes right behind the digits,
          so from a distance the line reads as unbroken and the year looks
          like it's resting on it (same trick as the mobile scroller). */}
      <div
        className="absolute left-1/2 z-30 -translate-x-1/2 bg-brand-dark px-2"
        style={{ top: 0 }}
      >
        <span
          className="font-anton text-brand-light-green block text-center text-5xl leading-[58px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {year}
        </span>
      </div>
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
 *
 * The year label now lives inside the spine column itself (see
 * TimelineSpine above) so it renders on top of one continuous line
 * instead of in its own separate row with a gap.
 */
function TimelineRow({
  item,
  isLast,
  smoothProgress,
  range,
}: {
  item: TimelineItem;
  isLast: boolean;
  smoothProgress: import("motion/react").MotionValue<number>;
  range: [number, number];
}) {
  const spine = (
    <TimelineSpine
      year={item.year}
      isLast={isLast}
      smoothProgress={smoothProgress}
      range={range}
    />
  );

  if (item.side === "left") {
    return (
      <div className="grid w-full grid-cols-[1fr_72px_1fr] items-start">
        {/* Left: card */}
        <div className="flex justify-start pt-[130px]">
          <ContentCard
            title={item.title}
            description={item.description}
            glow={item.glow}
            cardTop={item.cardTop}
            cardHeight={item.cardHeight}
          />
        </div>
        {/* Centre: spine (line + year) */}
        {spine}
        {/* Right: image */}
        <div className="flex justify-end pt-[130px]">
          <ImagePanel src={item.image} alt={item.title} />
        </div>
      </div>
    );
  }

  // side === "right"
  return (
    <div className="grid w-full grid-cols-[1fr_72px_1fr] items-start">
      {/* Left: image */}
      <div className="flex justify-start pl-[15px] pt-[130px]">
        <ImagePanel src={item.image} alt={item.title} />
      </div>
      {/* Centre: spine (line + year) */}
      {spine}
      {/* Right: card */}
      <div className="flex justify-end pr-[15px] pt-[130px]">
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

function GlobalTabletDot({
  smoothProgress,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
}) {
  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      style={{ top: dotTop }}
      className="absolute mt-2 left-[19px] z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[14px] h-[14px]"
    >
      <Image src="/images/timeline/Ellipse.svg" alt="Dot" width={14} height={14} />
    </motion.div>
  );
}

function GlobalTabletLine({
  smoothProgress,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
}) {
  const heightVal = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="absolute left-0 top-[14px] bottom-[64px] w-10 pointer-events-none"
      style={{
        maskImage: "linear-gradient(to bottom, black calc(100% - 150px), transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 150px), transparent)",
      }}
    >
      {/* Background dashed line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[1px] opacity-20 overflow-hidden">
        <svg className="w-[1px] h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="var(--brand-bg)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Active (animated) dashed line */}
      <motion.div
        style={{ height: heightVal }}
        className="absolute left-[19px] top-0 w-[1px] overflow-hidden origin-top"
      >
        <div className="w-[1px] h-[10000px]">
          <svg className="w-[1px] h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="var(--brand-bg)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </motion.div>

      {/* Global Traveling Dot */}
      <GlobalTabletDot smoothProgress={smoothProgress} />
    </div>
  );
}

/**
 * Single shared scroll progress for the ENTIRE mobile horizontal track —
 * same principle as useGlobalSpineProgress on desktop, just on the x-axis.
 * scrollXProgress here is simply (scrollLeft) / (scrollWidth - clientWidth)
 * since no `target` is given — a clean 0→1 across the whole scroll range.
 */
function useGlobalMobileProgress(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  return useSpring(scrollXProgress, {
    stiffness: 40,
    damping: 15,
  });
}

/**
 * One continuous dashed line + one dot spanning the whole mobile track,
 * from the first item's year-center to the last item's year-center.
 * Because it's driven by a single shared progress value (not one useScroll
 * per item), it can never desync or fragment — same guarantee as desktop.
 *
 * Vertical position (318px) = height of the image/text block above it (240)
 * + its margin-top (54) + half of the year row's own height (24).
 * Horizontal inset (155px each side) = half the item width (310 / 2),
 * i.e. the first/last item's own horizontal center.
 */
function GlobalMobileLine({
  smoothProgress,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
}) {
  const widthVal = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="absolute z-0 h-[1px] pointer-events-none"
      style={{ top: 318, left: 235, right: 155 }}
    >
      {/* Faint background dashes, continuous across the whole track */}
      <div className="absolute inset-0 border-t border-dashed border-brand-bg opacity-20 overflow-hidden" />

      {/* Animated dashed reveal */}
      <motion.div
        style={{ width: widthVal }}
        className="absolute top-0 left-0 h-full overflow-hidden origin-left"
      >
        <div className="border-t border-dashed border-brand-bg h-full w-full" />
      </motion.div>

      {/* Traveling dot — no z-index set (implicitly below the year badge's
          z-30), so it ducks behind each year and re-emerges after it,
          exactly like the desktop and tablet spines. */}
      <motion.div
        style={{ left: widthVal }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px]"
      >
        <Image src="/images/timeline/Ellipse.svg" alt="Dot" width={16} height={16} />
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
}: {
  item: TimelineItem;
  isLast: boolean;
  isFirst?: boolean;
}) {
  return (
    <div className="grid w-full grid-cols-[40px_1fr] items-stretch">
      {/* Left: spine spacing */}
      <div className="relative w-10 shrink-0" />
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

export default function TimelineStory({ items = [] }: { items?: TimelineItem[] }) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopTimelineRef = useRef<HTMLDivElement>(null);
  const tabletTimelineRef = useRef<HTMLDivElement>(null);

  // One shared, spring-smoothed scroll value drives every row's dashed-line
  // reveal (each sliced to its own pixel-accurate range) and the single
  // traveling dot — so all of it moves at identical speed, by construction.
  const smoothProgress = useGlobalSpineProgress(desktopTimelineRef);
  const rowRanges = useMemo(() => getRowLineRanges(items), [items]);

  const tabletSmoothProgress = useGlobalSpineProgress(tabletTimelineRef);
  const mobileSmoothProgress = useGlobalMobileProgress(mobileRef);


  return (
    <section className="bg-brand-dark w-full overflow-hidden" id="timeline">
      {/* ===== Desktop View (lg+) — two-column alternating, single shared spine ===== */}
      <div className="hidden flex-col justify-end bg-white lg:flex">
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

            {/* ── Timeline items — dashed spine, single shared scroll value,
                24px clearance preserved above and below every year ── */}
            <div
              ref={desktopTimelineRef}
              className="relative flex flex-col items-center gap-0 self-stretch"
            >
              <GlobalTimelineDot smoothProgress={smoothProgress} rowRanges={rowRanges} />
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <div key={item.year} className="flex flex-col items-center self-stretch">
                    <TimelineRow
                      item={item}
                      isLast={isLast}
                      smoothProgress={smoothProgress}
                      range={rowRanges[idx]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tablet View (md → lg) — single-column with left spine ===== */}
      <div className="hidden flex-col bg-white md:flex lg:hidden">
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
            <div ref={tabletTimelineRef} className="relative flex flex-col self-stretch">
              <GlobalTabletLine smoothProgress={tabletSmoothProgress} />
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <TabletTimelineRow
                    key={item.year}
                    item={item}
                    isLast={isLast}
                    isFirst={idx === 0}
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
          <div
            ref={mobileRef}
            className="flex w-full snap-x snap-mandatory scrollbar-none flex-row overflow-x-auto px-6 pb-8"
          >
            <div className="relative flex flex-row gap-[95px]">
              <GlobalMobileLine smoothProgress={mobileSmoothProgress} />

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
                    <Image
                      src={item.glow}
                      alt=""
                      width={140}
                      height={100}
                      style={{ width: "140px", height: "100px" }}
                      className={`pointer-events-none absolute z-0 opacity-70 mix-blend-screen ${isEven ? "bottom-0 left-0" : "top-0 right-0"
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
                  <div key={item.year} className="flex max-w-[310px] w-auto shrink-0 snap-center flex-col items-center">
                    {isEven ? imageEl : textEl}

                    <div className="relative mt-[54px] mb-[70px] flex h-[48px] w-full items-center justify-center">
                      {/* Year badge — z-30 masks the line/dot passing directly behind it */}
                      <div className="relative z-30 flex items-center select-none">
                        <span
                          className="font-anton text-center text-brand-light-green bg-brand-dark px-[2rem] text-[40px] leading-[48px]"
                          style={{ fontFamily: "var(--font-anton)" }}
                        >
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {isEven ? textEl : imageEl}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}