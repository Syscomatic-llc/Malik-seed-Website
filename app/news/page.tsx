import { Suspense } from "react";
import NewsPage from "./NewsPage";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { newsApi } from "@/lib/api";

export const metadata = {
  title: "News & Updates | Malik Seed",
  description:
    "Stay up to date with the latest research, farmer stories, partnerships, and innovations from Malik Seed.",
};

export default async function NewsRoute() {
  let apiData = null;
  try {
    apiData = await newsApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch news from API:", err);
  }
  return (
    <>
      <Suspense fallback={null}>
        <NewsPage apiData={apiData} />
      </Suspense>
      <JoinTeamSection />
    </>
  );
}
