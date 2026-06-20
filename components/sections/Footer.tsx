import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Products", href: "/products" },
    { label: "News & Stories", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  brands: [
    { label: "Vegetable Seeds", href: "/brands/vegetable-seeds" },
    { label: "Potato Seeds", href: "/brands/potato-seed" },
    { label: "Malik's Farm", href: "/brands/maliks-farm" },
    { label: "Origene by Malik", href: "/brands/origene" },
    { label: "Malik's Flower", href: "/brands/maliks-flower" },
    { label: "Innovation & Development", href: "/brands/innovation-development" },
  ],
};

export default function Footer() {
  return (
    // Desktop: 1440x790, bg #0D1A14
    <footer className="w-full bg-[#0D1A14] py-16 md:py-[84px]" id="footer">
      <div className="mx-auto max-w-[1440px] px-4 md:px-[100px]">
        {/* Top section — Figma: Frame 2147229573, 1240x312 */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-10">
          {/* Left column — logo + social links + description */}
          <div className="flex flex-col gap-8 md:w-[409px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/malik_seeds_logo.svg"
                alt="Malik Seeds"
                width={170}
                height={22}
                style={{ width: "auto", height: "22px", filter: "brightness(0) invert(1)" }}
              />
            </Link>

            {/* Description */}
            <p
              className="text-[15px] leading-[24px] text-[#F2F7F1]/60 md:text-[16px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We are committed to deliver high-performance hybrid seed varieties that empower farmers with better yield, climate resilience, disease resistance, and profitability.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                {
                  label: "Facebook",
                  path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                },
                {
                  label: "Twitter",
                  path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
                },
                {
                  label: "LinkedIn",
                  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#F2F7F1]/60 transition-colors hover:border-[#A9E179] hover:text-[#A9E179]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right columns — Figma: Frame 2147229515, 733x276 */}
          <div className="grid grid-cols-2 gap-10 md:ml-auto md:gap-16">
            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3
                className="text-[14px] font-semibold uppercase tracking-wider text-[#A9E179]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] leading-[20px] text-[#F2F7F1]/60 transition-colors hover:text-[#F2F7F1] md:text-[15px]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Brands */}
            <div className="flex flex-col gap-4">
              <h3
                className="text-[14px] font-semibold uppercase tracking-wider text-[#A9E179]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Our Brands
              </h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.brands.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] leading-[20px] text-[#F2F7F1]/60 transition-colors hover:text-[#F2F7F1] md:text-[15px]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom — Figma: Frame 2147229574, 1240x272 */}
        {/* "Malik Seeds" large gradient wordmark */}
        <div className="mt-16 md:mt-[100px]">
          <div
            className="overflow-hidden text-[80px] font-bold leading-none tracking-tight md:text-[151px]"
            style={{
              background:
                "linear-gradient(180deg, #75BC43 0%, rgba(117, 188, 67, 0.2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-inter-tight)",
            }}
          >
            Malik Seeds
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="h-[1px] w-full bg-white/10" />
          <p
            className="text-center text-[13px] leading-[17px] text-[#A9E179] md:text-[14px]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Copyright ©armalikseeds2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
