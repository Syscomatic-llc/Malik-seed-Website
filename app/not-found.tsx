import ActionButton from "@/components/ActionButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Malik Seeds",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#0D1A14] px-4 py-20 text-white">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#195236]/30 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 z-0 h-[200px] w-[200px] rounded-full bg-[#A9E179]/5 blur-[60px]" />

      <div className="relative z-10 flex max-w-[600px] flex-col items-center gap-6 text-center md:gap-8">
        {/* Huge Anton font 404 */}
        <div
          className="font-sans text-[120px] leading-none font-bold tracking-tight text-[#A9E179] select-none sm:text-[160px] md:text-[200px]"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          404
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="font-sans text-[28px] leading-[34px] font-medium text-white sm:text-[38px] sm:leading-[46px] md:text-[48px] md:leading-[58px]">
            Lost in the fields?
          </h1>
          <p className="mx-auto max-w-[480px] font-sans text-[15px] leading-[24px] text-white/70 sm:text-[17px]">
            The page you are looking for doesn't exist, has been removed, or was
            moved to another field.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="mt-2 flex w-full flex-col justify-center gap-4 sm:flex-row">
          <ActionButton
            label="Return Home"
            href="/"
            variant="primary"
            className="h-[52px] rounded-[40px] px-8 text-[16px]"
          />
          <ActionButton
            label="Explore Our Brands"
            href="/our-brands"
            variant="secondary"
            className="h-[52px] rounded-[40px] px-8 text-[16px]"
          />
        </div>
      </div>
    </div>
  );
}
