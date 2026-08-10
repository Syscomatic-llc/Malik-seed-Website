import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandYouTube from "@/components/sections/brand/BrandYouTube";
import { potatoSeedData } from "@/data/brands/potato-seed";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: potatoSeedData.meta.title,
    description: potatoSeedData.meta.description,
  };
  return getPageMetadata("/our-brands/potato-seeds", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}


export default function PotatoSeedPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...potatoSeedData.hero} />
      <BrandIntro {...potatoSeedData.intro} />
      <BrandGrid {...potatoSeedData.grid} />
      <BrandSplit {...potatoSeedData.split} />
      <BrandCards {...potatoSeedData.cards} showIndex={false} />
      <BrandYouTube {...potatoSeedData.youtube} />
    </div>
  );
}
