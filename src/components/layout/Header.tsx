"use client";

import { Menu, X } from "lucide-react";
import { memo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

function Header({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <header
      className={cn(
        "z-10 sticky top-0",
        "bg-gradient-to-r from-blue-600/30 to-purple-600/30",
        "backdrop-blur-md border-b border-white/10",
      )}
    >
      <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={cn(
                "lg:hidden text-white p-2 rounded-lg",
                "hover:bg-white/10 transition-colors",
              )}
              type="button"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
            <h1
              className={cn(
                "text-xl md:text-3xl font-bold text-white",
                "flex items-center gap-2 md:gap-3",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full",
                  "bg-gradient-to-br from-yellow-400",
                  "to-orange-500 flex items-center",
                  "justify-center text-xs md:text-sm",
                  "font-bold shadow-lg",
                )}
              >
                EVE
              </div>
              <span
                className={cn(
                  "bg-gradient-to-r from-yellow-200",
                  "to-orange-300 bg-clip-text",
                  "text-transparent",
                )}
              >
                EVE 길드
              </span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
