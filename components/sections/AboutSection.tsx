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
        <div className="hidden flex-row items-start gap-8 px-6 py-12 md:flex lg:gap-16 lg:px-16 lg:py-20 xl:gap-[129px] xl:px-[100px] xl:pt-[100px] xl:pb-0">
          {/* Left — Frame 22: 608x591, col, gap 32 */}
          <div className="flex flex-1 max-w-[608px] flex-col gap-6 lg:gap-8 xl:gap-[32px]">
            {/* Section badge — Frame 20: 177x33, bg #A9E179, radius 30px */}
            <div className="flex h-[33px] w-[177px] items-center justify-center rounded-[30px] bg-brand-light-green">
              <span className="font-inter text-[14px] font-medium leading-[21px] text-brand-active">
                About Malik Seeds
              </span>
            </div>

            {/* Frame 2147229506 — 608x526, col, gap 48 */}
            <div className="flex flex-col gap-8 lg:gap-12 xl:gap-[48px]">
              {/* Group 1 — text content */}
              <p className="font-sans text-[22px] font-medium leading-[34px] text-brand-dark lg:text-[28px] lg:leading-[42px] xl:text-[32px] xl:leading-[48px]">
                <span>Malik Seeds is the pioneer of hybrid vegetable seeds in Bangladesh. We introduce international seed varieties to Bangladeshi farmers. Our history goes back to 1969 when our founder, A. R. Malik launched &ldquo;Atlas-70&rdquo; Cabbage from Sakata Seed Corporation, based </span>
                <span className="text-[#0D1A1499]"> in Japan. Today, we are among the most trusted brands in the agriculture industry.</span>
              </p>

              {/* Frame 6 CTA — 159x46, bg #195236, radius 60px */}
              <ActionButton
                href="/about"
                label="Learn More"
                variant="dark"
                className="h-[46px] w-[159px] px-0"
                iconSize={20}
              />
            </div>
          </div>

          {/* Right — Frame 37: 503x582, left:737px, col, gap 16 */}
          <div className="flex w-[320px] shrink-0 flex-col gap-[16px] sm:w-[400px] lg:w-[440px] xl:w-[503px]">
            {/* Frame 32 — 503x340, bg-[#F9FAFB], radius 24px */}
            <div className="relative aspect-[503/340] w-full overflow-hidden rounded-[16px] bg-[#F9FAFB] xl:rounded-[24px]">
              <Image
                src="/malik_seeds_team-3_1.png"
                alt="Malik Seeds Team"
                fill
                sizes="(max-width: 768px) 358px, (max-width: 1200px) 440px, 503px"
                priority
                className="object-cover"
              />
            </div>

            {/* Frame 35 — 503x226, gap 16 */}
            <div className="flex w-full flex-row gap-[16px]">
              {/* Frame 33 — 243x226 */}
              <div className="relative aspect-[243/226] flex-1 rounded-[16px] xl:rounded-[24px] overflow-hidden">
                <Image
                  src="/frame_33.png"
                  alt="Years of Experience"
                  fill
                  sizes="(max-width: 1200px) 200px, 243px"
                  className="object-cover"
                />
              </div>
              {/* Frame 34 — 243x226 */}
              <div className="relative aspect-[243/226] flex-1 rounded-[16px] xl:rounded-[24px] overflow-hidden">
                <Image
                  src="/frame_34.png"
                  alt="Farmer Partners"
                  fill
                  sizes="(max-width: 1200px) 200px, 243px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Stats row — Frame 2147229657: 1240x178 */}
        <div className="hidden px-[24px] pb-[40px] pt-[40px] md:block md:px-[60px] md:pb-[60px] md:pt-[50px] xl:px-[100px] xl:pb-[100px] xl:pt-[60px]">
          <div className="flex w-full flex-row items-center justify-between rounded-[16px]">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-1 flex-row items-center justify-center">
                <div className="flex flex-col items-center gap-[8px] lg:gap-[12px] xl:gap-[16px]">
                  <span className="font-anton text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[42px] lg:leading-[50px] xl:text-[48px] xl:leading-[58px] text-brand-active">
                    {stat.value}
                  </span>
                  <span className="font-inter text-center text-[12px] leading-[18px] lg:text-[14px] lg:leading-[21px] xl:text-[16px] xl:leading-[24px] text-brand-dark max-w-[192px]">
                    {stat.label}
                  </span>
                </div>
                {index < stats.length - 1 && (
                  <div className="ml-auto mr-0 h-[60px] lg:h-[72px] xl:h-[86px] w-[1px] bg-[#CED2DA]" />
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
                  About Malik Seeds
                </span>
              </div>

              {/* Main text + CTA */}
              <div className="flex flex-col items-center gap-[32px]">
                {/* Text — 358px, 24px, weight 500, center, lineHeight 36px */}
                <p className="font-sans text-center text-[24px] font-medium leading-[36px] text-brand-dark">
                  <span>Malik Seeds is the pioneer of hybrid vegetable seeds in Bangladesh. We introduce international seed varieties to Bangladeshi farmers. Our history goes back to 1969 when our founder, A. R. Malik launched &ldquo;Atlas-70&rdquo; Cabbage from Sakata Seed Corporation, based</span>
                  <span className="text-[#0D1A1499]"> in Japan. Today, we are among the most trusted brands in the agriculture industry.</span>
                </p>

                {/* CTA — 123x41, bg #195236, radius 60px */}
                <ActionButton
                  href="/about"
                  label="Learn More"
                  variant="dark"
                  className="h-[41px] w-[123px] text-[14px] px-0 gap-[6px]"
                  iconSize={16}
                />
              </div>
            </div>

            {/* Frame 37 — 358x416, col, gap 16 */}
            <div className="flex flex-col gap-[16px]">
              {/* Frame 32 — 358x240, bg #F9FAFB, radius 16px */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-[16px] bg-[#F9FAFB]">
                <Image
                  src="/malik_seeds_team-3_1.png"
                  alt="Malik Seeds Team"
                  fill
                  sizes="358px"
                  className="object-cover"
                />
              </div>

              {/* Frame 35 — 358x160, gap 16 */}
              <div className="flex flex-row gap-[16px]">
                {/* Frame 33 — 171x160 */}
                <div className="relative h-[160px] flex-1">
                  <Image
                    src="/frame_33_mobile.png"
                    alt="Years of Experience"
                    fill
                    sizes="171px"
                    className="object-contain"
                  />
                </div>
                {/* Frame 34 — 171x160 */}
                <div className="relative h-[160px] flex-1">
                  <Image
                    src="/frame_34_mobile.png"
                    alt="Farmer Partners"
                    fill
                    sizes="171px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats — Frame 2147229657: 390x407, padding 0 16, col, gap 8 */}
          <div className="flex flex-col items-center gap-[8px] px-[16px]">
            {/* Row 1 — 2 stats */}
            <div className="flex w-full flex-row gap-[16px]">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="flex h-[125px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[24px] px-3">
                  <span className="font-anton text-[40px] leading-[48px] text-brand-active">{stat.value}</span>
                  <span className="font-inter text-center text-[14px] leading-[21px] text-brand-dark">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-[1px] w-[72px] bg-[#CED2DA]" />
            {/* Row 2 — 2 stats */}
            <div className="flex w-full flex-row gap-[16px]">
              {stats.slice(2, 4).map((stat) => (
                <div key={stat.label} className="flex h-[125px] flex-1 flex-col items-center justify-center gap-[8px] rounded-[24px] px-3">
                  <span className="font-anton text-[40px] leading-[48px] text-brand-active">{stat.value}</span>
                  <span className="font-inter text-center text-[14px] leading-[21px] text-brand-dark">{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-[1px] w-[72px] bg-[#CED2DA]" />
            {/* Row 3 — 1 stat centered */}
            <div className="flex w-full">
              <div className="flex h-[125px] w-full flex-col items-center justify-center gap-[8px] rounded-[24px] px-3">
                <span className="font-anton text-[40px] leading-[48px] text-brand-active">{stats[4].value}</span>
                <span className="font-inter text-center text-[14px] leading-[21px] text-[#0D1A14]">{stats[4].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
