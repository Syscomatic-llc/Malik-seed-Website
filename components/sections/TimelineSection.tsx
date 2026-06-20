import ActionButton from "@/components/ActionButton";

const timelineItems = [
  {
    year: "1962",
    title: "A Vision Begins",
    description:
      "A.R. Malik joined the East Pakistan Agriculture Development Corporation (EPADC), in charge of 5 out of 17 districts.",
    side: "right",
  },
  {
    year: "Mid-1960s",
    title: "The Realization",
    description:
      "During field tours across the 5 districts, he witnesses the struggles of farmers with the lack of access to quality seeds.",
    side: "left",
  },
  {
    year: "Late 1960s",
    title: "Introduction to World-Class Breeders",
    description:
      "Through his work, he connects with the Japanese seed company, Sakata, learning about international quality hybrid seeds.",
    side: "right",
  },
];


export default function TimelineSection() {
  return (
    <section className="w-full overflow-hidden bg-brand-dark py-16 md:py-[100px]" id="timeline">
      <div className="mx-auto max-w-[1240px] px-4 md:px-0">
        {/* Header — Figma: Frame 2147229638, 529x123 */}
        <div className="mb-12 flex flex-col gap-8 md:mb-16">
          {/* Timeline badge — bg rgba(13,26,20,0.32), border rgba(255,255,255,0.12) */}
          <div
            className="inline-flex h-[33px] w-fit items-center justify-center rounded-[40px] border border-white/12 bg-brand-dark/32 px-4"
          >
            <span className="font-inter text-[14px] font-medium leading-[21px] text-brand-bg">
              Timeline
            </span>
          </div>

          <h2 className="font-sans text-[32px] font-medium leading-[38px] text-brand-bg md:text-[48px] md:leading-[58px]">
            From Humble Beginnings
          </h2>
        </div>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical line — desktop only, centered */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 bg-brand-bg/10 md:block" />

          <div className="flex flex-col gap-0">
            {timelineItems.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col gap-6 py-10 md:flex-row md:gap-0 md:py-0 ${
                  item.side === "right"
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Content card side */}
                <div className="flex w-full flex-col justify-center md:w-[474px] md:py-12">
                  {/* Rounded card — Figma: Frame 60, 474x462, radius 24px */}
                  <div className="relative flex flex-col gap-4 rounded-[24px] bg-neutral-200/10 p-6 md:p-8">
                    <div className="absolute -top-3 left-6 h-[1px] w-8 bg-brand-light-green md:hidden" />
                    <span className="font-inter text-[14px] font-medium uppercase tracking-wider text-brand-light-green/70">
                      {item.title}
                    </span>
                    <p className="font-inter text-[15px] leading-[24px] text-brand-bg/70 md:text-[16px]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center — year + dot */}
                <div className="relative flex flex-row items-start gap-4 md:w-[72px] md:flex-col md:items-center md:justify-center md:py-12">
                  {/* Year — Figma: Anton, 48px, #A9E179 */}
                  <span className="font-anton shrink-0 text-[36px] leading-[43px] text-brand-light-green md:text-center md:text-[48px] md:leading-[58px]">
                    {item.year}
                  </span>
                  {/* Dot */}
                  <div className="mt-[14px] hidden h-4 w-4 shrink-0 rounded-full border-4 border-brand-light-green bg-brand-dark md:block" />
                </div>

                {/* Empty side spacer */}
                <div className="hidden w-full md:block md:w-[474px]" />
              </div>
            ))}
          </div>
        </div>

        {/* See full timeline CTA */}
        <div className="mt-12 flex justify-center md:mt-16">
          <ActionButton
            href="/timeline"
            label="See full timeline"
            variant="dark"
            className="h-[48px] px-6 text-[18px]"
          />
        </div>
      </div>
    </section>
  );
}
