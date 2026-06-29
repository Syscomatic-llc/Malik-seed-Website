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
    <section className={cn(
      "w-full py-10 lg:py-[100px] px-4 md:px-8 lg:px-[100px]",
      isDark ? "bg-[#0D1A14]" : "bg-[#F2F7F1]"
    )}>
      <div className={cn(
        "mx-auto flex flex-col items-center gap-10 lg:gap-[48px]",
        isDark ? "max-w-[1030px]" : "max-w-[1240px]"
      )}>
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[800px] mx-auto">
          <SectionBadge showDot variant={isDark ? "dark" : "outline"}>{badge}</SectionBadge>
          <h2 className={cn(
            "font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] whitespace-pre-line text-center",
            isDark ? "text-[#F2F7F1]" : "text-[#0D1A14]"
          )}>
            {title}
          </h2>
          {description && (
            <p className={cn(
              "font-sans text-[15px] md:text-[17px] leading-[24px]",
              isDark ? "text-[#F2F7F1]/65" : "text-[#0D1A14]/65"
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6`}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={cn(
                "group flex flex-col justify-start rounded-[20px] lg:rounded-[24px] bg-[#0F3221] border border-white/5 hover:bg-[#0c2a1c] hover:border-[#A9E179]/30 transition-all duration-300 shadow-md",
                isDark
                  ? "lg:w-[503px] lg:h-[321px] lg:pt-[40px] lg:px-[32px] lg:pb-[104px] lg:gap-[32px] p-[30px] px-6 gap-3 md:gap-4"
                  : "p-[30px] px-6 lg:p-12 lg:px-10 gap-3 md:gap-4",
                isCentered ? "items-center text-center" : "items-start text-left"
              )}
            >
              {card.category && (
                <div className="h-[33px] px-4 rounded-[30px] bg-[#EAF3DE] border border-[#E4E7EC] inline-flex items-center justify-center w-fit text-[#0F3221] font-sans text-[14px] font-medium leading-[21px] shrink-0">
                  {card.category}
                </div>
              )}
              {showIndex && (
                <div
                  className="size-[40px] text-center flex items-center justify-center text-[16px] font-semibold rounded-[10px] bg-[#A9E179] group-hover:scale-125 transition-transform duration-300 shrink-0"
                >
                  {idx + 1}
                </div>
              )}
              <div className={cn(
                "flex flex-col",
                isDark ? "gap-[16px]" : "gap-2.5",
                isCentered ? "items-center text-center" : "items-start text-left"
              )}>
                <h3 className={cn(
                  "font-sans font-medium text-[#F2F7F1] whitespace-pre-line",
                  isDark ? "text-[20px] leading-[24px]" : "text-[20px] md:text-[24px] leading-[24px] md:leading-[29px]"
                )}>
                  {card.title}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-[#F2F7F1]/80">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
