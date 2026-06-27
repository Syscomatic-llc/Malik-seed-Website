import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";
import Image from "next/image";

interface BrandYouTubeProps {
  badge?: string;
  title: string;
  youtubeUrl: string;
  images: string[];
}

export default function BrandYouTube({
  badge,
  title,
  youtubeUrl,
  images,
}: BrandYouTubeProps) {
  const gridCols =
    images.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-2";

  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-10 md:gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center max-w-[800px]">
          {badge && <SectionBadge showDot variant="outline">{badge}</SectionBadge>}
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
            {title}
          </h2>
        </div>

        {/* Images Grid */}
        <div className="w-full">
          {/* Mobile View: Horizontal Scroll (below md) */}
          <div className="flex md:hidden flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-[280px] h-[210px] shrink-0 snap-center rounded-[24px] overflow-hidden shadow-md"
              >
                <Image
                  src={img}
                  alt={`field activity preview ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            ))}
          </div>

          {/* Desktop/Tablet View: Grid (md and up) */}
          <div className={`hidden md:grid ${gridCols} gap-6 lg:gap-8 w-full`}>
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] w-full rounded-[24px] md:rounded-[32px] overflow-hidden shadow-md group"
              >
                <Image
                  src={img}
                  alt={`field activity preview ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 608px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Watch on YouTube Button */}
        <div className="mb-16 flex justify-center">
          <ActionButton
            href={youtubeUrl}
            label="Watch on YouTube"
            variant="dark"
            className="h-[48px] gap-3 px-[23px] text-lg"
            showArrow={true}
            showYoutubeIcon
            iconSize={20}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </section>
  );
}
