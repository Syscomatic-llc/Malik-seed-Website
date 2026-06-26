import Image from "next/image";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import ProductsSection from "@/components/sections/ProductsSection";

export const metadata = {
  title: "Our Brands — Malik Seeds",
  description:
    "We are committed to delivering high-performance hybrid seed varieties. Discover our six major brands and their missions.",
};

const BRANDS = [
  {
    name: "Vegetable Seeds",
    description: "Premium hybrid vegetable seed varieties engineered for high yield, disease resistance, and consistent quality across diverse climates.",
    image: "/images/brand/11_1.png",
    logo: "/images/brand/brand_logo_1.svg",
  },
  {
    name: "Potato Seeds",
    description: "Certified potato seed varieties selected for superior tuber quality, adaptability, and outstanding field performance.",
    image: "/images/brand/dscf7423.png",
    logo: "/images/brand/brand_logo_2.svg",
  },
  {
    name: "Malik's Farm",
    description: "A showcase of sustainable farming practices that demonstrate the real-world performance of our seed varieties at scale.",
    image: "/images/brand/malik_farm_rd.png",
    logo: "/images/brand/brand_logo_3.svg",
  },
  {
    name: "Origene by Malik",
    description: "Specialty crop genetics focused on rare and high-value varieties, bringing innovation from field research to market.",
    image: "/images/brand/planted_10_2.png",
    logo: "/images/brand/brand_logo_4.svg",
  },
  {
    name: "Malik's Flower",
    description: "A curated collection of ornamental flower seeds crafted for vibrant colour, longevity, and market-ready appeal.",
    image: "/images/brand/image_43.png",
    logo: "/images/brand/brand_logo_5.svg",
  },
  {
    name: "Innovation & Development",
    description: "Our R&D powerhouse driving next-generation seed technology through cutting-edge breeding programs and agronomic trials.",
    image: "/images/brand/dscf8693_1.png",
    logo: "/images/brand/brand_logo_6.svg",
  },
];

export default function BrandsPage() {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      {/* ── Page Hero Section ────────────────────────────────────────── */}
      <section className="w-full bg-[#0D1A14] pt-[120px] pb-16 md:pt-[160px] md:pb-24 lg:pt-[200px] lg:pb-32 px-4">
        <div className="mx-auto max-w-[1030px] flex flex-col gap-10 md:gap-12">
          {/* Hero Title */}
          <h1 className="text-center font-heading text-[38px] md:text-[64px] font-medium leading-[46px] md:leading-[77px] text-white">
            Building a Connected<br className="hidden md:inline" /> Agricultural Ecosystem
          </h1>

          {/* Hero Image */}
          <div className="relative w-full h-[240px] sm:h-[400px] md:h-[520px] overflow-hidden rounded-[24px] bg-[#1a2d24]">
            <Image
              src="/images/brand/dscf8592_1.png"
              alt="Building a Connected Agricultural Ecosystem"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1030px"
            />
          </div>
        </div>
      </section>

      {/* ── Brands Section ───────────────────────────────────────────── */}
      <section className="w-full bg-[#F2F7F1] py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Title */}
          <h2 className="text-center font-heading text-[32px] md:text-[48px] font-medium leading-[38px] md:leading-[58px] text-[#0D1A14] mb-12 md:mb-16">
            Six Brands. One Mission.
          </h2>

          {/* Brands Grid */}
          <ProductsSection direction="vertical" />

        </div>
      </section>

      {/* ── Careers Section ──────────────────────────────────────────── */}
      <JoinTeamSection />
    </div>
  );
}
