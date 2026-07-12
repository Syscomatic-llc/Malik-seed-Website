import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

interface CardItem {
  title: string;
  description: string;
  category?: string;
}

interface BrandCardsProps {
  badge: string;
  title: string;
  description?: string;
  cards: CardItem[];
  showIndex?: boolean; // show or hide the numbered badge on each card
  bgTheme?: "light" | "dark";
  align?: "left" | "center";
}

export default function BrandCards({
  badge,
  title,
  description,
  cards,
  showIndex = true,
  bgTheme = "light",
  align = "left",
}: BrandCardsProps) {
  const isDark = bgTheme === "dark";
  const isCentered = align === "center" || isDark;

  const gridCols =
    cards.length === 3
      ? "md:grid-cols-3"
      : cards.length === 2 || (cards.length === 4 && isDark)
        ? "md:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      className={cn(
        "w-full px-4 py-10 md:px-8 lg:px-[100px] lg:py-[100px]",
        isDark ? "bg-[#0D1A14]" : "bg-[#F2F7F1]"
      )}
    >
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-10 lg:gap-[48px]",
          isDark ? "max-w-[1030px]" : "max-w-[1240px]"
        )}
      >
        {/* Header */}
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center md:gap-8">
          <SectionBadge showDot variant={isDark ? "dark" : "outline"}>
            {badge}
          </SectionBadge>
          <h2
            className={cn(
              "text-center font-sans text-[32px] leading-[38px] font-medium whitespace-pre-line md:text-[48px] md:leading-[58px]",
              isDark ? "text-[#F2F7F1]" : "text-[#0D1A14]"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "font-sans text-[15px] leading-[24px] md:text-[17px]",
                isDark ? "text-[#F2F7F1]/65" : "text-[#0D1A14]/65"
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6`}>
          {cards.map((card, idx) => (
            // OUTER wrapper: relative, hosts the SVG border-draw overlay
            <div
              key={idx}
              className="brand-card group relative rounded-[20px] lg:rounded-[24px]"
            >
              {/* INNER wrapper: bg, clipping, content */}
              <div
                className={cn(
                  "relative flex h-full w-full flex-col justify-start overflow-hidden rounded-[inherit] bg-[#0F3221] shadow-md transition-colors duration-300 group-hover:bg-[#0c2a1c]",
                  isDark
                    ? "gap-3 p-[30px] px-6 md:gap-4 lg:h-[321px] lg:w-[503px] lg:gap-[32px] lg:px-[32px] lg:pt-[40px] lg:pb-[104px]"
                    : "gap-3 p-[30px] px-6 md:gap-4 lg:p-12 lg:px-10",
                  isCentered
                    ? "items-center text-center"
                    : "items-start text-left"
                )}
              >
                {card.category && (
                  <SectionBadge variant="green" showDot={false}>
                    {card.category}
                  </SectionBadge>
                )}
                {showIndex && (
                  <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[10px] bg-[#A9E179] text-center text-[16px] font-semibold transition-transform duration-300 group-hover:scale-125">
                    {idx + 1}
                  </div>
                )}
                <div
                  className={cn(
                    "flex flex-col",
                    isDark ? "gap-[16px]" : "gap-2.5",
                    isCentered
                      ? "items-center text-center"
                      : "items-start text-left"
                  )}
                >
                  <h3
                    className={cn(
                      "font-sans font-medium whitespace-pre-line text-[#F2F7F1]",
                      isDark
                        ? "text-[20px] leading-[24px]"
                        : "text-[20px] leading-[24px] md:text-[24px] md:leading-[29px]"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="font-sans text-[16px] leading-[24px] text-[#F2F7F1]/80">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Border-draw SVG overlay — placed AFTER inner div so it
                  paints on top without needing z-index tricks */}
              <svg
                className="brand-border-svg pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Right half: top-center → top-right → bottom-right → bottom-center (clockwise) */}
                <path
                  className="brand-border-path"
                  d="M 100,2 L 182,2 A 16,16 0 0 1 198,18 L 198,182 A 16,16 0 0 1 182,198 L 100,198"
                  vectorEffect="non-scaling-stroke"
                  pathLength={100}
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: "100",
                  }}
                />
                {/* Left half: top-center → top-left → bottom-left → bottom-center (counter-clockwise) */}
                <path
                  className="brand-border-path"
                  d="M 100,2 L 18,2 A 16,16 0 0 0 2,18 L 2,182 A 16,16 0 0 0 18,198 L 100,198"
                  vectorEffect="non-scaling-stroke"
                  pathLength={100}
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: "100",
                  }}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}