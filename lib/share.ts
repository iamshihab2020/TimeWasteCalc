import { COMPARISONS, type Comparison } from "./comparisons";
import type { Activity } from "./calc";
import { minutesPerDay } from "./calc";

// Pick a comparison that lands hard: largest count > 1, but prefer relatable categories first.
export function pickHeadlineComparison(hours: number): { comp: Comparison; count: number } | null {
  const enriched = COMPARISONS.map((c) => ({ comp: c, count: Math.floor(hours / c.hoursEach) })).filter(
    (x) => x.count > 1
  );
  if (enriched.length === 0) return null;
  // Preference order — feels emotional first, weeks/days second.
  const priority = ["sleep", "tokyo", "vacations", "books", "concerts", "marathons"];
  for (const id of priority) {
    const found = enriched.find((x) => x.comp.id === id);
    if (found && found.count > 0) return found;
  }
  // Fallback: largest count of anything.
  return enriched.sort((a, b) => b.count - a.count)[0];
}

// Friendly attribution string. If only one activity → its name + amount.
// If many → name the biggest contributor + "+ N more".
export function topActivityLabel(activities: Activity[]): string {
  if (activities.length === 0) return "";
  const ranked = [...activities].sort((a, b) => minutesPerDay(b) - minutesPerDay(a));
  const top = ranked[0];
  const minutes = Math.round(minutesPerDay(top));
  const pretty =
    minutes >= 60
      ? `${(minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1)}h/day`
      : `${minutes} min/day`;
  if (activities.length === 1) {
    return `${top.name} — ${pretty}`;
  }
  const others = activities.length - 1;
  return `${top.name} — ${pretty} (+ ${others} more)`;
}

// Wrap html-to-image with font-readiness wait + sane defaults.
export async function captureToPng(node: HTMLElement, pixelRatio = 2): Promise<Blob> {
  // Wait for fonts so Bricolage / Manrope render in the snapshot
  if (typeof document !== "undefined" && document.fonts && "ready" in document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      /* ignore */
    }
  }
  // Dynamic import keeps it out of the initial page bundle
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(node, {
    pixelRatio,
    cacheBust: true,
    backgroundColor: "#FFF8E7",
  });
  if (!blob) throw new Error("Failed to capture image");
  return blob;
}

export async function shareOrDownloadPng(blob: Blob, filename = "timewastecalc.png", title = "TimeWasteCalc") {
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({ files: [file], title });
      return;
    } catch {
      // user cancelled — fall through to download
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
