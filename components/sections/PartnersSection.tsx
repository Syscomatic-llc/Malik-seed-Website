import { memo, useMemo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ApiPartner } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

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
  apiData?: ApiPartner[];
}

export default memo(function PartnersSection({
  partners,
  apiData,
}: PartnersSectionProps) {
  const activePartners = useMemo(() => {
    if (Array.isArray(apiData) && apiData.length > 0) {
      return apiData.map((item) => ({
        id: item.id,
        name: item.name,
        src: resolveImageUrl(item.logo_url),
      }));
    }
    return [];
  }, [apiData]);

  if (activePartners.length === 0) return null;

  // Dynamically split unique partners down the middle and duplicate the list for infinite loops
  const { row1Items, row2Items } = useMemo(() => {
    const half = Math.ceil(activePartners.length / 2);
    const r1 = activePartners.slice(0, half);
    const r2 = activePartners.slice(half);

    // Duplicate 4 times to ensure it covers screen widths (e.g. ultra-wide) without gaps during loop transition
    return {
      row1Items: [...r1, ...r1, ...r1, ...r1],
      row2Items: [...r2, ...r2, ...r2, ...r2],
    };
  }, [activePartners]);

  return (
    // Figma: 1440x430, bg #F2F7F1, border-bottom 1px solid #CED2DA
    <section
      className="border-brand-partners-border bg-brand-bg w-full overflow-hidden border-b py-15 md:py-25"
      id="partners"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Title — Figma: "Our Development Partners", Inter 18px, weight 500, center */}
        <p className="font-inter text-brand-dark mb-8 text-center text-base leading-[22px] font-medium opacity-70 md:mb-12 md:text-lg">
          Our Development Partners
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
                <OptimizedImage
                  key={`r1-${item.id}-${idx}`}
                  src={item.src}
                  alt={item.name}
                  width={161}
                  height={60}
                  priority={idx < 10}
                  quality={50}
                  className="shrink-0 object-contain"
                />
              ))}
            </div>
          </div>

          {/* Row 2 — Scrolling Right */}
          <div className="relative w-full overflow-hidden">
            <div className="animate-partner-marquee-reverse flex w-max gap-2">
              {row2Items.map((item, idx) => (
                <OptimizedImage
                  key={`r2-${item.id}-${idx}`}
                  src={item.src}
                  alt={item.name}
                  width={161}
                  height={60}
                  priority={idx < 10}
                  quality={50}
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
