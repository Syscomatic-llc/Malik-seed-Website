import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { productsData } from "@/data/sections-data";

type Direction = "horizontal" | "vertical";

interface ProductsSectionProps {
  direction?: Direction;
}

export default function ProductsSection({
  direction = "horizontal",
}: ProductsSectionProps) {
  const isVertical = direction === "vertical";

  return (
    <section className="w-full bg-brand-bg" id="products">
      <div className="mx-auto max-w-[1440px]">

        {/* ===== Desktop/Tablet Grid (unchanged) ===== */}
        <div className="hidden grid-cols-1 sm:grid-cols-2 md:grid sm:grid md:grid-cols-3">
          {productsData.items.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group relative flex h-[377px] w-full overflow-hidden border-r border-b border-brand-dark/10"
            >
              <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={product.id <= 3}
                />
              </div>

              <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/10 to-brand-dark/90 transition-opacity duration-300" />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-9 text-brand-bg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg/20 backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-light-green group-hover:text-brand-active">
                  <ArrowIcon size={24} className="text-brand-bg group-hover:text-brand-active transition-colors" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-[32px] font-medium leading-[38px] tracking-tight text-brand-bg">
                    {product.name}
                  </h3>

                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[120px] group-hover:opacity-100">
                    <p className="font-inter mt-2 text-[18px] leading-[27px] text-brand-bg/90">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== Mobile Layout ===== */}
        <div className="sm:hidden">

          {/* VERTICAL: cards stacked full-width */}
          {isVertical ? (
            <div className="flex flex-col">
              {productsData.items.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group relative flex h-[377px] w-full overflow-hidden border-r border-b border-brand-dark/10"
                >
                  <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={product.id <= 3}
                    />
                  </div>

                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/10 to-brand-dark/90 transition-opacity duration-300" />

                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-9 text-brand-bg">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg/20 backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-light-green group-hover:text-brand-active">
                      <ArrowIcon size={24} className="text-brand-bg group-hover:text-brand-active transition-colors" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-[32px] font-medium leading-[38px] tracking-tight text-brand-bg">
                        {product.name}
                      </h3>

                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[120px] group-hover:opacity-100">
                        <p className="font-inter mt-2 text-[18px] leading-[27px] text-brand-bg/90">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* HORIZONTAL: scrollable row of fixed-width cards */
            <div className="flex flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-none px-4 py-10 pb-2">
              {productsData.items.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group relative flex h-[377px] w-[280px] shrink-0 overflow-hidden rounded-[24px] border-r border-b border-brand-dark/10"
                >
                  <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/10 to-brand-dark/90 transition-opacity duration-300" />

                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-9 text-brand-bg">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg/20 backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-light-green group-hover:text-brand-active">
                      <ArrowIcon size={24} className="text-brand-bg group-hover:text-brand-active transition-colors" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-[32px] font-medium leading-[38px] tracking-tight text-brand-bg">
                        {product.name}
                      </h3>

                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[120px] group-hover:opacity-100">
                        <p className="font-inter mt-2 text-[18px] leading-[27px] text-brand-bg/90">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}