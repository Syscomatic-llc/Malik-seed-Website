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
  const [displayedCount, setDisplayedCount] = useState(0);

  const badgeText = apiData?.vision_title || "";
  const visionText = apiData?.vision_description || "";

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

      const count = Math.floor(progress * visionText.length);
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
  }, [visionText]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-bg w-full pb-10 md:pb-[80px]"
      id="vision"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[20px] p-6 md:gap-8 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            {badgeText}
          </SectionBadge>

          <h2
            aria-label={visionText}
            className="max-w-[1111px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]"
          >
            {visionText.split("").map((char, i) => (
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
        </div>
      </div>
    </section>
  );
}
