"use client";
import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "motion/react";

export function AnimatedNumber({
  value,
  decimals = 1,
  suffix = "",
  className = "",
  duration = 1.0,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          const formatted =
            v >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(decimals);
          ref.current.textContent = formatted + suffix;
        }
      },
    });
    return controls.stop;
  }, [value, decimals, suffix, duration, mv]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      0{suffix}
    </span>
  );
}
