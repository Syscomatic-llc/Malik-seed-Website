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
}

const variantStyles: Record<ActionButtonVariant, string> = {
  // #A9E179 green — used in hero "Our Products" and most CTAs
  primary: "bg-[#A9E179] text-[#195236] hover:bg-[#96d270] focus-visible:ring-[#A9E179]",
  // #F2F7F1 off-white — used in hero "Learn More"
  secondary: "bg-[#F2F7F1] text-[#195236] hover:bg-white focus-visible:ring-white",
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
}: ActionButtonProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={cn("w-fit inline-flex focus:outline-none", containerClassName)}
    >
      <span
        className={cn(
          "group/button text-[16px] font-medium leading-[19px] flex items-center justify-center gap-[10px] rounded-[60px] px-5 transition-all duration-200 active:scale-95 cursor-pointer select-none whitespace-nowrap",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variantStyles[variant],
          className
        )}
        style={{ fontFamily: "var(--font-inter-tight)" }}
      >
        <span>{label}</span>
        {showArrow && (
          <ArrowIcon 
            size={iconSize} 
            className="shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5" 
          />
        )}
      </span>
    </Link>
  );
}
