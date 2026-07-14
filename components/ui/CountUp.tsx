"use client";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  className?: string;
}

export default function CountUp({
  to,
  from = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);

  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(from);
      const raf = requestAnimationFrame(() => {
        motionValue.set(to);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      motionValue.set(from);
      if (ref.current) {
        ref.current.textContent = String(from);
      }
    }
  }, [isInView, motionValue, to, from]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = String(Math.round(latest));
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span className={className} ref={ref} />;
}
