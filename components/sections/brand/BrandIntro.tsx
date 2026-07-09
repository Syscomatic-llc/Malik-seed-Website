"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/* ─── types ─────────────────────────────────────────────── */
export type BrandIntroLayout =
  | "text-only"
  | "text-tags"
  | "text-stats"
  | "text-tags-stats";

interface StatItem {
  value: string;
  label: string;
}

interface BrandIntroProps {
  layout: BrandIntroLayout;
  title: string[];
  description?: string;
  highlights?: string[];
  stats?: StatItem[];
}

/* ─── Title swap helper ──────────────────────────────────── */
function useTitleLines(title: string | string[]) {
  const titleLines = Array.isArray(title) ? title : [title];
  const shouldSwap = titleLines[0]?.endsWith("\n");
  const displayFirst = shouldSwap ? titleLines[1] : titleLines[0];
  const displaySecond = shouldSwap
    ? titleLines[0].trimEnd()
    : (titleLines[1] ?? null);
  const hasNewlineInFirst = titleLines[0]?.includes("\n");
  return {
    displayFirst,
    displaySecond,
    isOriginalFirstOnTop: !shouldSwap,
    hasNewlineInFirst,
  };
}

function TitleBlock({
  title,
  className,
}: {
  title: string | string[];
  className?: string;
}) {
  const {
    displayFirst,
    displaySecond,
    isOriginalFirstOnTop,
    hasNewlineInFirst,
  } = useTitleLines(title);
  return (
    <h2 className={className}>
      <span className={isOriginalFirstOnTop ? "text-[#A9E179]" : "text-white"}>
        {displayFirst}
      </span>
      {displaySecond && (
        <>
          {hasNewlineInFirst ? <br /> : " "}
          <span
            className={isOriginalFirstOnTop ? "text-white" : "text-[#A9E179]"}
          >
            {displaySecond}
          </span>
        </>
      )}
    </h2>
  );
}

/* ─── CountUp atom (self-contained to avoid prop drilling) ─ */
function StatNumber({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : null;

  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  if (
    typeof window !== "undefined" &&
    isInView &&
    numeric !== null &&
    ref.current
  ) {
    if (startRef.current === null) {
      startRef.current = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const elapsed = now - startRef.current!;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (ref.current) {
          ref.current.textContent = String(Math.round(numeric * eased));
        }
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    }
  }

  if (numeric === null) {
    return <span ref={ref}>{raw}</span>;
  }

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

/* ─── Tag Pill ───────────────────────────────────────────── */
function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-[37px] items-center justify-center rounded-[40px] border border-white/[0.12] bg-[rgba(13,26,20,0.32)] px-6 text-center font-[family-name:var(--font-inter-tight)] text-[14px] leading-[21px] whitespace-nowrap text-white/90">
      {label}
    </span>
  );
}

/* ─── Stat Card (Desktop) ────────────────────────────────── */
function StatCard({ value, label }: StatItem) {
  return (
    <div className="relative h-[202px] min-w-0 flex-1 rounded-[24px] bg-[#0F3221] px-8 py-14">
      <div className="text-center font-[family-name:var(--font-anton)] text-[48px] leading-[58px] text-white">
        <StatNumber raw={value} />
      </div>
      <div className="text-center font-[family-name:var(--font-inter)] text-[16px] leading-[150%] text-white capitalize">
        {label}
      </div>
    </div>
  );
}

/* ─── Mobile Stat Row ────────────────────────────────────── */
function MobileStatCard({ value, label }: StatItem) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-[16px] bg-[#0F3221] px-4 py-8">
      <div className="text-center font-[family-name:var(--font-anton)] text-[36px] leading-[43px] text-white">
        <StatNumber raw={value} />
      </div>
      <div className="text-center font-[family-name:var(--font-inter)] text-[13px] leading-[18px] text-white/80 capitalize">
        {label}
      </div>
    </div>
  );
}

