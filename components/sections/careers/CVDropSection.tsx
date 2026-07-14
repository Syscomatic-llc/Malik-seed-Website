"use client";

import { memo, useRef, useState, DragEvent } from "react";
import NextImage from "next/image";
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

export default memo(function CVDropSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (isSubmitting) return;
    fileInputRef.current?.click();
  };

  const validateAndSetFile = (selectedFile: File) => {
    const result = cvSchema.safeParse({ file: selectedFile });
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid file.");
      setFile(null);
    } else {
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isSubmitting) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering file input click
    if (!file || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      await hiringApi.uploadResume(formData);
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
    <section className="w-full bg-[#F2F7F1] pt-12 pb-[100px] lg:pt-0 lg:pb-[100px]">
      <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
        <div className="relative w-full rounded-[24px] border border-[#E4E7EC] bg-[#0D1A14] px-4 py-8 md:px-15 md:py-16 lg:rounded-[32px]">
          <div className="mx-auto flex max-w-[910px] flex-col items-center gap-[32px] md:gap-[48px]">
            {/* Title */}
            <h2 className="font-inter-tight max-w-[650px] text-center text-[24px] leading-[28.8px] font-medium text-[#F2F7F1] md:text-[32px] md:leading-[38px]">
              Don&apos;t see a role suitable for you but interested in working
              at Malik Seeds?
            </h2>

            {/* Drag & Drop Area */}
            <div
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group/drop relative flex h-[128px] w-full max-w-[310px] cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed transition-all duration-300 md:h-[147px] md:max-w-[736px] ${
                isDragging
                  ? "border-[#A9E179] bg-[rgba(169,225,121,0.12)] shadow-[0_0_15px_rgba(169,225,121,0.2)]"
                  : "border-[rgba(117,188,67,0.4)] bg-[rgba(17,58,38,0.24)] hover:border-[#A9E179] hover:bg-[rgba(17,58,38,0.36)]"
              } ${isSubmitting ? "pointer-events-none opacity-50" : ""}`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                disabled={isSubmitting}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 transition-transform duration-300 group-hover/drop:scale-105">
                <NextImage
                  src="/images/careers/prime_upload.svg"
                  alt="Upload Icon"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="font-inter text-center text-[16px] leading-6 font-medium text-[#A9E179] md:text-[18px] md:leading-[27px] px-4">
                  {file ? `Selected: ${file.name}` : "Click or drop your CV here (PDF, DOC, DOCX)"}
                </span>
              </div>
            </div>

            {/* Actions Block */}
            <div className="flex flex-col items-center gap-4">
              {file && (
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isSubmitting}
                  className="font-inter inline-flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A9E179] px-8 text-[16px] font-medium text-[#0D1A14] transition-all hover:bg-[#A9E179]/90 focus:ring-2 focus:ring-[#A9E179] focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none"
                >
                  {isSubmitting ? "Uploading..." : "Submit CV"}
                </button>
              )}

              {/* Validation Messages */}
              {error && (
                <p className="font-inter text-[14px] text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {isSubmitted && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-success-modal-title"
          aria-describedby="cv-success-modal-desc"
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
                id="cv-success-modal-title"
                className="text-[20px] font-medium tracking-tight text-white"
              >
                CV Uploaded Successfully!
              </h2>
              <p
                id="cv-success-modal-desc"
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
