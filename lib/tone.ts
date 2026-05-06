export type Tone = "cheeky" | "kind";

type Copy = {
  heroLabel: (years: number) => string;
  heroSubline: (years: number, episodes: number) => string;
  shareTitle: string;
  toneToggleHint: string;
  reclaimHeading: string;
  comparisonsHeading: string;
  goalHeading: string;
  moneyHeading: string;
};

export const COPY: Record<Tone, Copy> = {
  cheeky: {
    heroLabel: () => "of your finite life — torched. 🔥",
    heroSubline: (y, eps) =>
      `${y.toFixed(1)} years gone. Poof. 💀 That's roughly ${eps.toLocaleString()} episodes of TV you'll never get back. Sleep on that.`,
    shareTitle: "Look how much of my life I'm setting on fire →",
    toneToggleHint: "Too brutal? Switch to Kind.",
    reclaimHeading: "Or — wild idea — you could've",
    comparisonsHeading: "In other words, you're trading away",
    goalHeading: "Damage control: cut back?",
    moneyHeading: "Your time, in cold hard cash 💸",
  },
  kind: {
    heroLabel: () => "of your remaining life — yours to reclaim. ✨",
    heroSubline: (y) =>
      `${y.toFixed(1)} years is real time. Enough to write a book, learn a language, raise a kid through grade school — and still have weekends.`,
    shareTitle: "Here's what I could reclaim →",
    toneToggleHint: "Want the gut-punch version? Switch to Cheeky.",
    reclaimHeading: "Imagine using that time to",
    comparisonsHeading: "That's enough time for",
    goalHeading: "What if you scaled it back?",
    moneyHeading: "What your time is worth",
  },
};
