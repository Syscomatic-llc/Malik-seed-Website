import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

const products = [
  {
    id: 1,
    category: "Vegetable Seeds",
    name: "Vegetable Seeds",
    description: "Research-Backed Vegetable Seeds Farmers rely on",
    image: "/11_1.png",
    href: "/brands/vegetable-seeds",
  },
  {
    id: 2,
    category: "Potato Seed",
    name: "Potato Seed",
    description: "Bringing Next-Generation Potato Seeds to Farmers",
    image: "/dscf7423.png",
    href: "/brands/potato-seed",
  },
  {
    id: 3,
    category: "Malik’s Farm",
    name: "Malik’s Farm",
    description: "Research and Innovation Hub Behind Malik Seeds",
    image: "/maliks_farm_rd.png",
    href: "/brands/maliks-farm",
  },
  {
    id: 4,
    category: "Origene by Malik",
    name: "Origene by Malik",
    description: "Safe Fruits and Vegetables for Health Conscious Urban Consumers",
    image: "/planted_10_2.png",
    href: "/brands/origene",
  },
  {
    id: 5,
    category: "Malik’s Flower",
    name: "Malik’s Flower",
    description: "Premium Flower Varieties Bringing Global Genetics to Local Growers",
    image: "/image_43.png",
    href: "/brands/maliks-flower",
  },
  {
    id: 6,
    category: "Innovation & Development",
    name: "Innovation & Development",
    description: "Empowering Farmers Through Knowledge, Technology, and Market Access",
    image: "/dscf8693_1.png",
    href: "/brands/innovation-development",
  },
];

export default function ProductsSection() {
  return (
    <section className="w-full bg-brand-bg" id="products">
      <div className="mx-auto max-w-[1440px]">
        {/* Figma: Frame 53 = 1440x754, contains 2 rows × 3 columns of cards (each 480x377) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={product.id <= 3}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/10 to-brand-dark/90 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-9 text-brand-bg">
                {/* Icon wrapper - Figma has 48x48 icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg/20 backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-light-green group-hover:text-brand-active">
                  <ArrowIcon size={24} className="text-brand-bg group-hover:text-brand-active transition-colors" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-[32px] font-medium leading-[38px] tracking-tight text-brand-bg">
                    {product.name}
                  </h3>

                  {/* Description container - visible on hover, collapsed by default */}
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
      </div>
    </section>
  );
}


