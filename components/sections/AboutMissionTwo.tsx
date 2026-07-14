"use client";

import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "../ui/SectionBadge";
import { resolveImageUrl } from "@/lib/utils";
import { ApiOurStoryMission } from "@/lib/api";

interface AboutMissionTwoProps {
  apiData?: ApiOurStoryMission | null;
}

const DEFAULT_TEXT =
  "Helping farmers grow with confidence, by providing the highest quality seeds, research backed knowledge and hands on support, season after season";

export default function AboutMissionTwo({ apiData }: AboutMissionTwoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayedCount, setDisplayedCount] = useState(0);

  const missionText = apiData?.vision_description || DEFAULT_TEXT;
  const bannerImage = apiData?.image_url
    ? resolveImageUrl(apiData.image_url)
    : "/images/about/maliks_farm_new_3_1.png";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start revealing when the top of the text section enters the bottom 85% of viewport
      const start = viewportHeight * 0.85;
      // Complete the reveal when the top of the text reaches the top 35% of viewport
      const end = viewportHeight * 0.35;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      const count = Math.floor(progress * missionText.length);
      setDisplayedCount(count);
    };

    // Run initial calculation
    handleScroll();

    // Use IntersectionObserver to optimize performance, only listening to scroll when component is near
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll, { passive: true });
          window.addEventListener("resize", handleScroll, { passive: true });
          handleScroll();
        } else {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
        }
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [missionText]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-bg w-full pt-[100px] pb-12 md:pb-[100px]"
      id="vision"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start gap-8 overflow-hidden rounded-[24px] p-6 md:gap-16 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            OUR MISSION
          </SectionBadge>

          <h2
            aria-label={missionText}
            className="max-w-[1128px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]"
          >
            {missionText.split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`transition-colors duration-200 ${
                  i < displayedCount
                    ? "text-brand-light-green"
                    : "text-brand-light-green/20"
                }`}
              >
                {char}
              </span>
            ))}
          </h2>

          {/* Farm banner */}
          <div className="bg-brand-neutral-light/5 relative aspect-[310/200] w-full overflow-hidden rounded-[18px] md:aspect-[1128/532] md:rounded-[24px]">
            <OptimizedImage
              src={bannerImage}
              alt="Malik's Farm modern agriculture fields and seed trials"
              fill
              sizes="(max-width: 768px) 100vw, 1128px"
              className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
