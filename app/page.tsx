"use client";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAppState } from "@/hooks/use-state";
import { aggregate, hoursToYears } from "@/lib/calc";
import { ActivityForm } from "@/components/activity-form";
import { ProfileForm } from "@/components/profile-form";
import { ResultsPanel } from "@/components/results-panel";
import { LifeGrid } from "@/components/life-grid";
import { ComparisonsCard } from "@/components/comparisons-card";
import { ReclaimCard } from "@/components/reclaim-card";
import { GoalCard } from "@/components/goal-card";
import { MoneyCard } from "@/components/money-card";
import { PresetPicker } from "@/components/preset-picker";
import { ToneToggle } from "@/components/tone-toggle";
import { ShareButton } from "@/components/share-button";
import { SunSticker, StarSticker } from "@/components/stickers";
import { EmptyState } from "@/components/empty-state";
import { StickyResult } from "@/components/sticky-result";
import { LifeBar } from "@/components/life-bar";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallPrompt } from "@/components/install-prompt";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollBlobs } from "@/components/scroll-blobs";

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

export default function Page() {
  const { activities, setActivities, profile, setProfile, tone, setTone } = useAppState();
  const agg = aggregate(activities, profile);
  const wakingMinPerDay = agg.wakingHoursPerDay * 60;
  const pctOfWeekWasted = Math.min(1, agg.minutesPerDay / wakingMinPerDay);
  const hasAge = profile.currentAge > 0;
  const hasActivity = activities.length > 0;
  const ready = hasAge && hasActivity;
  const futureYears = hoursToYears(agg.futureHours, agg.wakingHoursPerDay);
  const shareProps = {
    years: futureYears,
    pct: agg.pctRemaining * 100,
    futureHours: agg.futureHours,
    tone,
    activities,
    currentAge: profile.currentAge,
    lifeExpectancy: profile.lifeExpectancy,
    pctOfWeekWasted,
    disabled: !ready,
  };

  const prevReady = useRef(false);
  useEffect(() => {
    if (ready && !prevReady.current) {
      document.getElementById("hero-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevReady.current = ready;
  }, [ready]);

  return (
    <main
      className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-14 sm:pb-14"
      style={{ paddingBottom: "calc(7.5rem + env(safe-area-inset-bottom))" }}
    >
      <ScrollProgress tone={tone} />
      <ScrollBlobs />
      <header className="flex items-center justify-between mb-10 sm:mb-14">
        <div className="flex items-center gap-3">
          <SunSticker className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl leading-none">TimeWasteCalc</h1>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">honest math, soft delivery</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <InstallPrompt />
          <ThemeToggle />
          <ToneToggle tone={tone} onChange={setTone} />
          <ShareButton {...shareProps} />
        </div>
      </header>

      <section id="hero-result" className="mb-12 sm:mb-16 scroll-mt-20">
        {ready ? (
          <ResultsPanel
            futureHours={agg.futureHours}
            hoursPerYear={agg.hoursPerYear}
            pctRemaining={agg.pctRemaining}
            wakingHoursPerDay={agg.wakingHoursPerDay}
            yearsRemaining={agg.yearsRemaining}
            tone={tone}
          />
        ) : (
          <EmptyState needsAge={!hasAge} />
        )}
      </section>

      <section id="setup" className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 scroll-mt-20">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2">
            <StarSticker className="w-7 h-7" />
            Your habits
          </h2>
          <PresetPicker
            onAdd={(a) => setActivities([...activities, { ...a, id: uid() }])}
          />
          <div className="flex flex-col gap-3">
            {activities.map((a) => (
              <div key={a.id} className="activity-enter">
                <ActivityForm
                  activity={a}
                  onChange={(next) => setActivities(activities.map((x) => (x.id === a.id ? next : x)))}
                  onRemove={() => setActivities(activities.filter((x) => x.id !== a.id))}
                  removable={activities.length > 1}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost border-2 border-dashed border-ink/30 hover:border-ink"
            onClick={() =>
              setActivities([
                ...activities,
                {
                  id: uid(),
                  name: "Another habit",
                  amount: 30,
                  unit: "minutes",
                  frequency: "day",
                },
              ])
            }
          >
            <Plus size={16} /> Add activity
          </button>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2">
            <span aria-hidden>🪪</span>
            About you
          </h2>
          <ProfileForm profile={profile} onChange={setProfile} />
          {agg.hasInvalidAge && (
            <p className="sticker p-3 text-sm" style={{ background: "var(--accent-sun)" }}>
              ⚠️ Your age (<b>{profile.currentAge}</b>) is at or above your life expectancy (<b>{profile.lifeExpectancy}</b>). Bump life expectancy higher so the math has a horizon.
            </p>
          )}
        </div>
      </section>

      {ready && (
        <>
          <section id="visualize" className="mb-12 sm:mb-16 grid gap-4 scroll-mt-20">
            <Reveal>
              <LifeBar
                currentAge={profile.currentAge}
                lifeExpectancy={profile.lifeExpectancy}
                pctOfWeekWasted={pctOfWeekWasted}
                tone={tone}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <LifeGrid
                currentAge={profile.currentAge}
                lifeExpectancy={profile.lifeExpectancy}
                pctOfWeekWasted={pctOfWeekWasted}
              />
            </Reveal>
          </section>

          <Reveal as="section" className="mb-12 sm:mb-16">
            <div id="reclaim">
              <ComparisonsCard hours={agg.futureHours} tone={tone} />
            </div>
          </Reveal>

          <Reveal as="section" className="mb-12 sm:mb-16">
            <ReclaimCard hours={agg.futureHours} tone={tone} />
          </Reveal>

          <section
            id="goal"
            className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 scroll-mt-20"
          >
            <Reveal>
              <GoalCard
                currentMinPerDay={agg.minutesPerDay}
                yearsRemaining={agg.yearsRemaining}
                wakingHoursPerDay={agg.wakingHoursPerDay}
                tone={tone}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <MoneyCard
                hoursPerYear={agg.hoursPerYear}
                futureHours={agg.futureHours}
                hourlyRate={profile.hourlyRate}
                yearsRemaining={agg.yearsRemaining}
                tone={tone}
              />
            </Reveal>
          </section>
        </>
      )}

      <footer className="mt-20 mb-8 flex flex-col items-center gap-3 text-center text-sm text-ink-soft">
        <SunSticker className="w-10 h-10" />
        <p className="max-w-md">
          Built to be a little uncomfortable.{" "}
          {ready && agg.futureHours > 0
            ? `You've got ${agg.yearsRemaining} years ahead — spend them on purpose.`
            : "Add a habit and your age to see your number."}
        </p>
        <p className="text-xs flex items-center gap-2 mt-2">
          <span>🔒</span>
          <span>Your data never leaves your browser. No accounts, no tracking, no servers.</span>
        </p>
      </footer>

      {ready && (
        <StickyResult
          years={futureYears}
          pct={agg.pctRemaining * 100}
          tone={tone}
          scrollTargetId="hero-result"
        />
      )}

      <MobileTabBar
        ready={ready}
        tone={tone}
        onToneChange={setTone}
        shareProps={shareProps}
      />
    </main>
  );
}
