import Image from "next/image";
import { ScrollIndicator } from "../HeroSection";
import { memo } from "react";

interface BrandHeroProps {
  title: string;
  bgImage: string;
}

const BrandHeroOverlays = memo(function HeroOverlays() {
  return (
    <>
      {/* --- Desktop overlays --- */}

      {/* Rectangle 1: blur overlay at very bottom */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 left-0 z-20 w-full"
        style={{
          height: 284,
          background:
            "linear-gradient(180deg, rgba(13, 26, 20, 0.00) 0%, #0D1A14 100%)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
        }}
      />
    </>
  );
});

export default function BrandHero({ title, bgImage }: BrandHeroProps) {
  const lines = title.split("\n");

  return (
    <section className="relative w-full h-[576px] md:h-[720px] lg:h-[820px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#0d1a14]">
        <Image
          src={bgImage}
          alt={title.replace(/\n/g, " ")}
          fill
          priority
          className="object-cover object-center opacity-90 transition-transform duration-[1200ms] ease-out hover:scale-105"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

      {/* Hero Content */}
      <div className="relative z-30 w-full px-4 md:px-8 lg:px-[100px] pb-10 md:pb-16 lg:pb-[88px]">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center md:items-start gap-6 md:gap-10 lg:gap-14">
          <h1 className="font-sans text-[48px] md:text-[72px] lg:text-[96px] font-bold text-center md:text-left leading-[48px] md:leading-[72px] lg:leading-[96px] text-white tracking-tight uppercase">
            {lines.map((line, i) => (
              <span key={i}
                className={`${i === 1 ? "text-[#A9E179]" : ""}`}
              >
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Scroll Indicator */}
          <div className="mt-6 md:mt-10">
            <ScrollIndicator />
          </div>
        </div>
      </div>

      <BrandHeroOverlays />
    </section>
  );
}
