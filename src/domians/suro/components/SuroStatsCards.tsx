"use client";
import {
  Activity,
  BarChart3,
  Crown,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { EVE_GUILD_NAME } from "@/shared/lib/consts";
import { useSuroRanginkTodaySuspense } from "../api/queries";
import { calculateSuroStats } from "../lib/utils";

export function SuroStatsCards() {
  const { data: todayData } = useSuroRanginkTodaySuspense();
  const stats = calculateSuroStats(todayData);

  // 점수 변화 표시를 위한 색상과 아이콘 결정
  const getChangeDisplay = (change: number, changePercent: number) => {
    const isPositive = change > 0;
    const isNegative = change < 0;
    const color = isPositive
      ? "text-green-400"
      : isNegative
        ? "text-red-400"
        : "text-gray-400";
    const Icon = isPositive
      ? TrendingUp
      : isNegative
        ? TrendingDown
        : TrendingUp;
    const sign = isPositive ? "+" : "";

    return {
      color,
      Icon,
      text:
        change === 0
          ? "변화없음"
          : `${sign}${Math.abs(change).toLocaleString("ko-KR")} (${sign}${changePercent.toFixed(1)}%)`,
    };
  };

  // 점수차 표시를 위한 JSX 생성
  const getPointDiffDisplay = () => {
    const {
      currentRanking,
      upperRankPointDiff,
      upperRankPointDiffPercent,
      lowerRankPointDiff,
      lowerRankPointDiffPercent,
    } = stats;

    const upperInfo =
      upperRankPointDiff !== undefined &&
      upperRankPointDiffPercent !== undefined
        ? `${currentRanking - 1}등 대비 -${upperRankPointDiff.toLocaleString("ko-KR")} (-${upperRankPointDiffPercent.toFixed(1)}%)`
        : null;

    const lowerInfo =
      lowerRankPointDiff !== undefined &&
      lowerRankPointDiffPercent !== undefined
        ? `${currentRanking + 1}등 대비 +${lowerRankPointDiff.toLocaleString("ko-KR")} (+${lowerRankPointDiffPercent.toFixed(1)}%)`
        : null;

    if (currentRanking === 1) {
      // 1등인 경우 - 2등과의 점수차만
      return lowerInfo || "1위 유지";
    } else {
      // 1등이 아닌 경우 - 상위와 하위 모두 표시
      const parts = [];
      if (upperInfo) parts.push(upperInfo);
      if (lowerInfo) parts.push(lowerInfo);

      if (parts.length === 0) return "데이터 없음";

      return (
        <div className="text-right">
          {parts.map((part) => (
            <div className="leading-tight" key={part}>
              {part}
            </div>
          ))}
        </div>
      );
    }
  };

  const changeDisplay = getChangeDisplay(
    stats.pointChange,
    stats.pointChangePercent,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 우리 길드 현재 순위 */}
      <div className="glass-effect rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <Crown className="w-6 h-6 text-green-400" />
          <span className="text-2xl font-bold text-green-400">
            {stats.currentRanking}위
          </span>
        </div>
        <h3 className="text-white font-semibold">{EVE_GUILD_NAME} 길드</h3>
        <p className="text-gray-400 text-sm">오늘 랭킹</p>
      </div>

      {/* 현재 점수 */}
      <div className="glass-effect rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <Activity className="w-6 h-6 text-blue-400" />
          <span className="text-2xl font-bold text-blue-400">
            {stats.currentGuildPoint.toLocaleString("ko-KR")}
          </span>
        </div>
        <h3 className="text-white font-semibold">현재 점수</h3>
        <p className="text-gray-400 text-sm">오늘 점수</p>
      </div>

      {/* 점수 변화 */}
      <div className="glass-effect rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <changeDisplay.Icon className={`w-6 h-6 ${changeDisplay.color}`} />
          <span className={`text-lg font-bold ${changeDisplay.color}`}>
            {changeDisplay.text}
          </span>
        </div>
        <h3 className="text-white font-semibold">점수 변화</h3>
        <p className="text-gray-400 text-sm">어제 대비</p>
      </div>

      {/* 점수차 */}
      <div className="glass-effect rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <div className="text-sm font-bold text-purple-400 text-right leading-tight">
            {getPointDiffDisplay()}
          </div>
        </div>
        <h3 className="text-white font-semibold">점수차</h3>
        <p className="text-gray-400 text-sm">
          {stats.currentRanking === 1 ? "하위 랭킹" : "상위/하위 랭킹"}
        </p>
      </div>
    </div>
  );
}
