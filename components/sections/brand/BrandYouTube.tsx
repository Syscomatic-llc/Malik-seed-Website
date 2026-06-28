import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";
import Image from "next/image";

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
  return (
    <section className="w-full bg-[#F2F7F1] py-10 md:py-[60px] lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[713px] w-full">
          {badge && (
            <SectionBadge showDot variant="outline">
              {badge}
            </SectionBadge>
          )}
          <h2
            className="text-[#0D1A14] font-medium text-[32px] leading-[38px] md:text-[48px] md:leading-[58px]"
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
        <div className="w-full mt-[40px] md:mt-[56px]">
          {/* Mobile: Horizontal scroll carousel */}
          <div className="flex md:hidden flex-row gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 snap-center rounded-[24px] overflow-hidden shadow-md"
                style={{ width: "280px", height: "290px" }}
              >
                <Image
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
            className="hidden md:grid w-full"
            style={{
              gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, 1fr)`,
              gap: "32px",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-full overflow-hidden shadow-md group"
                style={{ height: "440px", borderRadius: "24px" }}
              >
                <Image
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
        <div className="relative w-full mt-[56px] flex flex-col items-center">
          {/* Watch on YouTube */}
          <div className="flex justify-center">
            <ActionButton
              href={youtubeUrl}
              label="Watch on YouTube"
              variant="dark"
              className="h-[46px] gap-[8px] md:gap-3 px-4 md:px-[24px] text-[14px] md:text-[16px] leading-[17px] md:leading-[19px]"
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
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
                style={{ width: "336px", height: "160px" }}
              >
                <Image
                  src={brandLogo}
                  alt={brandLogoAlt}
                  fill
                  className="object-contain object-right"
                  sizes="336px"
                />
              </div>

              {/* Mobile: centered below button */}
              <div
                className="md:hidden mt-8 relative"
                style={{ width: "220px", height: "104px" }}
              >
                <Image
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
