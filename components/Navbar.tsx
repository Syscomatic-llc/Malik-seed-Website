"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ActionButton from "./ActionButton";
import { cn } from "@/lib/utils";
import { homepageApi } from "@/lib/api";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// ---------------------------------------------------------------------------
// Static data — module scope for O(1) lookup
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Our Brands", href: "/our-brands" },
  { label: "Our Products", href: "/our-products" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

/** Single nav link — handles active state via pathname */
function NavLink({
  item,
  onClick,
  compact,
}: {
  item: NavItem;
  onClick?: () => void;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center font-medium transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none",
        compact
          ? "h-[30px] rounded-full px-2.5 text-[13px] leading-[17px] hover:bg-neutral-50"
          : "h-[35px] rounded-full px-3 text-[16px] leading-[19px] hover:bg-neutral-50",
        isActive ? "text-brand-accent" : "text-[#0D1A14]"
      )}
      style={{ fontFamily: "var(--font-inter-tight)" }}
    >
      {item.label}
    </Link>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

interface BrandsDropdownItemProps {
  item: NavItem;
  compact?: boolean;
  brands: { name: string; description: string; href: string }[];
}

/**
 * Desktop "Our Brands" trigger — hover still opens the mega-dropdown, but
 * the trigger itself is now a real Link (not a <button>), so clicking the
 * label/chevron navigates straight to /our-brands like every other nav
 * item, instead of being a dead-end toggle.
 */
function BrandsDropdownItem({
  item,
  compact,
  brands,
}: BrandsDropdownItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname?.startsWith(item.href);

  // Close dropdown on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "flex cursor-pointer items-center gap-1 font-medium transition-colors duration-200",
          "focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none",
          compact
            ? "h-[30px] rounded-full px-2.5 text-[13px] leading-[17px] hover:bg-neutral-50"
            : "h-[35px] rounded-full px-3 text-[16px] leading-[19px] hover:bg-neutral-50",
          isActive ? "text-brand-accent" : "text-[#0D1A14]",
          isOpen && "bg-neutral-50"
        )}
        style={{ fontFamily: "var(--font-inter-tight)" }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <ChevronDownIcon
          className={cn(
            "transition-transform duration-300 ease-in-out",
            isOpen ? "text-brand-accent rotate-180" : "text-[#0D1A14]/70"
          )}
        />
      </Link>

      {/* Dropdown Container */}
      <div
        className={cn(
          "absolute top-full left-1/2 z-50 mt-2 w-[760px] origin-top -translate-x-1/2 rounded-[20px] border border-neutral-100/80 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 ease-out",
          "before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['']",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        )}
      >
        <div className="grid grid-cols-3 gap-4">
          {brands.length === 0 ? (
            <div className="col-span-3 flex items-center justify-center gap-2 py-6">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              <span className="text-[14px] text-neutral-500">
                Loading brands...
              </span>
            </div>
          ) : (
            brands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group flex flex-col gap-1 rounded-xl p-3 transition-colors duration-200 hover:bg-neutral-50"
              >
                <div className="group-hover:text-brand-accent flex items-center gap-1.5 text-[15px] font-semibold text-[#0D1A14] transition-colors duration-200">
                  <span>{brand.name}</span>
                  <ArrowIcon
                    size={12}
                    className="text-brand-accent -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
                <p className="line-clamp-2 font-sans text-[13px] leading-[18px] font-normal text-neutral-500">
                  {brand.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/** Hamburger / close icon button */
function MenuToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-drawer"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#0D1A14] transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none"
    >
      {isOpen ? (
        /* X icon — 24×24 */
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Hamburger icon — 24×24 */
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 8.5h16M4 15.5h16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function DesktopNav({
  compact = false,
  brands,
}: {
  compact?: boolean;
  brands: { name: string; description: string; href: string }[];
}) {
  return (
    <div
      className={cn(
        "w-full items-center justify-between rounded-[80px] bg-white shadow-sm",
        compact ? "flex h-[52px] pr-1.5 pl-5" : "flex h-[60px] pr-2 pl-8"
      )}
    >
      <Logo />

      <nav
        aria-label="Primary navigation"
        className={cn(
          "flex flex-1 items-center justify-center",
          compact ? "gap-0" : "gap-1"
        )}
      >
        {NAV_ITEMS.map((item) => {
          if (item.label === "Our Brands") {
            return (
              <BrandsDropdownItem
                key={item.href}
                item={item}
                compact={compact}
                brands={brands}
              />
            );
          }
          return <NavLink key={item.href} item={item} compact={compact} />;
        })}
      </nav>

      {/* "Join us" CTA — Figma: 132×44 */}
      <ActionButton
        href="/careers"
        label="Join us"
        variant="dark"
        className="h-[44px]"
      />
    </div>
  );
}

function MobileNav({
  brands,
}: {
  brands: { name: string; description: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setBrandsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Pill + drawer container — max-w matches Figma 358px, centred on mobile */}
      {/* On phones: centred 358px pill. On tablets (md+): full container width pill */}
      <div className="relative z-50 mx-auto w-full max-w-[358px] md:max-w-full">
        {/* ── PILL (always visible) ── 358×48, bg #FFF, radius 50px */}
        <div className="flex h-[48px] w-full items-center justify-between rounded-[50px] bg-white px-[15px] shadow-sm">
          <Logo />
          <MenuToggle isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
        </div>

        {/* ── CARD DRAWER ── 358×684, bg #FFF, radius 24px, gap 16px below pill */}
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={cn(
            "absolute top-[calc(48px+16px)] left-0 w-full rounded-[24px] bg-white shadow-lg transition-all duration-300 ease-in-out",
            isOpen
              ? "pointer-events-auto overflow-y-auto opacity-100"
              : "pointer-events-none overflow-hidden opacity-0"
          )}
          style={{
            maxHeight: isOpen ? "min(684px, calc(100vh - 100px))" : "0px",
          }}
        >
          {/* Inner content — mirrors Figma Frame 2147229900 */}
          <div
            className="flex flex-col justify-between px-[24px] pt-[24px] pb-[24px]"
            style={{ minHeight: "min(75vh, 580px)" }}
          >
            {/* ── Nav links ── each row 35px tall, gap 24px, text 16px #0D1A14 */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-[24px]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                if (item.label === "Our Brands") {
                  return (
                    <div key={item.href} className="flex flex-col">
                      {/* Label navigates to /our-brands and closes the
                          drawer; the chevron is a separate control that
                          only expands/collapses the inline brand list —
                          tapping the word "Our Brands" no longer dead-ends
                          on a toggle. */}
                      <div
                        className={cn(
                          "flex h-[35px] w-full items-center justify-between text-[16px] leading-[19px] font-medium transition-colors",
                          isActive ? "text-brand-accent" : "text-[#0D1A14]"
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={close}
                          className="flex h-full flex-1 items-center focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none"
                          style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setBrandsOpen((v) => !v)}
                          aria-label={
                            brandsOpen
                              ? "Collapse Our Brands"
                              : "Expand Our Brands"
                          }
                          aria-expanded={brandsOpen}
                          className="flex h-[35px] w-[35px] shrink-0 cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none"
                        >
                          <ChevronDownIcon
                            className={cn(
                              "h-4 w-4 transition-transform duration-300 ease-in-out",
                              brandsOpen
                                ? "text-brand-accent rotate-180"
                                : "text-[#0D1A14]/70"
                            )}
                          />
                        </button>
                      </div>

                      {/* Collapsible Brands List */}
                      <div
                        className={cn(
                          "flex flex-col gap-3 overflow-hidden pl-4 transition-all duration-300 ease-in-out",
                          brandsOpen
                            ? "mt-3 max-h-[400px] opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {brands.length === 0 ? (
                          <div className="flex items-center gap-2 py-2">
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                            <span className="text-[12px] text-neutral-500">
                              Loading brands...
                            </span>
                          </div>
                        ) : (
                          brands.map((brand) => (
                            <Link
                              key={brand.href}
                              href={brand.href}
                              onClick={close}
                              className="group flex flex-col py-1"
                            >
                              <div className="group-hover:text-brand-accent flex items-center gap-1.5 text-[14px] font-semibold text-[#0D1A14] transition-colors duration-200">
                                <span>{brand.name}</span>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex h-[35px] items-center text-[16px] leading-[19px] font-medium transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:outline-none",
                      isActive ? "text-brand-accent" : "text-[#0D1A14]"
                    )}
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Join Us button ── Figma: 310×48, bg #195236, radius 60px */}
            <ActionButton
              href="/careers"
              label="Join us"
              variant="dark"
              onClick={close}
              containerClassName="w-full mt-auto"
              className="z-100 h-[48px] w-full justify-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [brands, setBrands] = useState<
    { name: string; description: string; href: string }[]
  >([]);

  useEffect(() => {
    let active = true;
    homepageApi
      .getServices()
      .then((data) => {
        if (active && data && data.length > 0) {
          setBrands(
            data.map((s) => ({
              name: s.title,
              description: s.description,
              href: s.link,
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Failed to load navbar brands:", err);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="absolute top-6 z-50 w-full px-4 lg:px-[100px]">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Desktop pill — 1024px and above */}
        <div className="hidden lg:block">
          <DesktopNav brands={brands} />
        </div>

        {/* Mobile/Tablet drawer — below 1024px */}
        <div className="lg:hidden">
          <MobileNav brands={brands} />
        </div>
      </div>
    </header>
  );
}
