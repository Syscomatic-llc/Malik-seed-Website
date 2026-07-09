import { maliksFarmData } from "@/data/brands/maliks-farm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: maliksFarmData.meta.title,
  description: maliksFarmData.meta.description,
};

export default function MaliksFarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
