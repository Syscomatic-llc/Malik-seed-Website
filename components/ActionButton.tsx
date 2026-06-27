import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowIcon } from "./ui/ArrowIcon";

export type ActionButtonVariant = "primary" | "secondary" | "dark";

interface ActionButtonProps {
  label: string;
  href: string;
  variant?: ActionButtonVariant;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  showArrow?: boolean;
  iconSize?: number;
  target?: string;
  rel?: string;
  showYoutubeIcon?: boolean;
}

const variantStyles: Record<ActionButtonVariant, string> = {
  // #A9E179 green — used in hero "Our Products" and most CTAs
  primary:
    "bg-[#A9E179] text-[#195236] hover:bg-[#96d270] focus-visible:ring-[#A9E179]",
  // #F2F7F1 off-white — used in hero "Learn More"
  secondary:
    "bg-[#F2F7F1] text-[#195236] hover:bg-white focus-visible:ring-white",
  // #195236 dark green — used in "Join us", "View Openings", About CTAs
  dark: "bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28] focus-visible:ring-[#A9E179]",
};

export default function ActionButton({
  label,
  href,
  variant = "dark",
  className,
  containerClassName,
  onClick,
  showArrow = true,
  iconSize = 20,
  target,
  rel,
  showYoutubeIcon
}: ActionButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cn("inline-flex w-fit focus:outline-none", containerClassName)}
    >
      <button
        type="button"
        className={cn(
          "group/button flex cursor-pointer items-center justify-center gap-[10px] rounded-[60px] px-5 text-[16px] leading-[19px] font-medium whitespace-nowrap transition-all duration-200 select-none active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          variantStyles[variant],
          className
        )}
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        {showYoutubeIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: iconSize, height: iconSize }}
            className="shrink-0"
            aria-label="YouTube"
          >
            {/* YouTube rounded rectangle */}
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
            {/* Play triangle */}
            <path fill="#195236" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        )}
        <span>{label}</span>
        {showArrow && (
          <ArrowIcon
            size={iconSize}
            className="shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5"
          />
        )}
      </button>
    </Link>
  );
}
