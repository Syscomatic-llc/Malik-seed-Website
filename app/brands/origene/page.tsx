import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import { origeneData } from "@/data/brands/origene";
import { Metadata } from "next";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

export const metadata: Metadata = {
  title: origeneData.meta.title,
  description: origeneData.meta.description,
};

export default function OrigenePage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      <BrandHero {...origeneData.hero} />
      <BrandIntro {...origeneData.intro} />
      <BrandGrid {...origeneData.grid} />
      
      {/* THE PROBLEM WE'RE SOLVING */}
      <section className="w-full py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px] bg-[#0D1A14]">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-[56px]">
          {/* Left Column: Text + Stat Card */}
          <div className="w-full lg:max-w-[576px] lg:h-[714px] shrink-0 flex flex-col justify-between items-start gap-8 lg:gap-0">
            {/* Badge */}
            <SectionBadge variant="dark" showDot className="mb-2">
              {origeneData.split1.badge}
            </SectionBadge>

            {/* Title */}
            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-left whitespace-pre-line text-white">
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
            <div className="w-full p-8 md:p-12 bg-[#0F3221] rounded-[24px] border border-white/5 flex flex-col gap-2 mt-2">
              <div
                className="text-[48px] md:text-[56px] leading-[120%] tracking-[4px] font-bold text-[#A9E179] font-sans"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {origeneData.split1.statCard.value}
              </div>
              <div className="text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#F2F7F1]/90 font-sans">
                {origeneData.split1.statCard.label}
              </div>
            </div>

            {/* Description */}
            <div className="font-sans text-[16px] leading-[24px] flex flex-col gap-4 text-left text-[#F2F7F1]/70">
              {origeneData.split1.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:max-w-[608px] lg:h-[714px] h-[220px] relative overflow-hidden rounded-[20px] lg:rounded-[24px] bg-neutral-200 shrink-0">
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

      <BrandProcess
        {...origeneData.process1}
        variant="dark"
      />
      <BrandProcess
        {...origeneData.process2}
        variant="default"
      />
      <BrandSplit
        {...origeneData.split2}
        bgTheme="dark"
        layout="centered"
        image={undefined}
      />
    </div>
  );
}
