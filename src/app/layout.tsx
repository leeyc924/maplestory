// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import RegisterSW from "@/components/RegisterSW";
import Sidebar from "@/components/Sidebar";
import Snow from "@/components/Snow";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "이브 길드 대시보드",
  description: "메이플 길드 관리용 대시보드",
  manifest: "/manifest.json", // 유지
  // ❌ themeColor는 여기서 빼기
};

export const viewport: Viewport = {
  themeColor: "#38bdf8", // ✅ 여기로 이동
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="h-screen w-screen bg-sky-50 text-slate-800">
        {/* PWA 유지 */}
        <RegisterSW />
        {/* 눈 효과 오버레이 */}
        <Snow density={220} speed={[0.35, 1.0]} radius={[3.5, 8.5]} />

        <div className="flex h-full">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <main className="min-w-0 flex-1 overflow-y-auto p-6">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
