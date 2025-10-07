"use client";

import LogoSnow from "@/components/ui/LogoSnow";

const MENUS = [
  { href: "/", key: "dashboard", label: "대시보드" },
  { href: "/roster", key: "roster", label: "길드원" },
  { href: "/calendar", key: "calendar", label: "캘린더" },
  { href: "/loot", key: "loot", label: "분배/정산" },
  { href: "/notice", key: "notice", label: "공지" },
  { href: "/settings", key: "settings", label: "설정" },
];

export default function Header() {
  return (
    <header className="relative z-10 border-b border-sky-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <LogoSnow />
        </div>

        {/* PC 최적화: 메뉴 6개를 가로로 노출 */}
        <nav className="hidden md:flex items-center gap-3">
          {MENUS.map((m) => (
            <a
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-sky-50/70 hover:text-sky-700 transition"
              href={m.href}
              key={m.key}
            >
              {m.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
