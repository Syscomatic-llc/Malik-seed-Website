"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "../ui/SectionBadge";

// ---------------------------------------------------------------------------
// Full h2 text — typed out on scroll
// ---------------------------------------------------------------------------
const FULL_TEXT =
  "To lead a new era of agriculture in Bangladesh where innovation serves every farmer, and trust grows with every harvest";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutMissionOne() {
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
      className="bg-brand-bg w-full pb-10 md:pb-[80px]"
      id="mission"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[20px] p-6 md:gap-8 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            OUR VISION
          </SectionBadge>

          {/*
            Before scroll → all text muted (displayedCount = 0, mutedPart = full text)
            While typing  → bright chars grow, muted tail shrinks
            After typing  → full text bright, no cursor
          */}
          {/*
            Each character lives in its own <span> so the browser always
            lays out the FULL text — word-wrapping never shifts as typing
            progresses. Only the color changes per character.
          */}
          <h2
            aria-label={FULL_TEXT}
            className="max-w-[1111px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]"
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
        </div>
      </div>
    </section>
  );
}
