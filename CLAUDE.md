# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Heads-up — Next.js version

This is **Next.js 16 with Turbopack** (`next dev` and `next build` both use it). APIs and file conventions may differ from older Next versions in your training data. When in doubt, check `node_modules/next/dist/docs/` and the existing patterns in `app/`.

## Commands

- `pnpm dev` — start dev server (Turbopack) on http://localhost:3000
- `pnpm build` — production build + TypeScript typecheck (treats type errors as build failures)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (Next.js config)

There is no test suite. Verification = `pnpm build` + manual smoke-test in the browser.

## High-level architecture

Single-page client app. Calculator that converts daily-habit minutes into projected lifetime hours/years and renders comparisons, reclaim framings, and a goal slider. Static-site model — **no backend, no DB, no API routes** (except the dynamic OG image).

### State flow (read this first)

All app state lives in **one opaque URL token + localStorage**, both managed by `hooks/use-state.ts`:

1. State shape: `{ activities[], profile {age, lifeExpectancy, hourlyRate, sleepHours}, tone }`
2. Encoded as compact JSON → `Wire` shape → `btoa` base64url → URL param `?s=...`
3. Mirrored to `localStorage` (`twc:state:v1`) for refresh persistence
4. URL takes precedence over localStorage on hydration
5. `nuqs` powers the query-param binding

Calculations are **pure functions in `lib/calc.ts`**. The single source of truth is `aggregate(activities, profile)` which returns `{ futureHours, hoursPerYear, pctRemaining, yearsRemaining, wakingHoursPerDay, ... }`. Components consume that aggregate; they never recompute waking-hours / time-per-day on their own.

### `wakingHoursPerDay(profile)` is a critical helper

Replaces what used to be a hardcoded `16` constant. Equals `24 - profile.sleepHours`, clamped 4–20. Drives:
- The hero number (via `hoursToYears(hours, wakingHrs)` — the second arg is required)
- "% of waking life" stat
- The life-grid `pctOfWeekWasted`
Whenever you call `hoursToYears`, you must pass `wakingHoursPerDay` — it's not a default.

### Theme system

Light/dark/auto via `data-theme` attribute on `<html>`. **Inline blocking script in `app/layout.tsx`** reads `localStorage['twc:theme:v1']` before paint and sets `data-theme` to the resolved value (avoids FOUC). It also listens for `prefers-color-scheme` changes when in "Auto" mode.

CSS tokens (`--paper`, `--ink`, `--card`, `--accent-*`, `--shadow-ink`) are defined in `app/globals.css` for both `:root` (light) and `[data-theme="dark"]`. Tailwind's `dark:` variant is rewired to `data-theme` via `@custom-variant` in globals.css — this is **Tailwind v4 syntax**, not v3.

`var(--shadow-ink)` exists separately because sticker shadows need a real dark color in dark mode (not the inverted off-white `--ink`). Always use it for `box-shadow`.

### Share image (privacy contract)

`components/share-image.tsx` renders a 1080×1350 off-screen DOM card. `lib/share.ts:captureToPng` lazy-imports `html-to-image` and snapshots that node to a PNG. The image is **scoped to `data-theme="light"`** so shared images look identical regardless of sender's mode.

The image deliberately excludes age, sleep, income, and activity names by default — only the headline number, one comparison, and branding. The "Show what caused it" toggle in `share-dialog.tsx` opts in to a one-line attribution.

### Tone (cheeky / kind)

Copy-only theme overlay. `lib/tone.ts:COPY` keys all user-facing strings by tone. Visuals stay consistent; only colors of the hero number and the "% burnt" stat shift between tomato (cheeky) and leaf-green (kind). Don't add per-tone layout differences.

### Mobile "app feel"

- `components/mobile-tab-bar.tsx` is a fixed bottom nav (5 tabs) that smooth-scrolls to anchored sections (`#setup`, `#hero-result`, `#visualize`, `#goal`) and tracks the active section via IntersectionObserver. **Sections need `id` + `scroll-mt-20` classes.**
- The share dialog (`components/share-dialog.tsx`) is a Radix Dialog styled as a centered modal on desktop / bottom sheet on mobile. All Radix open/close animations use `tw-animate-css` (`data-[state=open]:animate-in ...`) — **not** AnimatePresence wrapping (that broke Radix's click handling; see git history).
- PWA manifest in `app/manifest.ts` — installable to homescreen.
- Body uses `padding-bottom: calc(7.5rem + env(safe-area-inset-bottom))` to clear the mobile tab bar.

### Animations

- Section-level reveal: `<Reveal>` wrapper (motion + `whileInView`) — already applied to LifeBar, LifeGrid, Comparisons, Reclaim, Goal, Money sections.
- Scroll progress bar at top + parallax-drift background blobs in `scroll-blobs.tsx` (uses `useScroll`).
- Activity cards (when added) use a **pure CSS keyframe** (`.activity-enter` in globals.css), **not** AnimatePresence — wrapping each card in `motion.div` with `layout` was reflowing on every keystroke and tanked input perf. Don't reintroduce that.

### Layout v Tailwind v4 specifics

- Tailwind v4 — no `tailwind.config.ts`. All theme vars are in `app/globals.css` under `@theme inline`.
- Custom utility classes (`.sticker`, `.btn`, `.btn-hot/cool/sun/leaf`, `.input`, `.label`, `.tabular`) live in globals.css.
- Path alias: `@/*` → repo root (configured in `tsconfig.json`).

## Visual identity ("Sunny Almanac")

Warm cream paper + deep navy ink + chunky sticker cards (2px ink border + 4px hard offset shadow, no blur). Bricolage Grotesque (display) + Manrope (body) + JetBrains Mono (numbers, always with `font-variant-numeric: tabular-nums`). Don't introduce: Inter, Roboto, Space Grotesk, glassmorphism, gradient meshes, purple gradients, or pill-shaped CTA buttons. Single-theme — the cheeky/kind toggle is words only, not visuals.
