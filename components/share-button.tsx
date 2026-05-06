"use client";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareDialog } from "./share-dialog";
import type { Tone } from "@/lib/tone";
import type { Activity } from "@/lib/calc";

type Props = {
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

export function ShareButton(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-cool disabled:opacity-50"
        disabled={props.disabled}
        aria-label="Share your result"
      >
        <Share2 size={16} />
        Share
      </button>
      <ShareDialog open={open} onOpenChange={setOpen} {...props} />
    </>
  );
}
