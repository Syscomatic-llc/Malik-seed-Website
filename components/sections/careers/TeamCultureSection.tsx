import { memo } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { teamCultureData } from "@/data/career-data";

export default memo(function TeamCultureSection({
  data,
}: {
  data: typeof teamCultureData;
}) {
  const { images } = data;
  const [wide, narrow, ...thirds] = images;

  return (
    <section
      id="team-culture"
      aria-label="Building a Team of A-Players"
      className="bg-brand-bg w-full overflow-hidden py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* ── Header and Grid container ── */}
        <div className="mx-auto max-w-[1240px] px-4 xl:px-0">
          {/* ── Header ── */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <SectionBadge variant="outline" showDot dotSize="6px">
              {data.badge}
            </SectionBadge>
            <h2 className="font-inter-tight text-brand-dark text-center text-[32px] leading-[1.2] font-medium tracking-tight md:text-[48px] md:leading-[58px]">
              {data.title}
            </h2>
          </div>

          {/* ── Photo Grid (Desktop/Tablet: md and above) ── */}
          <div className="hidden flex-col gap-6 md:flex">
            {/* Row 1: 768 + 448 */}
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Wide image */}
              <div
                className="group relative overflow-hidden rounded-[24px] bg-[#F2F4F7]"
                style={{ height: 380, flex: "1 1 62%" }}
              >
                <Image
                  src={wide.src}
                  alt={wide.alt}
                  fill
                  sizes="(min-width: 1280px) 768px, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {/* Narrow image */}
              <div
                className="group relative overflow-hidden rounded-[24px] bg-[#F2F4F7]"
                style={{ height: 380, flex: "1 1 36%" }}
              >
                <Image
                  src={narrow.src}
                  alt={narrow.alt}
                  fill
                  sizes="(min-width: 1280px) 448px, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Row 2: 3 × equal */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {thirds.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[24px] bg-[#F2F4F7]"
                  style={{ height: 380 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1280px) 398px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: Infinite auto-scroll Marquee (mobile only: md:hidden) ── */}
        <div className="relative mt-8 w-full overflow-hidden md:hidden">
          <div className="animate-marquee flex gap-4 hover:[animation-play-state:paused]">
            {[...images, ...images].map((img, i) => (
              <div
                key={i}
                className="group relative h-[290px] w-[280px] flex-shrink-0 overflow-hidden rounded-[20px] bg-[#F2F4F7]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="280px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
