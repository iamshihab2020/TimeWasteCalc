"use client";
import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shuffle } from "lucide-react";
import { SKILLS } from "@/lib/comparisons";
import { COPY, type Tone } from "@/lib/tone";
import { useShuffle } from "@/hooks/use-shuffle";

const BATCH = 6;

function framingFor(times: number): React.ReactNode {
  if (times === 1) return <>You could do it <b>once</b></>;
  if (times <= 5) return <>You could do it <b>{times} times</b></>;
  if (times <= 20) return <>You could do it <b>{times}× over</b></>;
  if (times <= 100) return <>That's <b>{times}× the commitment</b> — pure overkill</>;
  if (times <= 500) return <>≈ <b>{Math.round(times / 10) * 10}×</b> what's needed — you'd run out of skill, not time</>;
  return <>≈ <b>{Math.round(times / 100) * 100}+ lifetimes</b> of practice</>;
}

export function ReclaimCard({ hours, tone }: { hours: number; tone: Tone }) {
  const enriched = useMemo(
    () =>
      SKILLS.map((s) => ({ ...s, times: hours / s.hours }))
        .filter((s) => s.times >= 0.25)
        .sort((a, b) => a.hours - b.hours),
    [hours]
  );
  const { items, shuffle, hasMore } = useShuffle(enriched, BATCH);

  return (
    <section className="relative">
      <h3 className="font-display font-bold text-2xl sm:text-3xl mb-1 flex items-center gap-2">
        <span aria-hidden>🌱</span>
        {COPY[tone].reclaimHeading}
      </h3>
      <p className="text-ink-soft mb-4 text-sm sm:text-base">
        Each card shows what it actually takes — and how many times that fits in your wasted hours.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((s, i) => {
            const times = Math.floor(s.times);
            const fits = s.times >= 1;
            return (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.04, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="sticker p-4 flex items-center gap-4"
              >
                <span className="text-3xl shrink-0" aria-hidden>{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base sm:text-lg leading-snug">{s.label}</div>
                  <div className="text-xs sm:text-sm text-ink-soft mt-1 tabular flex flex-wrap items-baseline gap-x-2">
                    <span>
                      Takes ≈ <b className="text-ink">{s.hours.toLocaleString()}h</b>
                    </span>
                    <span className="opacity-60">·</span>
                    {fits ? (
                      <span style={{ color: "var(--accent-leaf)" }}>
                        {framingFor(times)}
                      </span>
                    ) : (
                      <span style={{ color: "var(--accent-cool)" }}>
                        You're <b>{Math.round(s.times * 100)}%</b> of the way
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
