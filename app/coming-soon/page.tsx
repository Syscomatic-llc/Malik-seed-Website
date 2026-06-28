import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon — Malik Seeds",
  description: "We are cultivating a new digital experience. This page is currently under development.",
};

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#0D1A14] text-white px-4 py-20 overflow-hidden">
      {/* Decorative background glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#195236]/30 blur-[80px] sm:blur-[120px] pointer-events-none z-0" 
      />
      <div 
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-[#A9E179]/5 blur-[60px] pointer-events-none z-0" 
      />

      <div className="relative z-10 max-w-[650px] text-center flex flex-col items-center gap-6 md:gap-8">
        
        {/* Section Badge */}
        <SectionBadge variant="dark" className="bg-[#195236] border-white/10 text-white px-4 py-1.5 text-[13px] tracking-widest">
          COMING SOON
        </SectionBadge>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-[42px] sm:text-[60px] md:text-[76px] font-semibold italic leading-[1.1] text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Cultivating<br />Something New
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] leading-[24px] text-white/70 max-w-[500px] mx-auto">
            We are working behind the scenes to sow the seeds of a brand new experience. This page will be ready to harvest very soon.
          </p>
        </div>

        {/* Home Link */}
        <div className="mt-4">
          <ActionButton
            label="Back to Homepage"
            href="/"
            variant="primary"
            className="h-[52px] px-8 rounded-[40px] text-[16px]"
          />
        </div>

      </div>
    </div>
  );
}
