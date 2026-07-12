import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { footerData, FooterLink, SocialLink } from "@/data/sections-data";

// Common Typography Classes for Scalability
const TYPOGRAPHY = {
  title:
    "font-inter-tight text-[18px] md:text-[24px] font-medium leading-[27px] md:leading-[36px] text-white",
  link: "font-inter-tight text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-white/60 transition-colors hover:text-brand-light-green transition-colors",
  label:
    "font-inter-tight text-[16px] md:text-[18px] leading-[19px] md:leading-[22px] text-white font-normal",
  contact:
    "font-inter-tight text-[14px] md:text-[16px] leading-[17px] md:leading-[19px] text-white font-medium hover:text-brand-light-green transition-colors",
} as const;

// Reusable Sub-components for better code quality
const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => (
  <div className="flex w-44.75 shrink-0 flex-col gap-4 lg:w-54">
    <h3 className={TYPOGRAPHY.title}>{title}</h3>
    <ul className="flex flex-col gap-3 md:gap-4">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href} className={TYPOGRAPHY.link}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ social }: { social: SocialLink }) => (
  <a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={social.label}
    className="hover:border-brand-light-green hover:text-brand-light-green flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={social.path} />
    </svg>
  </a>
);

export default memo(function Footer() {
  return (
    <footer
      className="bg-brand-dark w-full py-12 text-white md:py-21"
      id="footer"
    >
      <div className="mx-auto max-w-full px-4 md:px-25">
        {/* Top Content Layout */}
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:gap-0">
          {/* Left Block: Identity & Mission */}
          <div className="flex w-full shrink-0 flex-col lg:w-102.25">
            <Link href="/" className="inline-block">
              <Image
                src={footerData.logo}
                alt="Malik Seeds Logo"
                width={270}
                height={35}
                className="h-auto w-55 brightness-0 invert md:w-67.5"
                priority
              />
            </Link>

            <p className="font-inter text-brand-light-green/70 mt-4 text-[16px] leading-6 font-normal md:mt-6 md:text-[18px] md:leading-6.75">
              {footerData.mission}
            </p>

            <div className="mt-8 flex flex-col gap-4 lg:mt-16.75">
              <span className={TYPOGRAPHY.label}>
                {footerData.followUsText}
              </span>
              <div className="flex gap-2">
                {footerData.socials.map((social) => (
                  <SocialIcon key={social.label} social={social} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Sitemap & Contact */}
          <div className="mt-10 flex w-full flex-col items-start justify-between gap-10 lg:mt-0 lg:ml-auto lg:w-183.25 lg:flex-row lg:gap-10">
            {/* Navigation Grid */}
            <div className="flex w-full max-w-100 justify-between lg:contents lg:max-w-none">
              <FooterLinkColumn
                title="Company"
                links={footerData.links.company}
              />
              <FooterLinkColumn
                title="Our Brands"
                links={footerData.links.brands}
              />
            </div>

            {/* Contact Information */}
            <address className="flex w-full shrink-0 flex-col gap-6 not-italic md:gap-8 lg:mt-0 lg:w-54">
              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Contact</h4>
                <a
                  href={footerData.contact.phone.href}
                  className={TYPOGRAPHY.contact}
                >
                  {footerData.contact.phone.label}
                </a>
              </div>

              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Email</h4>
                <a
                  href={footerData.contact.email.href}
                  className={`${TYPOGRAPHY.contact} break-all`}
                >
                  {footerData.contact.email.label}
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Global Brand Wordmark */}
        <div className="mt-12 flex w-full justify-center lg:mt-24">
          <Image
            src={footerData.wordmark}
            alt="Malik Seeds Wordmark"
            width={1225}
            height={151}
            className="h-auto w-full max-w-89.5 md:max-w-306.25"
            priority
          />
        </div>
      </div>
    </footer>
  );
});
