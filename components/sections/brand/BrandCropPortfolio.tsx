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
  crops?: (string[] | string)[] | string[][];
  groups?: CropGroup[];
}

function CropPill({ label }: { label: string }) {
  return (
    <Card className="flex h-[37px] w-fit shrink-0 cursor-default items-center justify-center rounded-[30px] border border-[#E4E7EC]/16 bg-transparent px-[14px] py-2 transition-all duration-300 hover:scale-105 hover:border-[#A9E179]/60 hover:bg-white/[0.04] md:px-[18px]">
      <span className="font-sans text-[14px] leading-[150%] font-medium text-[#A9E179] uppercase">
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
  // Normalize crops to guaranteed string[][] structure (whether 1D or 2D array is passed)
  const normalizedCrops: string[][] = crops
    ? Array.isArray(crops)
      ? crops
          .map((row) =>
            Array.isArray(row)
              ? row.map((item) => String(item ?? "").trim()).filter(Boolean)
              : typeof row === "string" && row.trim() !== ""
              ? [row.trim()]
              : []
          )
          .filter((r) => r.length > 0)
      : []
    : [];

  if (!groups && normalizedCrops.length === 0) return null;

  // If crops contains explicitly structured rows with >1 items per row, preserve rows.
  // Otherwise (flat list or 1-item arrays), render a centered wrapping flex container.
  const hasStructuredRows =
    normalizedCrops.length > 1 &&
    normalizedCrops.some((row) => row.length > 1);

  return (
    <section className="w-full bg-[#F2F7F1] px-4 pt-10 pb-10 md:px-8 md:pt-[60px] md:pb-[60px] lg:px-[100px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 md:gap-12">
        {/* Header */}
        {!groups && (
          <div className="flex max-w-[800px] flex-col items-center gap-8 text-center">
            {badge && badge.trim() !== "" && (
              <SectionBadge showDot variant="outline">
                {badge}
              </SectionBadge>
            )}
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-sans text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px]">
                {title}
              </h2>
              <p className="mx-auto max-w-[520px] font-sans text-[15px] leading-[24px] text-[#0D1A14]/75 md:text-[16px]">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Crops Container */}
        {groups ? (
          /* Grouped by Category Layout (Figma exact match for Malik's Farm) */
          <div className="flex w-full max-w-[1240px] flex-col items-center justify-between gap-12 rounded-[32px] bg-[#0D1A14] px-6 py-8 md:p-14">
            <h3 className="text-center font-sans text-[24px] leading-[29px] font-medium text-[#F2F7F1]">
              {title}
            </h3>
            <div className="flex w-full max-w-[821px] flex-col items-start gap-8 md:gap-12">
              {groups.map((group, groupIdx) => (
                <div
                  key={groupIdx}
                  className="flex w-full flex-col items-start gap-4"
                >
                  <h4 className="font-sans text-[16px] leading-[24px] font-medium text-[#F2F7F1]">
                    {group.category}
                  </h4>
                  {/* Desktop Layout: preserves arrays row-by-row */}
                  <div className="hidden w-full flex-col gap-3 md:flex">
                    {group.items.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex flex-wrap justify-start gap-x-3 gap-y-4"
                      >
                        {row.map((item) => (
                          <CropPill
                            key={`${groupIdx}-${rowIndex}-${item}`}
                            label={item}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Mobile Layout: flat list wrapping */}
                  <div className="flex max-w-[310px] flex-wrap items-center justify-start gap-x-2 gap-y-4 md:hidden">
                    {group.items.flat().map((item) => (
                      <CropPill
                        key={`mobile-${groupIdx}-${item}`}
                        label={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : normalizedCrops.length > 0 ? (
          /* Vegetable Seeds Layout */
          <div className="flex w-full max-w-[1030px] flex-col items-center gap-y-4 rounded-[24px] bg-[#0D1A14] px-6 py-8 md:rounded-[32px] md:px-[56px] md:py-16">
            {hasStructuredRows ? (
              /* Preserved Explicit Rows */
              <div className="hidden w-full flex-col items-center gap-y-4 md:flex">
                {normalizedCrops.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4"
                  >
                    {row.map((crop, idx) => (
                      <CropPill
                        key={`${rowIndex}-${idx}-${crop}`}
                        label={crop}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              /* Centered Wrapping Grid for flat list or 1-item arrays */
              <div className="hidden max-w-[860px] flex-wrap items-center justify-center gap-x-3 gap-y-4 md:flex">
                {normalizedCrops.flat().map((crop, idx) => (
                  <CropPill key={`${idx}-${crop}`} label={crop} />
                ))}
              </div>
            )}

            {/* Mobile Layout */}
            <div className="mx-auto flex max-w-[310px] flex-wrap items-center justify-start gap-x-2 gap-y-4 md:hidden">
              {normalizedCrops.flat().map((crop, idx) => (
                <CropPill key={`mobile-${idx}-${crop}`} label={crop} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
