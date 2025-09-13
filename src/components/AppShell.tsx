"use client";

import { useEffect, useState } from "react";
import RegisterSW from "@/components/RegisterSW";
import Snow from "@/components/Snow";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function AppShell() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    if (typeof window !== "undefined") {
      setOnline(navigator.onLine);
      window.addEventListener("online", onOnline);
      window.addEventListener("offline", onOffline);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", onOnline);
        window.removeEventListener("offline", onOffline);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen text-sky-900">
      {/* 배경 */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(1200px_820px_at_20%_0%,#dff1ff_0%,#eef7ff_45%,#ffffff_100%)]" />

      {/* 눈: UI 위로 겹치게 */}
      <Snow density={220} speed={[0.35, 1.0]} radius={[3.5, 8.5]} />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* PWA 등록 유지 */}
        <RegisterSW />

        <Header />

        {/* PC 폭 최적화 */}
        <main className="flex-1 px-6 py-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="rounded-2xl border border-sky-100 bg-white/70 p-8">
              <h1 className="text-3xl font-semibold tracking-tight">
                이브 길드 매니저
              </h1>
              <p className="mt-3 text-slate-700">
                데스크톱 최적화 UI (Next 15, React 19, Tailwind v4, PWA 유지)
              </p>

              {/* 여기에 대시보드 카드/그래프 등 PC 레이아웃 컴포넌트 추가 예정 */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-sky-100 bg-white/80 p-4">
                  위젯 1
                </div>
                <div className="rounded-xl border border-sky-100 bg-white/80 p-4">
                  위젯 2
                </div>
                <div className="rounded-xl border border-sky-100 bg-white/80 p-4">
                  위젯 3
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
