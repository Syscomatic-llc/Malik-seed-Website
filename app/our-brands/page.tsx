import OptimizedImage from "@/components/ui/OptimizedImage";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import ProductsSection from "@/components/sections/ProductsSection";

export const metadata = {
  title: "Our Brands - Malik Seeds",
  description:
    "We are committed to delivering high-performance hybrid seed varieties. Discover our six major brands and their missions.",
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#F2F7F1]">
      {/* ── Page Hero Section ────────────────────────────────────────── */}
      <section className="w-full bg-[#0D1A14] px-4 pt-[120px] pb-16 md:pt-[160px] md:pb-24 lg:pt-[200px] lg:pb-32">
        <div className="mx-auto flex max-w-[1030px] flex-col gap-10 md:gap-12">
          {/* Hero Title */}
          <h1 className="font-heading text-center text-[28px] leading-[34px] font-medium text-white md:text-[64px] md:leading-[77px]">
            Building a Connected
            <br className="hidden md:inline" />{" "}
            <span className="text-[#A9E179]">Agricultural Ecosystem</span>
          </h1>

          {/* Hero Image */}
          <div className="group relative h-[240px] w-full overflow-hidden rounded-[24px] bg-[#1a2d24] sm:h-[400px] md:h-[520px]">
            <OptimizedImage
              src="/images/brand/dscf8592_1.png"
              alt="Building a Connected Agricultural Ecosystem"
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1200px) 100vw, 1030px"
            />
          </div>
        </div>
      </section>

      {/* ── Brands Section ───────────────────────────────────────────── */}
      <section className="w-full bg-[#F2F7F1] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Section Title */}
          <h2 className="font-heading mb-12 text-center text-[32px] leading-[38px] font-medium text-[#0D1A14] md:mb-16 md:text-[48px] md:leading-[58px]">
            Six Brands. One Mission.
          </h2>

          {/* Brands Grid */}
          <ProductsSection />
        </div>
      </section>

      {/* ── Careers Section ──────────────────────────────────────────── */}
      <JoinTeamSection />
    </div>
  );
}
