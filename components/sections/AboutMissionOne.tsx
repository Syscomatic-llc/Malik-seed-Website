// ---------------------------------------------------------------------------
// Shared badge markup for dark-card mission sections
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
export default function AboutMissionOne() {
  return (
    <section className="w-full bg-brand-bg pb-10 md:pb-[80px]" id="mission">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        <div className="w-full bg-brand-dark rounded-[20px] overflow-hidden p-6 flex flex-col items-start justify-between gap-6 md:rounded-[32px] md:p-[56px] md:gap-8">
          <MissionBadge label="OUR MISSION" />

          <h2 className="text-brand-light-green font-sans font-medium tracking-tight max-w-[1111px] text-[24px] leading-[29px] md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px]">
            To lead a new era of agriculture in Bangladesh where innovation
            serves every farmer, and trust grows with every harvest
          </h2>
        </div>
      </div>
    </section>
  );
}
