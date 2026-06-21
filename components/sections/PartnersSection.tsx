const partners = [
  "CIMMYT",
  "IRRI",
  "PARC",
  "Punjab Seed Council",
  "Agri. Univ. Faisalabad",
  "NARC",
  "FAO",
  "USAID Agri Program",
  "CIMMYT",
  "IRRI",
  "PARC",
  "Punjab Seed Council",
  "Agri. Univ. Faisalabad",
  "NARC",
];

export default function PartnersSection() {
  return (
    // Desktop: 1440x430, bg #F2F7F1, border-bottom #CED2DA
    <section
      className="w-full overflow-hidden bg-[#F2F7F1] py-10 md:py-[100px]"
      style={{ borderBottom: "1px solid #CED2DA" }}
      id="partners"
    >
      <div className="mx-auto max-w-[1440px] px-4">
        {/* Title — Figma: "Our Development Partners", Inter 18px, center */}
        <p className="font-inter mb-8 text-center text-[16px] leading-[22px] text-[#0D1A14] md:mb-12 md:text-[18px]">
          Our Development Partners
        </p>

        {/* Row 1 — partners scrolling left */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-[202px]"
            style={{
              background:
                "linear-gradient(270deg, rgba(242, 247, 241, 0) 0%, #F2F7F1 100%)",
            }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-[202px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(242, 247, 241, 0) 0%, #F2F7F1 100%)",
            }}
          />

          <div className="flex animate-marquee gap-10 md:gap-16">
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={idx}
                className="flex h-[40px] shrink-0 items-center justify-center rounded-full border border-[#CED2DA] bg-white px-4 md:h-[60px] md:px-6"
              >
                <span className="font-inter whitespace-nowrap text-[12px] font-medium text-[#0D1A14] md:text-[14px]">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — partners scrolling right */}
        <div className="relative mt-4 overflow-hidden md:mt-10">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-[202px]"
            style={{
              background:
                "linear-gradient(270deg, rgba(242, 247, 241, 0) 0%, #F2F7F1 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-[202px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(242, 247, 241, 0) 0%, #F2F7F1 100%)",
            }}
          />

          <div className="flex animate-marquee-reverse gap-10 md:gap-16">
            {[...partners.slice(4), ...partners.slice(0, 4), ...partners.slice(4), ...partners.slice(0, 4)].map((partner, idx) => (
              <div
                key={idx}
                className="flex h-[40px] shrink-0 items-center justify-center rounded-full border border-[#CED2DA] bg-white px-4 md:h-[60px] md:px-6"
              >
                <span className="font-inter whitespace-nowrap text-[12px] font-medium text-[#0D1A14] md:text-[14px]">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
