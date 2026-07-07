// ---------------------------------------------------------------------------
// Shared badge markup for dark-card mission sections

import { SectionBadge } from "../ui/SectionBadge";



// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutMissionOne() {
  return (
    <section className="bg-brand-bg w-full pb-10 md:pb-[80px]" id="mission">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="bg-brand-dark flex w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[20px] p-6 md:gap-8 md:rounded-[32px] md:p-[56px]">
          <SectionBadge variant="dark" showDot>
            OUR VISION
          </SectionBadge>

          <h2 className="text-brand-light-green max-w-[1111px] font-sans text-[24px] leading-[29px] font-medium tracking-tight md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]">
            To lead a new era of agriculture in Bangladesh where innovation
            serves every farmer, and trust grows with every harvest
          </h2>
        </div>
      </div>
    </section>
  );
}
