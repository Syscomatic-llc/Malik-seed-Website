import ActionButton from "@/components/ActionButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Malik Seeds",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#0D1A14] text-white px-4 py-20 overflow-hidden">
      {/* Decorative background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#195236]/30 blur-[80px] sm:blur-[120px] pointer-events-none z-0"
      />
      <div
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-[#A9E179]/5 blur-[60px] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-[600px] text-center flex flex-col items-center gap-6 md:gap-8">
        
        {/* Huge Anton font 404 */}
        <div 
          className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none text-[#A9E179] font-sans tracking-tight select-none"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          404
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="font-sans text-[28px] sm:text-[38px] md:text-[48px] font-medium leading-[34px] sm:leading-[46px] md:leading-[58px] text-white">
            Lost in the fields?
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] leading-[24px] text-white/70 max-w-[480px] mx-auto">
            The page you are looking for doesn't exist, has been removed, or was moved to another field.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center w-full">
          <ActionButton
            label="Return Home"
            href="/"
            variant="primary"
            className="h-[52px] px-8 rounded-[40px] text-[16px]"
          />
          <ActionButton
            label="Explore Our Brands"
            href="/brands"
            variant="secondary"
            className="h-[52px] px-8 rounded-[40px] text-[16px]"
          />
        </div>

      </div>
    </div>
  );
}
