"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Md. Kobbat Hossain Ovi",
    location: "Maitka, Hemayetpur, Savar",
    role: "Broccoli Farmer",
    quote:
      "After losing his father in 2003, he carried my family through farming and Malik Seeds has been with him all the way. Green Crown variety has a special place in his broccoli project.",
    initials: "KO",
    colorClass: "bg-brand-light-green text-brand-active",
  },
  {
    id: 2,
    name: "Md. Rafiqul Islam Rafiq",
    location: "Nabagram, Baldhara, Singair",
    role: "Companion Cropping Farmer",
    quote:
      "22 years abroad, then back to the soil. He learned about companion cropping from our FB page and now farms multiple varieties successfully.",
    initials: "RR",
    colorClass: "bg-brand-active text-brand-bg",
  },
  {
    id: 3,
    name: "Md. Jangir Alam",
    location: "Brahmankanda",
    role: "PurpleBeauty Grower",
    quote:
      "Became talk of the town after harvesting PurpleBeauty in only 60 days, and within 120 days, total production reached 4.5 tons.",
    initials: "JA",
    colorClass: "bg-brand-light-green text-brand-active",
  },
  {
    id: 4,
    name: "Md. Saiful Islam",
    location: "Sakrail, Garpara, Sadar, Manikganj",
    role: "Ice Green Cucumber Farmer",
    quote:
      "Ex-electrician turned farmer. In 2021, I bet 1.3 lakh on Malik Seeds' Ice Green cucumber and walked away with 3.0 lakh revenue.",
    initials: "SI",
    colorClass: "bg-brand-active text-brand-bg",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="w-full overflow-hidden bg-brand-bg py-16 md:py-[118px]" id="testimonials">
      <div className="mx-auto max-w-[1440px] px-4">
        {/* Header — Figma: "Voice of Impact" centered, with "Success stories" badge */}
        <div className="mb-10 flex flex-col items-center gap-4 md:mb-16">
          {/* Badge — Figma: 175x33, bg #F9FAFB, border #E4E7EC, radius 30px */}
          <div className="flex items-center gap-2 rounded-[30px] border border-neutral-200 bg-[#F9FAFB] px-4 py-2">
            <div className="h-[6px] w-[6px] rounded-sm bg-brand-active" />
            <span className="font-inter text-[14px] font-medium leading-[21px] text-brand-active">
              Success stories
            </span>
          </div>

          {/* Title — Figma: "Voice of Impact", 48px, #0D1A14, center */}
          <h2 className="text-h2-title text-center text-brand-dark">
            Voice of Impact
          </h2>
        </div>

        {/* Cards carousel — Figma: 5 cards, 398x480-560, bg #F9FAFB, radius 32px */}
        <div className="relative">
          {/* Desktop: show all visible scrolling */}
          <div className="hidden gap-6 md:flex md:overflow-hidden">
            {testimonials.map((t, idx) => {
              const isActive = idx === activeIndex;
              const offset = idx - activeIndex;
              return (
                <div
                  key={t.id}
                  className={cn(
                    "flex shrink-0 flex-col justify-between rounded-[32px] bg-[#F9FAFB] p-8 transition-all duration-500",
                    isActive ? "w-[398px] opacity-100 shadow-sm" : "w-[360px] opacity-60"
                  )}
                  style={{
                    height: isActive ? "560px" : "480px",
                    transform: `translateX(${offset * -20}px)`,
                  }}
                >
                  <div className="flex flex-col gap-6">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="fill-current text-brand-light-green"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="font-inter text-[16px] leading-[26px] text-brand-dark/80">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[16px] font-bold", t.colorClass)}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-sans text-[16px] font-semibold leading-[22px] text-brand-dark">
                        {t.name}
                      </p>
                      <p className="font-inter text-[14px] leading-[20px] text-brand-dark/60">
                        {t.role} · {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            {testimonials.map((t, idx) => {
              if (idx !== activeIndex) return null;
              return (
                <div
                  key={t.id}
                  className="flex flex-col justify-between rounded-[24px] bg-[#F9FAFB] p-6"
                  style={{ minHeight: "360px" }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" className="fill-current text-brand-light-green" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="font-inter text-[15px] leading-[24px] text-brand-dark/80">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold", t.colorClass)}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-sans text-[15px] font-semibold text-brand-dark">{t.name}</p>
                      <p className="font-inter text-[13px] text-brand-dark/60">{t.role} · {t.location}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows — Figma: two 48x48 circle buttons */}
        <div className="mt-8 flex justify-center gap-4 md:mt-12">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-200 transition-colors hover:bg-brand-active hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-active text-white transition-opacity hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

