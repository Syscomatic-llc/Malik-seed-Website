"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "../ui/SectionBadge";

// ---------------------------------------------------------------------------
// Full text — typed out entirely on scroll trigger
// ---------------------------------------------------------------------------
const FULL_TEXT =
  "Helping farmers grow with confidence, by providing the highest quality seeds, research backed knowledge and hands on support, season after season";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutMissionTwo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(0);

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

  // Typing effect — duration-based: always finishes in ~3 s desktop / ~2 s mobile
  useEffect(() => {
    if (!started) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const targetMs = isMobile ? 2000 : 3000;
    const delay = Math.max(8, Math.round(targetMs / FULL_TEXT.length));

    let frame: ReturnType<typeof setTimeout>;

    const type = (index: number) => {
      if (index > FULL_TEXT.length) return;
      setDisplayedCount(index);
      frame = setTimeout(() => type(index + 1), delay);
    };

    type(0);
    return () => clearTimeout(frame);
  }, [started]);

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

          {/*
            Before scroll  → displayedCount = 0  → full text shown muted
            While typing   → typedPart grows bright, mutedPart shrinks muted
            After typing   → full text bright, no cursor
          */}
          {/*
            Each character lives in its own <span> so the browser always
            lays out the FULL text — word-wrapping never shifts as typing
            progresses. Only the color changes per character.
          */}
          <h2
            aria-label={FULL_TEXT}
            className="max-w-[1128px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]"
          >
            {FULL_TEXT.split("").map((char, i) => (
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
            <Image
              src="/images/about/maliks_farm_new_3_1.png"
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
