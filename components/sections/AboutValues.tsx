import Image from "next/image";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const BRAND_VALUES = [
  {
    id: 1,
    title: "Farmer First",
    src:   "/images/about/value-farmer-first.png",
    alt:   "Farmer first — smiling worker in seed production fields",
  },
  {
    id: 2,
    title: "Innovation",
    src:   "/images/about/value-innovation.png",
    alt:   "Innovation — agricultural research inside a greenhouse",
  },
  {
    id: 3,
    title: "Uncompromising Quality",
    src:   "/images/about/value-quality.png",
    alt:   "Uncompromising quality — seed selection and quality control",
  },
  {
    id: 4,
    title: "Research Backed",
    src:   "/images/about/value-research.png",
    alt:   "Research backed — lab environment for seed testing",
  },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutValues() {
  return (
    <section className="w-full bg-brand-bg pb-12 md:pb-[100px]" id="values">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">

        {/* Section header */}
        <div className="flex flex-col items-center gap-6 mb-8 md:mb-12">
          <div className="flex items-center gap-2 rounded-[30px] border border-brand-border bg-brand-neutral-light px-4 py-1.5 select-none w-max">
            <div className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-brand-active" />
            <span className="font-sans text-brand-active text-[12px] font-medium md:text-[14px]">
              The Principles That Guide Our Work
            </span>
          </div>

          <h2 className="font-sans font-medium text-center text-brand-dark text-[32px] leading-[38px] md:text-[48px] md:leading-[58px]">
            Brand Values
          </h2>
        </div>

        {/* 2 × 2 values grid */}
        <div className="grid grid-cols-2 gap-3 max-w-[368px] mx-auto w-full md:gap-6 md:max-w-[820px]">
          {BRAND_VALUES.map((val) => (
            <div
              key={val.id}
              className="w-full bg-brand-neutral-light border border-brand-border-light rounded-[20px] p-3 pb-4 flex flex-col items-center justify-between md:rounded-[24px] md:p-4 md:pb-6"
            >
              {/* Fixed-ratio image */}
              <div className="w-full aspect-[365/264] relative rounded-[14px] overflow-hidden bg-neutral-100 md:rounded-[18px]">
                <Image
                  src={val.src}
                  alt={val.alt}
                  fill
                  sizes="(max-width: 768px) 150px, 365px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="font-sans font-medium text-center text-brand-dark text-[14px] mt-3 md:text-[20px] md:mt-4">
                {val.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
