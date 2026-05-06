"use client";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { SquiggleSticker } from "./stickers";

export function EmptyState({ needsAge }: { needsAge: boolean }) {
  return (
    <div className="relative">
      <SquiggleSticker className="absolute -top-2 right-0 w-24 sm:w-32" />
      <p className="label mb-2">Your number, when you're ready</p>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-extrabold leading-[0.9] tracking-tight"
        style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
      >
        How much of your life are you{" "}
        <span style={{ color: "var(--accent-hot)" }}>actually</span> burning?
      </motion.h2>
      <p className="text-ink-soft mt-4 max-w-xl text-base sm:text-lg">
        Pick a habit below (or add your own), tell us your age, and we'll do the
        uncomfortable math.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <Step
          n={1}
          label={needsAge ? "Tell us your age →" : "Your age ✓"}
          done={!needsAge}
        />
        <Step n={2} label="Pick a habit ↓" />
        <Step n={3} label="See the damage" muted />
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="mt-8 inline-flex items-center gap-2 text-ink-soft"
      >
        <ArrowDown size={18} />
        <span className="text-sm font-semibold">Start below</span>
      </motion.div>
    </div>
  );
}

function Step({ n, label, done, muted }: { n: number; label: string; done?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="font-display font-extrabold tabular w-8 h-8 flex items-center justify-center rounded-full border-2 border-ink"
        style={{
          background: done ? "var(--accent-leaf)" : muted ? "var(--card)" : "var(--accent-sun)",
          color: "var(--ink)",
        }}
      >
        {n}
      </span>
      <span className={`font-semibold ${muted ? "text-ink-soft" : ""}`}>{label}</span>
    </div>
  );
}
