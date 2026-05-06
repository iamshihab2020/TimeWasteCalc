"use client";
import { motion } from "motion/react";
import type { Tone } from "@/lib/tone";

export function LifeBar({
  currentAge,
  lifeExpectancy,
  pctOfWeekWasted,
  tone,
}: {
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number;
  tone: Tone;
}) {
  const total = Math.max(1, lifeExpectancy);
  const livedPct = Math.min(100, (currentAge / total) * 100);
  const futureTotalPct = Math.max(0, 100 - livedPct);
  const wastedFuturePct = futureTotalPct * pctOfWeekWasted;
  const reclaimablePct = futureTotalPct - wastedFuturePct;
  const wasteColor = tone === "kind" ? "var(--accent-leaf)" : "var(--accent-hot)";

  const Seg = ({ width, color, label, sub }: { width: number; color: string; label: string; sub: string }) => (
    <motion.div
      initial={{ flexBasis: 0 }}
      animate={{ flexBasis: `${width}%` }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: color,
        minWidth: width > 0 ? 2 : 0,
        position: "relative",
      }}
      className="h-full first:rounded-l-md last:rounded-r-md group"
      title={`${label}: ${sub}`}
    />
  );

  return (
    <div className="sticker p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display font-bold text-lg sm:text-xl">Your life, at a glance</h3>
        <span className="text-xs text-ink-soft tabular">
          {Math.round(currentAge)} → {Math.round(lifeExpectancy)} yrs
        </span>
      </div>
      <div className="flex h-10 sm:h-12 w-full overflow-hidden rounded-md border-2 border-ink">
        <Seg width={livedPct} color="var(--ink)" label="Lived" sub={`${livedPct.toFixed(0)}%`} />
        <Seg width={wastedFuturePct} color={wasteColor} label={tone === "kind" ? "Reclaimable" : "Will be wasted"} sub={`${wastedFuturePct.toFixed(0)}%`} />
        <Seg width={reclaimablePct} color="rgba(15,23,41,0.08)" label="Future, free" sub={`${reclaimablePct.toFixed(0)}%`} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs tabular">
        <Legend swatch="var(--ink)" label="Lived" value={`${livedPct.toFixed(0)}%`} />
        <Legend
          swatch={wasteColor}
          label={tone === "kind" ? "Reclaimable" : "Heading to waste"}
          value={`${wastedFuturePct.toFixed(1)}%`}
        />
        <Legend swatch="rgba(15,23,41,0.18)" label="Future, free" value={`${reclaimablePct.toFixed(1)}%`} />
      </div>
    </div>
  );
}

function Legend({ swatch, label, value }: { swatch: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ background: swatch, border: "1px solid rgba(15,23,41,0.4)" }} />
      <span className="truncate text-ink-soft">{label}</span>
      <span className="ml-auto font-semibold">{value}</span>
    </div>
  );
}
