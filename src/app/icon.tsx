import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  height: 32,
  width: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
        borderRadius: "50%",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: 900,
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
