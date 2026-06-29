import { SectionBadge } from "@/components/ui/SectionBadge";
import { Card } from "@/components/ui/card";

export interface CropGroup {
  category: string;
  items: string[][];
}

interface BrandCropPortfolioProps {
  badge?: string;
  title: string;
  description: string;
  crops?: string[][];
  groups?: CropGroup[];
}

function CropPill({ label }: { label: string }) {
  return (
    <Card className="w-fit shrink-0 flex items-center justify-center h-[37px] py-2 px-[14px] md:px-[18px] rounded-[30px] border border-[#E4E7EC]/16 bg-transparent hover:border-[#A9E179]/60 hover:scale-105 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
      <span className="font-sans font-medium uppercase text-[14px] leading-[150%] text-[#A9E179]">
        {label}
      </span>
    </Card>
  );
}

export default function BrandCropPortfolio({
  badge,
  title,
  description,
  crops,
  groups,
}: BrandCropPortfolioProps) {
  return (
    <section className="w-full bg-[#F2F7F1] pt-10 pb-10 md:pt-[60px] md:pb-[60px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 md:gap-12">

        {/* Header */}
        {!groups && (
          <div className="flex flex-col gap-8 items-center text-center max-w-[800px]">
            <SectionBadge showDot variant="outline">{badge}</SectionBadge>
            <div className="flex flex-col gap-4 items-center">
              <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14]">
                {title}
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/75 max-w-[520px] mx-auto">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Crops Container */}
        {groups ? (
          /* Grouped by Category Layout (Figma exact match for Malik's Farm) */
          <div className="w-full max-w-[1240px] bg-[#0D1A14] rounded-[32px] py-8 px-6 md:p-14 flex flex-col gap-12 items-center justify-between">
            <h3 className="font-sans text-[24px] font-medium leading-[29px] text-[#F2F7F1] text-center">
              {title}
            </h3>
            <div className="max-w-[821px] flex flex-col gap-8 md:gap-12 items-start w-full">
              {groups.map((group, groupIdx) => (
                <div key={groupIdx} className="w-full flex flex-col gap-4 items-start">
                  <h4 className="font-sans text-[16px] font-medium leading-[24px] text-[#F2F7F1]">
                    {group.category}
                  </h4>
                  {/* Desktop Layout: preserves arrays row-by-row */}
                  <div className="hidden md:flex flex-col gap-3 w-full">
                    {group.items.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex flex-wrap justify-start gap-x-3 gap-y-4"
                      >
                        {row.map((item, idx) => (
                          <CropPill key={`${groupIdx}-${rowIndex}-${item}`} label={item} />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Mobile Layout: flat list wrapping */}
                  <div className="md:hidden flex flex-wrap justify-start items-center gap-x-2 gap-y-4 max-w-[310px]">
                    {group.items.flat().map((item, idx) => (
                      <CropPill key={`mobile-${groupIdx}-${item}`} label={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : crops ? (
          /* Row-by-row Layout (for Vegetable Seeds) */
          <div className="flex flex-col items-center gap-y-4 max-w-[1030px] w-full bg-[#0D1A14] rounded-[24px] md:rounded-[32px] py-8 px-6 md:py-16 md:px-[56px]">
            {crops.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap hidden md:flex justify-center items-center gap-x-3 gap-y-4"
              >
                {row.map((crop, idx) => (
                  <CropPill key={`${rowIndex}-${crop}`} label={crop} />
                ))}
              </div>
            ))}

            <div
              key={"mobile"}
              className="md:hidden flex flex-wrap justify-start items-center gap-x-2 gap-y-4 max-w-[310px] mx-auto"
            >
              {crops.flat().map((crop) => (
                <CropPill key={`mobile-${crop}`} label={crop} />
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}