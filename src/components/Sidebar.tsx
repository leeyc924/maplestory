"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/members", label: "길드원 현황", icon: "👥" },
  { href: "/suro", label: "수로 현황", icon: "🌊" },
  { href: "/alts", label: "부캐 관리", icon: "🧩" },
  { href: "/events", label: "이벤트/미참여", icon: "📅" },
  { href: "/suro/top10", label: "10등 수로 기록", icon: "🏆" },
  { href: "/departures", label: "탈퇴 현황", icon: "🚪" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sky-200 bg-white/80 p-4 backdrop-blur lg:block">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-2xl bg-sky-200 shadow" />
        <div className="text-lg font-semibold">EVE Guild</div>
      </div>
      <nav className="space-y-1">
        {items.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition shadow-sm " +
                (active
                  ? "bg-sky-100/80 ring-1 ring-sky-200"
                  : "hover:bg-sky-50")
              }
            >
              <span>{it.icon}</span>
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
