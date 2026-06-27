import { SectionBadge } from "@/components/ui/SectionBadge";

const CROPS = [
  "Cauliflower",
  "Cabbage",
  "Kohlrabi",
  "Broccoli",
  "Beet Root",
  "Tomato",
  "Chilli",
  "Brinjal",
  "Cucumber",
  "Gourds",
  "Pumpkin",
  "Radish",
  "Carrot",
  "Okra",
  "Yard Long Bean",
  "Capsicum",
  "Papaya",
  "Watermelon",
  "and more...",
];

export default function BrandCropPortfolio() {
  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10 md:gap-14">
        
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[800px]">
          <SectionBadge>Seed Portfolio</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
            Bangladesh’s Trusted Vegetable Seed Portfolio
          </h2>
          <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-[#0D1A14]/65">
            A carefully curated range of high-value vegetable crops selected for what performs in Bangladesh's fields.
          </p>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CROPS.map((crop, index) => {
            const isMore = crop === "and more...";
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-5 py-4 rounded-[20px] border transition-all duration-300 ${
                  isMore
                    ? "bg-[#195236] border-[#195236] text-white hover:bg-[#153e28]"
                    : "bg-white border-[#0D1A14]/8 text-[#0D1A14] hover:border-[#195236]/30 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {!isMore && (
                  <span className="h-2 w-2 rounded-full bg-[#195236] shrink-0" />
                )}
                <span
                  className={`font-sans font-semibold text-[15px] leading-tight ${
                    isMore ? "text-white" : "text-[#0D1A14]"
                  }`}
                >
                  {crop}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
