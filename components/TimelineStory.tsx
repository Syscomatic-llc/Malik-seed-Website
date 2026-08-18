"use client";

import OptimizedImage from "@/components/ui/OptimizedImage";
import NextImage from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { TimelineItem } from "@/data/sections-data";
import { SectionBadge } from "./ui/SectionBadge";
import { cn, resolveImageUrl } from "@/lib/utils";
import { ApiTimelineItem } from "@/lib/api";

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
  return items.map(
    (_, idx) => (idx === items.length - 1 ? 518 : 456) + YEAR_GAP
  );
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
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {isLast ? <TimelineLineLast /> : <TimelineLine />}
      </div>

      {/* Animated dashed reveal */}
      <motion.div
        style={{ height: heightVal }}
        className="absolute top-0 left-0 w-full origin-top overflow-hidden"
      >
        <div style={{ height: lineHeight, width: 1, overflow: "hidden" }}>
          {isLast ? <TimelineLineLast /> : <TimelineLine />}
        </div>
      </motion.div>
    </div>
  );
}

function GlobalTimelineDot({
  smoothProgress,
  rowRanges,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
  rowRanges: [number, number][];
}) {
  const startRange = rowRanges.length > 0 ? rowRanges[0][0] : 0;
  const lastRange =
    rowRanges.length > 0 ? rowRanges[rowRanges.length - 1] : [0, 1];
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
      className="pointer-events-none absolute left-1/2 z-10 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2"
    >
      <NextImage
        src="/images/timeline/Ellipse.svg"
        alt="Dot"
        width={18}
        height={18}
      />
    </motion.div>
  );
}

function getYearProgressPoints(items: TimelineItem[]) {
  const heights = getRowHeights(items);
  const total = heights.reduce((sum, h) => sum + h, 0);
  let accumulated = 0;
  return heights.map((h) => {
    const point = accumulated / total;
    accumulated += h;
    return point;
  });
}

function useYearHighlight(
  smoothProgress: import("motion/react").MotionValue<number>,
  idx: number,
  points: number[],
  glowThreshold = 0.95
) {
  if (points.length <= 1) return 1;

  const current = points[idx];
  const prev = idx > 0 ? points[idx - 1] : null;
  const next = idx < points.length - 1 ? points[idx + 1] : null;

  const inputRange: number[] = [];
  const outputRange: number[] = [];

  if (prev !== null) {
    inputRange.push(prev);
    outputRange.push(0.3); // muted opacity

    // Keep it dim until glowThreshold of the distance to current
    const startGlowPoint = prev + (current - prev) * glowThreshold;
    inputRange.push(startGlowPoint);
    outputRange.push(0.3);
  }

  inputRange.push(current);
  outputRange.push(1); // active highlighted opacity (glow)

  if (next !== null) {
    // Stay glowing until glowThreshold of the distance to the next year
    const endGlowPoint = current + (next - current) * glowThreshold;
    inputRange.push(endGlowPoint);
    outputRange.push(1); // keep glowing

    inputRange.push(next);
    outputRange.push(0.3); // dim out as next one starts to glow
  }

  return useTransform(smoothProgress, inputRange, outputRange);
}

function TimelineSpine({
  year,
  isLast = false,
  smoothProgress,
  range,
  idx,
  yearPoints,
}: {
  year: string;
  isLast?: boolean;
  smoothProgress: import("motion/react").MotionValue<number>;
  range: [number, number];
  idx: number;
  yearPoints: number[];
}) {
  const height = (isLast ? 518 : 456) + YEAR_GAP;
  const yearOpacity = useYearHighlight(smoothProgress, idx, yearPoints);

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
        className="bg-brand-dark absolute left-1/2 z-30 -translate-x-1/2 px-2"
        style={{ top: 0 }}
      >
        <motion.span
          className="font-anton text-brand-light-green block text-center text-5xl leading-[58px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)", opacity: yearOpacity }}
        >
          {year}
        </motion.span>
      </div>
    </div>
  );
}

