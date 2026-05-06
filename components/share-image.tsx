"use client";
import { forwardRef } from "react";
import type { Tone } from "@/lib/tone";
import type { Comparison } from "@/lib/comparisons";

type Props = {
  years: number;
  pct: number;
  tone: Tone;
  comparison: { comp: Comparison; count: number } | null;
  attribution?: string | null;
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number;
};

export const ShareImage = forwardRef<HTMLDivElement, Props>(function ShareImage(
  { years, pct, tone, comparison, attribution, currentAge, lifeExpectancy, pctOfWeekWasted },
  ref
) {
  const heroColor = tone === "kind" ? "var(--accent-leaf)" : "var(--accent-hot)";
  const subline =
    tone === "kind"
      ? "of my remaining life — yours to reclaim ✨"
      : "of my remaining life — torched 🔥";

  return (
    <div
      ref={ref}
      data-theme="light"
      style={{
        width: 1080,
        height: 1350,
        background: "var(--paper)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
        padding: "70px 80px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative blobs — small, contained */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "var(--accent-sun)",
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: tone === "kind" ? "var(--accent-leaf)" : "var(--accent-cool)",
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      {/* Decorative mini life-grid in the corner — small, faded, behind content */}
      <DecorativeGrid
        currentAge={currentAge}
        lifeExpectancy={lifeExpectancy}
        pctOfWeekWasted={pctOfWeekWasted}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          position: "relative",
          zIndex: 2,
        }}
      >
        <SunMark />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 38,
              lineHeight: 1,
            }}
          >
            TimeWasteCalc
          </div>
          <div style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 6 }}>
            honest math, soft delivery
          </div>
        </div>
      </div>

      {/* Hero — vertically centered in remaining space */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 800,
            color: "var(--ink-soft)",
            marginBottom: 16,
          }}
        >
          {tone === "kind" ? "Reclaimable" : "Future projection"}
        </div>

        {/* Number + yrs side-by-side, baseline-aligned */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            color: heroColor,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 0.9,
          }}
        >
          <span style={{ fontSize: 260 }}>{years.toFixed(1)}</span>
          <span style={{ fontSize: 110 }}>years</span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 46,
            marginTop: 28,
            lineHeight: 1.2,
            maxWidth: 880,
          }}
        >
          {subline}
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 26,
            color: "var(--ink-soft)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          That's <b style={{ color: "var(--ink)" }}>{pct.toFixed(1)}%</b> of my remaining waking life.
        </div>

        {attribution && (
          <div
            style={{
              marginTop: 14,
              fontSize: 22,
              color: "var(--ink-soft)",
              fontStyle: "italic",
            }}
          >
            From: {attribution}
          </div>
        )}

        {/* Comparison card — inline, below */}
        {comparison && (
          <div
            style={{
              marginTop: 40,
              background: "var(--card)",
              border: "3px solid var(--ink)",
              borderRadius: 22,
              boxShadow: "8px 8px 0 var(--ink)",
              padding: "22px 32px",
              display: "inline-flex",
              alignItems: "center",
              gap: 22,
              alignSelf: "flex-start",
            }}
          >
            <span style={{ fontSize: 56, lineHeight: 1 }}>{comparison.comp.emoji}</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 18, color: "var(--ink-soft)", marginBottom: 2 }}>= equivalent to</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 52,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {comparison.count.toLocaleString()}
              </span>
              <span style={{ fontSize: 22, color: "var(--ink-soft)", marginTop: 4 }}>
                {comparison.comp.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
          paddingTop: 24,
          borderTop: "2px solid rgba(15, 23, 41, 0.12)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 32,
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            timewastecalc.com
          </div>
          <div style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 6 }}>
            calculate yours →
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            color: "var(--ink-soft)",
            textAlign: "right",
            fontStyle: "italic",
          }}
        >
          based on a {Math.round(lifeExpectancy)}-year life
        </div>
      </div>
    </div>
  );
});

function SunMark() {
  return (
    <svg width="64" height="64" viewBox="0 0 80 80" aria-hidden>
      <circle cx="40" cy="40" r="20" fill="var(--accent-sun)" stroke="var(--ink)" strokeWidth="3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 40 + Math.cos(a) * 26;
        const y1 = 40 + Math.sin(a) * 26;
        const x2 = 40 + Math.cos(a) * 36;
        const y2 = 40 + Math.sin(a) * 36;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />;
      })}
    </svg>
  );
}

// Decorative grid: faded, fixed-size, positioned behind hero (subtle texture, not data)
function DecorativeGrid({
  currentAge,
  lifeExpectancy,
  pctOfWeekWasted,
}: {
  currentAge: number;
  lifeExpectancy: number;
  pctOfWeekWasted: number;
}) {
  const cols = 52;
  const rows = 80;
  const dotSize = 5;
  const gap = 2;
  const w = cols * (dotSize + gap) - gap;
  const h = rows * (dotSize + gap) - gap;
  const TOTAL = cols * rows;
  const weeksLived = Math.min(TOTAL, Math.max(0, Math.floor(currentAge * 52)));
  const weeksLeft = Math.max(0, Math.floor(lifeExpectancy * 52) - weeksLived);
  const livedWasted = Math.round(weeksLived * pctOfWeekWasted);
  const futureWasted = Math.round(weeksLeft * pctOfWeekWasted);

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        position: "absolute",
        right: 60,
        bottom: 130,
        opacity: 0.32,
        zIndex: 1,
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {Array.from({ length: TOTAL }).map((_, i) => {
        const x = (i % cols) * (dotSize + gap);
        const y = Math.floor(i / cols) * (dotSize + gap);
        let fill = "transparent";
        let stroke = "var(--ink)";
        let opacity = 1;
        if (i < livedWasted) {
          fill = "var(--accent-hot)";
          stroke = "none";
        } else if (i < weeksLived) {
          fill = "var(--ink)";
          stroke = "none";
        } else if (i < weeksLived + futureWasted) {
          fill = "var(--accent-hot)";
          stroke = "none";
          opacity = 0.5;
        } else if (i < lifeExpectancy * 52) {
          // future-empty
        } else {
          opacity = 0.4;
        }
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={dotSize}
            height={dotSize}
            rx={1}
            fill={fill}
            fillOpacity={opacity}
            stroke={stroke}
            strokeWidth={fill === "transparent" ? 0.6 : 0}
          />
        );
      })}
    </svg>
  );
}
