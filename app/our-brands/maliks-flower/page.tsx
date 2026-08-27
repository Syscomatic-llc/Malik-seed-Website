import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandFlowerPortfolio from "@/components/sections/brand/BrandFlowerPortfolio";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import { maliksFlowerData } from "@/data/brands/maliks-flower";
import { Metadata } from "next";
import { getPageMetadata, brandsApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: maliksFlowerData.meta.title,
    description: maliksFlowerData.meta.description,
  };
  return getPageMetadata("/our-brands/maliks-flower", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}

export default async function MaliksFlowerPage() {
  let apiBrandData = null;
  try {
    apiBrandData = await brandsApi
      .getMaliksFlowerData({ revalidate: 15, tags: ["brands"] })
      .catch(() => null);
  } catch (err) {
    console.error("Failed to fetch maliks flower brand page content:", err);
  }

  const dynamicData = apiBrandData?.maliksFlowerData || apiBrandData;

  const resolvedHero = {
    ...maliksFlowerData.hero,
    bgImage: dynamicData?.hero?.bgImage
      ? resolveImageUrl(dynamicData.hero.bgImage)
      : "",
  };

  const resolvedIntro = {
    ...maliksFlowerData.intro,
    highlights: dynamicData?.intro?.highlights
      ? dynamicData.intro.highlights.filter(Boolean)
      : [],
  };

  const resolvedGrid = {
    ...maliksFlowerData.grid,
    badge: "",
    description: "",
    images: dynamicData?.grid?.images
      ? dynamicData.grid.images.map((img) => resolveImageUrl(img))
      : [],
  };

  const resolvedSplit = {
    ...maliksFlowerData.split,
    badge: dynamicData?.split?.badge || "",
    image: dynamicData?.split?.image
      ? resolveImageUrl(dynamicData.split.image)
      : "",
  };

  const resolvedPortfolio = {
    badge: dynamicData?.portfolio?.badge || "",
    cards: dynamicData?.portfolio?.card
      ? dynamicData.portfolio.card.map((c) => ({
          name: c.name?.trim() || "",
          image: c.image ? resolveImageUrl(c.image) : "",
        }))
      : [],
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...resolvedHero} />
      <BrandIntro {...resolvedIntro} />
      <BrandProcess {...maliksFlowerData.process} />
      <BrandGrid {...resolvedGrid} />
      <BrandFlowerPortfolio
        badge={resolvedPortfolio.badge}
        cards={resolvedPortfolio.cards}
      />
      <BrandSplit {...resolvedSplit} />
    </div>
  );
}
