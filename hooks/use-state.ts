"use client";
import { useQueryState, parseAsString } from "nuqs";
import { useMemo, useCallback, useEffect, useRef } from "react";
import type { Activity, Profile, Frequency } from "@/lib/calc";

const STORAGE_KEY = "twc:state:v1";

type State = {
  activities: Activity[];
  profile: Profile;
  tone: "cheeky" | "kind";
};

const DEFAULT: State = {
  activities: [],
  profile: { currentAge: 0, lifeExpectancy: 80, hourlyRate: 0, sleepHours: 8 },
  tone: "cheeky",
};

// Compact JSON shape so the encoded blob stays short.
type Wire = {
  v: 1;
  a: number; // age
  l: number; // life
  r: number; // rate
  s: number; // sleep
  t: 0 | 1;  // tone (0=cheeky,1=kind)
  x: Array<[string, number, "m" | "h", "d" | "w" | "m" | "y"]>; // activities
};

function toWire(state: State): Wire {
  return {
    v: 1,
    a: state.profile.currentAge,
    l: state.profile.lifeExpectancy,
    r: state.profile.hourlyRate,
    s: state.profile.sleepHours,
    t: state.tone === "kind" ? 1 : 0,
    x: state.activities.map((a) => [
      a.name,
      a.amount,
      a.unit === "hours" ? "h" : "m",
      (a.frequency[0] as "d" | "w" | "m" | "y"),
    ]),
  };
}

function fromWire(w: Wire): State {
  const freqMap: Record<string, Frequency> = { d: "day", w: "week", m: "month", y: "year" };
  return {
    activities: (w.x ?? []).map((row, i) => ({
      id: `a${i}`,
      name: row[0],
      amount: row[1],
      unit: row[2] === "h" ? "hours" : "minutes",
      frequency: freqMap[row[3]] ?? "day",
    })),
    profile: {
      currentAge: w.a ?? 0,
      lifeExpectancy: w.l ?? 80,
      hourlyRate: w.r ?? 0,
      sleepHours: w.s ?? 8,
    },
    tone: w.t === 1 ? "kind" : "cheeky",
  };
}

// Base64URL encode a JSON string (URL-safe, no padding).
function encode(state: State): string {
  if (
    state.activities.length === 0 &&
    state.profile.currentAge === 0 &&
    state.profile.hourlyRate === 0 &&
    state.profile.sleepHours === 8 &&
    state.profile.lifeExpectancy === 80 &&
    state.tone === "cheeky"
  ) {
    return ""; // pristine — keep URL clean
  }
  try {
    const json = JSON.stringify(toWire(state));
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch {
    return "";
  }
}

function decode(token: string): State {
  if (!token) return DEFAULT;
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (padded.length % 4)) % 4);
    const bin = atob(padded + padding);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    const w = JSON.parse(json) as Wire;
    return fromWire(w);
  } catch {
    return DEFAULT;
  }
}

export function useAppState() {
  const [token, setToken] = useQueryState("s", parseAsString.withDefault(""));
  const state = useMemo(() => decode(token), [token]);
  const hydrated = useRef(false);

  // Hydrate from localStorage on first mount IF the URL has no token
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (token) return; // URL takes precedence
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (stored) {
        const parsed = JSON.parse(stored) as Wire;
        const restored = fromWire(parsed);
        const t = encode(restored);
        if (t) setToken(t);
      }
    } catch {
      /* ignore corrupt storage */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist whenever token changes (cheap — fires on any user change)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toWire(state)));
    } catch {
      /* quota / private mode — ignore */
    }
  }, [state]);

  const write = useCallback(
    (next: State) => {
      const t = encode(next);
      setToken(t === "" ? null : t); // null removes the param
    },
    [setToken]
  );

  const setActivities = useCallback(
    (next: Activity[]) => write({ ...state, activities: next }),
    [state, write]
  );
  const setProfile = useCallback(
    (next: Profile) => write({ ...state, profile: next }),
    [state, write]
  );
  const setTone = useCallback(
    (next: "cheeky" | "kind") => write({ ...state, tone: next }),
    [state, write]
  );

  return {
    activities: state.activities,
    setActivities,
    profile: state.profile,
    setProfile,
    tone: state.tone,
    setTone,
  };
}
