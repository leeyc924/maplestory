"use client";

import type { GuildRankingWithChange } from "../types/suro";
import {
  Calendar,
  Crown,
  Medal,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useSuroRanginkTodaySuspense } from "../api/queries";
import { isEveGuild } from "../lib/utils";

export function SuroRankingTable() {
  const { data } = useSuroRanginkTodaySuspense();
  const rankingData = useMemo(() => {
    const rankingWithChanges: GuildRankingWithChange[] = data.today.map(
      (todayGuild) => {
        // 어제 데이터에서 같은 길드 찾기
        const yesterdayGuild = data.yesterday.find(
          (guild) => guild.guildName === todayGuild.guildName,
        );

        let rankingChange: string;
        let pointChange: number;
        let pointChangePercent: number;

        if (yesterdayGuild) {
          // 기존 길드인 경우
          const rankDiff = yesterdayGuild.ranking - todayGuild.ranking;
          const pointDiff = todayGuild.guildPoint - yesterdayGuild.guildPoint;

          // 랭킹 변화 계산
          if (rankDiff > 0) {
            rankingChange = `+${rankDiff}`;
          } else if (rankDiff < 0) {
            rankingChange = `${rankDiff}`;
          } else {
            rankingChange = "0";
          }

          // 점수 변화량 및 퍼센트 계산
          pointChange = pointDiff;
          pointChangePercent =
            yesterdayGuild.guildPoint > 0
              ? (pointDiff / yesterdayGuild.guildPoint) * 100
              : 0;
        } else {
          // 신규 진입 길드인 경우
          rankingChange = "NEW";
          pointChange = todayGuild.guildPoint;
          pointChangePercent = 100; // 신규 진입은 100%로 표시
        }

        return {
          ...todayGuild,
          pointChange,
          pointChangePercent: Math.round(pointChangePercent * 100) / 100, // 소수점 2자리까지
          rankingChange,
          yesterdayGuildPoint: yesterdayGuild?.guildPoint,
          yesterdayRanking: yesterdayGuild?.ranking,
        };
      },
    );

    return rankingWithChanges;
  }, [data.today, data.yesterday]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <Trophy className="w-4 h-4 text-blue-400" />;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-400";
    if (change.startsWith("-")) return "text-red-400";
    if (change === "NEW") return "text-blue-400";
    return "text-gray-400";
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) return <TrendingUp className="w-3 h-3" />;
    if (change.startsWith("-")) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  const getChangeText = (change: string) => {
    if (change === "0") return "🔄 랭킹 유지";
    if (change === "NEW") return "🆕 신규진입";
    if (change.startsWith("+")) return `🔺 ${change.substring(1)}위 상승`;
    if (change.startsWith("-")) return `🔻 ${change.substring(1)}위 하락`;
    return change;
  };

  return (
    <div className="space-y-4">
      {/* 랭킹 테이블 */}
      <div className="glass-effect rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-yellow-400" />
          오늘의 랭킹 (어제 대비)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {rankingData.length === 0 && (
            <div className="text-center text-gray-400">
              금일 수로 랭킹 데이터가 없습니다
            </div>
          )}
          {rankingData.map((guild, index) => (
            <div
              className={cn(
                "flex items-center justify-between",
                "bg-black/20 rounded-lg px-3 py-3",
                "hover:bg-black/30 transition-all duration-300",
                "border-l-4 animate-fade-in",
                isEveGuild(guild.guildName)
                  ? "border-l-green-400 bg-green-500/10"
                  : guild.ranking <= 3
                    ? "border-l-yellow-400"
                    : "border-l-blue-400",
              )}
              key={guild.ranking}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                  {getRankIcon(guild.ranking)}
                  <span
                    className={cn(
                      "text-lg font-bold",
                      guild.ranking <= 3 ? "text-yellow-300" : "text-white",
                    )}
                  >
                    {guild.ranking}위
                  </span>
                  {guild.yesterdayRanking && (
                    <span className="text-xs text-gray-500">
                      (어제: {guild.yesterdayRanking}위)
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "font-semibold text-sm",
                      isEveGuild(guild.guildName)
                        ? "text-green-300"
                        : "text-white",
                    )}
                  >
                    {guild.guildName}
                    {isEveGuild(guild.guildName) && (
                      <span className="ml-1 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                        우리 길드
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {guild.guildPoint.toLocaleString()}점
                    {guild.yesterdayGuildPoint && (
                      <span className="ml-1">
                        (어제: {guild.yesterdayGuildPoint.toLocaleString()}점)
                      </span>
                    )}
                  </div>
                  {/* 점수 변화량 표시 */}
                  <div className="text-xs mt-1 space-y-1">
                    {/* 점수 변화 정보 */}
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={cn(
                          "font-medium flex items-center gap-1",
                          guild.pointChange > 0
                            ? "text-green-400"
                            : guild.pointChange < 0
                              ? "text-red-400"
                              : "text-gray-400",
                        )}
                      >
                        {guild.pointChange > 0 && (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        {guild.pointChange < 0 && (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {guild.pointChange === 0 && "→"}
                        {guild.pointChange > 0 ? "+" : ""}
                        {guild.pointChange.toLocaleString()}점
                        {guild.yesterdayGuildPoint &&
                          guild.yesterdayGuildPoint > 0 && (
                            <span className="ml-1">
                              ({guild.pointChangePercent > 0 ? "+" : ""}
                              {guild.pointChangePercent}%)
                            </span>
                          )}
                      </span>
                    </div>
                    {/* 상승/하락 텍스트 */}
                    <div
                      className={cn(
                        "text-xs font-medium",
                        guild.pointChange > 0
                          ? "text-green-300"
                          : guild.pointChange < 0
                            ? "text-red-300"
                            : "text-gray-400",
                      )}
                    >
                      {guild.pointChange > 0 && (
                        <span>
                          📈 점수 상승
                          {guild.yesterdayGuildPoint &&
                            guild.yesterdayGuildPoint > 0 && (
                              <span className="ml-1 font-bold">
                                (+{guild.pointChangePercent}%)
                              </span>
                            )}
                        </span>
                      )}
                      {guild.pointChange < 0 && (
                        <span>
                          📉 점수 하락
                          {guild.yesterdayGuildPoint &&
                            guild.yesterdayGuildPoint > 0 && (
                              <span className="ml-1 font-bold">
                                ({guild.pointChangePercent}%)
                              </span>
                            )}
                        </span>
                      )}
                      {guild.pointChange === 0 && "➡️ 점수 동일 (0%)"}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 text-xs font-medium mt-1",
                      getChangeColor(guild.rankingChange),
                    )}
                  >
                    {getChangeIcon(guild.rankingChange)}
                    {getChangeText(guild.rankingChange)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
