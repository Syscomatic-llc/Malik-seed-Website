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
  customIcon?: React.ReactNode;
  customIconPosition?: "left" | "right";
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
  showYoutubeIcon,
  customIcon,
  customIconPosition = "left",
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
        {customIcon && customIconPosition === "left" && customIcon}

        {showYoutubeIcon && !customIcon && (
          <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none">
            <path d="M5.36963 3.64823C6.5338 3.53906 8.0313 3.53906 9.96713 3.53906H10.0355C11.9705 3.53906 13.468 3.53906 14.6321 3.64823C15.8046 3.75906 16.7296 3.98656 17.473 4.50656C18.2463 5.04823 18.6205 5.76573 18.7955 6.67906C18.9596 7.5324 18.9596 8.61323 18.9596 9.9349V10.0599C18.9596 11.3816 18.9596 12.4624 18.7955 13.3157C18.6205 14.2291 18.2463 14.9466 17.473 15.4882C16.7296 16.0082 15.8046 16.2357 14.6313 16.3466C13.468 16.4557 11.9705 16.4557 10.0355 16.4557H9.96713C8.03213 16.4557 6.53463 16.4557 5.37047 16.3466C4.19797 16.2357 3.27297 16.0082 2.52964 15.4882C1.7563 14.9466 1.38214 14.2291 1.20714 13.3157C1.04297 12.4624 1.04297 11.3816 1.04297 10.0599V9.9349C1.04297 8.61323 1.04297 7.5324 1.20714 6.67906C1.38214 5.76573 1.7563 5.04823 2.52964 4.50656C3.27297 3.98656 4.19797 3.75906 5.3713 3.64823M9.6338 7.45156C9.42101 7.31013 9.16108 7.25819 8.91028 7.30701C8.65948 7.35583 8.438 7.50147 8.2938 7.7124C8.18547 7.87156 8.12713 8.06073 8.12713 8.25406V11.7407C8.12705 11.9154 8.17433 12.0869 8.26392 12.2369C8.35351 12.3869 8.48208 12.5098 8.63596 12.5925C8.78983 12.6753 8.96325 12.7148 9.13778 12.7068C9.31231 12.6989 9.48142 12.6438 9.62713 12.5474L12.273 10.8191C12.4067 10.732 12.5168 10.6131 12.5932 10.4729C12.6696 10.3328 12.7099 10.1759 12.7106 10.0163C12.7112 9.85668 12.6722 9.69942 12.597 9.55865C12.5217 9.41789 12.4127 9.29804 12.2796 9.2099L9.6338 7.45156Z" fill="white" />
          </svg>
        )}

        <span>{label}</span>

        {customIcon && customIconPosition === "right" && customIcon}

        {showArrow && !customIcon && (
          <ArrowIcon
            size={iconSize}
            className="shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5"
          />
        )}
      </button>
    </Link>
  );
}
