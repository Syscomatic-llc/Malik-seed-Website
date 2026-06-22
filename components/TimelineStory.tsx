import Image from "next/image";
import { TimelineItem } from "@/lib";

/* ────────────────── sub‑components ────────────────── */

/**
 * Vertical spine per timeline item: dot + dotted line below it.
 * Fixed 72px wide container — the dot sits at left:27px, line at left:35.5px.
 * Heights match original Figma: 456 normal, 518 for last item.
 */

function TimelineLine() {
  return (
    <svg
      width="1"
      height="438"
      viewBox="0 0 1 438"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="437.5"
        stroke="var(--brand-bg)"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function TimelineLineLast() {
  return (
    <svg
      width="1"
      height="500"
      viewBox="0 0 1 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="499.5"
        stroke="url(#timelineGradient)"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      <defs>
        <linearGradient
          id="timelineGradient"
          x1="-0.5"
          y1="0"
          x2="-0.5"
          y2="436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TimelineSpine({ isLast = false }: { isLast?: boolean }) {
  const height = isLast ? 518 : 456;
  return (
    <div className="relative shrink-0" style={{ width: 72, height }}>
      {/* Dot */}
      <Image
        src="/images/timeline/Ellipse.svg"
        alt="Dot"
        width={18}
        height={18}
        className="absolute left-[27px] top-0"
      />
      {/* Dotted line — starts just below the dot */}
      <div className="absolute left-[35.5px] top-[18px]">
        {isLast ? (
          <TimelineLineLast />
        ) : (
          <TimelineLine />
        )}
      </div>
    </div>
  );
}

/** Year label centered above the spine column */
function YearLabel({ year }: { year: string }) {
  return (
    <div className="flex justify-center w-full">
      <span
        className="font-anton text-brand-light-green text-5xl leading-[58px] text-center whitespace-nowrap"
        style={{ fontFamily: "var(--font-anton)" }}
      >
        {year}
      </span>
    </div>
  );
}

/** Image panel — 503 × 372, rounded‑[32px], overflow hidden */
function ImagePanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-[503px] aspect-[503/372] rounded-[32px] overflow-hidden bg-[#E4E7EC] shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 45vw, 503px"
      />
    </div>
  );
}

/** Content card — title + description, with glow overlay */
function ContentCard({
  title,
  description,
  glow,
  cardTop,
  cardHeight,
}: {
  title: string;
  description: string;
  glow: string;
  cardTop?: string;
  cardHeight?: string;
}) {
  return (
    <div
      className={`relative rounded-[24px] w-full max-w-[474px] ${cardTop ?? "top-[-44px]"} ${cardHeight ?? "h-[462px]"}`}
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
        <Image
          src={glow}
          alt=""
          width={252}
          height={186}
          style={{ width: "252px", height: "186px" }}
          className="absolute right-0 top-0 mix-blend-screen opacity-70"
          aria-hidden="true"
        />
      </div>

      {/* Text content — vertically centered inside the card */}
      <div className="absolute left-[32px] top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-[410px]">
        <h3
          className="font-anton text-brand-bg text-[44px] leading-[53px] whitespace-pre-line"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {title}
        </h3>
        <p
          className="text-brand-bg text-xl leading-[30px] whitespace-pre-line"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ────────────────── Desktop row layouts ────────────────── */

/**
 * Each row uses CSS Grid: [1fr] [72px spine] [1fr]
 * This guarantees the spine column is always at the exact same
 * horizontal centre regardless of how wide the card or image is.
 *
 * "left"  → card on left, spine in centre, image on right
 * "right" → image on left, spine in centre, card on right
 */
function TimelineRow({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const spine = <TimelineSpine isLast={isLast} />;

  if (item.side === "left") {
    return (
      <div className="grid grid-cols-[1fr_72px_1fr] items-start w-full">
        {/* Left: card */}
        <div className="flex justify-start">
          <ContentCard
            title={item.title}
            description={item.description}
            glow={item.glow}
            cardTop={item.cardTop}
            cardHeight={item.cardHeight}
          />
        </div>
        {/* Centre: spine */}
        {spine}
        {/* Right: image */}
        <div className="flex justify-end">
          <ImagePanel src={item.image} alt={item.title} />
        </div>
      </div>
    );
  }

  // side === "right"
  return (
    <div className="grid grid-cols-[1fr_72px_1fr] items-start w-full">
      {/* Left: image */}
      <div className="flex justify-start pl-[15px]">
        <ImagePanel src={item.image} alt={item.title} />
      </div>
      {/* Centre: spine */}
      {spine}
      {/* Right: card */}
      <div className="flex justify-end pr-[15px]">
        <ContentCard
          title={item.title}
          description={item.description}
          glow={item.glow}
          cardTop={item.cardTop}
          cardHeight={item.cardHeight}
        />
      </div>
    </div>
  );
}

/* ────────────────── Tablet row layout (md → lg) ────────────────── */

/**
 * Single-column layout with a left-aligned spine.
 * Each item: year + dot, then image, then text card — all stacked.
 */

function TabletTimelineRow({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <div className="grid grid-cols-[40px_1fr] items-stretch w-full">
      {/* Left: spine */}
      <div className="relative shrink-0 w-10">
        <Image
          src="/images/timeline/Ellipse.svg"
          alt="Dot"
          width={14}
          height={14}
          className="absolute left-[13px] top-0 z-10"
        />
        {isLast ? (
          <div
            className="absolute left-[19px] top-[14px] w-[1px] h-[200px]"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          >
            <svg
              className="w-[1px] h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="var(--brand-bg)"
                strokeLinecap="round"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        ) : (
          <div className="absolute left-[19px] top-[14px] bottom-16 w-[1px]">
            <svg
              className="w-[1px] h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="var(--brand-bg)"
                strokeLinecap="round"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        )}
      </div>
      {/* Right: content */}
      <div className="flex flex-col gap-5 pb-16">
        {/* Year */}
        <span
          className="font-anton text-brand-light-green text-3xl leading-tight whitespace-nowrap"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {item.year}
        </span>
        {/* Image */}
        <div className="relative w-full aspect-[503/372] rounded-[24px] overflow-hidden bg-[#E4E7EC]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 55vw, 503px"
          />
        </div>
        {/* Text card */}
        <div className="relative rounded-[24px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={item.glow}
              alt=""
              width={200}
              height={148}
              style={{ width: "200px", height: "148px" }}
              className="absolute right-0 top-0 mix-blend-screen opacity-70"
              aria-hidden="true"
            />
          </div>
          <div className="relative flex flex-col gap-3 p-6">
            <h3
              className="font-anton text-brand-bg text-[32px] leading-tight whitespace-pre-line"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {item.title}
            </h3>
            <p
              className="text-brand-bg text-lg leading-[28px] whitespace-pre-line"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── main section ────────────────── */

export default function TimelineStory({ items = [] }: { items?: TimelineItem[] }) {
  return (
    <section
      className="w-full bg-brand-dark overflow-hidden"
      id="timeline"
    >
      {/* ===== Desktop View (lg+) — two-column alternating with per-item spine ===== */}
      <div className="hidden lg:flex flex-col justify-end bg-white">
        <div className="self-stretch bg-brand-dark pt-[100px] px-[99px]">
          <div className="flex flex-col items-center self-stretch max-w-[1242px] mx-auto">
            {/* ── Header ── */}
            <div className="flex flex-col items-start self-start mb-[63px] ml-[1px] gap-8">
              <div className="flex items-center bg-brand-dark/30 py-1.5 px-4 gap-2 rounded-[40px] border border-solid border-white/10">
                <div className="bg-brand-light-green w-2 h-2 rounded-[1px]" />
                <span
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  Timeline
                </span>
              </div>
              <span
                className="text-brand-bg text-5xl font-medium leading-[58px]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                From Humble Beginnings
              </span>
            </div>

            {/* ── Timeline items ── */}
            <div className="flex flex-col items-center self-stretch gap-6">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <div
                    key={item.year}
                    className="flex flex-col items-center self-stretch"
                  >
                    {/* Year label — centred above the spine column via grid */}
                    <div className="grid grid-cols-[1fr_72px_1fr] w-full mb-6">
                      <div />
                      <YearLabel year={item.year} />
                      <div />
                    </div>
                    {/* Content row with spine */}
                    <TimelineRow item={item} isLast={isLast} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Tablet View (md → lg) — single-column with left spine ===== */}
      <div className="hidden md:flex lg:hidden flex-col bg-white">
        <div className="self-stretch bg-brand-dark pt-[80px] px-6 sm:px-10">
          <div className="flex flex-col items-start max-w-[700px] mx-auto">
            {/* ── Header ── */}
            <div className="flex flex-col items-start mb-12 gap-6">
              <div className="flex items-center bg-brand-dark/30 py-1.5 px-4 gap-2 rounded-[40px] border border-solid border-white/10">
                <div className="bg-brand-light-green w-2 h-2 rounded-[1px]" />
                <span
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  Timeline
                </span>
              </div>
              <h2
                className="text-brand-bg text-4xl font-medium leading-[44px]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                From Humble Beginnings
              </h2>
            </div>

            {/* ── Timeline items ── */}
            <div className="flex flex-col self-stretch">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                  <TabletTimelineRow key={item.year} item={item} isLast={isLast} />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile View (<md) — horizontal scroll ===== */}
      <div className="block md:hidden pt-[54px] pb-[74px] w-full">
        <div className="px-4 flex flex-col items-center gap-[48px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center max-w-[358px]">
            <div className="flex items-center bg-brand-dark/32 py-1.5 px-4 gap-2 rounded-[40px] border border-solid border-white/12">
              <div className="bg-brand-light-green w-1.5 h-1.5 rounded-[1px]" />
              <span
                className="text-white text-xs font-medium leading-[18px]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Timeline
              </span>
            </div>
            <h2
              className="text-brand-bg text-[32px] font-medium leading-[38px]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              From Humble Beginnings
            </h2>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="w-full flex flex-row overflow-x-auto gap-[95px] px-6 pb-8 scrollbar-none snap-x snap-mandatory">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;

              const imageEl = (
                <div className="relative w-[310px] h-[240px] rounded-[24px] overflow-hidden bg-[#F2F4F7] shrink-0">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="310px"
                    />
                  )}
                </div>
              );

              const textEl = (
                <div className="relative flex flex-col items-center justify-center text-center w-[310px] h-[240px] overflow-hidden">
                  {/* Glow overlay */}
                  <Image
                    src={item.glow}
                    alt=""
                    width={140}
                    height={100}
                    style={{ width: "140px", height: "100px" }}
                    className={`absolute z-0 mix-blend-screen opacity-70 pointer-events-none ${isEven ? "left-0 bottom-0" : "right-0 top-0"
                      }`}
                    aria-hidden="true"
                  />
                  <h3
                    className="relative z-10 font-anton text-brand-bg text-[32px] leading-[38px] mb-4 whitespace-pre-line"
                    style={{ fontFamily: "var(--font-anton)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="relative z-10 text-brand-bg/95 text-base leading-[24px] whitespace-pre-line"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.description}
                  </p>
                </div>
              );

              return (
                <div
                  key={item.year}
                  className="w-[310px] shrink-0 snap-center flex flex-col items-center"
                >
                  {isEven ? imageEl : textEl}

                  {/* Year & Connecting Line (Middle) */}
                  <div className="relative w-full h-[48px] flex items-center justify-center mt-[54px] mb-[70px]">
                    {/* Connecting Line (only render if not the last item) */}
                    {idx < items.length - 1 && (
                      <div className="absolute left-[50%] w-[405px] h-[1px] border-t border-dashed border-brand-bg z-0" />
                    )}
                    {/* Year & Dot centered, Year masks the line while Dot sits on it */}
                    <div className="relative z-10 flex items-center select-none">
                      <span
                        className="font-anton text-brand-light-green text-[40px] leading-[48px] bg-brand-dark px-[2rem]"
                        style={{ fontFamily: "var(--font-anton)" }}
                      >
                        {item.year}
                      </span>
                      {idx < items.length - 1 && (
                        <Image
                          src="/images/timeline/Ellipse.svg"
                          alt="Dot"
                          width={16}
                          height={16}
                          className="shrink-0 relative z-10 bg-brand-dark rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  {isEven ? textEl : imageEl}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
