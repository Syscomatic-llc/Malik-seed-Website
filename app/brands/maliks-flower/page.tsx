import { BRANDS_DATA } from "@/data/brands-data";
import BrandDetailTemplate from "@/components/sections/brand/BrandDetailTemplate";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const SLUG = "maliks-flower";

export const metadata: Metadata = {
  title: BRANDS_DATA[SLUG]?.meta.title || "Malik's Flower — Malik Seeds",
  description: BRANDS_DATA[SLUG]?.meta.description,
};

export default function MaliksFlowerPage() {
  const brand = BRANDS_DATA[SLUG];
  if (!brand) {
    notFound();
  }
  return <BrandDetailTemplate brand={brand} />;
}
