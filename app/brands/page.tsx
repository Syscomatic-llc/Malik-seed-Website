import Image from "next/image";
import JoinTeamSection from "@/components/sections/JoinTeamSection";

export const metadata = {
  title: "Our Brands — Malik Seeds",
  description:
    "We are committed to delivering high-performance hybrid seed varieties. Discover our six major brands and their missions.",
};

const BRANDS = [
  {
    name: "Vegetable Seeds",
    image: "/images/brand/11_1.png",
    logo: "/images/brand/brand_logo_1.svg",
  },
  {
    name: "Potato Seeds",
    image: "/images/brand/dscf7423.png",
    logo: "/images/brand/brand_logo_2.svg",
  },
  {
    name: "Malik’s Farm",
    image: "/images/brand/malik_farm_rd.png",
    logo: "/images/brand/brand_logo_3.svg",
  },
  {
    name: "Origene by Malik",
    image: "/images/brand/planted_10_2.png",
    logo: "/images/brand/brand_logo_4.svg",
  },
  {
    name: "Malik’s Flower",
    image: "/images/brand/image_43.png",
    logo: "/images/brand/brand_logo_5.svg",
  },
  {
    name: "Innovation & Development",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {BRANDS.map((brand, index) => (
              <div
                key={index}
                className="relative overflow-hidden group h-[377px] w-full"
              >
                {/* Brand Background Image */}
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                />

                {/* Vertical Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A14]/95 via-[#0D1A14]/20 to-transparent" />

                {/* Content Block */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-4">
                  {/* Brand Logo/Icon */}
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={brand.logo}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Brand Title */}
                  <h3 className="font-heading text-2xl md:text-[32px] font-medium text-[#F2F7F1] leading-tight">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers Section ──────────────────────────────────────────── */}
      <JoinTeamSection />
    </div>
  );
}
