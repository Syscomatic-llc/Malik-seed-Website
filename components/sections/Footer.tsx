import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import NextImage from "next/image";
import { footerData, FooterLink, SocialLink } from "@/data/sections-data";
import { contactApi, homepageApi } from "@/lib/api";

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

const SocialIcon = ({ social }: { social: { label: string; href: string } }) => {
  let svgIcon: React.ReactNode = null;

  if (social.label.toLowerCase() === "facebook") {
    svgIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:scale-110">
        <path d="M9.33268 9.0026H10.9993L11.666 6.33594H9.33268V5.0026C9.33268 4.31594 9.33268 3.66927 10.666 3.66927H11.666V1.42927C11.4487 1.4006 10.628 1.33594 9.76135 1.33594C7.95135 1.33594 6.66602 2.4406 6.66602 4.46927V6.33594H4.66602V9.0026H6.66602V14.6693H9.33268V9.0026Z" fill="currentColor" />
      </svg>
    );
  } else if (social.label.toLowerCase() === "instagram" || social.label.toLowerCase() === "insta") {
    svgIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:scale-110">
        <path d="M8 5.67C6.71 5.67 5.67 6.72 5.67 8C5.67 9.28 6.72 10.33 8 10.33C9.28 10.33 10.33 9.28 10.33 8C10.33 6.72 9.28 5.67 8 5.67ZM15 8C15 7.03 15 6.08 14.95 5.11C14.9 3.99 14.64 2.99 13.82 2.18C13 1.36 12.01 1.1 10.89 1.05C9.92 1 8.97 1 8 1C7.03 1 6.08 1 5.11 1.05C3.99 1.1 2.99 1.36 2.18 2.18C1.36 3 1.1 3.99 1.05 5.11C1 6.08 1 7.03 1 8C1 8.97 1 9.92 1.05 10.89C1.1 12.01 1.36 13.01 2.18 13.82C3 14.64 3.99 14.9 5.11 14.95C6.08 15 7.03 15 8 15C8.97 15 9.92 15 10.89 14.95C12.01 14.9 13.01 14.64 13.82 13.82C14.64 13 14.9 12.01 14.95 10.89C15.01 9.93 15 8.97 15 8ZM8 11.59C6.01 11.59 4.41 9.99 4.41 8C4.41 6.01 6.01 4.41 8 4.41C9.99 4.41 11.59 6.01 11.59 8C11.59 9.99 9.99 11.59 8 11.59ZM11.74 5.1C11.28 5.1 10.9 4.73 10.9 4.26C10.9 3.79 11.27 3.42 11.74 3.42C12.21 3.42 12.58 3.79 12.58 4.26C12.5825 4.36954 12.5625 4.47842 12.5212 4.57991C12.48 4.6814 12.4183 4.77333 12.34 4.85C12.2633 4.92827 12.1714 4.98997 12.0699 5.03125C11.9684 5.07253 11.8595 5.09253 11.75 5.09L11.74 5.1Z" fill="currentColor" />
      </svg>
    );
  } else if (social.label.toLowerCase() === "youtube") {
    svgIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:scale-110">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.9987 2.66797C8.5687 2.66797 9.15336 2.68264 9.72003 2.70664L10.3894 2.73864L11.03 2.77664L11.63 2.8173L12.178 2.85997C12.7728 2.90523 13.3326 3.15892 13.7587 3.57637C14.1848 3.99381 14.4499 4.54823 14.5074 5.14197L14.534 5.4253L14.584 6.03197C14.6307 6.66063 14.6654 7.34597 14.6654 8.0013C14.6654 8.65663 14.6307 9.34197 14.584 9.97063L14.534 10.5773L14.5074 10.8606C14.4499 11.4545 14.1847 12.009 13.7584 12.4264C13.3322 12.8439 12.7723 13.0975 12.1774 13.1426L11.6307 13.1846L11.0307 13.226L10.3894 13.264L9.72003 13.296C9.14658 13.3208 8.57268 13.3337 7.9987 13.3346C7.42471 13.3337 6.85081 13.3208 6.27736 13.296L5.60803 13.264L4.96736 13.226L4.36736 13.1846L3.81936 13.1426C3.22457 13.0974 2.66483 12.8437 2.23873 12.4262C1.81262 12.0088 1.54749 11.4544 1.49003 10.8606L1.46336 10.5773L1.41336 9.97063C1.36259 9.31538 1.33546 8.65851 1.33203 8.0013C1.33203 7.34597 1.3667 6.66063 1.41336 6.03197L1.46336 5.4253L1.49003 5.14197C1.54747 4.54834 1.81251 3.994 2.23847 3.57657C2.66444 3.15914 3.22403 2.90538 3.8187 2.85997L4.36603 2.8173L4.96603 2.77664L5.60736 2.73864L6.2767 2.70664C6.85037 2.68179 7.42449 2.6689 7.9987 2.66797ZM6.66536 6.38463V9.61797C6.66536 9.92597 6.9987 10.118 7.26536 9.96463L10.0654 8.34797C10.1263 8.3129 10.1769 8.26238 10.2121 8.20152C10.2473 8.14066 10.2658 8.0716 10.2658 8.0013C10.2658 7.931 10.2473 7.86194 10.2121 7.80108C10.1769 7.74022 10.1263 7.68971 10.0654 7.65463L7.26536 6.03863C7.20454 6.00352 7.13554 5.98503 7.0653 5.98505C6.99506 5.98506 6.92607 6.00356 6.86525 6.0387C6.80444 6.07384 6.75395 6.12437 6.71886 6.18521C6.68377 6.24606 6.66532 6.31507 6.66536 6.3853V6.38463Z" fill="currentColor" />
      </svg>
    );
  }

  if (!svgIcon) return null;

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-200 hover:border-[#75BC43] hover:bg-[#75BC43]/10 hover:text-[#75BC43]"
    >
      {svgIcon}
    </a>
  );
};

