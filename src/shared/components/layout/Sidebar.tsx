"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { cn } from "@/shared/lib/utils";

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    href: "/members",
    icon: Users,
    id: "members",
    label: "길드원 현황",
  },
  {
    href: "/suro",
    icon: TrendingUp,
    id: "suro",
    label: "수로 현황",
  },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 fixed lg:static",
        "top-[60px] md:top-[72px] left-0 z-40",
        "w-56 md:w-64 transition-transform duration-300",
        "h-[calc(100vh-60px)] md:h-auto lg:h-auto",
      )}
    >
      <nav
        className={cn(
          "glass-effect rounded-xl md:rounded-2xl",
          "p-3 md:p-4 shadow-2xl",
        )}
      >
        <div className="space-y-1.5 md:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                className={cn(
                  "w-full flex items-center",
                  "gap-2 md:gap-3 px-3 md:px-4",
                  "py-2.5 md:py-3 rounded-lg md:rounded-xl",
                  "transition-all text-sm md:text-base",
                  isActive
                    ? cn(
                        "bg-gradient-to-r from-blue-500",
                        "to-purple-500 text-white",
                        "shadow-lg scale-105",
                      )
                    : cn("text-white/80 hover:bg-white/10", "hover:text-white"),
                )}
                href={item.href}
                key={item.id}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default memo(Sidebar);
