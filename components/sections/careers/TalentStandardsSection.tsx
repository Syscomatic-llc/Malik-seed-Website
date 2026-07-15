import { memo } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { talentStandardsData, TalentStandard } from "@/data/career-data";

// ── TalentStandardsSection: Section 2 ───────────────────────────────────────
// Figma node 2424:13820 — 1440×835, bg #F2F7F1
// Inner: 1240px container, centered badge + "Talent Standards" 48px title,
// then 3-up row of cards + 2-up row of cards below, each card 342×216
// All cards share the same normal (light) style. On hover, a card switches
// to the dark green style (#0F3221 bg, light text) — same as the original
// "dark" card variant — while non-hovered cards remain in the normal style.
// Each card: padding 32px, numbered green badge (40×40 radius-10, #A9E179),
//            title 20px Inter Tight 500, description 16px Inter
// ────────────────────────────────────────────────────────────────────────────

interface StandardCardProps {
  standard: TalentStandard & { icon?: string | null };
}

const StandardCard = memo(function StandardCard({
  standard,
}: StandardCardProps) {
  return (
    <div
      className={[
        "group flex flex-col items-start justify-between gap-8 rounded-[24px] border p-8 md:items-center",
        "w-full sm:w-[calc(50%-8px)] lg:w-[342px] lg:flex-shrink-0",
        "min-h-[216px] transition-all duration-300 ease-in-out hover:shadow-lg",
        "border-brand-border bg-brand-neutral-light hover:bg-[#0F3221] hover:border-[#0F3221]",
      ].join(" ")}
      style={{ padding: "32px 32px" }}
    >
      {/* Numbered badge */}
      <div
        className="bg-brand-light-green flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px]"
        aria-hidden="true"
      >
        <span className="font-inter-tight text-brand-dark text-center text-[20px] leading-[24px] font-medium">
          {standard.number}
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex w-full flex-col items-start gap-2 md:items-center">
        <h3
          className={[
            "font-inter-tight text-brand-dark w-full text-left text-[20px] leading-[24px] font-medium",
            "transition-colors duration-300 ease-in-out group-hover:text-brand-bg md:text-center",
          ].join(" ")}
        >
          {standard.title}
        </h3>
        <p
          className={[
            "font-inter text-brand-dark w-full text-left text-[16px] leading-[24px]",
            "transition-colors duration-300 ease-in-out group-hover:text-brand-bg md:text-center",
          ].join(" ")}
        >
          {standard.description}
        </p>
      </div>
    </div>
  );
});

export default memo(function TalentStandardsSection({
  data,
}: {
  data: {
    standards: Array<{
      number: number;
      title: string;
      description: string;
      icon?: string | null;
      dark?: boolean;
    }>;
  };
}) {
  const { standards } = data;
  const row1 = standards.slice(0, 3); // cards 1-3
  const row2 = standards.slice(3, 5); // cards 4-5

  return (
    <section
      id="talent-standards"
      aria-label="Talent Standards"
      className="bg-brand-bg w-full py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 xl:px-0">
        {/* Header: centered badge + title */}
        <div className="mb-[32px] flex flex-col items-center gap-8 md:mb-[64px]">
          <SectionBadge variant="outline" showDot dotSize="6px">
            {talentStandardsData.badge}
          </SectionBadge>
          <h2 className="font-inter-tight text-brand-dark text-center text-[32px] leading-[1.2] font-medium tracking-tight md:text-[48px] md:leading-[58px]">
            {talentStandardsData.title}
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