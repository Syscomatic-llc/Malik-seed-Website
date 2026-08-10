import ComingSoonPage from "@/components/Coming-soon";
import { getPageMetadata } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "Our Products - Malik Seeds",
    description: "Explore our high-performance hybrid vegetable, potato, and flower seeds.",
  };
  return getPageMetadata("/our-products", fallback, { revalidate: 15, tags: ["products", "seo"] });
}

const Page = () => {
  return <ComingSoonPage />;
};

export default Page;
