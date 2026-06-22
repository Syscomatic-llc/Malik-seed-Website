import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { footerData, FooterLink, SocialLink } from "@/data/sections-data";

// Common Typography Classes for Scalability
const TYPOGRAPHY = {
  title: "font-inter-tight text-[18px] md:text-[24px] font-medium leading-[27px] md:leading-[36px] text-white",
  link: "font-inter-tight text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-white/60 transition-colors hover:text-white",
  label: "font-inter-tight text-[16px] md:text-[18px] leading-[19px] md:leading-[22px] text-white font-normal",
  contact: "font-inter-tight text-[14px] md:text-[16px] leading-[17px] md:leading-[19px] text-white font-medium hover:text-brand-light-green transition-colors",
} as const;

// Reusable Sub-components for better code quality
const FooterLinkColumn = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div className="flex flex-col gap-4 w-44.75 lg:w-54 shrink-0">
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
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-brand-light-green hover:text-brand-light-green"
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
);

export default memo(function Footer() {
  return (
    <footer className="w-full bg-brand-dark py-12 md:py-21 text-white" id="footer">
      <div className="mx-auto max-w-full px-4 md:px-25">

        {/* Top Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start w-full">

          {/* Left Block: Identity & Mission */}
          <div className="flex flex-col w-full lg:w-102.25 shrink-0">
            <Link href="/" className="inline-block">
              <Image
                src={footerData.logo}
                alt="Malik Seeds Logo"
                width={270}
                height={35}
                className="w-55 md:w-67.5 h-auto brightness-0 invert"
                priority
              />
            </Link>

            <p className="font-inter text-[16px] md:text-[18px] leading-6 md:leading-6.75 text-brand-light-green font-normal mt-4 md:mt-6">
              {footerData.mission}
            </p>

            <div className="flex flex-col gap-4 mt-8 lg:mt-16.75">
              <span className={TYPOGRAPHY.label}>{footerData.followUsText}</span>
              <div className="flex gap-2">
                {footerData.socials.map((social) => (
                  <SocialIcon key={social.label} social={social} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Sitemap & Contact */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 lg:ml-auto w-full lg:w-183.25 justify-between items-start mt-10 lg:mt-0">

            {/* Navigation Grid */}
            <div className="flex justify-between w-full lg:contents max-w-100 lg:max-w-none">
              <FooterLinkColumn title="Company" links={footerData.links.company} />
              <FooterLinkColumn title="Our Brands" links={footerData.links.brands} />
            </div>

            {/* Contact Information */}
            <address className="flex flex-col gap-6 md:gap-8 w-full lg:w-54 shrink-0 lg:mt-0 not-italic">
              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Contact</h4>
                <a href={footerData.contact.phone.href} className={TYPOGRAPHY.contact}>
                  {footerData.contact.phone.label}
                </a>
              </div>

              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Email</h4>
                <a href={footerData.contact.email.href} className={`${TYPOGRAPHY.contact} break-all`}>
                  {footerData.contact.email.label}
                </a>
              </div>
            </address>

          </div>
        </div>

        {/* Global Brand Wordmark */}
        <div className="mt-12 lg:mt-24 w-full flex justify-center">
          <Image
            src={footerData.wordmark}
            alt="Malik Seeds Wordmark"
            width={1225}
            height={151}
            className="w-full max-w-89.5 md:max-w-306.25 h-auto"
            priority
          />
        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 lg:mt-16 flex flex-col gap-8 lg:gap-10">
          <div className="h-px w-full bg-white/10" aria-hidden="true" />
          <p className="font-inter-tight text-center text-[14px] leading-4.25 text-brand-light-green font-normal">
            {footerData.contact.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
});
