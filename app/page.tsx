import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import NewsSection from "@/components/sections/NewsSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { homepageApi, newsApi } from "@/lib/api";

export default async function Home() {
  let apiData = null;
  let newsPageData = null;

  try {
    apiData = await homepageApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch homepage data from API:", err);
  }

  try {
    newsPageData = await newsApi.getAll({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch news from API:", err);
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection apiData={apiData?.hero} />

      {/* About Malik Seeds */}
      <AboutSection apiData={apiData?.about} />

      {/* Our Brands & Products */}
      <ProductsSection apiData={apiData?.services} />

      {/* Historical Timeline */}
      <TimelineSection apiData={apiData?.timeline} />

      {/* Success Stories / Voice of Impact */}
      <TestimonialsSection apiData={apiData?.testimonials} />

      {/* Partners Marquee */}
      <PartnersSection apiData={apiData?.partners} />

      {/* News & Stories Insights */}
      <NewsSection apiData={newsPageData?.articles} />

      {/* Join our Team Career CTA */}
      <JoinTeamSection />
    </>
  );
}
