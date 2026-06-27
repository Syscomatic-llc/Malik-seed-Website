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
        className="absolute top-1/3 left-1/3 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#195236]/40 blur-[90px] sm:blur-[130px] pointer-events-none z-0" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-[#A9E179]/10 blur-[80px] sm:blur-[110px] pointer-events-none z-0" 
      />

      <div className="relative z-10 max-w-[650px] text-center flex flex-col items-center gap-6 md:gap-8">
        
        {/* Section Badge */}
        <SectionBadge variant="dark" className="bg-[#195236] border-white/10 text-[#A9E179] px-4 py-1.5 text-[13px] tracking-widest">
          COMING SOON
        </SectionBadge>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 
            className="font-sans text-[42px] sm:text-[60px] md:text-[76px] font-bold leading-[48px] sm:leading-[68px] md:leading-[84px] text-white uppercase"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            cultivating<br />something new
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
