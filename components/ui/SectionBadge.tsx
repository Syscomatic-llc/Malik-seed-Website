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
  // #A9E179 green pill — Figma "About Malik Seeds", "Success stories", etc.
  green: "bg-[#A9E179] text-[#195236]",
  // White pill with #E4E7EC border — Figma "Success stories", "News & Stories"
  outline: "bg-[#F9FAFB] border border-[#E4E7EC] text-[#195236]",
  // Dark translucent — Figma "Timeline" badge on dark bg
  dark: "bg-[#0D1A14]/32 border border-white/12 text-[#F2F7F1]",
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
        "text-[14px] font-medium leading-[21px]",
        badgeVariants[variant],
        className
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {showDot && (
        <span className="h-[6px] w-[6px] shrink-0 rounded-sm bg-current" />
      )}
      {children}
    </div>
  );
}
