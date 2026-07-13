import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";
import BrandCardBorder from "./BrandCardBorder";

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
    <section className="w-full bg-[#F2F7F1] px-4 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-[100px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 md:gap-16">
        {/* Header */}
        <div className="flex w-full max-w-[900px] flex-col items-center justify-center gap-6 text-center">
          <SectionBadge variant="outline" showDot>
            {badge}
          </SectionBadge>
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="font-sans text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px]">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-2 max-w-[830px] font-sans text-[15px] leading-[24px] text-[#0D1A14]/65 md:text-[16px]">
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
                  "brand-card group relative h-full w-full",
                  variant === "default" ? "rounded-[20px]" : "rounded-[24px]"
                )}
              >
                <div
                  className={cn(
                    "flex h-full w-full flex-col gap-6 justify-start overflow-hidden rounded-[inherit] transition-all duration-300 md:gap-12",
                    variant === "light"
                      ? "border border-[#E4E7EC] bg-[#F9FAFB] p-8"
                      : variant === "dark"
                        ? "border border-white/5 bg-[#0F3221] p-8"
                        : "border border-[#0D1A14]/8 bg-white p-6 hover:shadow-md"
                  )}
                >
                  {/* Tag Badge or Number */}
                  {step.tag ? (
                    <SectionBadge variant="green" className="h-auto rounded-full border border-[#E4E7EC] py-1.5 text-[12px] leading-[18px]">
                      {step.tag}
                    </SectionBadge>
                  ) : (
                    step.number && (
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[18px] font-[500]",
                          variant === "dark"
                            ? "bg-[#A9E179] text-[#0D1A14]"
                            : "bg-[#195236] text-white"
                        )}
                      >
                        {step.number}
                      </div>
                    )
                  )}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <h3
                      className={cn(
                        "font-sans text-[20px] leading-[24px] font-medium md:text-[24px] md:leading-[29px]",
                        variant === "dark" ? "text-[#F2F7F1]" : "text-[#0D1A14]"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "font-sans text-[16px] leading-[24px]",
                        variant === "dark"
                          ? "text-[#F2F7F1]/70"
                          : "text-[#0D1A14]/65"
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                <BrandCardBorder
                  isDark={variant === "dark"}
                  strokeColor={
                    step.tag
                      ? "#a9e179"
                      : variant === "dark"
                        ? "#a9e179"
                        : "#195236"
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Quote */}
        {bottomQuote && (
          <div
            className={cn(
              "flex w-full items-center justify-center gap-4 pt-4 lg:justify-start",
              variant === "dark"
                ? "gap-6 border-none pt-0 md:gap-8"
                : "border-t border-[#0D1A14]/10"
            )}
          >
            <div
              className={cn(
                "h-[54px] w-[2px] shrink-0 rounded-[10px]",
                variant === "dark" ? "bg-[#0D1A14]" : "bg-[#195236]"
              )}
            />
            <p
              className={cn(
                "font-sans font-medium",
                variant === "dark"
                  ? "text-[24px] leading-[29px] text-[#0F3221] md:text-[32px] md:leading-[38px]"
                  : "text-[18px] text-[#0D1A14] md:text-[22px]"
              )}
            >
              {bottomQuote}
            </p>
          </div>
        )}

        {/* Optional Image Grid */}
        {images && images.length > 0 && (
          <div
            className="flex w-full snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 md:pb-0"
            data-lenis-prevent
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-[260px] w-[290px] shrink-0 snap-start overflow-hidden rounded-[24px] bg-neutral-200 sm:h-[350px] sm:w-[400px] md:h-[377px] md:w-full"
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
