"use client";
import { useState } from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Profile } from "@/lib/calc";

type Popover = "life" | "sleep" | null;

export function ProfileForm({
  profile,
  onChange,
}: {
  profile: Profile;
  onChange: (p: Profile) => void;
}) {
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    onChange({ ...profile, [k]: v });
  const [open, setOpen] = useState<Popover>(null);

  return (
    <div className="sticker p-4 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div>
        <label className="label">Your age *</label>
        <input
          className="input"
          type="number"
          inputMode="numeric"
          min={0}
          max={120}
          placeholder="e.g. 28"
          value={profile.currentAge || ""}
          onChange={(e) => set("currentAge", Number(e.target.value) || 0)}
        />
      </div>
      <div className="relative">
        <label className="label flex items-center gap-1">
          Life exp.
          <button
            type="button"
            onClick={() => setOpen((o) => (o === "life" ? null : "life"))}
            className="text-ink-soft hover:text-ink"
            aria-label="What does life expectancy mean here?"
          >
            <Info size={13} />
          </button>
        </label>
        <input
          className="input"
          type="number"
          inputMode="numeric"
          min={1}
          max={150}
          value={profile.lifeExpectancy}
          onChange={(e) => set("lifeExpectancy", Number(e.target.value) || 0)}
        />
        <p className="mt-1.5 text-[11px] text-ink-soft leading-snug normal-case tracking-normal">
          Global ≈ <b>73</b>. US/EU ≈ <b>78–82</b>.
        </p>

        <AnimatePresence>
          {open === "life" && (
            <Popover onClose={() => setOpen(null)} title="Why does this matter?">
              <p className="text-ink-soft mb-2">
                Nobody knows exactly how long they'll live. We use this number
                only to project the years <em>ahead</em> of you, so the math has
                a horizon to point at.
              </p>
              <ul className="space-y-1 text-ink-soft tabular">
                <li>🌍 Global average: <b className="text-ink">~73 years</b></li>
                <li>🇺🇸 USA: <b className="text-ink">~78</b></li>
                <li>🇪🇺 Western Europe: <b className="text-ink">~81</b></li>
                <li>🇯🇵 Japan: <b className="text-ink">~84</b></li>
              </ul>
              <p className="text-ink-soft mt-2">
                Set whatever feels right for you — the projection scales with it.
              </p>
            </Popover>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <label className="label flex items-center gap-1">
          Sleep / day
          <button
            type="button"
            onClick={() => setOpen((o) => (o === "sleep" ? null : "sleep"))}
            className="text-ink-soft hover:text-ink"
            aria-label="Why ask about sleep?"
          >
            <Info size={13} />
          </button>
        </label>
        <input
          className="input"
          type="number"
          inputMode="numeric"
          min={4}
          max={12}
          step={0.5}
          value={profile.sleepHours ?? 8}
          onChange={(e) => set("sleepHours", Number(e.target.value) || 0)}
        />
        <p className="mt-1.5 text-[11px] text-ink-soft leading-snug normal-case tracking-normal">
          Excluded from "waking life".
        </p>

        <AnimatePresence>
          {open === "sleep" && (
            <Popover onClose={() => setOpen(null)} title="Why subtract sleep?">
              <p className="text-ink-soft mb-2">
                You can't reclaim time you spend asleep. We subtract your sleep
                hours so the <b>"% of waking life"</b> stat is honest — not
                inflated by the third of life you spend unconscious.
              </p>
              <p className="text-ink-soft tabular">
                Default: <b className="text-ink">8h</b>. Sleep less, the % grows.
                Sleep more, it shrinks.
              </p>
            </Popover>
          )}
        </AnimatePresence>
      </div>
      <div>
        <label className="label">$/hour <span className="font-normal text-ink-soft normal-case tracking-normal">(opt.)</span></label>
        <input
          className="input"
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="0"
          value={profile.hourlyRate || ""}
          onChange={(e) => set("hourlyRate", Number(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}

function Popover({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="sticker absolute z-30 mt-2 p-4 text-sm leading-relaxed normal-case tracking-normal w-[min(20rem,calc(100vw-3rem))]"
      style={{ top: "100%", right: 0 }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-ink-soft hover:text-ink"
        aria-label="Close"
      >
        <X size={14} />
      </button>
      <p className="font-semibold mb-1.5">{title}</p>
      {children}
    </motion.div>
  );
}
