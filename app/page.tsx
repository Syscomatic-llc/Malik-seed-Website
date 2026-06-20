import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <>
      {/* Navbar is positioned absolutely inside the HeroSection wrapper */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
    </>
  );
}
