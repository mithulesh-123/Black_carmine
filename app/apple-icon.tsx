import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };
export const alt = "BLACKCARMINE monogram";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08070a",
        }}
      >
        <div
          style={{
            width: "132px",
            height: "132px",
            border: "5px solid #e8214b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#f4f1ea",
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            BC
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
