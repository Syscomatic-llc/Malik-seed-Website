import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

interface BrandGridProps {
  badge: string;
  title: string;
  description: string;
  images: string[];
}

export default function BrandGrid({
  badge,
  title,
  description,
  images,
}: BrandGridProps) {
  const gridCols =
    images.length === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10 md:gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[700px]">
          <SectionBadge>{badge}</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
            {title}
          </h2>
          <p className="font-sans text-[15px] md:text-[17px] leading-[24px] text-[#0D1A14]/65">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-5 md:gap-6`}>
          {images.map((image, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-[20px] bg-neutral-200 aspect-[4/3]"
            >
              <Image
                src={image}
                alt={`${title} — image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 387px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
