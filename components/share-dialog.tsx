"use client";
import * as RD from "@radix-ui/react-dialog";
import { useRef, useState, useMemo, useEffect } from "react";
import { Download, Link2, Check, X, Loader2 } from "lucide-react";
import { ShareImage } from "./share-image";
import { pickHeadlineComparison, topActivityLabel, captureToPng, shareOrDownloadPng } from "@/lib/share";
import type { Tone } from "@/lib/tone";
import type { Activity } from "@/lib/calc";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  years: number;
  pct: number;
  futureHours: number;
  tone: Tone;
  activities: Activity[];
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number;
};

export function ShareDialog(props: Props) {
  const {
    open,
    onOpenChange,
    years,
    pct,
    futureHours,
    tone,
    activities,
    currentAge,
    lifeExpectancy,
    pctOfWeekWasted,
  } = props;
  const [showAttribution, setShowAttribution] = useState(false);
  const [busy, setBusy] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const comparison = useMemo(() => pickHeadlineComparison(futureHours), [futureHours]);
  const attribution = useMemo(
    () => (showAttribution ? topActivityLabel(activities) : null),
    [showAttribution, activities]
  );

  useEffect(() => {
    if (!open) {
      setLinkCopied(false);
      setBusy(false);
    }
  }, [open]);

  const onSaveImage = async () => {
    if (!imgRef.current || busy) return;
    setBusy(true);
    try {
      const blob = await captureToPng(imgRef.current, 2);
      await shareOrDownloadPng(blob);
    } catch (err) {
      console.error(err);
      alert("Sorry, couldn't generate the image. Try again?");
    } finally {
      setBusy(false);
    }
  };

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <RD.Root open={open} onOpenChange={onOpenChange}>
      <RD.Portal>
        <RD.Overlay
          className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <RD.Content
          className="fixed z-50 inset-x-0 bottom-0 sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto w-full sm:w-[min(560px,calc(100vw-1.5rem))] max-h-[92vh] overflow-y-auto p-5 sm:p-6 rounded-t-[24px] sm:rounded-[16px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-full sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
          style={{
            background: "var(--card)",
            border: "2px solid var(--ink)",
            boxShadow: "6px 6px 0 var(--ink)",
            paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          }}
        >
          {/* Drag handle on mobile only */}
          <div className="sm:hidden flex justify-center mb-3">
            <span className="block w-12 h-1.5 rounded-full bg-ink/20" />
          </div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <RD.Title className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">
                Share your number
              </RD.Title>
              <RD.Description className="text-sm text-ink-soft mt-1">
                The image only shows your number. The link reveals your habits.
              </RD.Description>
            </div>
            <RD.Close className="btn btn-ghost p-1.5 text-ink-soft hover:text-ink" aria-label="Close">
              <X size={20} />
            </RD.Close>
          </div>

          {/* Preview — scaled-down clone */}
          <div
            className="relative w-full overflow-hidden rounded-[14px] border-2 border-ink mb-4"
            style={{ aspectRatio: "4 / 5", background: "var(--paper)" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1080,
                height: 1350,
                transform: "scale(var(--share-scale))",
                transformOrigin: "top left",
              }}
              className="[--share-scale:0.46] sm:[--share-scale:0.48]"
            >
              <ShareImage
                ref={imgRef}
                years={years}
                pct={pct}
                tone={tone}
                comparison={comparison}
                attribution={attribution}
                currentAge={currentAge}
                lifeExpectancy={lifeExpectancy}
                pctOfWeekWasted={pctOfWeekWasted}
              />
            </div>
          </div>

          {/* Toggle */}
          <label className="flex items-center gap-3 mb-5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showAttribution}
              onChange={(e) => setShowAttribution(e.target.checked)}
              className="w-5 h-5 accent-[var(--accent-hot)]"
            />
            <span className="text-sm">
              <b>Show what caused it</b>
              <span className="text-ink-soft"> — adds your top activity to the image.</span>
            </span>
          </label>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onSaveImage}
              disabled={busy}
              className="btn btn-hot disabled:opacity-60"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {busy ? "Generating…" : "Save image"}
            </button>
            <button type="button" onClick={onCopyLink} className="btn btn-cool">
              {linkCopied ? <Check size={16} /> : <Link2 size={16} />}
              {linkCopied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}
