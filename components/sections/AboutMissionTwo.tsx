import Image from "next/image";

export default function AboutMissionTwo() {
  return (
    <section className="w-full bg-[#F2F7F1] pt-[100px] pb-12 md:pb-[100px]" id="vision">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Dark Green Mission Block 2 */}
        <div className="w-full bg-brand-dark rounded-[24px] md:rounded-[32px] p-6 md:p-[56px] flex flex-col items-start gap-8 md:gap-[64px] overflow-hidden">

          {/* Badge: OUR MISSION */}
          <div className="flex items-center gap-2 rounded-[40px] border border-solid border-white/12 bg-[#0D1A14]/32 px-4 py-1.5 select-none w-max">
            <div className="bg-brand-light-green h-1.5 w-1.5 rounded-[2px] shrink-0" />
            <span className="text-white text-[12px] md:text-[14px] font-medium tracking-wider font-sans">
              OUR MISSION
            </span>
          </div>

          {/* Mission Text 2 */}
          <h2 className="text-[#A9E179] text-[24px] leading-[29px] md:text-[40px] md:leading-[50px] xl:text-[48px] xl:leading-[58px] font-medium tracking-tight font-sans max-w-[1128px]">
            Helping farmers grow with confidence, by providing the highest quality seeds, research backed <span className="text-[#A9E179]/50"> knowledge and hands on support, season after season</span>
          </h2>

          {/* Farm Banner Image Block */}
          <div className="w-full aspect-[310/200] md:aspect-[1128/532] relative rounded-[18px] md:rounded-[24px] overflow-hidden bg-brand-neutral-light/5">
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
