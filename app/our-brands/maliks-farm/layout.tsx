import { maliksFarmData } from "@/data/brands/maliks-farm";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: maliksFarmData.meta.title,
    description: maliksFarmData.meta.description,
  };
  return getPageMetadata("/our-brands/maliks-farm", fallback, { revalidate: 15, tags: ["brands", "seo"] });
}


export default function MaliksFarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
