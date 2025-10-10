import { EVE_GUILD_NAME } from "@/shared/lib/consts";

export default function Footer() {
  return (
    <footer className="p-4 text-center text-xs text-slate-500 relative z-10">
      ⓒ 2025 {EVE_GUILD_NAME} 길드 · Data source label: NEXON Open API
    </footer>
  );
}
