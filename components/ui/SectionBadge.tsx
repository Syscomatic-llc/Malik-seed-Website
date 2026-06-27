import { cn } from "@/lib/utils";

export type SectionBadgeVariant = "green" | "outline" | "dark";

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: SectionBadgeVariant;
  className?: string;
  /** Optional leading dot (Figma "Rectangle 3" — used in outline badges) */
  showDot?: boolean;
}

const badgeVariants: Record<SectionBadgeVariant, string> = {
  // Green pill — Figma "About Malik Seeds", "Success stories", etc.
  green: "bg-brand-light-green text-brand-active",
  // White pill with border — Figma "Success stories", "News & Stories"
  outline:
    "bg-brand-neutral-light border border-brand-border text-brand-active",
  // Dark translucent — Figma "Timeline" badge on dark bg
  dark: "bg-brand-dark/32 border border-white/12 text-brand-bg",
};

/**
 * Reusable section badge / label chip.
 * Used to label sections like "About Malik Seeds", "Success stories", "Timeline".
 * Matches Figma: h-[33px], rounded-[30px], Inter font, 14px/500.
 */
export function SectionBadge({
  children,
  variant = "green",
  className,
  showDot = false,
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex h-[33px] w-fit items-center justify-center gap-2 rounded-[30px] px-4",
        "text-[12px] md:text-[14px] leading-[21px] font-medium",
        badgeVariants[variant],
        className
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {showDot && (
        <span className="h-[6px] w-[6px] shrink-0 rounded-[2px] bg-current" />
      )}
      {children}
    </div>
  );
}
