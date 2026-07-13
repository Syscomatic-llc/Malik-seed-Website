"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "../ui/SectionBadge";
import { ApiOurStoryMission } from "@/lib/api";

interface AboutMissionOneProps {
  apiData?: ApiOurStoryMission | null;
}

const DEFAULT_TEXT =
  "To lead a new era of agriculture in Bangladesh where innovation serves every farmer, and trust grows with every harvest";

export default function AboutMissionOne({ apiData }: AboutMissionOneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(0);

  const badgeText = apiData?.title || "OUR VISION";
  const missionText = apiData?.description || DEFAULT_TEXT;

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
      className="bg-brand-bg w-full pb-10 md:pb-[80px]"
      id="mission"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[20px] p-6 md:gap-8 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            {badgeText}
          </SectionBadge>

          <h2
            aria-label={missionText}
            className="max-w-[1111px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]"
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
        </div>
      </div>
    </section>
  );
}
