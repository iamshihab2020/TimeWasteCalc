"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Settings2, Sparkles, BarChart3, Target, Share2 } from "lucide-react";
import { ToneToggle } from "./tone-toggle";
import { ShareButton } from "./share-button";
import { ThemeToggle } from "./theme-toggle";
import { InstallPrompt } from "./install-prompt";
import type { Tone } from "@/lib/tone";
import type { Activity } from "@/lib/calc";

type ShareProps = {
  years: number;
  pct: number;
  futureHours: number;
  tone: Tone;
  activities: Activity[];
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number;
  disabled?: boolean;
};

const TABS = [
  { id: "setup", label: "Setup", icon: Settings2 },
  { id: "hero-result", label: "Result", icon: Sparkles },
  { id: "visualize", label: "Visual", icon: BarChart3 },
  { id: "goal", label: "Goal", icon: Target },
] as const;

export function MobileTabBar({
  ready,
  tone,
  onToneChange,
  shareProps,
}: {
  ready: boolean;
  tone: Tone;
  onToneChange: (t: Tone) => void;
  shareProps: ShareProps;
}) {
  const [active, setActive] = useState<string>("setup");

  useEffect(() => {
    const ids = TABS.map((t) => t.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ready]);

  const onTabClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop: floating tone+share top right (already in header). This is mobile only. */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 sm:hidden border-t-2 border-ink bg-paper/95 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-5 items-stretch">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabClick(t.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold uppercase tracking-wide"
                style={{ color: isActive ? "var(--accent-hot)" : "var(--ink-soft)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-x-3 top-1 h-0.5 rounded-full"
                    style={{ background: "var(--accent-hot)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {t.label}
              </button>
            );
          })}
          <ShareTab disabled={!ready} shareProps={shareProps} />
        </div>
        <div className="border-t border-rule px-3 py-2 flex justify-center items-center gap-2 flex-wrap">
          <ToneToggle tone={tone} onChange={onToneChange} />
          <ThemeToggle compact />
          <InstallPrompt />
        </div>
      </nav>
    </>
  );
}

function ShareTab({ shareProps, disabled }: { shareProps: ShareProps; disabled: boolean }) {
  // We render a hidden ShareButton and click-trigger via wrapping label, so we get the dialog without duplicating logic.
  const [trigger, setTrigger] = useState(0);
  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setTrigger((t) => t + 1)}
        disabled={disabled}
        className="relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold uppercase tracking-wide disabled:opacity-40"
        style={{ color: "var(--accent-cool)" }}
      >
        <Share2 size={20} strokeWidth={2.5} />
        Share
      </button>
      <ShareButtonHidden trigger={trigger} {...shareProps} />
    </>
  );
}

// Renders the ShareButton offscreen and programmatically opens its dialog when `trigger` changes.
function ShareButtonHidden({ trigger, ...props }: ShareProps & { trigger: number }) {
  const ref = useShareTrigger(trigger);
  return (
    <span ref={ref} className="sr-only">
      <ShareButton {...props} />
    </span>
  );
}
function useShareTrigger(trigger: number) {
  const [el, setEl] = useState<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (trigger === 0 || !el) return;
    const btn = el.querySelector("button");
    btn?.click();
  }, [trigger, el]);
  return setEl;
}
