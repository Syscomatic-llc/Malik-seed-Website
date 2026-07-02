import { memo, useMemo } from "react";
import Image from "next/image";
import { partnersData } from "@/data/sections-data";

export interface Partner {
  id: number;
  name: string;
  src: string;
}

// Static style objects referencing global CSS variables to prevent recreation on render
const LEFT_FADE_STYLE = {
  background: "linear-gradient(90deg, var(--brand-bg) 0%, transparent 100%)",
} as const;

const RIGHT_FADE_STYLE = {
  background: "linear-gradient(270deg, var(--brand-bg) 0%, transparent 100%)",
} as const;

interface PartnersSectionProps {
  partners?: Partner[];
}

export default memo(function PartnersSection({
  partners = partnersData.items,
}: PartnersSectionProps) {
  // Dynamically split unique partners down the middle and duplicate the list for infinite loops
  const { row1Items, row2Items } = useMemo(() => {
    const half = Math.ceil(partners.length / 2);
    const r1 = partners.slice(0, half);
    const r2 = partners.slice(half);

    // Duplicate 4 times to ensure it covers screen widths (e.g. ultra-wide) without gaps during loop transition
    return {
      row1Items: [...r1, ...r1, ...r1, ...r1],
      row2Items: [...r2, ...r2, ...r2, ...r2],
    };
  }, [partners]);

  return (
    // Figma: 1440x430, bg #F2F7F1, border-bottom 1px solid #CED2DA
    <section
      className="border-brand-partners-border bg-brand-bg w-full overflow-hidden border-b py-15 md:py-25"
      id="partners"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Title — Figma: "Our Development Partners", Inter 18px, weight 500, center */}
        <p className="font-inter text-brand-dark mb-8 text-center text-base leading-[22px] font-medium opacity-70 md:mb-12 md:text-lg">
          {partnersData.title}
        </p>

        {/* Sliders Container — Figma Frame 16: gap 24px (mobile) to 40px (desktop) */}
        <div className="relative flex flex-col gap-6 md:gap-10">
          {/* Side Fades — Figma: Left & Right linear gradient overlays, width 202px on desktop */}
          <div
            className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 md:w-[202px]"
            style={LEFT_FADE_STYLE}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 md:w-[202px]"
            style={RIGHT_FADE_STYLE}
          />

          {/* Row 1 — Scrolling Left */}
          <div className="relative w-full overflow-hidden">
            <div className="animate-partner-marquee flex w-max gap-2">
              {row1Items.map((item, idx) => (
                <Image
                  key={`r1-${item.id}-${idx}`}
                  src={item.src}
                  alt={item.name}
                  width={161}
                  height={60}
                  priority={idx < 10}
                  className="shrink-0 object-contain"
                />
              ))}
            </div>
          </div>

          {/* Row 2 — Scrolling Right */}
          <div className="relative w-full overflow-hidden">
            <div className="animate-partner-marquee-reverse flex w-max gap-2">
              {row2Items.map((item, idx) => (
                <Image
                  key={`r2-${item.id}-${idx}`}
                  src={item.src}
                  alt={item.name}
                  width={161}
                  height={60}
                  priority={idx < 10}
                  className="shrink-0 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
