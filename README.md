# TimeWasteCalc

> Honest math, soft delivery.

A friendly calculator that turns your daily habits — scrolling, commuting, doom-watching — into the years you'll spend on them. Then it shows you what those years could have been instead.

[Live demo →](https://timewastecalc.com) · No login. No tracking. No data leaves your browser.

---

## What it does

You tell it:

- A habit and how long you do it (per day / week / month / year)
- Your age, expected lifetime, and how many hours you sleep
- Optionally, what an hour of your time is worth

It tells you:

- How many **years of remaining waking life** that habit will eat
- A "**life in weeks**" dot grid (4,160 weeks of an 80-year life), shaded by what you've lived, what's projected to be wasted, and what's still up for grabs
- **Equivalents** you'll recognize ("≈ 18,993 nights of sleep" / "10,853 flights to Tokyo" / "25,324 novels")
- **Skills you could pick up instead** — guitar, Spanish, marathons, woodworking — sized against the hours you have
- A **goal slider** to see what you'd reclaim by cutting back
- The **opportunity cost in dollars** + what that would compound to invested at 7%

There's a **Cheeky / Kind** tone toggle so the message lands the way you want it to.

## Privacy

- Everything runs in your browser. No accounts, no analytics on your inputs.
- State is stored in a single opaque base64url URL token (`?s=...`) and `localStorage` on your device.
- The **Share** button generates a PNG image with only the headline number — no age, sleep, income, or activity names by default. There's a checkbox to opt in.
- Sharing the URL does include the encoded data so the recipient sees what you saw — that's the trade-off for an interactive link. Share the image instead if you want privacy.

## Tech

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**, **Tailwind CSS v4**, **Motion** (framer-motion)
- **Radix UI** primitives, **Recharts** (lazy-loaded), **html-to-image** for share PNGs
- **nuqs** for URL-as-state
- Installable as a **PWA**

## Run it locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build (typecheck included)
pnpm start        # serve the production build
pnpm lint
```

## Deploy

One-click on **Vercel** — zero config, Edge runtime is used for the dynamic OpenGraph image (`app/opengraph-image.tsx`); everything else is static.

## Project layout

```
app/                 Next.js app router — page, layout, manifest, OG image
components/          UI (results panel, life grid, share dialog, mobile tab bar, …)
lib/                 Pure logic — calc.ts, comparisons.ts, presets.ts, share.ts, tone.ts
hooks/               useAppState (URL + localStorage), useShuffle
```

For architecture notes (state flow, theme system, share-image privacy contract), see [`CLAUDE.md`](./CLAUDE.md).

## License

MIT.
