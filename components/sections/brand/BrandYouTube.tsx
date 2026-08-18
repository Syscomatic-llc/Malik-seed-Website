import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface BrandYouTubeProps {
  badge?: string;
  title: string;
  youtubeUrl: string;
  /** Grid images — 2 for the potato/vegetable layout */
  images: string[];
  /**
   * Optional brand / partner logo.
   * Desktop: floats to the bottom-right of the section (outside the button row).
   * Mobile: centers below the "Watch on YouTube" button.
   */
  brandLogo?: string;
  brandLogoAlt?: string;
}

export default function BrandYouTube({
  badge,
  title,
  youtubeUrl,
  images,
  brandLogo,
  brandLogoAlt = "Brand logo",
}: BrandYouTubeProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-[#F2F7F1] px-4 py-10 md:px-8 md:py-[60px] lg:px-[100px] lg:py-[100px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center">
        {/* Header */}
        <div className="flex w-full max-w-[713px] flex-col items-center gap-6 text-center md:gap-8">
          {badge && (
            <SectionBadge showDot variant="outline">
              {badge}
            </SectionBadge>
          )}
          <h2
            className="text-[32px] leading-[38px] font-medium text-[#0D1A14] md:text-[48px] md:leading-[58px]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            {title.split("\n").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <br className="md:hidden" />}
              </span>
            ))}
          </h2>
        </div>

        {/* Images Grid */}
        <div className="mt-[40px] w-full md:mt-[56px]">
          {/* Mobile: Horizontal scroll carousel */}
          <div
            className="flex snap-x snap-mandatory scrollbar-none flex-row gap-4 overflow-x-auto scroll-smooth pb-2 md:hidden"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 snap-center overflow-hidden rounded-[24px] shadow-md"
                style={{ width: "280px", height: "290px" }}
              >
                <OptimizedImage
                  src={img}
                  alt={`field activity preview ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            ))}
          </div>

          {/* Desktop: 2-column grid, fixed 440px height to match Figma */}
          <div
            className="hidden w-full md:grid"
            style={{
              gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, 1fr)`,
              gap: "32px",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="group relative w-full overflow-hidden shadow-md"
                style={{ height: "440px", borderRadius: "24px" }}
              >
                <OptimizedImage
                  src={img}
                  alt={`field activity preview ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 604px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Button row + optional brand logo */}
        <div className="relative mt-[56px] flex w-full flex-col items-center">
          {/* Watch on YouTube */}
          <div className="flex justify-center">
            <ActionButton
              href={youtubeUrl}
              label="Watch on YouTube"
              variant="dark"
              className="h-[46px] gap-[8px] px-4 text-[14px] leading-[17px] md:gap-3 md:px-[24px] md:text-[16px] md:leading-[19px]"
              showArrow={true}
              showYoutubeIcon
              iconSize={20}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>

          {/* Brand Logo */}
          {brandLogo && (
            <>
              {/* Desktop: absolute bottom-right, vertically centered with button */}
              <div
                className="absolute top-1/2 right-0 hidden -translate-y-1/2 md:block"
                style={{ width: "336px", height: "160px" }}
              >
                <OptimizedImage
                  src={brandLogo}
                  alt={brandLogoAlt}
                  fill
                  className="object-contain object-right"
                  sizes="336px"
                />
              </div>

              {/* Mobile: centered below button */}
              <div
                className="relative mt-8 md:hidden"
                style={{ width: "220px", height: "104px" }}
              >
                <OptimizedImage
                  src={brandLogo}
                  alt={brandLogoAlt}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
