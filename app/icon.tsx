import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFF8E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SunMark size={140} />
      </div>
    ),
    { ...size }
  );
}

function SunMark({ size }: { size: number }) {
  // SVG drawn as inline JSX — Satori-compatible
  const ink = "#0F1729";
  const sun = "#FFD43B";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="20" fill={sun} stroke={ink} strokeWidth="5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 40 + Math.cos(a) * 26;
        const y1 = 40 + Math.sin(a) * 26;
        const x2 = 40 + Math.cos(a) * 36;
        const y2 = 40 + Math.sin(a) * 36;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="5" strokeLinecap="round" />;
      })}
    </svg>
  );
}
