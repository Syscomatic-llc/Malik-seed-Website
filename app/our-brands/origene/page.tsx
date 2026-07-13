import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import { origeneData } from "@/data/brands/origene";
import { Metadata } from "next";
import Image from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";

export const metadata: Metadata = {
  title: origeneData.meta.title,
  description: origeneData.meta.description,
};

export default function OrigenePage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...origeneData.hero} />
      <BrandIntro {...origeneData.intro} />
      <BrandGrid {...origeneData.grid} />

      {/* THE PROBLEM WE'RE SOLVING */}
      <section className="w-full bg-[#0D1A14] px-4 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-[100px]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-[56px]">
          {/* Left Column: Text + Stat Card */}
          <div className="flex w-full shrink-0 flex-col items-start justify-between gap-8 lg:h-[714px] lg:max-w-[576px] lg:gap-0">
            {/* Badge */}
            <SectionBadge variant="dark" showDot className="mb-2">
              {origeneData.split1.badge}
            </SectionBadge>

            {/* Title */}
            <div className="flex flex-col gap-4">
              <h2 className="text-left font-sans text-[32px] leading-[38px] font-medium whitespace-pre-line text-white md:text-[48px] md:leading-[58px]">
                {origeneData.split1.title.map((part, i) => {
                  if (part.includes("\n")) {
                    return (
                      <span key={i} className="text-[#A9E179]">
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
              </h2>
            </div>

            {/* Stat Card Highlight */}
            <div className="mt-2 flex w-full flex-col gap-2 rounded-[24px] border border-white/5 bg-[#0F3221] p-8 md:p-12">
              <div
                className="font-sans text-[48px] leading-[120%] font-bold tracking-[4px] text-[#A9E179] md:text-[56px]"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {origeneData.split1.statCard.value}
              </div>
              <div className="font-sans text-[14px] leading-[22px] text-[#F2F7F1]/90 md:text-[16px] md:leading-[24px]">
                {origeneData.split1.statCard.label}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4 text-left font-sans text-[16px] leading-[24px] text-[#F2F7F1]/70">
              {origeneData.split1.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[20px] bg-neutral-200 lg:h-[714px] lg:max-w-[608px] lg:rounded-[24px]">
            <Image
              src={origeneData.split1.image}
              alt={origeneData.split1.title.join(" ").replace(/\n/g, "")}
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 608px"
              priority
            />
          </div>
        </div>
      </section>

      <BrandProcess {...origeneData.process1} variant="dark" />
      <BrandProcess {...origeneData.process2} variant="default" />
      <BrandSplit
        {...origeneData.split2}
        bgTheme="dark"
        layout="centered"
        image={undefined}
      />
    </div>
  );
}
