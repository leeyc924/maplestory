"use client";
import { Trophy } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function SuroHeader({ time }: { time: string }) {
  return (
    <div
      className={cn(
        "glass-effect rounded-xl md:rounded-2xl",
        "p-4 md:p-6 shadow-2xl",
      )}
    >
      <h1
        className={cn(
          "text-2xl md:text-3xl font-bold text-white",
          "mb-2 flex items-center gap-3",
        )}
      >
        <Trophy className="w-8 h-8 md:w-9 md:h-9 text-yellow-400" />
        수로 랭킹 대시보드 (현재 서버시간 : {time})
      </h1>
      <p className="text-gray-300 text-sm md:text-base">
        실시간 길드 순위와 점수 변화를 확인하세요
      </p>
    </div>
  );
}
