"use client";

import { useState } from "react";
import Image from "next/image";
import {SectionBadge} from "@/components/ui/SectionBadge";
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
    <section className="w-full bg-[#0D1A14] text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10 md:gap-14">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-[700px] mx-auto">
          <SectionBadge className="mx-auto">OUR FLOWER PORTFOLIO</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-white">
            Varieties across three segments
          </h2>
        </div>

        {/* Tabs Control - Pill Slider */}
        <div className="flex justify-center">
          <div className="flex p-1.5 rounded-full bg-white/5 border border-white/10 max-w-full overflow-x-auto scrollbar-none">
            {SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveTab(seg.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] md:text-[16px] transition-all duration-300 whitespace-nowrap cursor-pointer",
                  activeTab === seg.id
                    ? "bg-[#A9E179] text-[#0D1A14] shadow-md"
                    : "text-white/60 hover:text-white"
                )}
              >
                {seg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mt-4">
          
          {/* Left Column: Segment Details */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-[24px] md:text-[32px] font-semibold text-white">
                {currentSegment.name} Varieties
              </h3>
              <p className="font-inter text-[15px] md:text-[16px] leading-[24px] text-white/70">
                {currentSegment.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-sans text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-[#A9E179]">
                Featured Varieties
              </h4>
              <ul className="flex flex-col gap-2.5">
                {currentSegment.varieties.map((variety, i) => (
                  <li key={i} className="flex gap-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#A9E179] shrink-0" />
                    <span className="font-inter text-[14px] md:text-[15px] text-white/90">
                      {variety}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: High Fidelity Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-square sm:aspect-video lg:aspect-[608/500] w-full overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900">
              <Image
                src={currentSegment.image}
                alt={currentSegment.name}
                fill
                priority
                className="object-cover transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 608px"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
