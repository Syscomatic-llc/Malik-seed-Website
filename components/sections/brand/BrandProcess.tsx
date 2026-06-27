import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

interface BrandProcessProps {
  badge: string;
  title: string;
  description: string;
  steps: StepItem[];
  images?: string[];
  bottomQuote?: string;
}

export default function BrandProcess({
  badge,
  title,
  description,
  steps,
  images,
  bottomQuote,
}: BrandProcessProps) {
  const stepCols =
    steps.length === 3
      ? "md:grid-cols-3"
      : steps.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[900px]">
          <SectionBadge>{badge}</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
            {title}
          </h2>
          {description && (
            <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-[#0D1A14]/65">
              {description}
            </p>
          )}
        </div>

        {/* Steps */}
        {steps.length > 0 && (
          <div className={`grid grid-cols-1 ${stepCols} gap-6 md:gap-5 lg:gap-6`}>
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 rounded-[20px] bg-white border border-[#0D1A14]/8 hover:border-[#195236]/30 hover:shadow-md transition-all duration-300"
              >
                {/* Number */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#195236] text-white font-sans font-bold text-[18px] shrink-0">
                  {step.number}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-[17px] md:text-[19px] font-semibold text-[#0D1A14] leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[22px] text-[#0D1A14]/65">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Quote */}
        {bottomQuote && (
          <div className="flex items-center gap-4 pt-4 border-t border-[#0D1A14]/10">
            <div className="w-[3px] h-10 bg-[#195236] shrink-0 rounded-full" />
            <p className="font-sans text-[18px] md:text-[22px] font-medium text-[#0D1A14]">
              {bottomQuote}
            </p>
          </div>
        )}

        {/* Optional Image Grid */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-[260px] sm:h-[350px] md:h-[377px] overflow-hidden rounded-[20px] bg-neutral-200"
              >
                <Image
                  src={img}
                  alt={`Process detail ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 608px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
