import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandProjectsTable from "@/components/sections/brand/BrandProjectsTable";
import { innovationDevelopmentData } from "@/data/brands/innovation-development";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: innovationDevelopmentData.meta.title,
  description: innovationDevelopmentData.meta.description,
};

export default function InnovationDevelopmentPage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      <BrandHero {...innovationDevelopmentData.hero} />
      <BrandIntro {...innovationDevelopmentData.intro} />
      <BrandSplit {...innovationDevelopmentData.split1} />
      <BrandGrid {...innovationDevelopmentData.grid} />
      <BrandCards {...innovationDevelopmentData.cards} />
      <BrandProjectsTable />
      <BrandSplit {...innovationDevelopmentData.split2} />
    </div>
  );
}
