import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

interface StepItem {
  number?: string;
  tag?: string;
  title: string;
  description: string;
}

interface BrandProcessProps {
  badge: string;
  title: string;
  description?: string;
  steps: StepItem[];
  images?: string[];
  bottomQuote?: string;
  variant?: "default" | "light" | "dark";
}

export default function BrandProcess({
  badge,
  title,
  description,
  steps,
  images,
  bottomQuote,
  variant = "default",
}: BrandProcessProps) {
  const stepCols =
    steps.length === 3
      ? "md:grid-cols-3"
      : steps.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="w-full bg-[#F2F7F1] py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 md:gap-16">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center gap-6 max-w-[900px] w-full">
          <SectionBadge variant="outline" showDot>{badge}</SectionBadge>
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14]">
              {title}
            </h2>
            {description && (
              <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#0D1A14]/65 max-w-[830px] mx-auto mt-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Steps */}
        {steps.length > 0 && (
          <div className={`grid grid-cols-1 ${stepCols} gap-5 md:gap-6`}>
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-6 md:gap-12 transition-all duration-300",
                  variant === "light"
                    ? "bg-[#F9FAFB] border border-[#E4E7EC] p-8 rounded-[24px]"
                    : variant === "dark"
                      ? "bg-[#0F3221] border border-white/5 p-8 rounded-[24px]"
                      : "bg-white border border-[#0D1A14]/8 hover:border-[#195236]/30 hover:shadow-md p-6 rounded-[20px]"
                )}
              >
                {/* Tag Badge or Number */}
                {step.tag ? (
                  <div className="flex w-fit items-center justify-center rounded-full bg-[#EAF3DE] border border-[#E4E7EC] px-4 py-1.5 font-sans font-medium text-[12px] leading-[18px] text-[#0F3221] shrink-0">
                    {step.tag}
                  </div>
                ) : (
                  step.number && (
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full font-sans font-[500] text-[18px] shrink-0",
                      variant === "dark"
                        ? "bg-[#A9E179] text-[#0D1A14]"
                        : "bg-[#195236] text-white"
                    )}>
                      {step.number}
                    </div>
                  )
                )}
                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className={cn(
                    "font-sans text-[20px] md:text-[24px] font-medium leading-[24px] md:leading-[29px]",
                    variant === "dark" ? "text-[#F2F7F1]" : "text-[#0D1A14]"
                  )}>
                    {step.title}
                  </h3>
                  <p className={cn(
                    "font-sans text-[16px] leading-[24px]",
                    variant === "dark" ? "text-[#F2F7F1]/70" : "text-[#0D1A14]/65"
                  )}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Quote */}
        {bottomQuote && (
          <div className={cn(
            "flex items-center gap-4 pt-4 w-full justify-center lg:justify-start",
            variant === "dark" ? "border-none pt-0 gap-6 md:gap-8" : "border-t border-[#0D1A14]/10"
          )}>
            <div className={cn(
              "w-[2px] h-[54px] shrink-0 rounded-[10px]",
              variant === "dark" ? "bg-[#0D1A14]" : "bg-[#195236]"
            )} />
            <p className={cn(
              "font-sans font-medium",
              variant === "dark"
                ? "text-[24px] md:text-[32px] leading-[29px] md:leading-[38px] text-[#0F3221]"
                : "text-[18px] md:text-[22px] text-[#0D1A14]"
            )}>
              {bottomQuote}
            </p>
          </div>
        )}

        {/* Optional Image Grid */}
        {images && images.length > 0 && (
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-5 md:gap-6 w-full pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-[260px] sm:h-[350px] md:h-[377px] w-[290px] sm:w-[400px] md:w-full shrink-0 snap-start overflow-hidden rounded-[24px] bg-neutral-200"
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
