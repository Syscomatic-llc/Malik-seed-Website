import { Suspense } from "react";
import NewsPage from "./NewsPage";
import NewsLoading from "./loading";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { newsApi, getPageMetadata } from "@/lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "News & Updates | Malik Seed",
    description:
      "Stay up to date with the latest research, farmer stories, partnerships, and innovations from Malik Seed.",
  };
  return getPageMetadata("/news", fallback, { revalidate: 60 });
}


export default async function NewsRoute() {
  let apiData = null;
  try {
    // Large payload (>2MB) cannot be cached by Next.js. Disable cache to silence build warnings.
    apiData = await newsApi.getAll({ cache: "no-store", revalidate: 0 });
  } catch (err) {
    console.error("Failed to fetch news from API:", err);
  }
  return (
    <>
      <Suspense fallback={<NewsLoading />}>
        <NewsPage apiData={apiData} />
      </Suspense>
      <JoinTeamSection />
    </>
  );
}
