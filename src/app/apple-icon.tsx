import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
        borderRadius: "25%",
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: "white",
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
