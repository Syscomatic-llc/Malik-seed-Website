import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "../ui/SectionBadge";
import { resolveImageUrl } from "@/lib/utils";
import { ApiOurStoryValue } from "@/lib/api";

interface AboutValuesProps {
  apiData?: ApiOurStoryValue[] | null;
}

const BRAND_VALUES = [
  {
    id: 1,
    title: "Farmer First",
    src: "/images/about/value-farmer-first.png",
    alt: "Farmer first - smiling worker in seed production fields",
  },
  {
    id: 2,
    title: "Innovation",
    src: "/images/about/value-innovation.png",
    alt: "Innovation - agricultural research inside a greenhouse",
  },
  {
    id: 3,
    title: "Uncompromising Quality",
    src: "/images/about/value-quality.png",
    alt: "Uncompromising quality - seed selection and quality control",
  },
  {
    id: 4,
    title: "Research Backed",
    src: "/images/about/value-research.png",
    alt: "Research backed - lab environment for seed testing",
  },
] as const;

export default function AboutValues({ apiData }: AboutValuesProps) {
  const values = Array.isArray(apiData) && apiData.length
    ? [...apiData]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((val) => ({
          id: val.id,
          title: val.title,
          src: resolveImageUrl(val.image_url),
          alt: val.title,
        }))
    : BRAND_VALUES;

  return (
    <section className="bg-brand-bg w-full pb-12 md:pb-[100px]" id="values">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Section header */}
        <div className="mb-8 flex flex-col items-center gap-6 md:mb-12">
          <SectionBadge variant="outline" showDot>
            The Principles That Guide Our Work
          </SectionBadge>

          <h2 className="text-brand-dark text-center font-sans text-[32px] leading-[38px] font-medium md:text-[48px] md:leading-[58px]">
            Brand Values
          </h2>
        </div>

        {/* 2 × 2 values grid */}
        <div className="mx-auto grid w-full max-w-[368px] grid-cols-2 gap-3 md:max-w-[820px] md:gap-6">
          {values.map((val) => (
            <div
              key={val.id}
              className="bg-brand-neutral-light border-brand-border-light flex w-full flex-col items-center justify-between rounded-[20px] border p-3 pb-4 md:rounded-[24px] md:p-4 md:pb-6"
            >
              {/* Fixed-ratio image */}
              <div className="relative aspect-[365/264] w-full overflow-hidden rounded-[14px] bg-neutral-100 md:rounded-[18px]">
                <OptimizedImage
                  src={val.src}
                  alt={val.alt}
                  fill
                  sizes="(max-width: 768px) 150px, 365px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="text-brand-dark mt-3 text-center font-sans text-[14px] font-medium md:mt-4 md:text-[20px]">
                {val.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
