"use client";
import { PRESETS } from "@/lib/presets";
import type { Activity } from "@/lib/calc";

export function PresetPicker({
  onAdd,
}: {
  onAdd: (a: Activity) => void;
}) {
  return (
    <div>
      <p className="label">Quick presets</p>
      <p className="text-xs text-ink-soft mb-2 leading-snug">
        Not sure how long? Check <b>Settings → Screen Time</b> (iOS) or{" "}
        <b>Digital Wellbeing</b> (Android) for today's number — then tap{" "}
        <b>Total screen time</b>.
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p, i) => {
          const isHighlight = i === 0;
          return (
            <button
              key={p.name}
              type="button"
              className={
                isHighlight
                  ? "btn btn-sun"
                  : "btn btn-ghost border border-ink/10 hover:border-ink"
              }
              style={{ minHeight: 36, padding: "0.375rem 0.75rem" }}
              onClick={() =>
                onAdd({
                  id: cryptoRandom(),
                  name: p.name,
                  amount: p.amount,
                  unit: p.unit,
                  frequency: p.frequency,
                })
              }
            >
              <span className="mr-1.5">{p.emoji}</span>
              {p.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function cryptoRandom() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}
