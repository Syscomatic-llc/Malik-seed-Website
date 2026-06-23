import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

const HERO_IMAGES = [
  {
    id: 1,
    src: "/images/about/hero-rd-9.png",
    alt: "Malik's Farm R&D crops and green tunnels",
  },
  {
    id: 2,
    src: "/images/about/hero-dscf8697.png",
    alt: "High-yield cabbage crops inspection",
  },
  {
    id: 3,
    src: "/images/about/hero-field-67.png",
    alt: "Farmers working actively in the hybrid seed production fields",
  },
  {
    id: 4,
    src: "/images/hero/hero-bg.png",
    alt: "hero image 1",
  },
  {
    id: 5,
    src: "/images/hero/hero-slide-1.jpg",
    alt: "hero image 2",
  },
  {
    id: 6,
    src: "/images/hero/hero-slide-2.jpg",
    alt: "hero image 4",
  },
  {
    id: 7,
    src: "/images/hero/hero-slide-3.jpg",
    alt: "hero image 3",
  },
];

export default function AboutHero() {
  return (
    <section className="w-full bg-[#F2F7F1] pt-[120px] pb-12 md:pt-[150px] md:pb-[80px] xl:pt-[180px] xl:pb-[100px] overflow-hidden">
      <div className="mx-auto flex flex-col items-center max-w-[1440px]">
        {/* Title & Badge Container */}
        <div className="flex flex-col items-center gap-4 px-4 md:gap-8 md:px-[100px]">
          <SectionBadge variant="outline" showDot className="h-[30px] md:h-[33px] px-4">
            Our Story
          </SectionBadge>

          <h1 className="text-brand-dark text-center font-medium tracking-tight max-w-[844px] text-[38px] leading-[46px] md:text-[54px] md:leading-[64px] xl:text-[64px] xl:leading-[77px] font-sans">
            Cultivating the Future <br className="hidden md:inline" />
            of Agriculture in Bangladesh
          </h1>
        </div>

        {/* Hero Gallery Row / Scroll Track */}
        <div className="w-full mt-[32px] md:mt-[48px]">
          <div className="w-full overflow-x-auto scrollbar-none snap-x snap-mandatory flex gap-4 px-4 md:gap-6 md:px-8 xl:justify-center xl:px-0">
            {HERO_IMAGES.map((img) => (
              <div
                key={img.id}
                className="w-[310px] h-[240px] md:w-[548px] md:h-[420px] relative rounded-[20px] md:rounded-[24px] overflow-hidden shrink-0 bg-white shadow-sm snap-center"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={img.id === 1}
                  sizes="(max-width: 768px) 310px, 548px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
