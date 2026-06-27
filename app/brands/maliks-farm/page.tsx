import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import BrandTraining from "@/components/sections/brand/BrandTraining";
import { maliksFarmData } from "@/data/brands/maliks-farm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: maliksFarmData.meta.title,
  description: maliksFarmData.meta.description,
};

export default function MaliksFarmPage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      <BrandHero {...maliksFarmData.hero} />
      <BrandIntro {...maliksFarmData.intro} />
      <BrandSplit {...maliksFarmData.split1} />
      <BrandProcess {...maliksFarmData.process} />
      <BrandSplit {...maliksFarmData.split2} />
      <BrandTraining />
    </div>
  );
}
