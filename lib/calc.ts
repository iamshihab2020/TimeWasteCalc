export type Frequency = "day" | "week" | "month" | "year";

export type Activity = {
  id: string;
  name: string;
  amount: number;
  unit: "minutes" | "hours";
  frequency: Frequency;
};

export type Profile = {
  currentAge: number;
  lifeExpectancy: number;
  hourlyRate: number;
  sleepHours: number;
};

const DAYS_PER_YEAR = 365.25;
const DEFAULT_SLEEP_HOURS = 8;

export function wakingHoursPerDay(profile: Pick<Profile, "sleepHours">): number {
  const sleep = Number.isFinite(profile.sleepHours) ? profile.sleepHours : DEFAULT_SLEEP_HOURS;
  return Math.min(20, Math.max(4, 24 - sleep));
}

const FREQ_TO_DAILY: Record<Frequency, number> = {
  day: 1,
  week: 1 / 7,
  month: 12 / DAYS_PER_YEAR,
  year: 1 / DAYS_PER_YEAR,
};

export function minutesPerDay(activity: Activity): number {
  const minutes = activity.unit === "hours" ? activity.amount * 60 : activity.amount;
  return minutes * FREQ_TO_DAILY[activity.frequency];
}

export function hoursPerYear(activity: Activity): number {
  return (minutesPerDay(activity) * DAYS_PER_YEAR) / 60;
}

export function futureHours(activity: Activity, profile: Profile): number {
  const years = Math.max(0, profile.lifeExpectancy - profile.currentAge);
  return hoursPerYear(activity) * years;
}

export function pctOfRemainingWakingLife(activity: Activity, profile: Profile): number {
  const yearsLeft = Math.max(0, profile.lifeExpectancy - profile.currentAge);
  const wakingHoursLeft = yearsLeft * DAYS_PER_YEAR * wakingHoursPerDay(profile);
  if (wakingHoursLeft === 0) return 0;
  return futureHours(activity, profile) / wakingHoursLeft;
}

export function moneyLost(hours: number, hourlyRate: number): number {
  return hours * hourlyRate;
}

export function futureValueOfReclaimed(
  hoursPerYear: number,
  hourlyRate: number,
  yearsRemaining: number,
  annualRate = 0.07
): number {
  const annualContribution = hoursPerYear * hourlyRate;
  if (annualRate === 0) return annualContribution * yearsRemaining;
  return (annualContribution * (Math.pow(1 + annualRate, yearsRemaining) - 1)) / annualRate;
}

export function reclaimedHours(
  currentMinPerDay: number,
  targetMinPerDay: number,
  yearsRemaining: number
): number {
  return ((currentMinPerDay - targetMinPerDay) * DAYS_PER_YEAR * yearsRemaining) / 60;
}

export function aggregate(activities: Activity[], profile: Profile) {
  const future = activities.reduce((s, a) => s + futureHours(a, profile), 0);
  const minPerDay = activities.reduce((s, a) => s + minutesPerDay(a), 0);
  const hrsPerYear = (minPerDay * DAYS_PER_YEAR) / 60;
  const yearsLeft = Math.max(0, profile.lifeExpectancy - profile.currentAge);
  const waking = wakingHoursPerDay(profile);
  const wakingHoursLeft = yearsLeft * DAYS_PER_YEAR * waking;
  const pctRemaining = wakingHoursLeft === 0 ? 0 : Math.min(1, future / wakingHoursLeft);
  return {
    futureHours: future,
    minutesPerDay: minPerDay,
    hoursPerYear: hrsPerYear,
    pctRemaining,
    yearsRemaining: yearsLeft,
    wakingHoursPerDay: waking,
    hasInvalidAge: profile.currentAge >= profile.lifeExpectancy,
    hasZeroActivity: minPerDay === 0,
  };
}

export function hoursToYears(hours: number, wakingHrs: number): number {
  if (wakingHrs <= 0) return 0;
  return hours / (DAYS_PER_YEAR * wakingHrs);
}
export function hoursToDays(hours: number): number {
  return hours / 24;
}
export function formatNumber(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "0";
  if (n >= 1000) return Math.round(n).toLocaleString();
  return n.toFixed(digits);
}
export function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return "$" + Math.round(n).toLocaleString();
}

export const CONSTANTS = { DAYS_PER_YEAR, DEFAULT_SLEEP_HOURS };
