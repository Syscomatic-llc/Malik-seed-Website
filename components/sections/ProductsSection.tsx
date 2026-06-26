import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { productsData } from "@/data/sections-data";

type Direction = "horizontal" | "vertical";

interface ProductsSectionProps {
  direction?: Direction;
}

// ─── Shared card inner content ────────────────────────────────────────────────

interface CardContentProps {
  product: (typeof productsData.items)[0];
  iconSize: number;
  titleClass: string;
  paddingClass: string;
  gapClass: string;
}

function CardContent({
  product,
  iconSize,
  titleClass,
  paddingClass,
  gapClass,
}: CardContentProps) {
  return (
    <>
      {/* Background image */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 280px, (max-width: 1279px) 50vw, 480px"
          priority={product.id <= 3}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(13,26,20,0)] to-[rgba(13,26,20,0.8)]" />

      {/* Content block */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col ${gapClass} ${paddingClass}`}
      >
        {/* Arrow icon circle */}
        <div
          style={{ width: iconSize, height: iconSize }}
          className="flex shrink-0 items-center justify-center rounded-full bg-brand-bg/20 backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-light-green"
        >
          <ArrowIcon
            size={iconSize * 0.5}
            className="text-brand-bg transition-colors group-hover:text-brand-active"
          />
        </div>

        {/* Title + hover description */}
        <div className="flex flex-col gap-1">
          <h3 className={`font-sans text-brand-bg ${titleClass}`}>
            {product.name}
          </h3>

          {/* Description — revealed on hover */}
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-[120px] group-hover:opacity-100">
            <p className="font-inter mt-1 text-[14px] leading-[22px] text-brand-bg/80 md:text-[16px] md:leading-[24px]">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductsSection({
  direction = "horizontal",
}: ProductsSectionProps) {
  const isVertical = direction === "vertical";

  return (
    <section className="w-full bg-brand-bg" id="products">
      <div className="mx-auto max-w-[1440px]">

        {/* ===== Tablet / Desktop Grid (md and above) ===== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3">
          {productsData.items.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group relative flex h-[377px] w-full overflow-hidden border-r border-b border-brand-dark/10 last:border-r-0"
            >
              <CardContent
                product={product}
                iconSize={48}
                titleClass="text-[26px] font-medium leading-[38px] md:text-[32px] md:leading-[48px]"
                paddingClass="pb-[37px] pl-[37px] pr-[24px]"
                gapClass="gap-4"
              />
            </Link>
          ))}
        </div>

        {/* ===== Mobile Layout (below md) ===== */}
        <div className="md:hidden">

          {/* VERTICAL: full-width stacked cards */}
          {isVertical ? (
            <div className="flex flex-col">
              {productsData.items.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group relative flex h-[350px] w-full overflow-hidden border-b border-brand-dark/10"
                >
                  <CardContent
                    product={product}
                    iconSize={32}
                    titleClass="text-[20px] font-medium leading-[30px]"
                    paddingClass="pb-[24px] pl-[24px] pr-[24px]"
                    gapClass="gap-2"
                  />
                </Link>
              ))}
            </div>
          ) : (
            /* HORIZONTAL: snap-scrollable row of 280×350 cards */
            <div className="flex flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-none px-4 py-10 pb-4 snap-x snap-mandatory">
              {productsData.items.map((product) => (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group relative flex h-[350px] w-[280px] shrink-0 snap-center overflow-hidden rounded-[24px]"
                >
                  <CardContent
                    product={product}
                    iconSize={32}
                    titleClass="text-[20px] font-medium leading-[30px]"
                    paddingClass="pb-[24px] pl-[24px] pr-[24px]"
                    gapClass="gap-2"
                  />
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}