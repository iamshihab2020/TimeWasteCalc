"use client";
import { motion } from "motion/react";
import { AnimatedNumber } from "./animated-number";
import { hoursToYears } from "@/lib/calc";
import { COPY, type Tone } from "@/lib/tone";
import { SquiggleSticker } from "./stickers";

export function ResultsPanel({
  futureHours,
  hoursPerYear,
  pctRemaining,
  wakingHoursPerDay,
  yearsRemaining,
  tone,
}: {
  futureHours: number;
  hoursPerYear: number;
  pctRemaining: number;
  wakingHoursPerDay: number;
  yearsRemaining: number;
  tone: Tone;
}) {
  const futureYears = hoursToYears(futureHours, wakingHoursPerDay);
  const episodes = Math.round(futureHours / 0.75); // 45-min episodes
  const copy = COPY[tone];
  const heroColor = tone === "kind" ? "var(--accent-leaf)" : "var(--accent-hot)";

  return (
    <div className="relative">
      <SquiggleSticker className="absolute -top-2 right-0 w-24 sm:w-32" />
      <p className="label mb-2">{tone === "kind" ? "Reclaimable" : "Future projection"}</p>
      <motion.h2
        animate={{ color: heroColor }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-extrabold leading-[0.85] tracking-tight flex items-baseline flex-wrap gap-x-3 gap-y-1"
        style={{ color: heroColor }}
      >
        <span style={{ fontSize: "clamp(4rem, 16vw, 11rem)" }}>
          <AnimatedNumber value={futureYears} decimals={1} suffix="" />
        </span>
        <span
          className="font-bold tabular"
          style={{
            fontSize: "clamp(1.25rem, 3.5vw, 2.25rem)",
            color: "var(--ink-soft)",
            lineHeight: 1.1,
          }}
        >
          / {Math.round(yearsRemaining)} yrs ahead
        </span>
      </motion.h2>
      <p className="font-display text-xl sm:text-2xl font-semibold mt-2 max-w-2xl">
        {copy.heroLabel(futureYears)}
      </p>
      <motion.p
        key={tone}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-ink-soft mt-3 max-w-xl text-base sm:text-lg"
      >
        {copy.heroSubline(futureYears, episodes)}
      </motion.p>
      <p className="text-xs text-ink-soft mt-3 tabular max-w-xl">
        Math: ≈ <b className="text-ink">{Math.round(futureHours).toLocaleString()}</b> waking hours, on a <b className="text-ink">{wakingHoursPerDay}h/day</b> basis (24h − sleep).
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
        <Stat label="Per year" value={hoursPerYear} unit="h" decimals={0} />
        <Stat
          label={tone === "kind" ? "Of waking life" : "Of waking life — burnt"}
          value={pctRemaining * 100}
          unit="%"
          unitInline
          decimals={1}
          color={heroColor}
        />
        <Stat label="Hours total" value={futureHours} unit="h" decimals={0} />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  unitInline = false,
  decimals = 0,
  color,
}: {
  label: string;
  value: number;
  unit?: string;
  unitInline?: boolean; // true = no space + same size (e.g. %); false = small unit suffix
  decimals?: number;
  color?: string;
}) {
  return (
    <div className="sticker p-3 sm:p-4 min-w-0">
      <div className="label">{label}</div>
      <div
        className="font-display font-bold tabular whitespace-nowrap flex items-baseline gap-1 leading-none"
        style={{
          color: color ?? "var(--ink)",
        }}
      >
        <span style={{ fontSize: "clamp(1.1rem, 4.5vw, 2rem)" }}>
          <AnimatedNumber value={value} decimals={decimals} suffix={unitInline ? unit ?? "" : ""} duration={0.8} />
        </span>
        {!unitInline && unit && (
          <span className="text-ink-soft" style={{ fontSize: "clamp(0.7rem, 2.5vw, 1rem)", fontWeight: 700 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
