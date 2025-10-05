import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EVE 길드 - 메이플스토리 길드 관리",
  description: "메이플스토리 EVE 길드 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