export default async function Footer() {
  let contactInfo = null;
  try {
    const data = await contactApi.getContact({ revalidate: 60 });
    contactInfo = data || null;
  } catch (err) {
    console.error("Failed to fetch contact details for footer:", err);
  }

  let brands: FooterLink[] = [];
  try {
    const services = await homepageApi.getServices({ revalidate: 60 });
    if (services && services.length > 0) {
      brands = services.map((s) => ({
        label: s.title,
        href: s.link,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch services/brands for footer:", err);
  }

  // Fallback to static brands data if API fetch fails or is empty
  const displayBrands = brands.length > 0 ? brands : footerData.links.brands;

  // Dynamically map social icons based on API data
  const socials: { label: string; href: string }[] = [];
  if (contactInfo) {
    if (contactInfo.facebook_url) {
      socials.push({
        label: "Facebook",
        href: contactInfo.facebook_url,
      });
    }
    if (contactInfo.instagram_url) {
      socials.push({
        label: "Instagram",
        href: contactInfo.instagram_url,
      });
    }
    if (contactInfo.youtube_url) {
      socials.push({
        label: "YouTube",
        href: contactInfo.youtube_url,
      });
    }
  }

  // Fallback only contains Facebook, Instagram, and YouTube
  const displaySocials =
    socials.length > 0
      ? socials
      : [
        {
          label: "Facebook",
          href: "https://facebook.com/malikseeds",
        },
        {
          label: "Instagram",
          href: "https://instagram.com/malikseed",
        },
        {
          label: "YouTube",
          href: "https://facebook.com/malikseeds",
        },
      ];

  const phoneLabel = contactInfo?.phone_primary || footerData.contact.phone.label;
  const phoneHref = contactInfo?.phone_primary ? `tel:${contactInfo.phone_primary}` : footerData.contact.phone.href;
  const emailLabel = contactInfo?.email_primary || footerData.contact.email.label;
  const emailHref = contactInfo?.email_primary ? `mailto:${contactInfo.email_primary}` : footerData.contact.email.href;

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
              <OptimizedImage
                src={footerData.logo}
                alt="Malik Seeds Logo"
                width={270}
                height={35}
                className="h-auto w-55 brightness-0 invert md:w-67.5"
                priority
              />
            </Link>

            <p className="font-inter text-brand-light-green/70 mt-4 text-[16px] leading-6 font-normal md:mt-6 md:text-[18px] md:leading-6.75">
              {contactInfo?.footer_description || footerData.mission}
            </p>

            <div className="mt-8 flex flex-col gap-4 lg:mt-16.75">
              <span className={TYPOGRAPHY.label}>
                {footerData.followUsText}
              </span>
              <div className="flex gap-2">
                {displaySocials.map((social) => (
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
                links={displayBrands}
              />
            </div>

            {/* Contact Information */}
            <address className="flex w-full shrink-0 flex-col gap-6 not-italic md:gap-8 lg:mt-0 lg:w-54">
              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Contact</h4>
                <a
                  href={phoneHref}
                  className={TYPOGRAPHY.contact}
                >
                  {phoneLabel}
                </a>
              </div>

              <div className="flex flex-col gap-2 md:gap-4">
                <h4 className={TYPOGRAPHY.label}>Email</h4>
                <a
                  href={emailHref}
                  className={`${TYPOGRAPHY.contact} break-all`}
                >
                  {emailLabel}
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Global Brand Wordmark */}
        <div className="mt-12 flex w-full justify-center lg:mt-24">
          <NextImage
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
}
