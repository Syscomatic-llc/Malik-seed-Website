"use client";

import { useState } from "react";

interface ShareButtonProps {
  label?: string;
  showIcon?: boolean;
  className?: string;
  iconSize?: number;
}

export default function ShareButton({
  label = "Share",
  showIcon = true,
  className = "",
  iconSize = 20,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-fit">
      <button
        onClick={handleShare}
        className={
          className ||
          "inline-flex items-center gap-2 text-[16px] leading-[24px] font-medium text-[#0D1A14] transition-colors hover:text-[#195236] focus-visible:outline-none md:text-[18px] md:leading-[27px]"
        }
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {showIcon && (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
        )}
        <span>{label}</span>
      </button>

      {/* Copied Toast Notification */}
      <div
        className={`absolute -top-12 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#0F3221] px-4 py-2 text-xs text-white shadow-lg transition-all duration-300 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        Link copied!
      </div>
    </div>
  );
}