/** Image panel — 503 × 372, rounded‑[32px], overflow hidden */
function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative aspect-[503/372] w-full max-w-[503px] shrink-0 overflow-hidden rounded-[32px] isolate [transform:translate3d(0,0,0)]">
      {src && (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          className="object-cover object-top scale-[1.04] transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 1280px) 45vw, 503px"
        />
      )}
    </div>
  );
}

/**
 * A shared glow overlay component that displays a blurred, screen-blended
 * image behind the card text. It uses CSS mask composites to fade the image
 * inward from all four borders, creating a curved rectangular fade that respects
 * the container's border-radius.
 */
function GlowOverlay({
  src,
  className,
  style,
}: {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!src) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 [transform:translate3d(0,0,0)] overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent), linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent), linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        ...style,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 scale-110 [transform:translate3d(0,0,0)] blur-[4px]">
        <OptimizedImage
          src={src}
          alt=""
          fill
          className="object-cover opacity-70 mix-blend-screen"
          sizes="(max-width: 768px) 140px, 252px"
        />
      </div>
    </div>
  );
}

/** Content card — title + description, with a blurred photo chip tucked behind it */
function ContentCard({
  title,
  description,
  glow,
  cardTop,
  cardHeight,
}: {
  title: string;
  description: string;
  glow?: string;
  cardTop?: string;
  cardHeight?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[474px] rounded-[24px] ${cardTop ?? "top-[-44px]"} ${cardHeight ?? "h-[462px]"}`}
    >
      <GlowOverlay
        src={glow}
        className="top-[-6px] left-1/2 h-[186px] w-[252px] -translate-x-1/2 rounded-[16px]"
      />

      {/* Text content — vertically centered inside the card */}
      <div className="absolute top-1/2 left-[32px] right-[32px] z-10 flex -translate-y-1/2 flex-col gap-4">
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
  idx,
  yearPoints,
}: {
  item: TimelineItem;
  isLast: boolean;
  smoothProgress: import("motion/react").MotionValue<number>;
  range: [number, number];
  idx: number;
  yearPoints: number[];
}) {
  const spine = (
    <TimelineSpine
      year={item.year}
      isLast={isLast}
      smoothProgress={smoothProgress}
      range={range}
      idx={idx}
      yearPoints={yearPoints}
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
      <div className="flex justify-start pt-[130px] pl-[15px]">
        <ImagePanel src={item.image} alt={item.title} />
      </div>
      {/* Centre: spine (line + year) */}
      {spine}
      {/* Right: card */}
      <div className="flex justify-end pt-[130px] pr-[15px]">
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
      className="pointer-events-none absolute left-[19px] z-20 mt-2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2"
    >
      <NextImage
        src="/images/timeline/Ellipse.svg"
        alt="Dot"
        width={14}
        height={14}
      />
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
      className="pointer-events-none absolute top-[14px] bottom-[64px] left-0 w-10"
      style={{
        maskImage:
          "linear-gradient(to bottom, black calc(100% - 150px), transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black calc(100% - 150px), transparent)",
      }}
    >
      {/* Background dashed line */}
      <div className="absolute top-0 bottom-0 left-[19px] w-[1px] overflow-hidden opacity-20">
        <svg
          className="h-full w-[1px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
        className="absolute top-0 left-[19px] w-[1px] origin-top overflow-hidden"
      >
        <div className="h-[10000px] w-[1px]">
          <svg
            className="h-full w-[1px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
  const { scrollX } = useScroll({
    container: containerRef,
  });

  const [scrollRange, setScrollRange] = useState<[number, number]>([0, 1]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateRange = () => {
      const W = el.clientWidth;
      const scrollWidth = el.scrollWidth;
      const C0 = 24 + 183; // 24px left padding + 183px (half of 366px card)
      const startScroll = Math.max(0, C0 - W / 2);
      const endScroll = Math.max(startScroll + 1, scrollWidth - W);
      setScrollRange([startScroll, endScroll]);
    };

    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, [containerRef]);

  const progress = useTransform(scrollX, scrollRange, [0, 1], {
    clamp: true,
  });

  return useSpring(progress, {
    stiffness: 100,
    damping: 22,
  });
}

/**
 * One continuous dashed line + one dot spanning the whole mobile track,
 * from the first item's year-center to the last item's year-center.
 * Because it's driven by a single shared progress value (not one useScroll
 * per item), it can never desync or fragment — same guarantee as desktop.
 *
 * Vertical position (320px) is the vertical center of the year row (which
 * starts at 296px, 48px tall) so the dashed line + dot travel directly
 * behind every year label — matches the Figma spec (node 2537:2545).
 * Horizontal inset (183px each side) = half the item width (366 / 2),
 * i.e. the first/last item's own horizontal center.
 */
function GlobalMobileLine({
  smoothProgress,
  firstBadgeWidth = 148,
  contentWidth = 0,
}: {
  smoothProgress: import("motion/react").MotionValue<number>;
  firstBadgeWidth?: number;
  contentWidth?: number;
}) {
  const widthVal = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const leftOffset = 183 + firstBadgeWidth / 2 + 10;

  /**
   * Fraction [0,1] of the line container where the last year's horizontal
   * centre sits — mirrors desktop's "lastEnd" clamp in GlobalTimelineDot.
   *
   * line container: left=leftOffset, right=0 → width = contentWidth - leftOffset
   * last year centre from container left = contentWidth - 183 - leftOffset
   * fraction = (contentWidth - 183 - leftOffset) / (contentWidth - leftOffset)
   */
  const lastYearFraction =
    contentWidth > leftOffset + 184
      ? Math.min(1, (contentWidth - 183 - leftOffset) / (contentWidth - leftOffset))
      : 0.88; // sensible fallback before first measurement

  // Dot position: travels from 0% → lastYearFraction%, then stays clamped
  // there (same as desktop dotTop which clamps at lastEnd%).
  const dotLeft = useTransform(
    smoothProgress,
    [0, lastYearFraction, 1],
    ["0%", `${lastYearFraction * 100}%`, `${lastYearFraction * 100}%`]
  );

  // Dot opacity: held at 1 across the whole journey, then fades to 0 as the
  // dot arrives at the last year centre — mirrors GlobalTimelineDot's fade.
  const fadeStart = Math.max(0, lastYearFraction - 0.08);
  const dotOpacity = useTransform(
    smoothProgress,
    [0, fadeStart, lastYearFraction, 1],
    [1, 1, 0, 0]
  );

  return (
    <div
      className="pointer-events-none absolute z-0 h-[1px]"
      style={{ top: 320, left: leftOffset, right: 0 }}
    >
      {/* ── Line layers wrapped in a fade-out mask (matches desktop TimelineLineLast gradient) ── */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to right, black calc(100% - 150px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, black calc(100% - 150px), transparent)",
        }}
      >
        {/* Faint background dashes, continuous across the whole track */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg
            className="h-[1px] w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="var(--brand-bg)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Animated active dashed reveal */}
        <motion.div
          style={{ width: widthVal }}
          className="absolute top-0 left-0 bottom-0 z-10 origin-left overflow-hidden"
        >
          <div className="h-[1px] w-[10000px]">
            <svg
              className="h-[1px] w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="0.5"
                x2="100%"
                y2="0.5"
                stroke="var(--brand-bg)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Traveling dot — sits outside the mask wrapper so it isn't clipped.
          Position is clamped to the last year centre; opacity fades to 0 on
          arrival — exact same contract as the desktop GlobalTimelineDot. */}
      <motion.div
        style={{ left: dotLeft, opacity: dotOpacity }}
        className="absolute top-0 z-20 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2"
      >
        <OptimizedImage
          src="/images/timeline/Ellipse.svg"
          alt="Dot"
          width={16}
          height={16}
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
  smoothProgress,
  idx,
  yearPoints,
}: {
  item: TimelineItem;
  isLast: boolean;
  isFirst?: boolean;
  smoothProgress: import("motion/react").MotionValue<number>;
  idx: number;
  yearPoints: number[];
}) {
  const yearOpacity = useYearHighlight(smoothProgress, idx, yearPoints);

  return (
    <div className="grid w-full grid-cols-[40px_1fr] items-stretch">
      {/* Left: spine spacing */}
      <div className="relative w-10 shrink-0" />
      {/* Right: content */}
      <div className="flex flex-col gap-5 pb-16">
        {/* Year */}
        <motion.span
          className="font-anton text-brand-light-green text-3xl leading-tight whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)", opacity: yearOpacity }}
        >
          {item.year}
        </motion.span>
        {/* Image */}
        <div className="group relative aspect-[503/372] w-full overflow-hidden rounded-[24px] isolate [transform:translate3d(0,0,0)]">
          {item.image && (
            <OptimizedImage
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-top scale-[1.04] transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 55vw, 503px"
            />
          )}
        </div>
        {/* Text card */}
        <div className="relative rounded-[24px]">
          <GlowOverlay
            src={item.glow}
            className="top-[8px] right-[8px] h-[100px] w-[140px] rounded-[16px]"
          />
          <div className="relative z-10 flex flex-col gap-3 p-6">
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
  apiData,
}: {
  items?: TimelineItem[];
  apiData?: ApiTimelineItem[];
}) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopTimelineRef = useRef<HTMLDivElement>(null);
  const tabletTimelineRef = useRef<HTMLDivElement>(null);

  const resolvedItems = useMemo(() => {
    if (apiData && apiData.length > 0) {
      return apiData.map((item, index) => {
        // Prefer a dedicated gallery image for the glow; fall back to the
        // item's own photo so every year gets a glow, not just the ones
        // that happen to have gallery_images populated.
        const glow =
          item.gallery_images && item.gallery_images[0]
            ? resolveImageUrl(item.gallery_images[0])
            : item.image_url
              ? resolveImageUrl(item.image_url)
              : "";

        return {
          year: item.year,
          title: item.title,
          description: item.description,
          image: item.image_url ? resolveImageUrl(item.image_url) : "",
          glow,
          side: (index % 2 === 0 ? "right" : "left") as "left" | "right",
        };
      });
    }
    return items;
  }, [apiData, items]);

  if (resolvedItems.length === 0) return null;

  // One shared, spring-smoothed scroll value drives every row's dashed-line
  // reveal (each sliced to its own pixel-accurate range) and the single
  // traveling dot — so all of it moves at identical speed, by construction.
  const smoothProgress = useGlobalSpineProgress(desktopTimelineRef);
  const rowRanges = useMemo(
    () => getRowLineRanges(resolvedItems),
    [resolvedItems]
  );

  const tabletSmoothProgress = useGlobalSpineProgress(tabletTimelineRef);
  const mobileSmoothProgress = useGlobalMobileProgress(mobileRef);

  const firstMobileBadgeRef = useRef<HTMLDivElement>(null);
  const lastMobileBadgeRef = useRef<HTMLDivElement>(null);
  const [mobileBadgeWidths, setMobileBadgeWidths] = useState<{
    first: number;
    last: number;
  }>({
    first: 148,
    last: 148,
  });
  // Total pixel width of the horizontal scroll content — used by GlobalMobileLine
  // to compute lastYearFraction so the dot stops exactly at the last year centre.
  const [mobileContentWidth, setMobileContentWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      const firstW = firstMobileBadgeRef.current?.offsetWidth || 148;
      const lastW = lastMobileBadgeRef.current?.offsetWidth || 148;
      setMobileBadgeWidths({ first: firstW, last: lastW });
      // scrollWidth of the overflow container = total content width
      setMobileContentWidth(mobileRef.current?.scrollWidth ?? 0);
    };

    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [resolvedItems]);

  return (
    <section className="bg-brand-dark w-full overflow-hidden" id="timeline">
      {/* ===== Desktop View (lg+) — two-column alternating, single shared spine ===== */}
      <div className="timeline-desktop flex-col justify-end bg-white">
        <div className="timeline-desktop-container bg-brand-dark self-stretch px-[99px] pt-[100px]">
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
              <GlobalTimelineDot
                smoothProgress={smoothProgress}
                rowRanges={rowRanges}
              />
              {(() => {
                const yearPoints = getYearProgressPoints(resolvedItems);
                return resolvedItems.map((item, idx) => {
                  const isLast = idx === resolvedItems.length - 1;
                  return (
                    <div
                      key={item.year}
                      className="flex flex-col items-center self-stretch"
                    >
                      <TimelineRow
                        item={item}
                        isLast={isLast}
                        smoothProgress={smoothProgress}
                        range={rowRanges[idx]}
                        idx={idx}
                        yearPoints={yearPoints}
                      />
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tablet View (md → lg) — single-column with left spine ===== */}
      <div className="timeline-tablet flex-col bg-white">
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
            <div
              ref={tabletTimelineRef}
              className="relative flex flex-col self-stretch"
            >
              <GlobalTabletLine smoothProgress={tabletSmoothProgress} />
              {(() => {
                const tabletPoints = resolvedItems.map(
                  (_, idx) => idx / (resolvedItems.length - 1 || 1)
                );
                return resolvedItems.map((item, idx) => {
                  const isLast = idx === resolvedItems.length - 1;
                  return (
                    <TabletTimelineRow
                      key={item.year}
                      item={item}
                      isLast={isLast}
                      isFirst={idx === 0}
                      smoothProgress={tabletSmoothProgress}
                      idx={idx}
                      yearPoints={tabletPoints}
                    />
                  );
                });
              })()}
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
            <div className="relative flex flex-row gap-[80px]">
              <GlobalMobileLine
                smoothProgress={mobileSmoothProgress}
                firstBadgeWidth={mobileBadgeWidths.first}
                contentWidth={mobileContentWidth}
              />

              {(() => {
                const mobilePoints = resolvedItems.map(
                  (_, idx) => idx / (resolvedItems.length - 1 || 1)
                );
                return resolvedItems.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const isFirst = idx === 0;
                  const isLast = idx === resolvedItems.length - 1;
                  const badgeRef = isFirst
                    ? firstMobileBadgeRef
                    : isLast
                      ? lastMobileBadgeRef
                      : undefined;

                  // Every year gets a glow now — prefer the dedicated glow
                  // image, fall back to the item's main photo so nobody
                  // renders blank.
                  const glowSrc = item.glow || item.image;
                  const yearOpacity = useYearHighlight(
                    mobileSmoothProgress,
                    idx,
                    mobilePoints,
                    0.70
                  );

                  const imageEl = (
                    <div
                      className={`absolute left-[28px] h-[240px] w-[310px] overflow-hidden rounded-[24px] isolate [transform:translate3d(0,0,0)] ${isEven ? "top-0" : "top-[392px]"
                        }`}
                    >
                      {item.image && (
                        <OptimizedImage
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-top scale-[1.04]"
                          sizes="310px"
                        />
                      )}
                    </div>
                  );

                  const textEl = (
                    <div
                      className={cn(
                        "absolute left-[28px] w-[310px] h-[240px] rounded-[24px]",
                        isEven ? "top-[392px]" : "top-0"
                      )}
                    >
                      <GlowOverlay
                        src={glowSrc}
                        className={cn(
                          "h-[100px] w-[140px] rounded-[16px]",
                          isEven
                            ? "bottom-[8px] left-[8px]"
                            : "top-[8px] right-[8px]"
                        )}
                      />

                      <div
                        className={cn(
                          "absolute left-4 right-4 z-10 flex flex-col gap-4 text-center items-center",
                          isEven ? "top-0" : "bottom-0"
                        )}
                      >
                        <h3
                          className="font-anton text-brand-bg text-[30px] leading-[38px] whitespace-pre-line"
                          style={{ fontFamily: "var(--font-anton)" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-brand-bg/95 text-[13px] leading-[19px] text-center whitespace-pre-line"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );

                  const yearEl = (
                    <div className="pointer-events-none absolute top-[296px] left-0 z-30 flex h-[48px] w-full items-center justify-center">
                      <div
                        ref={badgeRef}
                        className="bg-brand-dark relative z-30 flex h-full items-center select-none px-[24px]"
                      >
                        <motion.span
                          className="font-anton text-brand-light-green text-center text-[40px] leading-[48px]"
                          style={{ fontFamily: "var(--font-anton)", opacity: yearOpacity }}
                        >
                          {item.year}
                        </motion.span>
                      </div>
                    </div>
                  );

                  return (
                    <div
                      key={item.year}
                      className="relative h-[632px] w-[366px] shrink-0 snap-center"
                    >
                      {imageEl}
                      {yearEl}
                      {textEl}
                    </div>
                  );
                })
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
