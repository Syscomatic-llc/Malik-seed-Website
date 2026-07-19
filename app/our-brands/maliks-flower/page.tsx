import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandFlowerPortfolio from "@/components/sections/brand/BrandFlowerPortfolio";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import { maliksFlowerData } from "@/data/brands/maliks-flower";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: maliksFlowerData.meta.title,
    description: maliksFlowerData.meta.description,
  };
  return getPageMetadata("/our-brands/maliks-flower", fallback, { revalidate: 60 });
}


export default function MaliksFlowerPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...maliksFlowerData.hero} />
      <BrandIntro {...maliksFlowerData.intro} />
      <BrandProcess {...maliksFlowerData.process} />
      <BrandGrid {...maliksFlowerData.grid} />
      <BrandFlowerPortfolio />
      <BrandSplit {...maliksFlowerData.split} />
    </div>
  );
}
