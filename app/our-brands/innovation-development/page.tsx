import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandProjectsTable from "@/components/sections/brand/BrandProjectsTable";
import { innovationDevelopmentData } from "@/data/brands/innovation-development";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: innovationDevelopmentData.meta.title,
    description: innovationDevelopmentData.meta.description,
  };
  return getPageMetadata("/our-brands/innovation-development", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}


export default function InnovationDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      <BrandHero {...innovationDevelopmentData.hero} />
      <BrandIntro {...innovationDevelopmentData.intro} />
      <BrandSplit {...innovationDevelopmentData.split1} />
      <BrandGrid {...innovationDevelopmentData.grid} />
      <BrandCards {...innovationDevelopmentData.cards} showIndex={false} />
      <BrandProjectsTable />
      <BrandSplit {...innovationDevelopmentData.split2} />
    </div>
  );
}
