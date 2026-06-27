import { SectionBadge } from "@/components/ui/SectionBadge";
import { Card } from "@/components/ui/card";

const CROPS = [
  ["Cauliflower", "Cabbage", "Kohlrabi"],
  ["Broccoli", "Beet Root", "Tomato", "Chilli", "Brinjal", "Cucumber"],
  ["Gourds", "Pumpkin", "Radish", "Carrot", "Okra", "Yard Long Bean"],
  ["Capsicum", "Papaya", "Watermelon", "and more..."],
];

function CropPill({ label }: { label: string }) {
  return (
    <Card className="w-fit shrink-0 flex items-center justify-center h-[37px] px-[18px] rounded-[30px] border border-white/[0.16] bg-transparent hover:border-[#A9E179]/60 hover:scale-105 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
      <span className="font-sans font-medium text-[14px] leading-[21px] text-[#A9E179] whitespace-nowrap">
        {label}
      </span>
    </Card>
  );
}

export default function BrandCropPortfolio() {
  return (
    <section className="w-full bg-[#F2F7F1] pt-10 pb-10 md:pt-[60px] md:pb-[60px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 md:gap-12">

        {/* Header */}
        <div className="flex flex-col gap-8 items-center text-center max-w-[800px]">
          <SectionBadge showDot variant="outline">Seed Portfolio</SectionBadge>
          <div className="flex flex-col gap-4 items-center">
            <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14]">
              Bangladesh’s Trusted Vegetable Seed Portfolio
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/75 max-w-[520px] mx-auto">
              A carefully curated range of high-value vegetable crops selected for what performs in Bangladesh's fields.
            </p>
          </div>
        </div>

        {/* Crops Container */}
        <div className="flex flex-col items-center gap-y-4 max-w-[1030px] w-full bg-[#0D1A14] rounded-[24px] md:rounded-[32px] py-8 px-6 md:py-16 md:px-[56px]">
          {CROPS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap hidden md:flex justify-center  items-center gap-x-3 gap-y-4"
              >
                {row.map((crop, idx) => (
                  <CropPill key={`${rowIndex}-${crop}`} label={crop} />
                ))}
              </div>      
          ))}

          <div
            key={"mobile"}
            className="md:hidden flex flex-wrap justify-start  items-center gap-x-3 gap-y-4"
          >
            {CROPS.flat().map((crop) => (
              <CropPill key={`mobile-${crop}`} label={crop} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}