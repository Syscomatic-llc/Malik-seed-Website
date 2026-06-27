import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import { origeneData } from "@/data/brands/origene";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: origeneData.meta.title,
  description: origeneData.meta.description,
};

export default function OrigenePage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      <BrandHero {...origeneData.hero} />
      <BrandIntro {...origeneData.intro} />
      <BrandGrid {...origeneData.grid} />
      <BrandSplit {...origeneData.split1} />
      <BrandProcess {...origeneData.process1} />
      <BrandProcess {...origeneData.process2} />
      <BrandSplit {...origeneData.split2} />
    </div>
  );
}
