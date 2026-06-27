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
}

export default function BrandCards({
  badge,
  title,
  description,
  cards,
}: BrandCardsProps) {
  const gridCols =
    cards.length === 3
      ? "md:grid-cols-3"
      : cards.length === 2
      ? "md:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="w-full bg-[#0D1A14] text-white py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[800px]">
          <SectionBadge variant="dark">{badge}</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-white">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-white/65">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-5 md:gap-6`}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col gap-4 p-6 md:p-7 rounded-[20px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#A9E179]/30 transition-all duration-300"
            >
              <div className="h-2 w-2 rounded-full bg-[#A9E179] group-hover:scale-125 transition-transform duration-300" />
              <div className="flex flex-col gap-2.5">
                <h3 className="font-sans text-[17px] md:text-[19px] font-semibold text-white leading-snug">
                  {card.title}
                </h3>
                <p className="font-sans text-[14px] leading-[22px] text-white/65">
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
