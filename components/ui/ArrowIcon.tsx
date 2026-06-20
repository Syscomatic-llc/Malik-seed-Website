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
        <>
          <path
            d="M18 8L22 12L18 16"
            stroke="currentColor"
            strokeWidth={props.strokeWidth || 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.00195 12H22.002"
            stroke="currentColor"
            strokeWidth={props.strokeWidth || 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth={props.strokeWidth || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
