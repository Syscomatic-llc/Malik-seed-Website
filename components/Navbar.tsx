"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ActionButton from "./ActionButton";
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

function NavLink({ item, onClick, dark }: { item: NavItem; onClick?: () => void; dark?: boolean }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center transition-colors duration-200",
        dark 
          ? "h-auto py-1 px-0 text-[16px] font-medium leading-[19px]" 
          : "h-[35px] rounded-full px-3 text-[16px] font-medium leading-[19px] hover:bg-neutral-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-green",
        isActive
          ? "text-brand-accent"
          : dark
          ? "text-brand-bg hover:text-white"
          : "text-brand-dark"
      )}
      style={{ fontFamily: "var(--font-inter-tight)" }}
    >
      {item.label}
    </Link>
  );
}

/** "Join us" pill button — Figma: 132×44, bg #195236, radius 60px */
function JoinUsButton({ 
  onClick, 
  className, 
  containerClassName 
}: { 
  onClick?: () => void; 
  className?: string; 
  containerClassName?: string; 
 }) {
  return (
    <ActionButton
      href="/join"
      onClick={onClick}
      label="Join us"
      variant="dark"
      className={cn("h-[44px]", className)}
      containerClassName={containerClassName}
    />
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

      {/* Nav links */}
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
  dark,
}: {
  isOpen: boolean;
  onToggle: () => void;
  dark?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full",
        dark ? "text-brand-bg hover:bg-white/10" : "text-brand-dark hover:bg-neutral-100",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-green"
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
    <div className="relative w-full max-w-[358px] mx-auto lg:hidden">
      {/* Closed State (Pill) */}
      <div
        className={cn(
          "flex h-[48px] w-full items-center justify-between rounded-[50px] bg-white px-5 shadow-sm transition-all duration-300",
          isOpen ? "pointer-events-none opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        <Logo />
        <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(true)} />
      </div>

      {/* Open State (unified card) */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full rounded-[24px] bg-brand-dark shadow-lg transition-all duration-300 origin-top flex flex-col justify-between overflow-hidden z-50",
          isOpen 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-95 pointer-events-none h-0"
        )}
        style={{ height: isOpen ? "568px" : "0px" }}
      >
        {/* Header inside card */}
        <div className="flex h-[48px] items-center justify-between px-5">
          <Logo light />
          <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(false)} dark />
        </div>

        {/* Links + Join Us inside card */}
        <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-[16px] pt-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} onClick={close} dark />
            ))}
          </nav>
          <div className="mt-auto">
            <JoinUsButton
              onClick={close}
              containerClassName="w-full"
              className="w-full h-[44px] justify-center bg-brand-active hover:bg-brand-primary-hover text-brand-bg"
            />
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
