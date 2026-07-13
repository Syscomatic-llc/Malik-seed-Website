"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/OptimizedImage";
import { SectionBadge } from "../ui/SectionBadge";
import { resolveImageUrl } from "@/lib/utils";
import { ApiOurStoryMission } from "@/lib/api";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface AboutMissionTwoProps {
  apiData?: ApiOurStoryMission | null;
}

const DEFAULT_TEXT =
  "Helping farmers grow with confidence, by providing the highest quality seeds, research backed knowledge and hands on support, season after season";

export default function AboutMissionTwo({ apiData }: AboutMissionTwoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(0);

  const missionText = apiData?.vision_description || DEFAULT_TEXT;
  const bannerImage = apiData?.image_url
    ? resolveImageUrl(apiData.image_url)
    : "/images/about/maliks_farm_new_3_1.png";

  // Trigger once when section is ≥ 30 % visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing effect — duration-based: always finishes in ~1.2 s desktop / ~0.8 s mobile
  useEffect(() => {
    if (!started) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const targetMs = isMobile ? 800 : 1200;
    const delay = Math.max(4, Math.round(targetMs / missionText.length));

    let frame: ReturnType<typeof setTimeout>;

    const type = (index: number) => {
      if (index > missionText.length) return;
      setDisplayedCount(index);
      frame = setTimeout(() => type(index + 1), delay);
    };

    type(0);
    return () => clearTimeout(frame);
  }, [started, missionText]);

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
                className={
                  i < displayedCount
                    ? "text-brand-light-green"
                    : "text-brand-light-green/50"
                }
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
