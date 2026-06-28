"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

interface FlowerSegment {
  id: string;
  name: string;
  description: string;
  varieties: string[];
  image: string;
}

const SEGMENTS: FlowerSegment[] = [
  {
    id: "cut-flower",
    name: "Cut Flower",
    description:
      "Premium quality, long-stemmed flowers grown specifically for florists, events, and vase arrangements. Sourced from global genetics and selected for outstanding color saturation and long vase life.",
    varieties: [
      "Gerbera (Hybrid varieties with thick, strong stems)",
      "Gypsophila (Gypsy Deep Rose, Gypsy White)",
      "Aster (Azumi series with excellent uniformity)",
      "Lisianthus (Rose-like blooms with strong petals)",
      "Marigold (Premium cut-flower varieties)",
    ],
    image: "/images/brand/20250105_120712_1.png",
  },
  {
    id: "bedding-flower",
    name: "Bedding Flower",
    description:
      "Curated varieties optimized for mass landscapes, home gardens, and nurseries. These flower seeds are trialled for high germination rates, rapid early growth, and continuous, heavy blooming periods.",
    varieties: [
      "Petunia (Vibrant color range, heat tolerant)",
      "Marigold (French and African varieties for beds)",
      "Salvia (Deep scarlet and blue spike varieties)",
      "Impatiens (Excellent shade performers)",
      "Pansy & Viola (Perfect for cooler seasons)",
    ],
    image: "/images/brand/gypsy_1.png",
  },
  {
    id: "pot-flower",
    name: "Pot Flower",
    description:
      "Perfect compact container and pot varieties suited for urban gardening, balcony setups, and retail pot plant sales. Tailored to grow symmetrically with rich foliage and dense branching.",
    varieties: [
      "Chrysanthemum (Compact pot varieties)",
      "Cyclamen (Ideal for indoor table setups)",
      "Dianthus (Fragrant, dwarf pot selections)",
      "Calibrachoa (Mini-petunias for hanging baskets)",
      "Begonia (Fibrous and tuberous garden pot varieties)",
    ],
    image: "/images/brand/aster_azumi_1.png",
  },
];

export default function BrandFlowerPortfolio() {
  const [activeTab, setActiveTab] = useState("cut-flower");
  const currentSegment = SEGMENTS.find((s) => s.id === activeTab) || SEGMENTS[0];

  return (
    <section className="w-full bg-[#0D1A14] text-white py-12 md:py-[80px] lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-8 md:gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-[700px] mx-auto">
          <SectionBadge className="mx-auto" showDot variant="dark">OUR FLOWER PORTFOLIO</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#F2F7F1]">
            Varieties across three segments
          </h2>
        </div>

        {/* Tabs Control - Pill Slider */}
        <div className="flex justify-center">
          <div className="flex p-[8px] rounded-[16px] bg-[#112019] max-w-full overflow-x-auto scrollbar-none gap-[8px]">
            {SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveTab(seg.id)}
                className={cn(
                  "h-[39px] md:h-[48px] px-4 py-[9px] md:py-3 md:px-4 rounded-[10px] font-sans font-medium text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] transition-all duration-300 whitespace-nowrap cursor-pointer",
                  activeTab === seg.id
                    ? "bg-[#A9E179] text-[#0D1A14]"
                    : "bg-[#0D291C] text-[#F2F7F1] hover:bg-[#0f3424]"
                )}
              >
                {seg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="flex justify-center items-center mt-4">
          <div className="w-full lg:w-[790px] shrink-0 ">
            <div className="relative w-full h-[360px] lg:h-[475px] overflow-hidden rounded-[20px] lg:rounded-[24px] border border-white/10 bg-neutral-900">
              <Image
                src={currentSegment.image}
                alt={currentSegment.name}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 790px"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
