import React from "react";

export const metadata = {
  title: "Maintenance Mode - Malik Seeds",
  description: "We are currently undergoing scheduled maintenance. We'll be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center p-6 text-center"
      style={{
        background: "radial-gradient(circle at center, #1b4d32 0%, #0d2619 100%)",
        fontFamily: "var(--font-inter-tight), sans-serif",
      }}
    >
      <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md animate-fade-in">
        {/* Animated Sprout/Wrench Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-light-green/10 text-brand-light-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            style={{ color: "#75BB44" }}
          >
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="m4.93 4.93 2.83 2.83" />
            <path d="m16.24 16.24 2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="m16.24 7.76 2.83-2.83" />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Scheduled Maintenance
        </h1>
        
        <p className="mb-6 text-base leading-relaxed text-white/70">
          Malik Seeds is currently upgrading its platform to improve your experience. 
          We are polishing our services and will be back shortly. Thank you for your patience!
        </p>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-[#75BB44] transition-all duration-1000"
            style={{
              width: "60%",
              boxShadow: "0 0 12px #75BB44",
              animation: "pulse 2s infinite ease-in-out",
            }}
          />
        </div>

        <p className="mt-8 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Malik Seeds. All rights reserved.
        </p>
      </div>
    </div>
  );
}
