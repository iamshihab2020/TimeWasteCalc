"use client";
import { useState } from "react";
import { reclaimedHours, hoursToYears, hoursToDays } from "@/lib/calc";
import { COPY, type Tone } from "@/lib/tone";
import { AnimatedNumber } from "./animated-number";

function fmtMinHrs(min: number): string {
  const m = Math.round(min);
  if (m === 0) return "0 min/day";
  const h = m / 60;
  if (m % 60 === 0) return `${m} min/day · ${h}h`;
  return `${m} min/day · ${h.toFixed(1)}h`;
}
function fmtMinShort(min: number): string {
  const m = Math.round(min);
  if (m === 0) return "0m";
  if (m % 60 === 0) return `${m}m · ${m / 60}h`;
  if (m >= 60) return `${m}m · ${(m / 60).toFixed(1)}h`;
  return `${m}m`;
}

export function GoalCard({
  currentMinPerDay,
  yearsRemaining,
  wakingHoursPerDay,
  tone,
}: {
  currentMinPerDay: number;
  yearsRemaining: number;
  wakingHoursPerDay: number;
  tone: Tone;
}) {
  const [target, setTarget] = useState(() => Math.max(0, Math.round(currentMinPerDay / 3)));
  const reclaimed = reclaimedHours(currentMinPerDay, target, yearsRemaining);
  const reclaimedY = hoursToYears(reclaimed, wakingHoursPerDay);
  const reclaimedD = hoursToDays(reclaimed);
  const max = Math.max(60, Math.ceil(currentMinPerDay));

  return (
    <section className="sticker p-5 sm:p-6">
      <h3 className="font-display font-bold text-2xl sm:text-3xl mb-1">
        {COPY[tone].goalHeading}
      </h3>
      <p className="text-ink-soft mb-5 text-sm sm:text-base">
        Drag the slider to set a daily target.
      </p>

      <div className="flex items-baseline justify-between mb-2 tabular">
        <span className="font-mono text-sm text-ink-soft">today: <b className="text-ink">{fmtMinHrs(currentMinPerDay)}</b></span>
        <span className="font-mono text-sm text-ink-soft">target: <b className="text-ink">{fmtMinHrs(target)}</b></span>
      </div>
      <input
        type="range"
        className="chunky"
        min={0}
        max={max}
        step={5}
        value={Math.min(target, max)}
        onChange={(e) => setTarget(Number(e.target.value))}
        aria-label="Target minutes per day"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { label: "Quit it", value: 0 },
          { label: "Quarter", value: Math.round(currentMinPerDay / 4 / 5) * 5 },
          { label: "Halve it", value: Math.round(currentMinPerDay / 2 / 5) * 5 },
          { label: "Today", value: Math.round(currentMinPerDay / 5) * 5 },
        ].map((preset) => {
          const active = target === preset.value;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => setTarget(Math.min(preset.value, max))}
              className="text-xs font-bold border-2 border-ink rounded-[10px] px-2.5 py-1 transition-colors"
              style={{
                background: active ? "var(--accent-leaf)" : "var(--card)",
                color: active ? "white" : "var(--ink)",
                boxShadow: active ? "2px 2px 0 var(--ink)" : "none",
              }}
            >
              {preset.label} <span className="font-mono opacity-70 ml-1">{fmtMinShort(preset.value)}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
        <div>
          <div className="label">You'd reclaim</div>
          <div
            className="font-display font-extrabold tabular leading-none"
            style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", color: "var(--accent-leaf)" }}
          >
            <AnimatedNumber value={reclaimedY} decimals={2} suffix=" yrs" duration={0.5} />
          </div>
        </div>
        <div>
          <div className="label">That's</div>
          <div
            className="font-display font-extrabold tabular leading-none"
            style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", color: "var(--accent-cool)" }}
          >
            <AnimatedNumber value={reclaimedD} decimals={0} suffix=" days" duration={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
