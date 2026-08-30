import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandCropPortfolio from "@/components/sections/brand/BrandCropPortfolio";
import BrandYouTube from "@/components/sections/brand/BrandYouTube";
import { vegetableSeedsData } from "@/data/brands/vegetable-seeds";
import { Metadata } from "next";
import { getPageMetadata, brandsApi } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: vegetableSeedsData.meta.title,
    description: vegetableSeedsData.meta.description,
  };
  return getPageMetadata("/our-brands/vegetable-seeds", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}

export default async function VegetableSeedsPage() {
  let apiBrandData = null;
  try {
    apiBrandData = await brandsApi
      .getVegetableSeedData({ revalidate: 15, tags: ["brands"] })
      .catch(() => null);
  } catch (err) {
    console.error("Failed to fetch vegetable seeds brand page content:", err);
  }

  const dynamicData =
    apiBrandData?.vegetableSeedData ||
    apiBrandData?.vegetableSeedsData ||
    apiBrandData;

  const resolvedHero = {
    ...vegetableSeedsData.hero,
    bgImage: dynamicData?.hero?.bgImage
      ? resolveImageUrl(dynamicData.hero.bgImage)
      : "",
  };

  const resolvedIntro = {
    ...vegetableSeedsData.intro,
    highlights:
      dynamicData?.intro?.tags && dynamicData.intro.tags.length > 0
        ? dynamicData.intro.tags.filter(Boolean)
        : dynamicData?.intro?.highlights && dynamicData.intro.highlights.length > 0
        ? dynamicData.intro.highlights.filter(Boolean)
        : [],
  };

  const resolvedGrid = {
    ...vegetableSeedsData.grid,
    badge: dynamicData?.grid?.badge || "",
    images:
      dynamicData?.grid?.images && dynamicData.grid.images.length > 0
        ? dynamicData.grid.images.map((img) => resolveImageUrl(img))
        : [],
  };

  const rawCrops =
    dynamicData?.cropPortfolio?.tags ||
    dynamicData?.cropPortfolio?.crops ||
    [];

  const defaultCrops = vegetableSeedsData.cropPortfolio.crops;
  const flatCropsList = Array.isArray(rawCrops)
    ? rawCrops.flat().map((c: any) => String(c ?? "").trim()).filter(Boolean)
    : [];

  let resolvedCrops: string[][] = [];
  if (flatCropsList.length > 0) {
    const rowSizes = [3, 6, 6];
    let currentIndex = 0;
    rowSizes.forEach((size) => {
      if (currentIndex < flatCropsList.length) {
        resolvedCrops.push(flatCropsList.slice(currentIndex, currentIndex + size));
        currentIndex += size;
      }
    });
    // Chunk any remaining items into rows of size 4 to maintain the current layout style
    while (currentIndex < flatCropsList.length) {
      resolvedCrops.push(flatCropsList.slice(currentIndex, currentIndex + 4));
      currentIndex += 4;
    }
  } else {
    resolvedCrops = defaultCrops;
  }

  const resolvedCropPortfolio = {
    ...vegetableSeedsData.cropPortfolio,
    badge: (dynamicData as any)?.cropPortfolio?.badge || "",
    crops: resolvedCrops,
  };

  const resolvedYoutube = {
    ...vegetableSeedsData.youtube,
    badge: dynamicData?.youtube?.badge || "",
    youtubeUrl: dynamicData?.youtube?.youtubeUrl || "",
    images:
      dynamicData?.youtube?.images && dynamicData.youtube.images.length > 0
        ? dynamicData.youtube.images.map((img) => resolveImageUrl(img))
        : [],
  };

  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...resolvedHero} />
      <BrandIntro {...resolvedIntro} />
      <BrandGrid {...resolvedGrid} />
      <BrandCards {...vegetableSeedsData.cards} />
      <BrandCropPortfolio {...resolvedCropPortfolio} />
      <BrandYouTube {...resolvedYoutube} />
    </div>
  );
}
