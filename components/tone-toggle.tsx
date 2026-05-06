"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Skull, Sparkles } from "lucide-react";
import type { Tone } from "@/lib/tone";

const OPTIONS: { value: Tone; label: string; icon: React.ReactNode; activeBg: string }[] = [
  { value: "cheeky", label: "Cheeky", icon: <Skull size={14} strokeWidth={2.5} />, activeBg: "var(--accent-hot)" },
  { value: "kind", label: "Kind", icon: <Sparkles size={14} strokeWidth={2.5} />, activeBg: "var(--accent-leaf)" },
];

export function ToneToggle({ tone, onChange }: { tone: Tone; onChange: (t: Tone) => void }) {
  const [burst, setBurst] = useState(0);
  const flip = (next: Tone) => {
    if (next === tone) return;
    onChange(next);
    setBurst((b) => b + 1);
  };
  return (
    <div
      className="relative inline-flex items-center gap-0.5 p-1 border-2 border-ink rounded-[14px]"
      style={{ background: "var(--card)", boxShadow: "3px 3px 0 var(--ink)" }}
      role="radiogroup"
      aria-label="Tone"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === tone;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => flip(opt.value)}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-[10px] transition-colors"
            style={{
              color: active ? "white" : "var(--ink)",
              isolation: "isolate",
              opacity: active ? 1 : 0.75,
            }}
          >
            {active && (
              <motion.span
                layoutId="tone-pill"
                className="absolute inset-0 rounded-[10px]"
                style={{ background: opt.activeBg, zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
      <AnimatePresence>{burst > 0 && <Confetti key={burst} />}</AnimatePresence>
    </div>
  );
}

function Confetti() {
  const colors = ["var(--accent-hot)", "var(--accent-cool)", "var(--accent-sun)", "var(--accent-leaf)"];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ x, y, opacity: 0, scale: 0.4, rotate: 360 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-[1px]"
            style={{ background: colors[i % colors.length] }}
          />
        );
      })}
    </div>
  );
}
