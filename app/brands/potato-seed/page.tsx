import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandYouTube from "@/components/sections/brand/BrandYouTube";
import { potatoSeedData } from "@/data/brands/potato-seed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: potatoSeedData.meta.title,
  description: potatoSeedData.meta.description,
};

export default function PotatoSeedPage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      <BrandHero {...potatoSeedData.hero} />
      <BrandIntro {...potatoSeedData.intro} />
      <BrandGrid {...potatoSeedData.grid} />
      <BrandSplit {...potatoSeedData.split} />
      <BrandCards {...potatoSeedData.cards} showIndex={false} />
      <BrandYouTube {...potatoSeedData.youtube} />
    </div>
  );
}
