"use client";

import React, { useMemo, useState, useEffect } from "react";

export interface LogoPathConfig {
  d: string;
  fillColor: string; // The tone when fully filled
  strokeColor?: string; // Optional stroke color during draw-on, defaults to fillColor
  strokeWidth?: number; // Defaults to 1.5
  drawEffect?: boolean; // If false, the path fades in instead of being drawn
}

interface SignatureLoaderProps {
  paths: LogoPathConfig[];
  viewBox?: string; // e.g. "0 0 340 45"
  width?: number; // width in px, defaults to 340
  height?: number; // height in px, defaults to 45
  labelText?: string; // Loading label text
}

export default function SignatureLoader({
  paths,
  viewBox = "0 0 340 45",
  width = 340,
  height = 45,
  labelText = "Loading",
}: SignatureLoaderProps) {
  // Stagger reveal by 100ms per path
  const staggerMs = 100;
  const drawDurationMs = 1000;
  const fillDurationMs = 800;

  // Calculate when all animations finish drawing and filling
  const totalRevealDurationMs = useMemo(() => {
    if (paths.length === 0) return 0;
    return (paths.length - 1) * staggerMs + drawDurationMs + fillDurationMs;
  }, [paths]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, totalRevealDurationMs);
    return () => clearTimeout(timer);
  }, [totalRevealDurationMs]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Inline styles for modular and portable animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drawPath {
          0% {
            stroke-dashoffset: 400;
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: transparent;
          }
        }
        @keyframes fillPath {
          0% {
            fill: transparent;
          }
          100% {
            fill: var(--final-fill);
            stroke: transparent !important;
            stroke-width: 0 !important;
          }
        }
        @keyframes fadeInPath {
          0% {
            opacity: 0;
            fill: transparent;
          }
          100% {
            opacity: 1;
            fill: var(--final-fill);
          }
        }
        @keyframes ambientGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.6;
          }
        }
        @keyframes expandRing {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }
        @keyframes dotsBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .sig-loader-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawPath 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                     fillPath 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        }

        .sig-loader-fade {
          opacity: 0;
          animation: fadeInPath 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        }

        .sig-loader-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(150, 215, 110, 0.25) 0%, rgba(27, 77, 50, 0) 70%);
          filter: blur(24px);
          animation: ambientGlow 3.5s ease-in-out infinite;
        }

        .sig-loader-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(150, 215, 110, 0.25);
          animation: expandRing 3.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }

        /* Respect prefers-reduced-motion: skip animation directly to final state */
        @media (prefers-reduced-motion: reduce) {
          .sig-loader-path {
            stroke-dashoffset: 0 !important;
            fill: var(--final-fill) !important;
            animation: none !important;
          }
          .sig-loader-fade {
            opacity: 1 !important;
            fill: var(--final-fill) !important;
            animation: none !important;
          }
          .sig-loader-glow,
          .sig-loader-ring,
          .sig-loader-bounce-dot {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      ` }} />

      {/* Animation Containers */}
      <div className="relative mb-6" style={{ width: width, height: height }}>
        {/* Ambient breathing glow behind the logo */}
        <div
          className="sig-loader-glow"
          style={{
            width: height * 3.5,
            height: height * 3.5,
            animationDelay: `${totalRevealDurationMs}ms`,
            // Hide glow initially until reveal is complete
            opacity: 0,
          }}
        />

        {/* Expanding rings from center */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="sig-loader-ring"
            style={{
              width: height * 2.2,
              height: height * 2.2,
              animationDelay: `${totalRevealDurationMs + i * 1200}ms`,
              // Hide rings initially until reveal completes
              opacity: 0,
            }}
          />
        ))}

        {/* The SVG Logo */}
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {paths.map((path, idx) => {
            if (isComplete) {
              return (
                <path
                  key={idx}
                  d={path.d}
                  fill={path.fillColor}
                />
              );
            }

            const isDraw = path.drawEffect !== false;
            const delayDraw = idx * staggerMs;
            const strokeColor = isDraw ? (path.strokeColor || path.fillColor) : undefined;
            const strokeWidth = isDraw ? (path.strokeWidth || 0.8) : undefined;

            // Stagger letter fade-ins after leaf drawing finishes (leaf count is ~14)
            const textIdx = Math.max(0, idx - 14);
            const delayFade = drawDurationMs + textIdx * 80;
            const delayFill = delayDraw + drawDurationMs;

            return (
              <path
                key={idx}
                d={path.d}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className={isDraw ? "sig-loader-path" : "sig-loader-fade"}
                style={{
                  // Set variables used in keyframe fill animation
                  ["--final-fill" as any]: path.fillColor,
                  // Configure animation timings per path
                  animationDelay: isDraw
                    ? `${delayDraw}ms, ${delayFill}ms`
                    : `${delayFade}ms`,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Loading Text Label */}
      {labelText && (
        <span
          className="flex items-center text-[13px] md:text-[14px] tracking-[0.25em] font-semibold text-white/70 uppercase select-none"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {labelText}
          <span className="inline-flex gap-1 ml-2.5 items-center h-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#96D76E] sig-loader-bounce-dot"
                style={{
                  animation: "dotsBounce 1.4s ease-in-out infinite",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </span>
        </span>
      )}
    </div>
  );
}
