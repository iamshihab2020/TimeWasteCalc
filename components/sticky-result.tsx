"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import type { Tone } from "@/lib/tone";

export function StickyResult({
  years,
  pct,
  tone,
  scrollTargetId,
}: {
  years: number;
  pct: number;
  tone: Tone;
  scrollTargetId: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(scrollTargetId);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [scrollTargetId]);

  const color = tone === "kind" ? "var(--accent-leaf)" : "var(--accent-hot)";

  const onClick = () => {
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-3 inset-x-3 sm:inset-x-auto sm:right-4 sm:left-auto z-40 flex items-center gap-3 px-4 py-2.5 text-left"
          style={{
            background: "var(--card)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-md)",
            boxShadow: "3px 3px 0 var(--ink)",
            maxWidth: "calc(100vw - 1.5rem)",
          }}
          aria-label="Jump to your result"
        >
          <span
            className="font-display font-extrabold tabular leading-none"
            style={{ color, fontSize: "1.5rem" }}
          >
            {years.toFixed(1)}
            <span className="text-base font-bold ml-0.5">yrs</span>
          </span>
          <span className="hidden xs:inline w-px h-6 bg-rule" />
          <span className="font-mono text-xs sm:text-sm text-ink-soft tabular whitespace-nowrap">
            {pct.toFixed(1)}% of waking life
          </span>
          <ArrowUp size={14} className="ml-auto text-ink-soft" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
