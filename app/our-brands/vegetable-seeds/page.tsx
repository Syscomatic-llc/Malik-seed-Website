import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandCropPortfolio from "@/components/sections/brand/BrandCropPortfolio";
import BrandYouTube from "@/components/sections/brand/BrandYouTube";
import { vegetableSeedsData } from "@/data/brands/vegetable-seeds";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: vegetableSeedsData.meta.title,
    description: vegetableSeedsData.meta.description,
  };
  return getPageMetadata("/our-brands/vegetable-seeds", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}


export default function VegetableSeedsPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...vegetableSeedsData.hero} />
      <BrandIntro {...vegetableSeedsData.intro} />
      <BrandGrid {...vegetableSeedsData.grid} />
      <BrandCards {...vegetableSeedsData.cards} />
      <BrandCropPortfolio {...vegetableSeedsData.cropPortfolio} />
      <BrandYouTube {...vegetableSeedsData.youtube} />
    </div>
  );
}
