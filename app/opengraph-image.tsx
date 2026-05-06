import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TimeWasteCalc — how much of your life are you burning?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFF8E7",
          color: "#0F1729",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* sun blob */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "#FFD43B",
            opacity: 0.35,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#FFD43B",
              border: "3px solid #0F1729",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>TimeWasteCalc</div>
            <div style={{ fontSize: 18, color: "rgba(15,23,41,0.65)", marginTop: 4 }}>
              honest math, soft delivery
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 60,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(15,23,41,0.65)",
              fontWeight: 700,
              marginBottom: 12,
              display: "flex",
            }}
          >
            How much of your life are you
          </div>
          <div
            style={{
              fontSize: 140,
              lineHeight: 0.95,
              fontWeight: 800,
              color: "#FF4D3D",
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            actually burning?
          </div>
          <div
            style={{
              fontSize: 30,
              color: "rgba(15,23,41,0.7)",
              marginTop: 28,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Find out in 30 seconds. No login, no tracking, no judgment.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 24,
            borderTop: "2px solid rgba(15,23,41,0.12)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, display: "flex" }}>timewastecalc.com</div>
          <div style={{ fontSize: 18, color: "rgba(15,23,41,0.65)", display: "flex" }}>
            calculate yours →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
