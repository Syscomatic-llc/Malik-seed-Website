import { memo, useMemo } from "react";
import Image from "next/image";

export interface Partner {
  id: number;
  name: string;
  src: string;
}

// Unique database mock entries (1 instance per partner logo)
const MOCK_DB_PARTNERS: Partner[] = [
  { id: 1, name: "CIMMYT", src: "/images/partners/partner-1.png" },
  { id: 2, name: "IRRI", src: "/images/partners/partner-2.png" },
  { id: 3, name: "PARC", src: "/images/partners/partner-3.png" },
  { id: 4, name: "Punjab Seed Council", src: "/images/partners/partner-4.png" },
  { id: 5, name: "Agri. Univ. Faisalabad", src: "/images/partners/partner-5.png" },
  { id: 6, name: "NARC", src: "/images/partners/partner-6.png" },
  { id: 7, name: "FAO", src: "/images/partners/partner-7.png" },
  { id: 8, name: "USAID Agri Program", src: "/images/partners/partner-8.png" },
  { id: 9, name: "Partner 9", src: "/images/partners/partner-9.png" },
  { id: 10, name: "Partner 10", src: "/images/partners/partner-10.png" },
  { id: 11, name: "Partner 11", src: "/images/partners/partner-11.png" },
  { id: 12, name: "Partner 12", src: "/images/partners/partner-12.png" },
  { id: 13, name: "Partner 13", src: "/images/partners/partner-13.png" },
];

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

export default memo(function PartnersSection({ partners = MOCK_DB_PARTNERS }: PartnersSectionProps) {
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
      className="w-full overflow-hidden border-b border-[#CED2DA] bg-brand-bg py-15 md:py-25"
      id="partners"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Title — Figma: "Our Development Partners", Inter 18px, weight 500, center */}
        <p className="font-inter mb-8 text-center opacity-70 text-base font-medium leading-[22px] text-brand-dark md:mb-12 md:text-lg">
          Our Development Partners
        </p>

        {/* Sliders Container — Figma Frame 16: gap 24px (mobile) to 40px (desktop) */}
        <div className="relative flex flex-col gap-6 md:gap-10">
          
          {/* Side Fades — Figma: Left & Right linear gradient overlays, width 202px on desktop */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 md:w-[202px]"
            style={LEFT_FADE_STYLE}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 md:w-[202px]"
            style={RIGHT_FADE_STYLE}
          />

          {/* Row 1 — Scrolling Left */}
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-marquee gap-2 w-max">
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
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-marquee-reverse gap-2 w-max">
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
