"use client";

import { memo, useRef, useState, DragEvent } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export default memo(function CVDropSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="w-full bg-[#F2F7F1] pt-12 pb-[100px] lg:pt-0 lg:pb-[100px]">
      <div className="mx-auto w-full max-w-[1030px] px-4 lg:px-0">
        <div className="relative w-full rounded-[24px] border border-[#E4E7EC] bg-[#0D1A14] px-4 py-8 md:px-15 md:py-16 lg:rounded-[32px]">
          <div className="mx-auto flex max-w-[910px] flex-col items-center gap-[32px] md:gap-[64px]">
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
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 transition-transform duration-300 group-hover/drop:scale-105">
                <OptimizedImage
                  src="/images/careers/prime_upload.svg"
                  alt="Upload Icon"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="font-inter text-[16px] leading-6 font-medium text-[#A9E179] md:text-[18px] md:leading-[27px]">
                  {file ? `Selected: ${file.name}` : "Click to drop your CV"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
