import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import NewsSection from "@/components/sections/NewsSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar is positioned absolutely inside the HeroSection wrapper */}
      <Navbar />

      <main className="relative flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* About Malik Seeds */}
        <AboutSection />

        {/* Our Brands & Products */}
        <ProductsSection />

        {/* Historical Timeline */}
        <TimelineSection />

        {/* Success Stories / Voice of Impact */}
        <TestimonialsSection />

        {/* Partners Marquee */}
        <PartnersSection />

        {/* News & Stories Insights */}
        <NewsSection />

        {/* Join our Team Career CTA */}
        <JoinTeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

