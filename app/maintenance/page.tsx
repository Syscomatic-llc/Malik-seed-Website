import React from "react";
import ActionButton from "@/components/ActionButton";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Metadata } from "next";
import { settingsApi } from "@/lib/api";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Maintenance Mode - Malik Seeds",
  description: "We are currently undergoing scheduled maintenance. We'll be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MaintenancePage() {
  // If maintenance mode is not active, block access to this page by redirecting to home
  const settings = await settingsApi.getSettings({ revalidate: 0 });
  if (!settings.maintenanceMode) {
    redirect("/");
  }

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
          MAINTENANCE MODE
        </SectionBadge>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-[42px] leading-[1.1] font-semibold text-white sm:text-[60px] md:text-[76px]"
            style={{ fontFamily: "var(--font-stack-sans-notch)" }}
          >
            Sowing Seeds
            <br />
            Of Improvement
          </h1>
          <p className="mx-auto max-w-[500px] font-sans text-[15px] leading-[24px] text-white/70 sm:text-[17px]">
            Malik Seeds is currently undergoing scheduled maintenance to upgrade our platform.
            We are polishing our digital fields and will be back online shortly. Thank you for your patience!
          </p>
        </div>

        {/* Progress Bar Loader */}
        <div className="w-full max-w-[300px] mt-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#A9E179]"
              style={{
                width: "60%",
                boxShadow: "0 0 12px #A9E179",
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <ActionButton
            label="Contact Support"
            href="/contact"
            variant="secondary"
            className="h-[52px] rounded-[40px] px-8 text-[16px]"
          />
        </div>
      </div>
    </div>
  );
}

