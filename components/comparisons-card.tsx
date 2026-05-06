"use client";
import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shuffle } from "lucide-react";
import { COMPARISONS } from "@/lib/comparisons";
import { COPY, type Tone } from "@/lib/tone";
import { useShuffle } from "@/hooks/use-shuffle";

const BATCH = 6;

export function ComparisonsCard({
  hours,
  tone,
}: {
  hours: number;
  tone: Tone;
}) {
  const enriched = useMemo(
    () =>
      COMPARISONS.map((c) => ({ ...c, count: Math.floor(hours / c.hoursEach) })).filter(
        (c) => c.count > 0
      ),
    [hours]
  );
  const { items, shuffle, hasMore } = useShuffle(enriched, BATCH);

  return (
    <section>
      <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4 flex items-center gap-2">
        <span aria-hidden>📊</span>
        {COPY[tone].comparisonsHeading}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((c, i) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ delay: i * 0.04, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="sticker sticker-interactive p-4 sm:p-5"
              style={{ rotate: i % 2 === 0 ? "-0.6deg" : "0.6deg" }}
            >
              <div className="text-3xl sm:text-4xl mb-1" aria-hidden>{c.emoji}</div>
              <div className="font-display font-bold text-2xl sm:text-3xl tabular leading-none">
                {c.count.toLocaleString()}
              </div>
              <div className="text-sm text-ink-soft mt-1">{c.label}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={shuffle}
            className="btn btn-ghost border-2 border-ink hover:bg-sun"
          >
            <Shuffle size={16} /> Show me different ones
          </button>
        </div>
      )}
    </section>
  );
}
