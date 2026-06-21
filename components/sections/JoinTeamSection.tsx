import ActionButton from "@/components/ActionButton";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function JoinTeamSection() {
  return (
    // Desktop: 1440x690, bg #F2F7F1
    <section className="w-full bg-brand-bg py-10 md:py-[100px]" id="careers">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* White card — Figma: 1240x490, bg #FFFFFF, radius 32px */}
        <div className="relative flex flex-col overflow-hidden rounded-[24px] bg-white md:h-[490px] md:flex-row md:rounded-[32px]">
          {/* Left content — Figma: 403x301, left:60px, top:95px */}
          <div className="flex flex-col justify-center gap-4 px-6 py-10 md:w-[490px] md:px-[60px] md:py-0">
            {/* Badge — Figma: "Join our Team" */}
            <SectionBadge variant="outline" showDot>
              Join our Team
            </SectionBadge>

            {/* Title */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-h2-title text-brand-dark">
                  Shape the Future of Agriculture with Malik Seeds
                </h2>
                <p className="font-inter text-[15px] leading-[24px] text-brand-dark/60 md:text-[16px]">
                  Be part of a team that&apos;s shaping the future of farming.
                  We&apos;re looking for passionate individuals committed to
                  agricultural excellence and innovation in Bangladesh.
                </p>
              </div>

              {/* CTA — Figma: 155x46, bg #195236, radius 60px */}
              <ActionButton
                href="/careers"
                label="Join Today"
                variant="dark"
                className="h-[46px] px-6"
              />
            </div>
          </div>

          {/* Right image — Figma: 690x430 + 726x544 overflowing team image */}
          <div className="relative hidden flex-1 overflow-hidden md:block">
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <Image
                src="/images/team/team-banner.png"
                alt="Join the Malik Seeds Team"
                fill
                sizes="(max-width: 768px) 0px, 690px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Mobile image */}
          <div className="relative h-[200px] w-full overflow-hidden md:hidden">
            <Image
              src="/images/team/team-banner.png"
              alt="Join the Malik Seeds Team"
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
