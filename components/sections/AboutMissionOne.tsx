export default function AboutMissionOne() {
  return (
    <section className="w-full bg-[#F2F7F1] pb-10 md:pb-[80px]" id="mission">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Dark Green Mission Card */}
        <div className="w-full bg-brand-dark rounded-[20px] md:rounded-[32px] p-6 md:p-[56px] flex flex-col items-start justify-between gap-6 md:gap-[32px] overflow-hidden">
          {/* Badge: OUR MISSION */}
          <div className="flex items-center gap-2 rounded-[40px] border border-solid border-white/12 bg-[#0D1A14]/32 px-4 py-1.5 select-none w-max">
            <div className="bg-brand-light-green h-1.5 w-1.5 rounded-[2px] shrink-0" />
            <span className="text-white text-[12px] md:text-[14px] font-medium tracking-wider font-sans">
              OUR MISSION
            </span>
          </div>

          {/* Mission Text */}
          <h2 className="text-[#A9E179] text-[24px] leading-[29px] md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px] font-medium tracking-tight font-sans max-w-[1111px]">
            To lead a new era of agriculture in Bangladesh where innovation serves every farmer, and trust grows with every harvest
          </h2>
        </div>
      </div>
    </section>
  );
}
