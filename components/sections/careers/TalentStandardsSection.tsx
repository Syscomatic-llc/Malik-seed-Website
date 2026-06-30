import { memo } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { talentStandardsData, TalentStandard } from "@/data/career-data";

// ── TalentStandardsSection: Section 2 ───────────────────────────────────────
// Figma node 2424:13820 — 1440×835, bg #F2F7F1
// Inner: 1240px container, centered badge + "Talent Standards" 48px title,
// then 3-up row of cards + 2-up row of cards below, each card 342×216
// Row 1: 3 cards (card 1 light, card 2 dark #0F3221, card 3 light)
// Row 2: 2 cards centered (both light)
// Each card: padding 32px, numbered green badge (40×40 radius-10, #A9E179),
//            title 20px Inter Tight 500, description 16px Inter
// ────────────────────────────────────────────────────────────────────────────

const StandardCard = memo(function StandardCard({
  standard,
}: {
  standard: TalentStandard;
}) {
  const isDark = standard.dark;
  return (
    <div
      className={[
        "flex flex-col items-start md:items-center justify-between gap-8 rounded-[24px] border p-8",
        "w-full sm:w-[calc(50%-8px)] lg:w-[342px] lg:flex-shrink-0",
        "min-h-[216px]",
        isDark
          ? "border-brand-border bg-brand-neutral-light lg:bg-[#0F3221]"
          : "border-brand-border bg-brand-neutral-light",
      ].join(" ")}
      style={{ padding: "32px 32px" }}
    >
      {/* Numbered badge */}
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-brand-light-green"
        aria-hidden="true"
      >
        <span
          className={[
            "font-inter-tight text-[20px] font-medium leading-[24px] text-center text-brand-dark"
          ].join(" ")}
        >
          {standard.number}
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex w-full flex-col items-start md:items-center gap-2">
        <h3
          className={[
            "font-inter-tight text-[20px] font-medium leading-[24px] text-center",
            isDark ? "text-brand-dark lg:text-brand-bg" : "text-brand-dark",
          ].join(" ")}
        >
          {standard.title}
        </h3>
        <p
          className={[
            "font-inter text-[16px] leading-[24px] text-center",
            isDark ? "text-brand-dark lg:text-brand-bg" : "text-brand-dark",
          ].join(" ")}
        >
          {standard.description}
        </p>
      </div>
    </div>
  );
});

export default memo(function TalentStandardsSection({ data }: { data: typeof talentStandardsData }) {
  const { standards } = data;
  const row1 = standards.slice(0, 3); // cards 1-3
  const row2 = standards.slice(3, 5); // cards 4-5

  return (
    <section
      id="talent-standards"
      aria-label="Talent Standards"
      className="w-full bg-brand-bg py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 xl:px-0">

        {/* Header: centered badge + title */}
        <div className="mb-[32px] md:mb-[64px] flex flex-col items-center gap-8">
          <SectionBadge variant="outline" showDot dotSize="6px">
            {data.badge}
          </SectionBadge>
          <h2
            className="font-inter-tight text-[32px] font-medium leading-[1.2] tracking-tight text-brand-dark text-center md:text-[48px] md:leading-[58px]"
          >
            {data.title}
          </h2>
        </div>

        {/* Row 1 — 3 cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {row1.map((s) => (
            <StandardCard key={s.number} standard={s} />
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {row2.map((s) => (
            <StandardCard key={s.number} standard={s} />
          ))}
        </div>

      </div>
    </section>
  );
});
