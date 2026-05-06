"use client";
import { Trash2 } from "lucide-react";
import type { Activity, Frequency } from "@/lib/calc";
import { Select } from "./ui/select";

const UNIT_OPTIONS = [
  { value: "minutes", label: "minutes", emoji: "⏱️" },
  { value: "hours", label: "hours", emoji: "🕐" },
];
const FREQ_OPTIONS = [
  { value: "day", label: "day", emoji: "☀️" },
  { value: "week", label: "week", emoji: "📅" },
  { value: "month", label: "month", emoji: "🗓️" },
  { value: "year", label: "year", emoji: "🎂" },
];

export function ActivityForm({
  activity,
  onChange,
  onRemove,
  removable,
}: {
  activity: Activity;
  onChange: (a: Activity) => void;
  onRemove?: () => void;
  removable?: boolean;
}) {
  const set = <K extends keyof Activity>(k: K, v: Activity[K]) =>
    onChange({ ...activity, [k]: v });

  return (
    <div className="sticker p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-12 gap-3 sm:gap-4">
      <div className="col-span-2 sm:col-span-4">
        <label className="label">Activity</label>
        <input
          className="input"
          style={{ fontFamily: "var(--font-sans)" }}
          value={activity.name}
          placeholder="e.g. Scrolling Instagram"
          onChange={(e) => set("name", e.target.value)}
        />
      </div>
      <div className="col-span-1 sm:col-span-2">
        <label className="label">Amount</label>
        <input
          className="input"
          type="number"
          inputMode="decimal"
          min={0}
          value={activity.amount}
          onChange={(e) => set("amount", Number(e.target.value) || 0)}
        />
      </div>
      <div className="col-span-1 sm:col-span-3">
        <label className="label">Unit</label>
        <Select
          value={activity.unit}
          onChange={(v) => set("unit", v as Activity["unit"])}
          options={UNIT_OPTIONS}
          ariaLabel="Time unit"
        />
      </div>
      <div className="col-span-2 sm:col-span-3">
        <label className="label">Per</label>
        <Select
          value={activity.frequency}
          onChange={(v) => set("frequency", v as Frequency)}
          options={FREQ_OPTIONS}
          ariaLabel="Frequency"
        />
      </div>
      <p className="col-span-2 sm:col-span-12 -mt-1 text-[11px] text-ink-soft leading-snug">
        Use a typical day, or weekly total ÷ 7. We treat this as a steady average.
      </p>
      {removable && onRemove && (
        <div className="col-span-2 sm:col-span-12 flex justify-end">
          <button
            type="button"
            onClick={onRemove}
            className="btn btn-ghost text-ink-soft hover:text-hot"
            aria-label={`Remove ${activity.name}`}
          >
            <Trash2 size={16} /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
