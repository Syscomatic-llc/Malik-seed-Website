"use client";

import { memo, useRef, useState } from "react";
import Image from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { futureProgramData } from "@/data/career-data";
import { z } from "zod";

// Zod validation schema for PDF file upload
const cvSchema = z.object({
  file: z
    .instanceof(File, { message: "Please select a file." })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must not exceed 5MB.",
    }),
});

export default memo(function FutureProgramSection({
  data,
}: {
  data: typeof futureProgramData;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = cvSchema.safeParse({ file });
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid file.");
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(`CV "${file.name}" uploaded successfully!`);
    }
  };

  return (
    <section
      id="future-leader-program"
      aria-label="Future Leader Program"
      className="bg-brand-dark relative w-full overflow-hidden py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-8 xl:px-[100px]">
        {/* Main layout container (text left, image right on desktop) */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-stretch lg:gap-[137px]">
          {/* ── Left column: text ── */}
          <div
            className="flex w-full flex-col gap-12 lg:flex-1"
            style={{ maxWidth: 600 }}
          >
            {/* Header: badge + title */}
            <div className="flex flex-col items-start gap-4">
              <SectionBadge variant="dark" showDot dotSize="8px">
                {data.badge}
              </SectionBadge>
              <h2 className="font-inter-tight text-brand-light-green text-[32px] leading-[1.2] font-medium tracking-tight md:text-[48px] md:leading-[58px]">
                {data.title}
              </h2>
            </div>

            {/* Body paragraphs */}
            <div className="flex flex-col gap-4">
              {data.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-inter text-brand-bg text-[16px] leading-[24px]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── Right column: photo card (visible on mobile lower side, right on desktop) ── */}
          <div className="relative h-[280px] w-full max-w-[503px] self-center overflow-hidden rounded-[20px] bg-white sm:h-[380px] lg:h-[435px] lg:w-[503px] lg:shrink-0 lg:self-auto">
            <Image
              src={data.image}
              alt="Future Leader Program - Malik Seeds"
              fill
              sizes="(max-width: 1024px) 100vw, 503px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ── Center-aligned button block (centered on the page in width) ── */}
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 lg:mt-8">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload your CV (PDF only)"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="font-inter inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A9E179] px-6 text-[16px] font-medium text-[#0D1A14] transition-all hover:bg-[#A9E179]/90 focus:ring-2 focus:ring-[#A9E179] focus:outline-none active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>{data.cta.label}</span>
          </button>

          {/* Validation Messages */}
          {error && (
            <p
              className="font-inter mt-1 text-[14px] text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
          {success && (
            <p
              className="font-inter mt-1 text-[14px] text-green-400"
              role="status"
            >
              {success}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});
