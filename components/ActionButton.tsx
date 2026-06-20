import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  href: string;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  showArrow?: boolean;
}

export default function ActionButton({
  label,
  href,
  className,
  containerClassName = "w-full",
  onClick,
  showArrow = true,
}: ActionButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={containerClassName}>
      <span
        className={cn(
          "group/button text-base font-medium flex h-full w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-brand-primary text-white transition-colors duration-200 hover:bg-brand-primary-hover focus:ring-brand-primary",
          className
        )}
      >
        <span>{label}</span>
        {showArrow && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </span>
    </Link>
  );
}
