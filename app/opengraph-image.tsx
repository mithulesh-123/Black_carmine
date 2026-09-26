import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "BLACKCARMINE — Digital Products, Engineered With Intent";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08070a",
          backgroundImage:
            "radial-gradient(circle at 22% 18%, rgba(232,33,75,0.34), transparent 55%), radial-gradient(circle at 82% 88%, rgba(142,0,40,0.42), transparent 58%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "3px solid #e8214b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#f4f1ea",
                fontSize: "34px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              BC
            </span>
          </div>
          <span
            style={{
              color: "#cfcbc1",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            BlackCarmine
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#f4f1ea",
                fontSize: "76px",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
              }}
            >
              Digital products
            </span>
            <span
              style={{
                color: "#f4f1ea",
                fontSize: "76px",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
              }}
            >
              engineered to be felt.
            </span>
          </div>
          <span
            style={{
              color: "#8d867d",
              fontSize: "22px",
              letterSpacing: "0.06em",
            }}
          >
            Web platforms · Mobile apps · SaaS · Brand systems · AI products
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
