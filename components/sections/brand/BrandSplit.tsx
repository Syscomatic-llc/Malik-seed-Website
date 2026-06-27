import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

interface StatCard {
  value: string;
  label: string;
}

interface BrandSplitProps {
  badge: string;
  title: string;
  description: string;
  bullets?: string[];
  statCard?: StatCard;
  bottomHighlight?: string;
  image: string;
  bgTheme?: "dark" | "light";
}

export default function BrandSplit({
  badge,
  title,
  description,
  bullets,
  statCard,
  bottomHighlight,
  image,
  bgTheme = "light",
}: BrandSplitProps) {
  const isDark = bgTheme === "dark";

  return (
    <section
      className={`w-full py-16 md:py-24 px-4 md:px-8 lg:px-[100px] ${
        isDark ? "bg-[#0D1A14]" : "bg-[#F2F7F1]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: Text */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SectionBadge variant={isDark ? "dark" : "green"}>{badge}</SectionBadge>
            <h2
              className={`font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] ${
                isDark ? "text-white" : "text-[#0D1A14]"
              }`}
            >
              {title}
            </h2>
          </div>

          <div
            className={`font-sans text-[15px] md:text-[16px] leading-[26px] flex flex-col gap-4 ${
              isDark ? "text-white/70" : "text-[#0D1A14]/65"
            }`}
          >
            {description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Stat Card Highlight */}
          {statCard && (
            <div className="w-full p-8 bg-[#0F3221] rounded-[24px] border border-white/5 flex flex-col gap-2 mt-2">
              <div
                className="text-[48px] md:text-[56px] leading-none font-bold text-[#A9E179] font-sans"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {statCard.value}
              </div>
              <div className="text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#F2F7F1] font-sans">
                {statCard.label}
              </div>
            </div>
          )}

          {bullets && bullets.length > 0 && (
            <ul className="flex flex-col gap-2.5 mt-1">
              {bullets.map((bullet, i) => {
                const isHeader = bullet.endsWith(":");
                if (isHeader) {
                  return (
                    <li
                      key={i}
                      className={`font-sans font-bold text-[13px] uppercase tracking-wider mt-2 ${
                        isDark ? "text-[#A9E179]" : "text-[#195236]"
                      }`}
                    >
                      {bullet}
                    </li>
                  );
                }
                return (
                  <li key={i} className="flex gap-3 items-start">
                    <span
                      className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${
                        isDark ? "bg-[#A9E179]" : "bg-[#195236]"
                      }`}
                    />
                    <span
                      className={`font-sans text-[14px] md:text-[15px] leading-relaxed ${
                        isDark ? "text-white/70" : "text-[#0D1A14]/70"
                      }`}
                    >
                      {bullet}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right: Image */}
        <div className="lg:col-span-6">
          <div className="group relative w-full aspect-[4/3] md:aspect-[608/460] overflow-hidden rounded-[24px] bg-neutral-200">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 608px"
            />
          </div>
        </div>

        {/* Bottom Callout Highlight */}
        {bottomHighlight && (
          <div className="lg:col-span-12 text-center mt-6 md:mt-10">
            <p className="font-sans text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[36px] md:leading-[50px] lg:leading-[58px] text-[#A9E179] max-w-[900px] mx-auto">
              {bottomHighlight}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
