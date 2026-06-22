import { Fragment } from "react";
import ActionButton from "@/components/ActionButton";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { joinTeamData } from "@/data/sections-data";

export default function JoinTeamSection() {
  return (
    // Desktop: 1440x690, bg #F2F7F1 (Figma: Frame 2147229633)
    <section className="w-full bg-[#F2F7F1] py-10 md:py-[100px]" id="careers">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* White card — Figma: 1240x490, bg #FFFFFF, radius 32px (Frame 2147229509) */}
        <div className="relative flex w-full flex-col items-center justify-between overflow-hidden rounded-[24px] bg-white lg:h-[490px] lg:flex-row lg:rounded-[32px]">
          {/* Left content — Figma: 403x301, left:60px, top:95px (Frame 2147229510) */}
          <div className="flex w-full shrink-0 flex-col items-start justify-between gap-[16px] px-6 py-10 lg:ml-[60px] lg:h-[301px] lg:w-[403px] lg:px-0 lg:py-0 xl:absolute xl:top-[95px] xl:left-[60px] xl:ml-0">
            {/* Badge — Figma: "Join our Team" (Frame 2147229487) */}
            <SectionBadge variant="outline" showDot className="h-[33px] px-4">
              {joinTeamData.badge}
            </SectionBadge>

            {/* Main content — Figma: 403x252 (Frame 2147229485) */}
            <div className="flex h-full w-full flex-col items-start justify-between gap-[32px] lg:h-[252px]">
              {/* Title — Figma: 403x174 (Frame 2147229501) */}
              <div className="relative w-full lg:h-[174px]">
                <h2
                  className="text-brand-dark text-[32px] leading-[38px] font-medium lg:absolute lg:top-0 lg:left-0 lg:text-[48px] lg:leading-[58px]"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    fontWeight: 500,
                  }}
                >
                  {joinTeamData.title.split("\n").map((line, idx) => (
                    <Fragment key={idx}>
                      {idx > 0 && <br className="hidden lg:inline" />}
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
          <div className="relative ml-auto hidden h-[430px] w-full max-w-[690px] overflow-hidden rounded-[32px] bg-white lg:mr-[23px] lg:block xl:absolute xl:top-[30px] xl:left-[527px] xl:mr-0">
            {/* Overflowing team image — Figma: 726x544, left:-30px, top:-32px (Malik Seeds Team-3 2) */}
            <div className="absolute top-[-32px] left-[-30px] h-[544px] w-[726px] overflow-hidden">
              <Image
                src={joinTeamData.images.desktop}
                alt="Join the Malik Seeds Team"
                fill
                loading="eager"
                sizes="726px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile image fallback */}
          <div className="relative h-[200px] w-full overflow-hidden sm:h-[320px] lg:hidden">
            <Image
              src={joinTeamData.images.mobile}
              alt="Join the Malik Seeds Team"
              loading="eager"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
