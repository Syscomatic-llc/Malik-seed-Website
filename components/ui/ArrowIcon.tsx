import { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  direction?: "right" | "down" | "left";
  size?: number;
}

export function ArrowIcon({
  direction = "right",
  size = 20,
  ...props
}: ArrowIconProps) {
  const strokeWidth = props.strokeWidth || 1.5;

  if (direction === "left") {
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
          d="M5 6.66406L1.66667 9.9974L5 13.3307"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.332 10H1.66536"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
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
