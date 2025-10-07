import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  height: 180,
  width: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
        borderRadius: "25%",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 100,
          fontWeight: 900,
          letterSpacing: "-2px",
        }}
      >
        EVE
      </div>
    </div>,
    {
      ...size,
    },
  );
}
