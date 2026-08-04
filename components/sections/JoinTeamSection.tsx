import { Fragment } from "react";
import ActionButton from "@/components/ActionButton";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { homepageApi, ApiCtaBanner } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

interface JoinTeamSectionProps {
  apiData?: ApiCtaBanner[];
}

export default async function JoinTeamSection({ apiData: initialApiData }: JoinTeamSectionProps = {}) {
  let apiData: ApiCtaBanner[] | null = initialApiData ?? null;

  if (!apiData) {
    try {
      apiData = await homepageApi.getCtaBanners({ revalidate: 60 });
    } catch (err) {
      console.error("Failed to fetch join team section data from API:", err);
    }
  }

  const activeJoinTeamData =
    Array.isArray(apiData) && apiData.length > 0
      ? {
          badge: apiData[0].title,
          title: apiData[0].subtitle,
          cta: {
            label: apiData[0].cta_text,
            href: apiData[0].cta_link,
          },
          images: {
            desktop: resolveImageUrl(apiData[0].background_image),
            mobile: resolveImageUrl(apiData[0].background_image),
          },
        }
      : null;

  if (!activeJoinTeamData) {
    return null;
  }

  const joinTeamData = activeJoinTeamData;
  return (
    // Desktop: 1440x690, bg #F2F7F1 (Figma: Frame 2147229633)
    <section className="w-full bg-[#F2F7F1] py-10 md:py-16 xl:py-[100px]" id="careers">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 xl:px-[100px]">
        {/* White card — Figma: 1240x490, bg #FFFFFF, radius 32px (Frame 2147229509) */}
        <div className="group relative mx-auto flex w-full max-w-full flex-col items-center justify-between overflow-hidden rounded-[24px] bg-white md:max-w-[680px] lg:max-w-[920px] xl:h-[490px] xl:max-w-none xl:flex-row xl:rounded-[32px]">
          {/* Left content — Figma: 403x301, left:60px, top:95px (Frame 2147229510) */}
          <div className="flex w-full shrink-0 flex-col items-start justify-between gap-[16px] px-6 py-10 xl:absolute xl:top-[95px] xl:left-[60px] xl:h-[301px] xl:w-[403px] xl:px-0 xl:py-0">
            {/* Badge — Figma: "Join our Team" (Frame 2147229487) */}
            <SectionBadge
              variant="outline"
              showDot
              dotSize="6px"
              className="h-[33px] px-4"
            >
              {joinTeamData.badge}
            </SectionBadge>

            {/* Main content — Figma: 403x252 (Frame 2147229485) */}
            <div className="flex h-full w-full flex-col items-start justify-between gap-[32px] xl:h-[252px] xl:w-[403px]">
              {/* Title — Figma: 403x174 (Frame 2147229501) */}
              <div className="relative w-full xl:h-[174px] xl:w-[403px]">
                <h2
                  className="text-brand-dark text-[32px] leading-[38px] font-medium xl:absolute xl:top-0 xl:left-0 xl:w-[403px] xl:text-[48px] xl:leading-[58px]"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontWeight: 500,
                  }}
                >
                  {joinTeamData.title.split("\n").map((line, idx) => (
                    <Fragment key={idx}>
                      {idx > 0 && <br className="hidden xl:inline" />}
                      {line}
                    </Fragment>
                  ))}
                </h2>
              </div>

              {/* CTA — Figma: 155x46, bg #195236, radius 60px (Frame 6) */}
              <ActionButton
                href={joinTeamData.cta.href}
                label={joinTeamData.cta.label}
                variant="dark"
                className="h-[46px] w-[155px] gap-[10px] px-0"
                iconSize={20}
              />
            </div>
          </div>

          {/* Right image container — Figma: 690x430, left:527px, top:30px (Frame 2147229656) */}
          <div className="relative ml-auto hidden h-[430px] w-full max-w-[690px] overflow-hidden rounded-[32px] bg-white xl:absolute xl:top-[30px] xl:left-[527px] xl:block xl:h-[430px] xl:w-[690px] xl:rounded-[32px]">
            {/* Overflowing team image — Figma: 726x544, left:-30px, top:-32px (Malik Seeds Team-3 2) */}
            <div className="absolute top-[-32px] left-[-30px] h-[544px] w-[726px] overflow-hidden">
              <OptimizedImage
                src={joinTeamData.images.desktop}
                alt="Join the Malik Seeds Team"
                fill
                sizes="726px"
                quality={50}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Mobile image fallback */}
          <div className="relative h-[200px] w-full overflow-hidden sm:h-[320px] xl:hidden">
            <OptimizedImage
              src={joinTeamData.images.mobile}
              alt="Join the Malik Seeds Team"
              fill
              sizes="100vw"
              quality={50}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
