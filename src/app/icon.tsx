import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
        borderRadius: "50%",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        E
      </div>
    </div>,
    {
      ...size,
    },
  );
}
