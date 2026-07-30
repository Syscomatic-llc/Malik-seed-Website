import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#0D1A14] px-4 py-20 text-white">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#195236]/30 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 z-0 h-[200px] w-[200px] rounded-full bg-[#A9E179]/5 blur-[60px]" />

      <div className="relative z-10 flex max-w-[650px] flex-col items-center gap-6 text-center md:gap-8">
        {/* Section Badge */}
        <SectionBadge
          variant="dark"
          showDot
          className="border-white/10 bg-[#195236] px-4 py-1.5 text-[13px] tracking-widest text-white"
        >
          COMING SOON
        </SectionBadge>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-[42px] leading-[1.1] font-semibold text-white sm:text-[60px] md:text-[76px]"
            style={{ fontFamily: "var(--font-stack-sans-notch)" }}
          >
            Cultivating
            <br />
            Something New
          </h1>
          <p className="mx-auto max-w-[500px] font-sans text-[15px] leading-[24px] text-white/70 sm:text-[17px]">
            We are working behind the scenes to sow the seeds of a brand new
            experience. This page will be ready to harvest very soon.
          </p>
        </div>

        {/* Home Link */}
        <div className="mt-4">
          <ActionButton
            label="Back to Homepage"
            href="/"
            variant="primary"
            className="h-[52px] rounded-[40px] px-8 text-[16px]"
          />
        </div>
      </div>
    </div>
  );
}
