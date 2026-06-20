import Image from "next/image";
import ActionButton from "@/components/ActionButton";

const stats = [
  { value: "10k+", label: "Seed Varieties Trialed" },
  { value: "200", label: "Ton Seeds Distributed" },
  { value: "100+", label: "Distributor Network" },
  { value: "13+", label: "Agri-Innovation Projects" },
  { value: "5+", label: "decades Farming Legacy" },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-brand-bg" id="about">
      <div className="mx-auto max-w-[1440px]">

        {/* ===== Desktop Layout ===== */}
        {/* Frame 23 — 1240x591, left:100px, top:100px */}
        <div className="hidden flex-row items-start gap-0 px-[100px] pt-[100px] md:flex">
          {/* Left — Frame 22: 608x591, col, gap 32 */}
          <div className="flex w-[608px] flex-col gap-[32px]">
            {/* Section badge — Frame 20: 177x33, bg #A9E179, radius 30px */}
            <div className="flex h-[33px] w-[177px] items-center justify-center rounded-[30px] bg-brand-light-green">
              <span className="font-inter text-[14px] font-medium leading-[21px] text-brand-active">
                About Malik Seeds{" "}
              </span>
            </div>

            {/* Frame 2147229506 — 608x526, col, gap 48 */}
            <div className="flex flex-col gap-[48px]">
              {/* Group 1 — text content */}
              <div className="flex flex-col gap-6">
                <h2 className="font-sans text-[48px] font-medium leading-[58px] text-brand-dark">
                  Malik Seeds is the pioneer of hybrid vegetable seeds in Bangladesh.
                </h2>
                <p className="font-inter text-[16px] leading-[24px] text-brand-dark">
                  We introduce international seed varieties to Bangladeshi
                  farmers. Our history goes back to 1969 when our founder, A.
                  R. Malik launched &ldquo;Atlas-70&rdquo; Cabbage from Sakata Seed
                  Corporation, based in Japan. Today, we are among the most
                  trusted brands in the agriculture industry.
                </p>
              </div>

              {/* Frame 6 CTA — 159x46, bg #195236, radius 60px */}
              <ActionButton
                href="/about"
                label="Learn More"
                variant="dark"
                className="h-[46px] w-[159px]"
              />
            </div>
          </div>

          {/* Right — Frame 37: 503x582, left:737px, col, gap 16 */}
          <div className="ml-auto flex w-[503px] flex-col gap-[16px]">
            {/* Frame 32 — 503x340, bg-[#F9FAFB], radius 24px */}
            <div className="relative h-[340px] w-[503px] overflow-hidden rounded-[24px] bg-[#F9FAFB]">
              <Image
                src="/malik_seeds_team.png"
                alt="Malik Seeds Team"
                fill
                sizes="503px"
                className="object-cover"
              />
            </div>

            {/* Frame 35 — 503x226, gap 16 */}
            <div className="flex w-[503px] flex-row gap-[16px]">
              {/* Frame 33 — 243x226, bg #CED2DA, radius 24px */}
              <div className="flex h-[226px] w-[243px] items-center justify-center rounded-[24px] bg-[#CED2DA]">
                <div className="flex flex-col items-center gap-4">
                  <span className="font-anton text-[48px] leading-[58px] text-brand-active">57+</span>
                  <span className="font-inter text-center text-[14px] leading-[21px] text-brand-dark">Years of Experience</span>
                </div>
              </div>
              {/* Frame 34 — 243x226, bg #CED2DA, radius 24px */}
              <div className="flex h-[226px] w-[243px] items-center justify-center rounded-[24px] bg-[#CED2DA]">
                <div className="flex flex-col items-center gap-4">
                  <span className="font-anton text-[48px] leading-[58px] text-brand-active">500+</span>
                  <span className="font-inter text-center text-[14px] leading-[21px] text-brand-dark">Farmer Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Stats row — Frame 2147229657: 1240x178, left:100px, top:751px, radius 16px */}
        <div className="hidden px-[100px] pb-[100px] pt-[60px] md:block">
          <div className="flex w-full flex-row items-center justify-between rounded-[16px]">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-row items-center">
                <div className="flex w-[235px] flex-col items-center gap-[16px]">
                  <span className="font-anton text-[48px] leading-[58px] text-brand-active">
                    {stat.value}
                  </span>
                  <span className="font-inter text-center text-[16px] leading-[24px] text-brand-dark">
                    {stat.label}
                  </span>
                </div>
                {index < stats.length - 1 && (
                  <div className="h-[86px] w-[1px] bg-[#CED2DA]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Mobile Layout ===== */}
        {/* Frame: 390x1542, padding 40px 0, col, gap 32 */}
        <div className="flex flex-col gap-[32px] py-[40px] md:hidden">
          {/* Frame 23 — 390x1023, padding 0 16, col, gap 48 */}
          <div className="flex flex-col gap-[48px] px-[16px]">
            {/* Frame 22 — 358x559, col, gap 24, items-center */}
            <div className="flex flex-col items-center gap-[24px]">
              {/* Badge — 157x30, bg #A9E179, radius 30px */}
              <div className="flex h-[30px] w-[157px] items-center justify-center rounded-[30px] bg-brand-light-green">
                <span className="font-inter text-[12px] font-medium leading-[18px] text-brand-active">
                  About Malik Seeds{" "}
                </span>
              </div>

              {/* Main text + CTA */}
              <div className="flex flex-col items-center gap-[32px]">
                {/* Text — 358px, 24px, weight 500, center, lineHeight 36px */}
                <p className="font-sans text-center text-[24px] font-medium leading-[36px] text-brand-dark">
                  Malik Seeds is the pioneer of hybrid vegetable seeds in
                  Bangladesh. We introduce international seed varieties to
                  Bangladeshi farmers. Our history goes back to 1969 when our
                  founder, A. R. Malik launched &ldquo;Atlas-70&rdquo; Cabbage from
                  Sakata Seed Corporation, based in Japan. Today, we are among
                  the most trusted brands in the agriculture industry.
                </p>

                {/* CTA — 123x41, bg #195236, radius 60px */}
                <ActionButton
                  href="/about"
                  label="Learn More"
                  variant="dark"
                  className="h-[41px] w-[123px] text-[14px]"
                  iconSize={16}
                />
              </div>
            </div>

            {/* Frame 37 — 358x416, col, gap 16 */}
            <div className="flex flex-col gap-[16px]">
              {/* Frame 32 — 358x240, bg #F9FAFB, radius 16px */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-[16px] bg-[#F9FAFB]">
                <Image
                  src="/malik_seeds_team.png"
                  alt="Malik Seeds Team"
                  fill
                  sizes="358px"
                  className="object-cover"
                />
              </div>

              {/* Frame 35 — 358x160, gap 16 */}
              <div className="flex flex-row gap-[16px]">
                <div className="flex h-[160px] flex-1 items-center justify-center rounded-[16px] bg-[#CED2DA]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-anton text-[32px] leading-[39px] text-brand-active">57+</span>
                    <span className="font-inter text-center text-[12px] leading-[18px] text-brand-dark">Years of Experience</span>
                  </div>
                </div>
                <div className="flex h-[160px] flex-1 items-center justify-center rounded-[16px] bg-[#CED2DA]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-anton text-[32px] leading-[39px] text-brand-active">500+</span>
                    <span className="font-inter text-center text-[12px] leading-[18px] text-brand-dark">Farmer Partners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats — Frame 2147229657: 390x407, padding 0 16, col, gap 8 */}
          <div className="flex flex-col items-center gap-[8px] px-[16px]">
            {/* Row 1 — 2 stats */}
            <div className="flex w-full flex-row gap-[16px]">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="flex h-[125px] flex-1 flex-col items-center justify-center gap-[12px] rounded-[24px] bg-[#E4E7EC]">
                  <span className="font-anton text-[32px] leading-[39px] text-brand-active">{stat.value}</span>
                  <span className="font-inter text-center text-[11px] leading-[17px] text-brand-dark">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-[1px] w-[72px] bg-[#CED2DA]" />
            {/* Row 2 — 2 stats */}
            <div className="flex w-full flex-row gap-[16px]">
              {stats.slice(2, 4).map((stat) => (
                <div key={stat.label} className="flex h-[125px] flex-1 flex-col items-center justify-center gap-[12px] rounded-[24px] bg-[#E4E7EC]">
                  <span className="font-anton text-[32px] leading-[39px] text-brand-active">{stat.value}</span>
                  <span className="font-inter text-center text-[11px] leading-[17px] text-brand-dark">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-[1px] w-[72px] bg-[#CED2DA]" />
            {/* Row 3 — 1 stat centered */}
            <div className="flex w-full">
              <div className="flex h-[125px] w-full flex-col items-center justify-center gap-[12px] rounded-[24px] bg-[#E4E7EC]">
                <span className="font-anton text-[32px] leading-[39px] text-brand-active">{stats[4].value}</span>
                <span className="font-inter text-center text-[11px] leading-[17px] text-brand-dark">{stats[4].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