/* ─── Stats Grid ─────────────────────────────────────────── */
function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <>
      <div className="hidden w-full justify-between gap-4 lg:flex">
        {stats.map((s, i) => (
          <div key={i} className="flex-1">
            <StatCard value={s.value} label={s.label} />
          </div>
        ))}
      </div>
      <div className="hidden w-full flex-col gap-4 md:flex lg:hidden">
        <div className="flex gap-4">
          {stats.slice(0, 2).map((s, i) => (
            <div key={i} className="flex-1">
              <StatCard value={s.value} label={s.label} />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {stats.slice(2, 4).map((s, i) => (
            <div key={i + 2} className="flex-1">
              <StatCard value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 md:hidden">
        {[stats.slice(0, 2), stats.slice(2, 4)].map((pair, rowIdx) => (
          <div key={rowIdx} className="flex gap-3">
            {pair.map((s, i) => (
              <MobileStatCard key={i} value={s.value} label={s.label} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Tags Row ───────────────────────────────────────────── */
function TagsRow({ highlights }: { highlights: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {highlights.map((h, i) => (
        <TagPill key={i} label={h} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LAYOUT VARIANTS
   ═══════════════════════════════════════════════════════════ */

function LayoutTextOnly({
  title,
  description,
}: Pick<BrandIntroProps, "title" | "description">) {
  return (
    <section className="w-full bg-[#0D1A14]">
      <div className="w-full px-4 py-[48px] md:px-[100px] md:py-[140px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-4">
          <TitleBlock
            title={title}
            className="w-full max-w-[730px] text-center font-[family-name:var(--font-inter-tight)] text-[32px] leading-[38px] font-medium md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
          />
          <p className="w-full max-w-[662px] text-center font-[family-name:var(--font-inter)] text-[14px] leading-[22px] text-white/80 md:text-[16px] md:leading-[24px]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

function LayoutTextTags({
  title,
  description,
  highlights,
}: Pick<BrandIntroProps, "title" | "description" | "highlights">) {
  return (
    <section className="w-full bg-[#0D1A14]">
      <div className="w-full px-4 py-[48px] md:px-[100px] md:py-[140px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8">
          <div className="flex w-full max-w-[886px] flex-col items-center gap-4">
            <TitleBlock
              title={title}
              className="w-full text-center font-[family-name:var(--font-inter-tight)] text-[32px] leading-[38px] font-medium md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            />
            <p className="hidden w-full max-w-[636px] text-center font-[family-name:var(--font-inter)] text-[14px] leading-[22px] text-white/80 md:block md:text-[16px] md:leading-[24px]">
              {description}
            </p>
          </div>
          {highlights && highlights.length > 0 && (
            <TagsRow highlights={highlights} />
          )}
        </div>
      </div>
    </section>
  );
}

function LayoutTextStats({
  title,
  description,
  stats,
}: Pick<BrandIntroProps, "title" | "description" | "stats">) {
  return (
    <section className="w-full bg-[#0D1A14]">
      <div className="w-full px-4 py-[48px] md:px-[100px] md:pt-[140px] md:pb-[140px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 md:gap-[64px]">
          <div className="flex w-full flex-col items-center gap-4">
            <TitleBlock
              title={title}
              className="w-full text-center font-[family-name:var(--font-inter-tight)] text-[32px] leading-[38px] font-medium md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
            />
            <p className="w-full max-w-[636px] text-center font-[family-name:var(--font-inter)] text-[14px] leading-[22px] text-white/80 md:text-[16px] md:leading-[24px]">
              {description}
            </p>
          </div>
          {stats && stats.length > 0 && <StatsGrid stats={stats} />}
        </div>
      </div>
    </section>
  );
}

function LayoutTextTagsStats({
  title,
  description,
  highlights,
  stats,
}: Pick<BrandIntroProps, "title" | "description" | "highlights" | "stats">) {
  return (
    <section className="w-full bg-[#0D1A14]">
      <div className="w-full px-4 py-[48px] md:px-[100px] md:pt-[140px] md:pb-[140px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 md:gap-[64px]">
          <div className="flex w-full max-w-[886px] flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-4">
              <TitleBlock
                title={title}
                className="w-full text-center font-[family-name:var(--font-inter-tight)] text-[32px] leading-[38px] font-medium md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[58px]"
              />
              <p className="w-full max-w-[676px] text-center font-[family-name:var(--font-inter)] text-[14px] leading-[22px] text-white/80 md:text-[16px] md:leading-[24px]">
                {description}
              </p>
            </div>
            {highlights && highlights.length > 0 && (
              <TagsRow highlights={highlights} />
            )}
          </div>
          {stats && stats.length > 0 && <StatsGrid stats={stats} />}
        </div>
      </div>
    </section>
  );
}

/* ─── Root component ─────────────────────────────────────── */
export default function BrandIntro({
  layout,
  title,
  description,
  highlights,
  stats,
}: BrandIntroProps) {
  switch (layout) {
    case "text-only":
      return <LayoutTextOnly title={title} description={description} />;
    case "text-tags":
      return (
        <LayoutTextTags
          title={title}
          description={description}
          highlights={highlights}
        />
      );
    case "text-stats":
      return (
        <LayoutTextStats
          title={title}
          description={description}
          stats={stats}
        />
      );
    case "text-tags-stats":
      return (
        <LayoutTextTagsStats
          title={title}
          description={description}
          highlights={highlights}
          stats={stats}
        />
      );
    default:
      return <LayoutTextOnly title={title} description={description} />;
  }
}
