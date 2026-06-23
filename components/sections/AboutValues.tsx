import Image from "next/image";

const BRAND_VALUES = [
  {
    id: 1,
    title: "Farmer First",
    src: "/images/about/value-farmer-first.png",
    alt: "Farmer first smiling working in seed production",
  },
  {
    id: 2,
    title: "Innovation",
    src: "/images/about/value-innovation.png",
    alt: "Innovation in agricultural research greenhouse",
  },
  {
    id: 3,
    title: "Uncompromising Quality",
    src: "/images/about/value-quality.png",
    alt: "Uncompromising seed selection quality control",
  },
  {
    id: 4,
    title: "Research Backed",
    src: "/images/about/value-research.png",
    alt: "Research backed lab environment seed testing",
  },
];

export default function AboutValues() {
  return (
    <section className="w-full bg-[#F2F7F1] pb-12 md:pb-[100px]" id="values">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Header Block */}
        <div className="flex flex-col items-center gap-6 mb-8 md:mb-12">
          {/* Badge: Principles */}
          <div className="flex items-center gap-2 rounded-[30px] border border-solid border-[#E4E7EC] bg-[#F9FAFB] px-4 py-1.5 select-none w-max">
            <div className="bg-brand-active h-1.5 w-1.5 rounded-[2px] shrink-0" />
            <span className="text-[#195236] text-[12px] md:text-[14px] font-medium font-sans">
              The Principles That Guide Our Work
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[#0D1A14] text-[32px] leading-[38px] md:text-[48px] md:leading-[58px] font-medium text-center font-sans">
            Brand Values
          </h2>
        </div>

        {/* 2x2 Values Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-[368px] md:max-w-[820px] mx-auto w-full">
          {BRAND_VALUES.map((val) => (
            <div
              key={val.id}
              className="w-full bg-[#F9FAFB] border border-[#F2F4F7] rounded-[20px] md:rounded-[24px] p-3 md:p-4 pb-4 md:pb-6 flex flex-col items-center justify-between"
            >
              {/* Aspect Ratio Controlled Image Container */}
              <div className="w-full aspect-[365/264] relative rounded-[14px] md:rounded-[18px] overflow-hidden bg-neutral-100">
                <Image
                  src={val.src}
                  alt={val.alt}
                  fill
                  sizes="(max-width: 768px) 150px, 365px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-[#0D1A14] text-center font-sans font-medium text-[14px] md:text-[20px] mt-3 md:mt-[16px]">
                {val.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
