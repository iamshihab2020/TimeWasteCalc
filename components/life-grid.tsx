"use client";
import { useMemo } from "react";
import { motion } from "motion/react";

const TOTAL_WEEKS = 80 * 52;
const COLS = 52;

export function LifeGrid({
  currentAge,
  lifeExpectancy,
  pctOfWeekWasted,
  showProjection = true,
}: {
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number; // 0..1, fraction of waking time wasted on activity
  showProjection?: boolean;
}) {
  const cols = COLS;
  const rows = Math.ceil(TOTAL_WEEKS / cols);
  const weeksLived = Math.min(TOTAL_WEEKS, Math.max(0, Math.floor(currentAge * 52)));
  const weeksLeft = Math.max(0, Math.floor(lifeExpectancy * 52) - weeksLived);
  // For the "lived & wasted" approximation, treat pctOfWeekWasted as fraction of past weeks
  const livedWasted = Math.round(weeksLived * pctOfWeekWasted);
  const futureWasted = Math.round(weeksLeft * pctOfWeekWasted);

  const dotSize = 8;
  const gap = 4;
  const w = cols * (dotSize + gap) - gap;
  const h = rows * (dotSize + gap) - gap;

  const dots = useMemo(() => {
    const arr: { x: number; y: number; state: "wasted" | "lived" | "future" | "projected" }[] = [];
    for (let i = 0; i < rows * cols; i++) {
      const x = (i % cols) * (dotSize + gap);
      const y = Math.floor(i / cols) * (dotSize + gap);
      let state: "wasted" | "lived" | "future" | "projected";
      if (i < livedWasted) state = "wasted";
      else if (i < weeksLived) state = "lived";
      else if (showProjection && i < weeksLived + futureWasted) state = "projected";
      else state = "future";
      if (i < lifeExpectancy * 52) arr.push({ x, y, state });
      else arr.push({ x, y, state: "future" }); // beyond life expectancy: faint future
    }
    return arr;
  }, [rows, cols, livedWasted, weeksLived, futureWasted, showProjection, lifeExpectancy]);

  return (
    <div className="sticker p-4 sm:p-5 overflow-hidden">
      <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
        <h3 className="font-display font-bold text-lg sm:text-xl">Your life in weeks</h3>
        <div className="text-xs text-ink-soft flex flex-wrap gap-x-4 gap-y-1 tabular">
          <Legend color="var(--accent-hot)" label="wasted" />
          <Legend color="var(--ink)" label="lived" />
          {showProjection && <Legend hatch label="projected waste" />}
          <Legend hollow label="future" />
        </div>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="block w-full sm:w-auto sm:h-[min(70vh,640px)] mx-auto h-auto max-h-[80vh]"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Life grid showing weeks lived, wasted, and remaining"
      >
        {dots.map((d, i) => {
          const fill =
            d.state === "wasted"
              ? "var(--accent-hot)"
              : d.state === "lived"
              ? "var(--ink)"
              : d.state === "projected"
              ? "var(--accent-hot)"
              : "transparent";
          const stroke = d.state === "future" ? "var(--ink)" : "none";
          const opacity = d.state === "projected" ? 0.45 : 1;
          return (
            <motion.rect
              key={i}
              x={d.x}
              y={d.y}
              width={dotSize}
              height={dotSize}
              rx={2}
              fill={fill}
              stroke={stroke}
              strokeWidth={1}
              fillOpacity={opacity}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.18,
                delay: Math.min(2.5, (i / (rows * cols)) * 1.4),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${d.x + dotSize / 2}px ${d.y + dotSize / 2}px` }}
            />
          );
        })}
      </svg>
      <p className="text-xs text-ink-soft mt-3 tabular">
        Each dot = one week. Based on an {Math.round(lifeExpectancy)}-year life.
      </p>
    </div>
  );
}

function Legend({
  color,
  hatch,
  hollow,
  label,
}: {
  color?: string;
  hatch?: boolean;
  hollow?: boolean;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block w-3 h-3 rounded-[2px]"
        style={
          hatch
            ? {
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--accent-hot), var(--accent-hot) 2px, transparent 2px, transparent 4px)",
                border: "1px solid var(--accent-hot)",
              }
            : hollow
            ? { border: "1.5px solid var(--ink)" }
            : { background: color }
        }
      />
      {label}
    </span>
  );
}
