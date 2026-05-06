import type { Activity, Frequency } from "./calc";

export type Preset = Omit<Activity, "id"> & { emoji: string };

export const PRESETS: Preset[] = [
  { name: "Total screen time", amount: 5, unit: "hours", frequency: "day" as Frequency, emoji: "📲" },
  { name: "Instagram", amount: 60, unit: "minutes", frequency: "day" as Frequency, emoji: "📱" },
  { name: "TikTok", amount: 95, unit: "minutes", frequency: "day" as Frequency, emoji: "🎵" },
  { name: "YouTube", amount: 75, unit: "minutes", frequency: "day" as Frequency, emoji: "📺" },
  { name: "Commute", amount: 60, unit: "minutes", frequency: "day" as Frequency, emoji: "🚗" },
  { name: "Pointless meetings", amount: 5, unit: "hours", frequency: "week" as Frequency, emoji: "📅" },
  { name: "Doomscrolling news", amount: 30, unit: "minutes", frequency: "day" as Frequency, emoji: "📰" },
  { name: "Stuck in traffic", amount: 45, unit: "minutes", frequency: "day" as Frequency, emoji: "🚦" },
  { name: "Email triage", amount: 90, unit: "minutes", frequency: "day" as Frequency, emoji: "📧" },
];
