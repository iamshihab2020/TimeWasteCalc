"use client";
import { motion } from "motion/react";

export function SunSticker({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 }}
      aria-hidden
    >
      <circle cx="40" cy="40" r="20" fill="var(--accent-sun)" stroke="var(--ink)" strokeWidth="2.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 40 + Math.cos(a) * 26;
        const y1 = 40 + Math.sin(a) * 26;
        const x2 = 40 + Math.cos(a) * 36;
        const y2 = 40 + Math.sin(a) * 36;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />;
      })}
    </motion.svg>
  );
}

export function BlobSticker({ className = "", color = "var(--accent-leaf)" }: { className?: string; color?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, 8, -4, 0] }}
      transition={{ scale: { type: "spring", stiffness: 280, damping: 18, delay: 0.4 }, rotate: { duration: 18, repeat: Infinity, ease: "easeInOut" } }}
      aria-hidden
    >
      <path
        d="M50 8 C72 8 92 22 92 48 C92 70 78 92 52 92 C28 92 8 76 8 52 C8 28 28 8 50 8 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
    </motion.svg>
  );
}

export function SquiggleSticker({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 120 30"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.5 }}
      aria-hidden
    >
      <path
        d="M5 15 Q20 0 35 15 T65 15 T95 15 T125 15"
        fill="none"
        stroke="var(--accent-hot)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function StarSticker({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 60 60"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.6 }}
      aria-hidden
    >
      <path
        d="M30 4 L37 22 L56 24 L42 37 L46 56 L30 46 L14 56 L18 37 L4 24 L23 22 Z"
        fill="var(--accent-cool)"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
