import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { resolveImageUrl } from "@/lib/utils";
import { ApiOurStoryHero } from "@/lib/api";

interface AboutHeroProps {
  apiData?: ApiOurStoryHero | null;
}


export default function AboutHero({ apiData }: AboutHeroProps) {
  const badgeText = apiData?.title || "Our Story";
  const titleText = apiData?.subtitle || "Cultivating the Future of Agriculture in Bangladesh";
  const images = apiData?.background_images?.length
    ? apiData.background_images.map((img, i) => ({
        id: i,
        src: resolveImageUrl(img),
        alt: `Our story image ${i + 1}`,
      }))
    : [];

  return (
    <section className="bg-brand-bg w-full overflow-hidden pt-[120px] pb-12 md:pt-[150px] md:pb-[80px] xl:pt-[180px] xl:pb-[100px]">
      {/* Title & Badge — constrained only for readability */}
      <div className="flex flex-col items-center gap-4 px-4 md:gap-8 md:px-[100px]">
        <SectionBadge
          variant="outline"
          showDot
          className="h-[30px] px-4 md:h-[33px]"
        >
          {badgeText}
        </SectionBadge>

        <h1 className="text-brand-dark max-w-[844px] text-center font-sans text-[38px] leading-[46px] font-medium tracking-tight md:text-[54px] md:leading-[64px] xl:text-[64px] xl:leading-[77px] whitespace-pre-line">
          {titleText}
        </h1>
      </div>

      {/* 3-image static row — Centered, side images partially overflowing the screen */}
      <div className="mt-8 flex w-full justify-center overflow-x-hidden md:mt-12">
        <div className="flex shrink-0 items-center justify-center gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative h-[240px] w-[310px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-sm md:aspect-[548/420] md:h-auto md:w-[42vw] md:rounded-[24px]"
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                fill
                priority={i < 3}
                sizes="(max-width: 768px) 310px, 42vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
