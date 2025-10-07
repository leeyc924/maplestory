"use client";

import { useState } from "react";
import Snow from "@/components/effects/Snow";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={cn("min-h-screen winter-gradient", "relative overflow-hidden")}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(
              circle at 20% 50%,
              rgba(255,255,255,0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(147,197,253,0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 20%,
              rgba(196,181,253,0.3) 0%,
              transparent 50%
            )`,
          }}
        />
      </div>

      <Snow density={150} radius={[2, 5]} speed={[0.3, 1.0]} />

      {sidebarOpen && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50",
            "backdrop-blur-sm z-30 lg:hidden",
          )}
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSidebarOpen(false);
          }}
        />
      )}

      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="container mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="flex gap-4 md:gap-6">
          <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <main className="flex-1 relative z-10 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
