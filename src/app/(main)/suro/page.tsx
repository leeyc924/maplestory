"use client";
import {
  Activity,
  BarChart3,
  Calendar,
  Crown,
  Medal,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/shared/lib/utils";

// 타입 정의
interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

// 커스텀 툴팁 컴포넌트들 (현재는 인라인으로 사용)

export default function SuroPage() {
  // 차트 색상 팔레트
  const CHART_COLORS = [
    "#10b981", // green
    "#3b82f6", // blue
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#06b6d4", // cyan
    "#f97316", // orange
    "#ec4899", // pink
    "#84cc16", // lime
    "#6366f1", // indigo
  ];

  // Mock data - API 연동 시 실제 데이터로 교체
  const guildRankings = [
    { change: "+5", isEve: true, name: "이브", rank: 1, score: 25000000 },
    { change: "-1", isEve: false, name: "아담", rank: 2, score: 24200000 },
    { change: "+2", isEve: false, name: "오시리스", rank: 3, score: 23800000 },
    { change: "-2", isEve: false, name: "제우스", rank: 4, score: 22500000 },
    { change: "+1", isEve: false, name: "헤라", rank: 5, score: 21300000 },
    { change: "-1", isEve: false, name: "아폴론", rank: 6, score: 19900000 },
    { change: "+3", isEve: false, name: "아테나", rank: 7, score: 18200000 },
    { change: "-1", isEve: false, name: "포세이돈", rank: 8, score: 16800000 },
    { change: "0", isEve: false, name: "헤르메스", rank: 9, score: 14500000 },
    {
      change: "-2",
      isEve: false,
      name: "디오니소스",
      rank: 10,
      score: 12100000,
    },
  ];

  // 날짜별 길드 랭킹 데이터 (Mock) - 20일치 데이터
  const dailyGuildRankings = [
    {
      date: "11/18",
      rankings: [
        { name: "제우스", rank: 1, score: 15100000 },
        { name: "이브", rank: 2, score: 14800000 },
        { name: "아담", rank: 3, score: 14200000 },
        { name: "오시리스", rank: 4, score: 13800000 },
        { name: "헤라", rank: 5, score: 13200000 },
        { name: "아폴론", rank: 6, score: 12800000 },
        { name: "아테나", rank: 7, score: 12200000 },
        { name: "포세이돈", rank: 8, score: 11800000 },
        { name: "헤르메스", rank: 9, score: 11200000 },
        { name: "디오니소스", rank: 10, score: 10800000 },
      ],
    },
    {
      date: "11/19",
      rankings: [
        { name: "제우스", rank: 1, score: 15800000 },
        { name: "이브", rank: 2, score: 15500000 },
        { name: "아담", rank: 3, score: 14900000 },
        { name: "오시리스", rank: 4, score: 14500000 },
        { name: "헤라", rank: 5, score: 13900000 },
        { name: "아폴론", rank: 6, score: 13500000 },
        { name: "아테나", rank: 7, score: 12900000 },
        { name: "포세이돈", rank: 8, score: 12500000 },
        { name: "헤르메스", rank: 9, score: 11900000 },
        { name: "디오니소스", rank: 10, score: 11500000 },
      ],
    },
    {
      date: "11/20",
      rankings: [
        { name: "제우스", rank: 1, score: 16500000 },
        { name: "이브", rank: 2, score: 16200000 },
        { name: "아담", rank: 3, score: 15600000 },
        { name: "오시리스", rank: 4, score: 15200000 },
        { name: "헤라", rank: 5, score: 14600000 },
        { name: "아폴론", rank: 6, score: 14200000 },
        { name: "아테나", rank: 7, score: 13600000 },
        { name: "포세이돈", rank: 8, score: 13200000 },
        { name: "헤르메스", rank: 9, score: 12600000 },
        { name: "디오니소스", rank: 10, score: 12200000 },
      ],
    },
    {
      date: "11/21",
      rankings: [
        { name: "제우스", rank: 1, score: 17200000 },
        { name: "이브", rank: 2, score: 16900000 },
        { name: "아담", rank: 3, score: 16300000 },
        { name: "오시리스", rank: 4, score: 15900000 },
        { name: "헤라", rank: 5, score: 15300000 },
        { name: "아폴론", rank: 6, score: 14900000 },
        { name: "아테나", rank: 7, score: 14300000 },
        { name: "포세이돈", rank: 8, score: 13900000 },
        { name: "헤르메스", rank: 9, score: 13300000 },
        { name: "디오니소스", rank: 10, score: 12900000 },
      ],
    },
    {
      date: "11/22",
      rankings: [
        { name: "이브", rank: 1, score: 17900000 },
        { name: "제우스", rank: 2, score: 17600000 },
        { name: "아담", rank: 3, score: 17000000 },
        { name: "오시리스", rank: 4, score: 16600000 },
        { name: "헤라", rank: 5, score: 16000000 },
        { name: "아폴론", rank: 6, score: 15600000 },
        { name: "아테나", rank: 7, score: 15000000 },
        { name: "포세이돈", rank: 8, score: 14600000 },
        { name: "헤르메스", rank: 9, score: 14000000 },
        { name: "디오니소스", rank: 10, score: 13600000 },
      ],
    },
    {
      date: "11/23",
      rankings: [
        { name: "이브", rank: 1, score: 18600000 },
        { name: "제우스", rank: 2, score: 18300000 },
        { name: "아담", rank: 3, score: 17700000 },
        { name: "오시리스", rank: 4, score: 17300000 },
        { name: "헤라", rank: 5, score: 16700000 },
        { name: "아폴론", rank: 6, score: 16300000 },
        { name: "아테나", rank: 7, score: 15700000 },
        { name: "포세이돈", rank: 8, score: 15300000 },
        { name: "헤르메스", rank: 9, score: 14700000 },
        { name: "디오니소스", rank: 10, score: 14300000 },
      ],
    },
    {
      date: "11/24",
      rankings: [
        { name: "이브", rank: 1, score: 19300000 },
        { name: "제우스", rank: 2, score: 19000000 },
        { name: "아담", rank: 3, score: 18400000 },
        { name: "오시리스", rank: 4, score: 18000000 },
        { name: "헤라", rank: 5, score: 17400000 },
        { name: "아폴론", rank: 6, score: 17000000 },
        { name: "아테나", rank: 7, score: 16400000 },
        { name: "포세이돈", rank: 8, score: 16000000 },
        { name: "헤르메스", rank: 9, score: 15400000 },
        { name: "디오니소스", rank: 10, score: 15000000 },
      ],
    },
    {
      date: "11/25",
      rankings: [
        { name: "이브", rank: 1, score: 20000000 },
        { name: "제우스", rank: 2, score: 19700000 },
        { name: "아담", rank: 3, score: 19100000 },
        { name: "오시리스", rank: 4, score: 18700000 },
        { name: "헤라", rank: 5, score: 18100000 },
        { name: "아폴론", rank: 6, score: 17700000 },
        { name: "아테나", rank: 7, score: 17100000 },
        { name: "포세이돈", rank: 8, score: 16700000 },
        { name: "헤르메스", rank: 9, score: 16100000 },
        { name: "디오니소스", rank: 10, score: 15700000 },
      ],
    },
    {
      date: "11/26",
      rankings: [
        { name: "이브", rank: 1, score: 20700000 },
        { name: "제우스", rank: 2, score: 20400000 },
        { name: "아담", rank: 3, score: 19800000 },
        { name: "오시리스", rank: 4, score: 19400000 },
        { name: "헤라", rank: 5, score: 18800000 },
        { name: "아폴론", rank: 6, score: 18400000 },
        { name: "아테나", rank: 7, score: 17800000 },
        { name: "포세이돈", rank: 8, score: 17400000 },
        { name: "헤르메스", rank: 9, score: 16800000 },
        { name: "디오니소스", rank: 10, score: 16400000 },
      ],
    },
    {
      date: "11/27",
      rankings: [
        { name: "이브", rank: 1, score: 21400000 },
        { name: "제우스", rank: 2, score: 21100000 },
        { name: "아담", rank: 3, score: 20500000 },
        { name: "오시리스", rank: 4, score: 20100000 },
        { name: "헤라", rank: 5, score: 19500000 },
        { name: "아폴론", rank: 6, score: 19100000 },
        { name: "아테나", rank: 7, score: 18500000 },
        { name: "포세이돈", rank: 8, score: 18100000 },
        { name: "헤르메스", rank: 9, score: 17500000 },
        { name: "디오니소스", rank: 10, score: 17100000 },
      ],
    },
    {
      date: "11/28",
      rankings: [
        { name: "이브", rank: 1, score: 22100000 },
        { name: "제우스", rank: 2, score: 21800000 },
        { name: "아담", rank: 3, score: 21200000 },
        { name: "오시리스", rank: 4, score: 20800000 },
        { name: "헤라", rank: 5, score: 20200000 },
        { name: "아폴론", rank: 6, score: 19800000 },
        { name: "아테나", rank: 7, score: 19200000 },
        { name: "포세이돈", rank: 8, score: 18800000 },
        { name: "헤르메스", rank: 9, score: 18200000 },
        { name: "디오니소스", rank: 10, score: 17800000 },
      ],
    },
    {
      date: "11/29",
      rankings: [
        { name: "이브", rank: 1, score: 22800000 },
        { name: "제우스", rank: 2, score: 22500000 },
        { name: "아담", rank: 3, score: 21900000 },
        { name: "오시리스", rank: 4, score: 21500000 },
        { name: "헤라", rank: 5, score: 20900000 },
        { name: "아폴론", rank: 6, score: 20500000 },
        { name: "아테나", rank: 7, score: 19900000 },
        { name: "포세이돈", rank: 8, score: 19500000 },
        { name: "헤르메스", rank: 9, score: 18900000 },
        { name: "디오니소스", rank: 10, score: 18500000 },
      ],
    },
    {
      date: "11/30",
      rankings: [
        { name: "이브", rank: 1, score: 23500000 },
        { name: "제우스", rank: 2, score: 23200000 },
        { name: "아담", rank: 3, score: 22600000 },
        { name: "오시리스", rank: 4, score: 22200000 },
        { name: "헤라", rank: 5, score: 21600000 },
        { name: "아폴론", rank: 6, score: 21200000 },
        { name: "아테나", rank: 7, score: 20600000 },
        { name: "포세이돈", rank: 8, score: 20200000 },
        { name: "헤르메스", rank: 9, score: 19600000 },
        { name: "디오니소스", rank: 10, score: 19200000 },
      ],
    },
    {
      date: "12/1",
      rankings: [
        { name: "이브", rank: 1, score: 24000000 },
        { name: "아담", rank: 2, score: 23200000 },
        { name: "제우스", rank: 3, score: 22900000 },
        { name: "오시리스", rank: 4, score: 22200000 },
        { name: "헤라", rank: 5, score: 21600000 },
        { name: "아폴론", rank: 6, score: 21200000 },
        { name: "아테나", rank: 7, score: 20600000 },
        { name: "포세이돈", rank: 8, score: 20200000 },
        { name: "헤르메스", rank: 9, score: 19600000 },
        { name: "디오니소스", rank: 10, score: 19200000 },
      ],
    },
    {
      date: "12/2",
      rankings: [
        { name: "이브", rank: 1, score: 24200000 },
        { name: "아담", rank: 2, score: 23400000 },
        { name: "제우스", rank: 3, score: 23100000 },
        { name: "오시리스", rank: 4, score: 22400000 },
        { name: "헤라", rank: 5, score: 21800000 },
        { name: "아폴론", rank: 6, score: 21400000 },
        { name: "아테나", rank: 7, score: 20800000 },
        { name: "포세이돈", rank: 8, score: 20400000 },
        { name: "헤르메스", rank: 9, score: 19800000 },
        { name: "디오니소스", rank: 10, score: 19400000 },
      ],
    },
    {
      date: "12/3",
      rankings: [
        { name: "이브", rank: 1, score: 24500000 },
        { name: "아담", rank: 2, score: 23700000 },
        { name: "제우스", rank: 3, score: 23400000 },
        { name: "오시리스", rank: 4, score: 22700000 },
        { name: "헤라", rank: 5, score: 22100000 },
        { name: "아폴론", rank: 6, score: 21700000 },
        { name: "아테나", rank: 7, score: 21100000 },
        { name: "포세이돈", rank: 8, score: 20700000 },
        { name: "헤르메스", rank: 9, score: 20100000 },
        { name: "디오니소스", rank: 10, score: 19700000 },
      ],
    },
    {
      date: "12/4",
      rankings: [
        { name: "이브", rank: 1, score: 24800000 },
        { name: "아담", rank: 2, score: 24000000 },
        { name: "제우스", rank: 3, score: 23700000 },
        { name: "오시리스", rank: 4, score: 23000000 },
        { name: "헤라", rank: 5, score: 22400000 },
        { name: "아폴론", rank: 6, score: 22000000 },
        { name: "아테나", rank: 7, score: 21400000 },
        { name: "포세이돈", rank: 8, score: 21000000 },
        { name: "헤르메스", rank: 9, score: 20400000 },
        { name: "디오니소스", rank: 10, score: 20000000 },
      ],
    },
    {
      date: "12/5",
      rankings: [
        { name: "이브", rank: 1, score: 24900000 },
        { name: "아담", rank: 2, score: 24100000 },
        { name: "오시리스", rank: 3, score: 23300000 },
        { name: "제우스", rank: 4, score: 23000000 },
        { name: "헤라", rank: 5, score: 22700000 },
        { name: "아폴론", rank: 6, score: 22300000 },
        { name: "아테나", rank: 7, score: 21700000 },
        { name: "포세이돈", rank: 8, score: 21300000 },
        { name: "헤르메스", rank: 9, score: 20700000 },
        { name: "디오니소스", rank: 10, score: 20300000 },
      ],
    },
    {
      date: "12/6",
      rankings: [
        { name: "이브", rank: 1, score: 25000000 },
        { name: "아담", rank: 2, score: 24200000 },
        { name: "오시리스", rank: 3, score: 23800000 },
        { name: "제우스", rank: 4, score: 22500000 },
        { name: "헤라", rank: 5, score: 21300000 },
        { name: "아폴론", rank: 6, score: 19900000 },
        { name: "아테나", rank: 7, score: 18200000 },
        { name: "포세이돈", rank: 8, score: 16800000 },
        { name: "헤르메스", rank: 9, score: 14500000 },
        { name: "디오니소스", rank: 10, score: 12100000 },
      ],
    },
    {
      date: "12/7",
      rankings: [
        { name: "이브", rank: 1, score: 25000000 },
        { name: "아담", rank: 2, score: 24200000 },
        { name: "오시리스", rank: 3, score: 23800000 },
        { name: "제우스", rank: 4, score: 22500000 },
        { name: "헤라", rank: 5, score: 21300000 },
        { name: "아폴론", rank: 6, score: 19900000 },
        { name: "아테나", rank: 7, score: 18200000 },
        { name: "포세이돈", rank: 8, score: 16800000 },
        { name: "헤르메스", rank: 9, score: 14500000 },
        { name: "디오니소스", rank: 10, score: 12100000 },
      ],
    },
  ];

  // 차트용 데이터 변환 함수들
  const getRankChangeData = () => {
    // 전체 날짜별 순위 변화 및 점수 데이터를 생성 (모든 데이터)
    return dailyGuildRankings.map((dayData) => {
      const dataPoint: ChartDataPoint = { date: dayData.date };

      // 각 길드의 순위와 점수를 해당 날짜에 추가
      dayData.rankings.forEach((guild) => {
        dataPoint[`${guild.name}_rank`] = guild.rank;
        dataPoint[`${guild.name}_score`] = guild.score;
      });

      return dataPoint;
    });
  };

  // Y축 범위 계산을 위한 최저/최고 점수
  const getScoreRange = () => {
    // 수동으로 범위 설정 (Mock 데이터 기준)
    return {
      max: 26000000, // 2천6백만점
      min: 10000000, // 1천만점
    };
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <Trophy className="w-4 h-4 text-blue-400" />;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-400";
    if (change.startsWith("-")) return "text-red-400";
    return "text-gray-400";
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) return <TrendingUp className="w-3 h-3" />;
    if (change.startsWith("-")) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* 수로 랭킹 헤더 */}
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
          수로 길드 랭킹 대시보드
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          실시간 길드 순위와 점수 변화를 확인하세요
        </p>
      </div>

      {/* 주요 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 우리 길드 현재 순위 */}
        <div className="glass-effect rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <Crown className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-green-400">1위</span>
          </div>
          <h3 className="text-white font-semibold">이브 길드</h3>
          <p className="text-gray-400 text-sm">우리 길드 순위</p>
        </div>

        {/* 현재 점수 */}
        <div className="glass-effect rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">25,000,000</span>
          </div>
          <h3 className="text-white font-semibold">현재 점수</h3>
          <p className="text-gray-400 text-sm">수로 총점</p>
        </div>

        {/* 순위 변화 */}
        <div className="glass-effect rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-green-400">+5</span>
          </div>
          <h3 className="text-white font-semibold">순위 변화</h3>
          <p className="text-gray-400 text-sm">어제 대비</p>
        </div>

        {/* 평균 점수 */}
        <div className="glass-effect rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">18,542</span>
          </div>
          <h3 className="text-white font-semibold">점수차</h3>
          <p className="text-gray-400 text-sm">이전 랭킹</p>
        </div>
      </div>

      {/* 날짜별 순위 변화 차트 섹션 */}
      <div className="grid grid-cols-1 gap-6">
        {/* 날짜별 수로 점수 추이 차트 */}
        <div className="glass-effect rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            날짜별 수로 점수 추이 (전체 기간)
          </h3>
          <div className="h-[500px] overflow-x-auto">
            <div
              style={{
                height: "100%",
                minWidth: `${dailyGuildRankings.length * 100}px`,
              }}
            >
              <ResponsiveContainer height="100%" width="100%">
                <RechartsLineChart data={getRankChangeData()}>
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} stroke="#9ca3af" />
                  {/* 점수용 Y축 */}
                  <YAxis
                    domain={[getScoreRange().min, getScoreRange().max]}
                    fontSize={12}
                    stroke="#9ca3af"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        // 길드별로 순위와 점수를 그룹화
                        const guildData: Record<
                          string,
                          { rank?: number; score?: number }
                        > = {};

                        payload.forEach((entry) => {
                          const dataKey = entry.dataKey as string;
                          if (dataKey.endsWith("_rank")) {
                            const guildName = dataKey.replace("_rank", "");
                            if (!guildData[guildName])
                              guildData[guildName] = {};
                            guildData[guildName].rank = entry.value as number;
                          } else if (dataKey.endsWith("_score")) {
                            const guildName = dataKey.replace("_score", "");
                            if (!guildData[guildName])
                              guildData[guildName] = {};
                            guildData[guildName].score = entry.value as number;
                          }
                        });

                        return (
                          <div className="bg-black/90 backdrop-blur-sm border border-slate-500/30 rounded-lg p-3 shadow-xl max-w-xs">
                            <p className="text-white font-medium mb-2">{`날짜: ${label}`}</p>
                            {Object.entries(guildData).map(
                              ([guildName, data]) => (
                                <div className="mb-1" key={guildName}>
                                  <p
                                    className="text-sm font-medium"
                                    style={{
                                      color:
                                        guildName === "이브"
                                          ? "#10b981"
                                          : CHART_COLORS[
                                              guildRankings.findIndex(
                                                (g) => g.name === guildName,
                                              ) % CHART_COLORS.length
                                            ],
                                    }}
                                  >
                                    {guildName}
                                    {guildName === "이브" && (
                                      <span className="text-xs ml-1">👑</span>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-300 ml-2">
                                    {data.score?.toLocaleString()}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  {/* 점수 라인들만 표시 */}
                  {guildRankings.map((guild, index) => (
                    <Line
                      dataKey={`${guild.name}_score`}
                      dot={{
                        fill: guild.isEve
                          ? "#10b981"
                          : CHART_COLORS[index % CHART_COLORS.length],
                        r: guild.isEve ? 6 : 4,
                        strokeWidth: 2,
                      }}
                      key={`${guild.name}_score`}
                      name={`${guild.name}`}
                      stroke={
                        guild.isEve
                          ? "#10b981"
                          : CHART_COLORS[index % CHART_COLORS.length]
                      }
                      strokeWidth={guild.isEve ? 4 : 3}
                      type="monotone"
                    />
                  ))}
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            <div>← 좌우로 스크롤하여 전체 기간을 확인하세요 →</div>
            <div className="mt-1">
              <span>그래프: 수로 점수 추이 | 툴팁: 순위 + 점수 정보</span>
            </div>
          </div>
        </div>
      </div>

      {/* 길드 순위표 섹션 */}
      <div className="grid grid-cols-1 gap-6">
        {/* 길드 순위표 */}
        <div className="glass-effect rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-yellow-400" />
            오늘의 랭킹
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {guildRankings.map((guild, index) => (
              <div
                className={cn(
                  "flex items-center justify-between",
                  "bg-black/20 rounded-lg px-3 py-3",
                  "hover:bg-black/30 transition-all duration-300",
                  "border-l-4 animate-fade-in",
                  guild.isEve
                    ? "border-l-green-400 bg-green-500/10"
                    : guild.rank <= 3
                      ? "border-l-yellow-400"
                      : "border-l-blue-400",
                )}
                key={guild.rank}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center gap-2">
                    {getRankIcon(guild.rank)}
                    <span
                      className={cn(
                        "text-lg font-bold",
                        guild.rank <= 3 ? "text-yellow-300" : "text-white",
                      )}
                    >
                      {guild.rank}위
                    </span>
                  </div>
                  <div className="text-center">
                    <div
                      className={cn(
                        "font-semibold text-sm",
                        guild.isEve ? "text-green-300" : "text-white",
                      )}
                    >
                      {guild.name}
                      {guild.isEve && (
                        <span className="ml-1 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                          우리 길드
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {guild.score.toLocaleString()}점
                    </div>
                    <div
                      className={cn(
                        "flex items-center justify-center gap-1 text-xs font-medium mt-1",
                        getChangeColor(guild.change),
                      )}
                    >
                      {getChangeIcon(guild.change)}
                      {guild.change !== "0" && guild.change}
                      {guild.change === "0" && "변화없음"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
