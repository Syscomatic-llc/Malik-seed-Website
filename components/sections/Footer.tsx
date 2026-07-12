import Link from "next/link";
import Image from "next/image";
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

export default async function Footer() {
  let contactInfo = null;
  try {
    const data = await contactApi.getContact({ revalidate: 60 });
    contactInfo = data?.info || null;
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
  const socials: SocialLink[] = [];
  if (contactInfo) {
    if (contactInfo.facebook_url) {
      socials.push({
        label: "Facebook",
        path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        href: contactInfo.facebook_url,
      });
    }
    if (contactInfo.instagram_url) {
      socials.push({
        label: "Instagram",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
        href: contactInfo.instagram_url,
      });
    }
    if (contactInfo.linkedin_url) {
      socials.push({
        label: "LinkedIn",
        path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
        href: contactInfo.linkedin_url,
      });
    }
    if (contactInfo.twitter_url) {
      socials.push({
        label: "Twitter",
        path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
        href: contactInfo.twitter_url,
      });
    }
    if (contactInfo.youtube_url) {
      socials.push({
        label: "YouTube",
        path: "M22.54 6.42a2.78 2.78 0 0 0-1.96-1.96C18.88 4 12 4 12 4s-6.88 0-8.58.46a2.78 2.78 0 0 0-1.96 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 0 0 1.96 1.96C5.12 20 12 20 12 20s6.88 0 8.58-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.88 23 12 23 12s0-3.88-.46-5.58ZM10 15.5v-7l6 3.5-6 3.5Z",
        href: contactInfo.youtube_url,
      });
    }
  }
  const displaySocials = socials.length > 0 ? socials : footerData.socials;

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
              {contactInfo?.description || footerData.mission}
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
}
