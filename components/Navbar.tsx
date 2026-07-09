"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ActionButton from "./ActionButton";
import { cn } from "@/lib/utils";

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
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function DesktopNav({ compact = false }: { compact?: boolean }) {
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
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} compact={compact} />
        ))}
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

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
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

  const close = () => setIsOpen(false);

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
  return (
    <header className="absolute top-6 z-50 w-full px-4 lg:px-[100px]">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Desktop pill — 1024px and above */}
        <div className="hidden lg:block">
          <DesktopNav />
        </div>

        {/* Mobile/Tablet drawer — below 1024px */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
