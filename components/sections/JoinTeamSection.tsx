import ActionButton from "@/components/ActionButton";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function JoinTeamSection() {
  return (
    // Desktop: 1440x690, bg #F2F7F1 (Figma: Frame 2147229633)
    <section className="w-full bg-[#F2F7F1] py-10 md:py-[100px]" id="careers">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* White card — Figma: 1240x490, bg #FFFFFF, radius 32px (Frame 2147229509) */}
        <div className="relative flex flex-col lg:flex-row overflow-hidden rounded-[24px] bg-white lg:h-[490px] lg:rounded-[32px] w-full justify-between items-center">
          
          {/* Left content — Figma: 403x301, left:60px, top:95px (Frame 2147229510) */}
          <div className="flex flex-col gap-[16px] px-6 py-10 lg:py-0 lg:px-0 w-full lg:w-[403px] lg:h-[301px] lg:ml-[60px] xl:absolute xl:left-[60px] xl:top-[95px] xl:ml-0 justify-between items-start shrink-0">
            {/* Badge — Figma: "Join our Team" (Frame 2147229487) */}
            <SectionBadge variant="outline" showDot className="h-[33px] px-4">
              Join our Team
            </SectionBadge>

            {/* Main content — Figma: 403x252 (Frame 2147229485) */}
            <div className="flex flex-col gap-[32px] justify-between items-start w-full h-full lg:h-[252px]">
              {/* Title — Figma: 403x174 (Frame 2147229501) */}
              <div className="relative w-full lg:h-[174px]">
                <h2 
                  className="text-brand-dark font-medium lg:absolute lg:left-0 lg:top-0 text-[32px] leading-[38px] lg:text-[48px] lg:leading-[58px]"
                  style={{ 
                    fontFamily: "var(--font-inter-tight)",
                    fontWeight: 500
                  }}
                >
                  Shape the Future <br className="hidden lg:inline" />
                  of Agriculture <br className="hidden lg:inline" />
                  with Malik Seeds
                </h2>
              </div>

              {/* CTA — Figma: 155x46, bg #195236, radius 60px (Frame 6) */}
              <ActionButton
                href="/careers"
                label="Join Today"
                variant="dark"
                className="h-[46px] w-[155px] px-0 gap-[10px]"
                iconSize={20}
              />
            </div>
          </div>

          {/* Right image container — Figma: 690x430, left:527px, top:30px (Frame 2147229656) */}
          <div className="relative hidden lg:block w-full max-w-[690px] h-[430px] rounded-[32px] overflow-hidden bg-white lg:mr-[23px] ml-auto xl:absolute xl:left-[527px] xl:top-[30px] xl:mr-0">
            {/* Overflowing team image — Figma: 726x544, left:-30px, top:-32px (Malik Seeds Team-3 2) */}
            <div className="absolute w-[726px] h-[544px] left-[-30px] top-[-32px] overflow-hidden">
              <Image
                src="/images/team/team-banner.png"
                alt="Join the Malik Seeds Team"
                fill
                loading="eager"
                sizes="726px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile image fallback */}
          <div className="relative h-[200px] sm:h-[320px] w-full overflow-hidden lg:hidden">
            <Image
              src="/images/team/team-banner.png"
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
