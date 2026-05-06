"use client";
import { useMemo, useState, lazy, Suspense } from "react";
import { formatMoney, futureValueOfReclaimed, moneyLost } from "@/lib/calc";
import { COPY, type Tone } from "@/lib/tone";

const Chart = lazy(() => import("./money-chart").then((m) => ({ default: m.MoneyChart })));

const MEDIAN_HOURLY = 25;

export function MoneyCard({
  hoursPerYear,
  futureHours,
  hourlyRate: hourlyRateProp,
  yearsRemaining,
  tone,
}: {
  hoursPerYear: number;
  futureHours: number;
  hourlyRate: number;
  yearsRemaining: number;
  tone: Tone;
}) {
  const [localRate, setLocalRate] = useState<number | null>(null);
  const [skipped, setSkipped] = useState(false);
  const hourlyRate = hourlyRateProp > 0 ? hourlyRateProp : (localRate ?? 0);
  const showPrompt = hourlyRate === 0 && !skipped;

  const lost = moneyLost(futureHours, hourlyRate);
  const data = useMemo(() => {
    const out: { year: number; value: number }[] = [];
    for (let y = 0; y <= Math.ceil(yearsRemaining); y++) {
      out.push({ year: y, value: futureValueOfReclaimed(hoursPerYear, hourlyRate, y, 0.07) });
    }
    return out;
  }, [hoursPerYear, hourlyRate, yearsRemaining]);

  const fv = data[data.length - 1]?.value ?? 0;

  if (showPrompt) {
    return (
      <section className="sticker p-5 sm:p-6">
        <h3 className="font-display font-bold text-2xl sm:text-3xl mb-1">
          {COPY[tone].moneyHeading}
        </h3>
        <p className="text-ink-soft mb-5 text-sm sm:text-base">
          What's an hour of your time worth? We'll convert your wasted hours to dollars — and show what they'd grow to invested at 7%.
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono font-bold text-lg">$</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder={String(MEDIAN_HOURLY)}
            className="input flex-1"
            onChange={(e) => setLocalRate(Number(e.target.value) || 0)}
          />
          <span className="font-mono text-sm text-ink-soft">/ hr</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-cool" onClick={() => setLocalRate(MEDIAN_HOURLY)}>
            Use US median ($25)
          </button>
          <button type="button" className="btn btn-ghost border border-ink/20" onClick={() => setSkipped(true)}>
            Skip
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="sticker p-5 sm:p-6">
      <h3 className="font-display font-bold text-2xl sm:text-3xl mb-1">
        {COPY[tone].moneyHeading}
      </h3>
      <p className="text-ink-soft mb-5 text-sm sm:text-base flex items-baseline gap-2">
        <span>At <b className="text-ink">${hourlyRate}/hr</b>:</span>
        <button
          type="button"
          onClick={() => { setLocalRate(null); setSkipped(false); }}
          className="text-xs underline text-ink-soft hover:text-ink"
        >
          change
        </button>
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
        <Stat label="Direct opportunity cost" value={formatMoney(lost)} color="var(--accent-hot)" />
        <Stat label="Invested @ 7%, future value" value={formatMoney(fv)} color="var(--accent-leaf)" />
      </div>

      <Suspense fallback={<div className="h-48 sm:h-56 grid place-items-center text-ink-soft text-sm">Loading chart…</div>}>
        <Chart data={data} />
      </Suspense>
    </section>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="label">{label}</div>
      <div
        className="font-display font-extrabold tabular leading-none"
        style={{ fontSize: "clamp(1.5rem, 6vw, 2.5rem)", color }}
      >
        {value}
      </div>
    </div>
  );
}
