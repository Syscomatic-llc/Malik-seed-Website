import { SectionBadge } from "@/components/ui/SectionBadge";

interface CardItem {
  title: string;
  description: string;
}

interface BrandCardsProps {
  badge: string;
  title: string;
  description?: string;
  cards: CardItem[];
  showIndex?: boolean; // show or hide the numbered badge on each card
}

export default function BrandCards({
  badge,
  title,
  description,
  cards,
  showIndex = true,
}: BrandCardsProps) {
  const gridCols =
    cards.length === 3
      ? "md:grid-cols-3"
      : cards.length === 2
        ? "md:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="w-full bg-[#F2F7F1] py-10 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-10 lg:gap-[48px]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[800px] mx-auto">
          <SectionBadge showDot variant="outline">{badge}</SectionBadge>
          <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14] whitespace-pre-line">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-[#0D1A14]/65">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6`}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-start gap-3 md:gap-4 p-[30px] px-6 lg:p-12 lg:px-10 rounded-[20px] lg:rounded-[24px] bg-[#0F3221] border border-white/5 hover:bg-[#0c2a1c] hover:border-[#A9E179]/30 transition-all duration-300 shadow-md"
            >
              {showIndex && (
                <div
                  className="size-[40px] text-center flex items-center justify-center text-[16px] font-semibold rounded-[10px] bg-[#A9E179] group-hover:scale-125 transition-transform duration-300"
                >
                  {idx + 1}
                </div>
              )}
              <div className="flex flex-col gap-2.5">
                <h3 className="font-sans text-[20px] md:text-[24px] font-medium text-[#F2F7F1] leading-[24px] md:leading-[29px] whitespace-pre-line">
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
