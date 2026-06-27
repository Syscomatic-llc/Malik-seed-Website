import { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  direction?: "right" | "down";
  size?: number;
}

export function ArrowIcon({
  direction = "right",
  size = 20,
  ...props
}: ArrowIconProps) {
  const strokeWidth = props.strokeWidth || 1.5;

  if (direction === "right") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M18 8L22 12L18 16"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.00195 12H22.002"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M13.668 15.3359L10.3346 18.6693L7.0013 15.3359"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.332 2L10.332 18.6667"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}