import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { productsData } from "@/data/sections-data";

export default function ProductsSection() {
  return (
    <section className="w-full bg-brand-bg" id="products">
      <div className="mx-auto max-w-[1440px]">

        {/* ===== Desktop/Tablet Grid Layout ===== */}
        {/* Frame 53 — 1440x754, grid of 3x2 cards */}
        <div className="hidden grid-cols-3 md:grid">
          {productsData.items.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group relative flex h-[377px] w-full overflow-hidden border-r border-b border-brand-dark/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={product.id <= 3}
                />
              </div>

              {/* Gradient Overlay - Rectangle 2 */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/0 via-brand-dark/30 to-brand-dark/80 transition-opacity duration-300" />

              {/* Card Content - Frame 43 */}
              <div className="absolute left-[37px] bottom-[30px] z-20 flex w-[calc(100%-74px)] flex-col gap-[16px] transition-transform duration-300 ease-out group-hover:-translate-y-[20px]">
                {/* Arrow Icon — 48x48 */}
                <ArrowIcon 
                  size={48} 
                  strokeWidth={2}
                  className="text-brand-bg shrink-0 transition-transform duration-300 group-hover:translate-x-1" 
                />

                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-h2-title text-brand-bg">
                    {product.name}
                  </h3>

                  {/* Description container - visible on hover */}
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-[120px] group-hover:opacity-100">
                    <p className="text-h3-title font-normal text-brand-bg">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== Mobile Layout ===== */}
        {/* Voice of Impact section — horizontal scrollable cards */}
        <div className="md:hidden py-10 px-4 w-full bg-brand-bg">
          <div className="flex flex-row overflow-x-auto gap-4 scrollbar-none scroll-smooth pb-2">
            {productsData.items.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group relative flex h-[350px] w-[280px] shrink-0 overflow-hidden rounded-[24px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>

                {/* Gradient Overlay - Rectangle 2 */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/0 via-brand-dark/40 to-brand-dark/80" />

                {/* Card Content - Frame 43 */}
                <div className="absolute left-[24px] bottom-[24px] z-20 flex w-[calc(100%-48px)] flex-col gap-[8px]">
                  {/* Arrow Icon — 32x32 */}
                  <ArrowIcon 
                    size={32} 
                    strokeWidth={2}
                    className="text-brand-bg shrink-0" 
                  />

                  <h3 className="text-h3-title text-brand-bg">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


