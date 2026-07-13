"use client";

import { useLayoutEffect, useRef, useState } from "react";

function buildBorderPaths(width: number, height: number, radius: number) {
  const inset = 1.0; // Inset of 1.0px creates a concentric arc where a 3px stroke overlaps the card boundary by 0.5px to cover subpixel bleed
  const r = Math.min(radius - inset, width / 2 - inset, height / 2 - inset);
  const midX = width / 2;
  const right = width - inset;
  const bottom = height - inset;
  const left = inset;
  const top = inset;

  return {
    right: `M ${midX},${top} L ${right - r},${top} A ${r},${r} 0 0 1 ${right},${top + r} L ${right},${bottom - r} A ${r},${r} 0 0 1 ${right - r},${bottom} L ${midX},${bottom}`,
    left: `M ${midX},${top} L ${left + r},${top} A ${r},${r} 0 0 0 ${left},${top + r} L ${left},${bottom - r} A ${r},${r} 0 0 0 ${left + r},${bottom} L ${midX},${bottom}`,
  };
}

type Dimensions = {
  width: number;
  height: number;
  radius: number;
};

export default function BrandCardBorder({ isDark = true }: { isDark?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useLayoutEffect(() => {
    const card = wrapperRef.current?.parentElement;
    if (!card) return;

    const updateDimensions = () => {
      const { width, height } = card.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const radius =
        parseFloat(getComputedStyle(card).borderTopLeftRadius) || 20;

      setDimensions({
        width: Math.round(width),
        height: Math.round(height),
        radius,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(card);

    return () => resizeObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!dimensions) return;

    const paths = svgRef.current?.querySelectorAll<SVGPathElement>(
      ".brand-border-path"
    );

    paths?.forEach((path) => {
      const length = path.getTotalLength();
      path.style.setProperty("--path-length", `${length}`);
    });
  }, [dimensions]);

  const paths = dimensions
    ? buildBorderPaths(dimensions.width, dimensions.height, dimensions.radius)
    : null;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
    >
      {dimensions && paths && (
        <svg
          ref={svgRef}
          className="brand-border-svg h-full w-full overflow-visible"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="brand-border-path"
            d={paths.right}
            vectorEffect="non-scaling-stroke"
            style={{ stroke: isDark ? "#a9e179" : "#195236" }}
          />
          <path
            className="brand-border-path"
            d={paths.left}
            vectorEffect="non-scaling-stroke"
            style={{ stroke: isDark ? "#a9e179" : "#195236" }}
          />
        </svg>
      )}
    </div>
  );
}
