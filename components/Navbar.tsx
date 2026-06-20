"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { ArrowIcon } from "./ui/ArrowIcon";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#about" },
  { label: "Our Brands", href: "#brands" },
  { label: "Our Products", href: "#products" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex h-[35px] items-center rounded-full px-3",
        "text-[16px] font-medium leading-[19px] transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9E179]",
        isActive
          ? "text-[#75BC43]"
          : "text-[#0D1A14] hover:bg-neutral-50"
      )}
      style={{ fontFamily: "var(--font-inter-tight)" }}
    >
      {item.label}
    </Link>
  );
}

/** "Join us" pill button — Figma: 132×44, bg #195236, radius 60px */
function JoinUsButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/join"
      onClick={onClick}
      className={cn(
        "flex h-[44px] items-center justify-center gap-[10px] rounded-[60px]",
        "bg-[#195236] px-5 text-[16px] font-medium leading-[19px] text-[#F2F7F1]",
        "transition-opacity hover:opacity-90 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:ring-offset-2"
      )}
      style={{ fontFamily: "var(--font-inter-tight)" }}
    >
      <ArrowIcon size={20} className="shrink-0 text-[#F2F7F1]" />
      Join us
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Desktop Navbar — Figma: Frame 2147229670, 1240×60 at left:100 top:24, radius 80px
// ---------------------------------------------------------------------------

function DesktopNav() {
  return (
    <div
      className="hidden h-[60px] w-full items-center justify-between rounded-[80px] bg-white pl-8 pr-2 shadow-sm lg:flex"
    >
      <Logo />

      {/* Nav links — Frame 5: 542×44, gap:4, centered */}
      <nav
        aria-label="Main navigation"
        className="flex flex-1 items-center justify-center gap-1"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Frame 7: 132×44, bg #195236, left:1100 from container */}
      <JoinUsButton />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile Navbar — Figma: 358×48 pill + collapsible drawer
// ---------------------------------------------------------------------------

function MobileMenuButton({
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
      aria-controls="mobile-menu"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-[#0D1A14]",
        "transition-colors hover:bg-neutral-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9E179]"
      )}
    >
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="flex w-full flex-col lg:hidden">
      {/* Header bar: 358×48, radius 50px */}
      <div className="flex h-[48px] w-full items-center justify-between rounded-[50px] bg-white px-5 shadow-sm">
        <Logo />
        <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
      </div>

      {/* Drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen
            ? "mt-3 max-h-[520px] opacity-100"
            : "pointer-events-none mt-0 max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col justify-between rounded-[24px] bg-white p-6 shadow-lg" style={{ minHeight: 380 }}>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-6 pt-2">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} onClick={close} />
            ))}
          </nav>
          <div className="mt-8">
            <JoinUsButton onClick={close} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Navbar — Figma: Frame 2147229670 (desktop) + mobile variant.
 *
 * Architecture:
 *  - DesktopNav  → white pill 1240×60 with logo, links, and "Join us" CTA
 *  - MobileNav   → 358×48 pill + collapsible drawer with ArrowIcon, JoinUsButton
 *  - NavLink     → handles active state via usePathname
 *  - JoinUsButton → reusable across desktop + mobile
 */
export default function Navbar() {
  return (
    <header className="absolute top-6 z-50 w-full px-4 lg:px-[100px]">
      <div className="mx-auto w-full max-w-[1240px]">
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
