"use client";

import { memo, useRef, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { futureProgramData } from "@/data/career-data";
import { hiringApi } from "@/lib/api";
import { z } from "zod";

// Zod validation schema for CV upload (PDF, DOC, DOCX)
const cvSchema = z.object({
  file: z
    .instanceof(File, { message: "Please select a file." })
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.toLowerCase().endsWith(".pdf") ||
        file.name.toLowerCase().endsWith(".doc") ||
        file.name.toLowerCase().endsWith(".docx"),
      {
        message: "Only PDF, DOC, and DOCX files are allowed.",
      }
    )
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
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleButtonClick = () => {
    if (isSubmitting) return;
    if (!file) {
      fileInputRef.current?.click();
    } else {
      handleUpload();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const result = cvSchema.safeParse({ file: selectedFile });
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid file.");
      setFile(null);
    } else {
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      await hiringApi.uploadResume(formData, "future_leader");
      setIsSubmitted(true);
      setFile(null);
    } catch (err: any) {
      console.error("Failed to upload CV:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          {data.image ? (
            <div className="relative h-[280px] w-full max-w-[503px] self-center overflow-hidden rounded-[20px] bg-white sm:h-[380px] lg:h-[435px] lg:w-[503px] lg:shrink-0 lg:self-auto">
              <OptimizedImage
                src={data.image}
                alt="Future Leader Program - Malik Seeds"
                fill
                sizes="(max-width: 1024px) 100vw, 503px"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </div>

        {/* ── Center-aligned button block (centered on the page in width) ── */}
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 lg:mt-8">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="hidden"
            aria-label="Upload your CV (PDF, DOC, DOCX)"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isSubmitting}
            className="font-inter inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A9E179] px-6 text-[16px] font-medium text-[#0D1A14] transition-all hover:bg-[#A9E179]/90 focus:ring-2 focus:ring-[#A9E179] focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50"
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
            <span>{isSubmitting ? "Submitting..." : file ? "Submit CV" : data.cta.label}</span>
          </button>

          {/* Validation Messages */}
          {file && !isSubmitting && (
            <p className="font-inter mt-1 text-[14px] text-brand-light-green">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
          {error && (
            <p
              className="font-inter mt-1 text-[14px] text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Success Modal Overlay */}
      {isSubmitted && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="flp-success-modal-title"
          aria-describedby="flp-success-modal-desc"
        >
          <div className="bg-[#0D1A14] border border-[#E4E7EC]/10 animate-in zoom-in-95 mx-4 flex w-full max-w-md flex-col items-center gap-6 rounded-3xl p-8 text-center shadow-2xl duration-200">
            {/* Green Circle Checkmark Icon */}
            <div className="bg-[#A9E179] text-[#0D1A14] flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-md">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-2">
              <h2
                id="flp-success-modal-title"
                className="text-[20px] font-medium tracking-tight text-white"
              >
                CV Uploaded Successfully!
              </h2>
              <p
                id="flp-success-modal-desc"
                className="text-[14px] text-gray-400"
              >
                Thank you for your interest in Malik Seeds. We have received your CV/Resume and our team will review it.
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#A9E179] text-[#0D1A14] hover:bg-[#A9E179]/90 w-full cursor-pointer rounded-full px-6 py-2.5 font-medium transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-[#A9E179] active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </section>
  );
});
