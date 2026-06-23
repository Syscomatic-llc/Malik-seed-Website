import Image from "next/image";

// ---------------------------------------------------------------------------
// Shared badge — same dark-card pill used in AboutMissionOne
// ---------------------------------------------------------------------------
function MissionBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[40px] border border-overlay-white-border bg-overlay-dark-tag px-4 py-1.5 select-none w-max">
      <div className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-brand-light-green" />
      <span className="font-sans text-white text-[12px] font-medium tracking-wider md:text-[14px]">
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AboutMissionTwo() {
  return (
    <section className="w-full bg-brand-bg pt-[100px] pb-12 md:pb-[100px]" id="vision">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="w-full bg-brand-dark rounded-[24px] overflow-hidden p-6 flex flex-col items-start gap-8 md:rounded-[32px] md:p-[56px] md:gap-16">
          <MissionBadge label="OUR MISSION" />

          {/* Highlighted mission statement — second half fades to 50% opacity */}
          <h2 className="text-brand-light-green font-sans font-medium tracking-tight max-w-[1128px] text-[24px] leading-[29px] md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]">
            Helping farmers grow with confidence, by providing the highest
            quality seeds, research backed{" "}
            <span className="text-brand-light-green/50">
              knowledge and hands on support, season after season
            </span>
          </h2>

          {/* Farm banner */}
          <div className="w-full aspect-[310/200] relative rounded-[18px] overflow-hidden bg-brand-neutral-light/5 md:aspect-[1128/532] md:rounded-[24px]">
            <Image
              src="/images/about/maliks_farm_new_3_1.png"
              alt="Malik's Farm modern agriculture fields and seed trials"
              fill
              sizes="(max-width: 768px) 100vw, 1128px"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
