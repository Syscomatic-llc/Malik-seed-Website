"use client";

import { useEffect, useState } from "react";
import Image from "@/components/ui/OptimizedImage";

interface ShareBarProps {
  title: string;
}

export default function ShareBar({ title }: ShareBarProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl || "");
  const encodedTitle = encodeURIComponent(title || "");

  const socials = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      style: { left: "0px", width: "40px", height: "40px" },
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      style: { left: "48px", width: "40px", height: "40px" },
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      style: { left: "96px", width: "40px", height: "40px" },
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      style: { left: "144px", width: "40px", height: "40px" },
    },
  ];

  return (
    <div className="relative h-10 w-[184px]">
      {/* The original design SVG image */}
      <Image
        src="/images/news/share-icons.svg"
        alt="Share options"
        fill
        className="object-contain"
        priority
      />

      {/* Invisible absolute links on top of each icon */}
      {socials.map((social) => (
        <a
          key={social.name}
          href={shareUrl ? social.href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${social.name}`}
          className="absolute top-0 rounded-[10px] transition-all hover:bg-black/5 hover:scale-[1.03] active:scale-95"
          style={social.style}
        />
      ))}
    </div>
  );
}
