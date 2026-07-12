import Image from "next/image";
import { SectionBadge } from "../ui/SectionBadge";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutMissionTwo() {
  return (
    <section
      className="bg-brand-bg w-full pt-[100px] pb-12 md:pb-[100px]"
      id="vision"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start gap-8 overflow-hidden rounded-[24px] p-6 md:gap-16 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            OUR MISSION
          </SectionBadge>

          {/* Highlighted mission statement — second half fades to 50% opacity */}
          <h2 className="text-brand-light-green max-w-[1128px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]">
            Helping farmers grow with confidence, by providing the highest
            quality seeds, research backed{" "}
            <span className="text-brand-light-green/50">
              knowledge and hands on support, season after season
            </span>
          </h2>

          {/* Farm banner */}
          <div className="bg-brand-neutral-light/5 relative aspect-[310/200] w-full overflow-hidden rounded-[18px] md:aspect-[1128/532] md:rounded-[24px]">
            <Image
              src="/images/about/maliks_farm_new_3_1.png"
              alt="Malik's Farm modern agriculture fields and seed trials"
              fill
              sizes="(max-width: 768px) 100vw, 1128px"
              className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
