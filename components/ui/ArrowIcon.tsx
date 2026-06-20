import { SVGProps } from "react";

/**
 * Arrow icon used throughout CTA buttons and scroll indicators.
 * Direction: "right" (default) or "down"
 */
interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  direction?: "right" | "down";
  size?: number;
}

export function ArrowIcon({ direction = "right", size = 20, ...props }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {direction === "right" ? (
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
