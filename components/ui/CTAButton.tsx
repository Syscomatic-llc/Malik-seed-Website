import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { cn } from "@/lib/utils";

export type CTAButtonVariant = "primary" | "secondary" | "dark";

export interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: CTAButtonVariant;
  /** Override button width, e.g. "w-[152px]" */
  className?: string;
  /** Override height class, defaults to h-[44px] */
  heightClass?: string;
  /** Show the arrow icon (default: true) */
  showArrow?: boolean;
  /** Icon size */
  iconSize?: number;
}

const variantStyles: Record<CTAButtonVariant, string> = {
  // #A9E179 green — used in hero "Our Products" and most CTAs
  primary:
    "bg-[#A9E179] text-[#195236] hover:bg-[#96d270]",
  // #F2F7F1 off-white — used in hero "Learn More"
  secondary:
    "bg-[#F2F7F1] text-[#195236] hover:bg-white",
  // #195236 dark green — used in "Join us", "View Openings", About CTAs
  dark:
    "bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28]",
};

/**
 * Reusable pill-shaped CTA button.
 * Matches the Figma design system: rounded-[60px], Inter Tight font, arrow icon.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  heightClass = "h-[44px]",
  showArrow = true,
  iconSize = 20,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-[10px] rounded-[60px] px-5",
        "text-[16px] font-medium leading-[19px] transition-all duration-200 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9E179] focus-visible:ring-offset-2",
        heightClass,
        variantStyles[variant],
        className
      )}
      style={{ fontFamily: "var(--font-inter-tight)" }}
    >
      {showArrow && (
        <ArrowIcon size={iconSize} className="shrink-0" />
      )}
      {children}
    </Link>
  );
}
