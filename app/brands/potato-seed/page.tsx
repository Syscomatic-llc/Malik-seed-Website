import { BRANDS_DATA } from "@/data/brands-data";
import BrandDetailTemplate from "@/components/sections/brand/BrandDetailTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const SLUG = "potato-seed";

export const metadata: Metadata = {
  title: BRANDS_DATA[SLUG]?.meta.title || "Potato Seeds — Malik Seeds",
  description: BRANDS_DATA[SLUG]?.meta.description,
};

export default function PotatoSeedPage() {
  const brand = BRANDS_DATA[SLUG];
  if (!brand) {
    notFound();
  }
  return <BrandDetailTemplate brand={brand} />;
}
