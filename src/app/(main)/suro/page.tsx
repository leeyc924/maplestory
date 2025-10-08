import {
  Calendar,
  Crown,
  Medal,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useId } from "react";
import { cn } from "@/shared/lib/utils";

export default function SuroPage() {
  const lineGradientId = useId();
  const glowEffectId = useId();

  // Mock data - API 연동 시 실제 데이터로 교체
  const guildRankings = [
    { change: "+5", isEve: true, name: "이브", rank: 1, score: 98750 },
    { change: "-1", isEve: false, name: "아담", rank: 2, score: 95200 },
    { change: "+2", isEve: false, name: "오시리스", rank: 3, score: 92800 },
    { change: "-2", isEve: false, name: "제우스", rank: 4, score: 89500 },
    { change: "+1", isEve: false, name: "헤라", rank: 5, score: 86300 },
    { change: "-1", isEve: false, name: "아폴론", rank: 6, score: 83900 },
    { change: "+3", isEve: false, name: "아테나", rank: 7, score: 81200 },
    { change: "-1", isEve: false, name: "포세이돈", rank: 8, score: 78800 },
    { change: "0", isEve: false, name: "헤르메스", rank: 9, score: 76500 },
    { change: "-2", isEve: false, name: "디오니소스", rank: 10, score: 74100 },
  ];

  // 날짜별 길드 랭킹 데이터 (Mock) - 20일치 데이터
  const dailyGuildRankings = [
    {
      date: "11/18",
      rankings: [
        { name: "제우스", rank: 1, score: 62100 },
        { name: "이브", rank: 2, score: 61800 },
        { name: "아담", rank: 3, score: 61200 },
        { name: "오시리스", rank: 4, score: 60800 },
        { name: "헤라", rank: 5, score: 60200 },
        { name: "아폴론", rank: 6, score: 59800 },
        { name: "아테나", rank: 7, score: 59200 },
        { name: "포세이돈", rank: 8, score: 58800 },
        { name: "헤르메스", rank: 9, score: 58200 },
        { name: "디오니소스", rank: 10, score: 57800 },
      ],
    },
    {
      date: "11/19",
      rankings: [
        { name: "제우스", rank: 1, score: 63800 },
        { name: "이브", rank: 2, score: 63500 },
        { name: "아담", rank: 3, score: 62900 },
        { name: "오시리스", rank: 4, score: 62500 },
        { name: "헤라", rank: 5, score: 61900 },
        { name: "아폴론", rank: 6, score: 61500 },
        { name: "아테나", rank: 7, score: 60900 },
        { name: "포세이돈", rank: 8, score: 60500 },
        { name: "헤르메스", rank: 9, score: 59900 },
        { name: "디오니소스", rank: 10, score: 59500 },
      ],
    },
    {
      date: "11/20",
      rankings: [
        { name: "제우스", rank: 1, score: 65500 },
        { name: "이브", rank: 2, score: 65200 },
        { name: "아담", rank: 3, score: 64600 },
        { name: "오시리스", rank: 4, score: 64200 },
        { name: "헤라", rank: 5, score: 63600 },
        { name: "아폴론", rank: 6, score: 63200 },
        { name: "아테나", rank: 7, score: 62600 },
        { name: "포세이돈", rank: 8, score: 62200 },
        { name: "헤르메스", rank: 9, score: 61600 },
        { name: "디오니소스", rank: 10, score: 61200 },
      ],
    },
    {
      date: "11/21",
      rankings: [
        { name: "제우스", rank: 1, score: 67200 },
        { name: "이브", rank: 2, score: 66900 },
        { name: "아담", rank: 3, score: 66300 },
        { name: "오시리스", rank: 4, score: 65900 },
        { name: "헤라", rank: 5, score: 65300 },
        { name: "아폴론", rank: 6, score: 64900 },
        { name: "아테나", rank: 7, score: 64300 },
        { name: "포세이돈", rank: 8, score: 63900 },
        { name: "헤르메스", rank: 9, score: 63300 },
        { name: "디오니소스", rank: 10, score: 62900 },
      ],
    },
    {
      date: "11/22",
      rankings: [
        { name: "이브", rank: 1, score: 68900 },
        { name: "제우스", rank: 2, score: 68600 },
        { name: "아담", rank: 3, score: 68000 },
        { name: "오시리스", rank: 4, score: 67600 },
        { name: "헤라", rank: 5, score: 67000 },
        { name: "아폴론", rank: 6, score: 66600 },
        { name: "아테나", rank: 7, score: 66000 },
        { name: "포세이돈", rank: 8, score: 65600 },
        { name: "헤르메스", rank: 9, score: 65000 },
        { name: "디오니소스", rank: 10, score: 64600 },
      ],
    },
    {
      date: "11/23",
      rankings: [
        { name: "이브", rank: 1, score: 70600 },
        { name: "제우스", rank: 2, score: 70300 },
        { name: "아담", rank: 3, score: 69700 },
        { name: "오시리스", rank: 4, score: 69300 },
        { name: "헤라", rank: 5, score: 68700 },
        { name: "아폴론", rank: 6, score: 68300 },
        { name: "아테나", rank: 7, score: 67700 },
        { name: "포세이돈", rank: 8, score: 67300 },
        { name: "헤르메스", rank: 9, score: 66700 },
        { name: "디오니소스", rank: 10, score: 66300 },
      ],
    },
    {
      date: "11/24",
      rankings: [
        { name: "이브", rank: 1, score: 72300 },
        { name: "제우스", rank: 2, score: 72000 },
        { name: "아담", rank: 3, score: 71400 },
        { name: "오시리스", rank: 4, score: 71000 },
        { name: "헤라", rank: 5, score: 70400 },
        { name: "아폴론", rank: 6, score: 70000 },
        { name: "아테나", rank: 7, score: 69400 },
        { name: "포세이돈", rank: 8, score: 69000 },
        { name: "헤르메스", rank: 9, score: 68400 },
        { name: "디오니소스", rank: 10, score: 68000 },
      ],
    },
    {
      date: "11/25",
      rankings: [
        { name: "이브", rank: 1, score: 74000 },
        { name: "제우스", rank: 2, score: 73700 },
        { name: "아담", rank: 3, score: 73100 },
        { name: "오시리스", rank: 4, score: 72700 },
        { name: "헤라", rank: 5, score: 72100 },
        { name: "아폴론", rank: 6, score: 71700 },
        { name: "아테나", rank: 7, score: 71100 },
        { name: "포세이돈", rank: 8, score: 70700 },
        { name: "헤르메스", rank: 9, score: 70100 },
        { name: "디오니소스", rank: 10, score: 69700 },
      ],
    },
    {
      date: "11/26",
      rankings: [
        { name: "이브", rank: 1, score: 75700 },
        { name: "제우스", rank: 2, score: 75400 },
        { name: "아담", rank: 3, score: 74800 },
        { name: "오시리스", rank: 4, score: 74400 },
        { name: "헤라", rank: 5, score: 73800 },
        { name: "아폴론", rank: 6, score: 73400 },
        { name: "아테나", rank: 7, score: 72800 },
        { name: "포세이돈", rank: 8, score: 72400 },
        { name: "헤르메스", rank: 9, score: 71800 },
        { name: "디오니소스", rank: 10, score: 71400 },
      ],
    },
    {
      date: "11/27",
      rankings: [
        { name: "이브", rank: 1, score: 77400 },
        { name: "제우스", rank: 2, score: 77100 },
        { name: "아담", rank: 3, score: 76500 },
        { name: "오시리스", rank: 4, score: 76100 },
        { name: "헤라", rank: 5, score: 75500 },
        { name: "아폴론", rank: 6, score: 75100 },
        { name: "아테나", rank: 7, score: 74500 },
        { name: "포세이돈", rank: 8, score: 74100 },
        { name: "헤르메스", rank: 9, score: 73500 },
        { name: "디오니소스", rank: 10, score: 73100 },
      ],
    },
    {
      date: "11/28",
      rankings: [
        { name: "이브", rank: 1, score: 79100 },
        { name: "제우스", rank: 2, score: 78800 },
        { name: "아담", rank: 3, score: 78200 },
        { name: "오시리스", rank: 4, score: 77800 },
        { name: "헤라", rank: 5, score: 77200 },
        { name: "아폴론", rank: 6, score: 76800 },
        { name: "아테나", rank: 7, score: 76200 },
        { name: "포세이돈", rank: 8, score: 75800 },
        { name: "헤르메스", rank: 9, score: 75200 },
        { name: "디오니소스", rank: 10, score: 74800 },
      ],
    },
    {
      date: "11/29",
      rankings: [
        { name: "이브", rank: 1, score: 80800 },
        { name: "제우스", rank: 2, score: 80500 },
        { name: "아담", rank: 3, score: 79900 },
        { name: "오시리스", rank: 4, score: 79500 },
        { name: "헤라", rank: 5, score: 78900 },
        { name: "아폴론", rank: 6, score: 78500 },
        { name: "아테나", rank: 7, score: 77900 },
        { name: "포세이돈", rank: 8, score: 77500 },
        { name: "헤르메스", rank: 9, score: 76900 },
        { name: "디오니소스", rank: 10, score: 76500 },
      ],
    },
    {
      date: "11/30",
      rankings: [
        { name: "이브", rank: 1, score: 82500 },
        { name: "제우스", rank: 2, score: 82200 },
        { name: "아담", rank: 3, score: 81600 },
        { name: "오시리스", rank: 4, score: 81200 },
        { name: "헤라", rank: 5, score: 80600 },
        { name: "아폴론", rank: 6, score: 80200 },
        { name: "아테나", rank: 7, score: 79600 },
        { name: "포세이돈", rank: 8, score: 79200 },
        { name: "헤르메스", rank: 9, score: 78600 },
        { name: "디오니소스", rank: 10, score: 78200 },
      ],
    },
    {
      date: "12/1",
      rankings: [
        { name: "이브", rank: 1, score: 85000 },
        { name: "아담", rank: 2, score: 84200 },
        { name: "제우스", rank: 3, score: 83900 },
        { name: "오시리스", rank: 4, score: 83200 },
        { name: "헤라", rank: 5, score: 82600 },
        { name: "아폴론", rank: 6, score: 82200 },
        { name: "아테나", rank: 7, score: 81600 },
        { name: "포세이돈", rank: 8, score: 81200 },
        { name: "헤르메스", rank: 9, score: 80600 },
        { name: "디오니소스", rank: 10, score: 80200 },
      ],
    },
    {
      date: "12/2",
      rankings: [
        { name: "이브", rank: 1, score: 87200 },
        { name: "아담", rank: 2, score: 86400 },
        { name: "제우스", rank: 3, score: 86100 },
        { name: "오시리스", rank: 4, score: 85400 },
        { name: "헤라", rank: 5, score: 84800 },
        { name: "아폴론", rank: 6, score: 84400 },
        { name: "아테나", rank: 7, score: 83800 },
        { name: "포세이돈", rank: 8, score: 83400 },
        { name: "헤르메스", rank: 9, score: 82800 },
        { name: "디오니소스", rank: 10, score: 82400 },
      ],
    },
    {
      date: "12/3",
      rankings: [
        { name: "이브", rank: 1, score: 89500 },
        { name: "아담", rank: 2, score: 88700 },
        { name: "제우스", rank: 3, score: 88400 },
        { name: "오시리스", rank: 4, score: 87700 },
        { name: "헤라", rank: 5, score: 87100 },
        { name: "아폴론", rank: 6, score: 86700 },
        { name: "아테나", rank: 7, score: 86100 },
        { name: "포세이돈", rank: 8, score: 85700 },
        { name: "헤르메스", rank: 9, score: 85100 },
        { name: "디오니소스", rank: 10, score: 84700 },
      ],
    },
    {
      date: "12/4",
      rankings: [
        { name: "이브", rank: 1, score: 91800 },
        { name: "아담", rank: 2, score: 91000 },
        { name: "제우스", rank: 3, score: 90700 },
        { name: "오시리스", rank: 4, score: 90000 },
        { name: "헤라", rank: 5, score: 89400 },
        { name: "아폴론", rank: 6, score: 89000 },
        { name: "아테나", rank: 7, score: 88400 },
        { name: "포세이돈", rank: 8, score: 88000 },
        { name: "헤르메스", rank: 9, score: 87400 },
        { name: "디오니소스", rank: 10, score: 87000 },
      ],
    },
    {
      date: "12/5",
      rankings: [
        { name: "이브", rank: 1, score: 94100 },
        { name: "아담", rank: 2, score: 93300 },
        { name: "제우스", rank: 3, score: 93000 },
        { name: "오시리스", rank: 4, score: 92300 },
        { name: "헤라", rank: 5, score: 91700 },
        { name: "아폴론", rank: 6, score: 91300 },
        { name: "아테나", rank: 7, score: 90700 },
        { name: "포세이돈", rank: 8, score: 90300 },
        { name: "헤르메스", rank: 9, score: 89700 },
        { name: "디오니소스", rank: 10, score: 89300 },
      ],
    },
    {
      date: "12/6",
      rankings: [
        { name: "이브", rank: 1, score: 96400 },
        { name: "아담", rank: 2, score: 95600 },
        { name: "제우스", rank: 3, score: 95300 },
        { name: "오시리스", rank: 4, score: 94600 },
        { name: "헤라", rank: 5, score: 94000 },
        { name: "아폴론", rank: 6, score: 93600 },
        { name: "아테나", rank: 7, score: 93000 },
        { name: "포세이돈", rank: 8, score: 92600 },
        { name: "헤르메스", rank: 9, score: 92000 },
        { name: "디오니소스", rank: 10, score: 91600 },
      ],
    },
    {
      date: "12/7",
      rankings: [
        { name: "이브", rank: 1, score: 98750 },
        { name: "아담", rank: 2, score: 97950 },
        { name: "제우스", rank: 3, score: 97650 },
        { name: "오시리스", rank: 4, score: 96950 },
        { name: "헤라", rank: 5, score: 96350 },
        { name: "아폴론", rank: 6, score: 95950 },
        { name: "아테나", rank: 7, score: 95350 },
        { name: "포세이돈", rank: 8, score: 94950 },
        { name: "헤르메스", rank: 9, score: 94350 },
        { name: "디오니소스", rank: 10, score: 93950 },
      ],
    },
  ];

  // 길드별 색상 매핑
  const guildColors: Record<
    string,
    { primary: string; secondary: string; text: string }
  > = {
    디오니소스: {
      primary: "from-red-500 to-red-300",
      secondary: "border-red-400",
      text: "text-red-300",
    },
    아담: {
      primary: "from-blue-500 to-blue-300",
      secondary: "border-blue-400",
      text: "text-blue-300",
    },
    아테나: {
      primary: "from-indigo-500 to-indigo-300",
      secondary: "border-indigo-400",
      text: "text-indigo-300",
    },
    아폴론: {
      primary: "from-orange-500 to-orange-300",
      secondary: "border-orange-400",
      text: "text-orange-300",
    },
    오시리스: {
      primary: "from-purple-500 to-purple-300",
      secondary: "border-purple-400",
      text: "text-purple-300",
    },
    이브: {
      primary: "from-green-500 to-green-300",
      secondary: "border-green-400",
      text: "text-green-300",
    },
    제우스: {
      primary: "from-yellow-500 to-yellow-300",
      secondary: "border-yellow-400",
      text: "text-yellow-300",
    },
    포세이돈: {
      primary: "from-cyan-500 to-cyan-300",
      secondary: "border-cyan-400",
      text: "text-cyan-300",
    },
    헤라: {
      primary: "from-pink-500 to-pink-300",
      secondary: "border-pink-400",
      text: "text-pink-300",
    },
    헤르메스: {
      primary: "from-teal-500 to-teal-300",
      secondary: "border-teal-400",
      text: "text-teal-300",
    },
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
      {/* 수로 랭킹 섹션 */}
      <div
        className={cn(
          "glass-effect rounded-xl md:rounded-2xl",
          "p-4 md:p-6 shadow-2xl",
        )}
      >
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-white",
            "mb-4 md:mb-6 flex items-center gap-2 md:gap-3",
          )}
        >
          <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-400" />
          수로 길드 랭킹
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* 길드 순위표 */}
          <div className="xl:col-span-2">
            <div
              className={cn(
                "bg-gradient-to-br from-yellow-500/10",
                "to-orange-500/10 backdrop-blur-sm",
                "rounded-lg md:rounded-xl p-4 md:p-5",
                "border border-yellow-500/20",
              )}
            >
              <h3
                className={cn(
                  "text-lg md:text-xl font-semibold",
                  "text-white mb-4 flex items-center gap-2",
                )}
              >
                <Calendar className="w-5 h-5 text-yellow-400" />
                오늘의 랭킹 (TOP 10)
              </h3>
              <div className="space-y-2">
                {guildRankings.map((guild, index) => (
                  <div
                    className={cn(
                      "flex items-center justify-between",
                      "bg-black/20 rounded-lg px-3 md:px-4 py-3 md:py-4",
                      "hover:bg-black/30 hover:scale-[1.02] transition-all duration-300",
                      "border-l-4 animate-fade-in",
                      guild.isEve
                        ? "border-l-green-400 bg-green-500/10 hover:bg-green-500/20"
                        : guild.rank <= 3
                          ? "border-l-yellow-400 hover:bg-yellow-500/10"
                          : "border-l-blue-400 hover:bg-blue-500/10",
                    )}
                    key={guild.rank}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(guild.rank)}
                        <span
                          className={cn(
                            "text-lg md:text-xl font-bold",
                            guild.rank <= 3 ? "text-yellow-300" : "text-white",
                          )}
                        >
                          {guild.rank}
                        </span>
                      </div>
                      <div>
                        <div
                          className={cn(
                            "font-semibold text-sm md:text-base",
                            guild.isEve ? "text-green-300" : "text-white",
                          )}
                        >
                          {guild.name}
                          {guild.isEve && (
                            <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                              우리 길드
                            </span>
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                          수로 점수: {guild.score.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs md:text-sm font-medium",
                        getChangeColor(guild.change),
                      )}
                    >
                      {getChangeIcon(guild.change)}
                      {guild.change !== "0" && guild.change}
                      {guild.change === "0" && "-"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 날짜별 길드 랭킹 차트 */}
          <div className="xl:col-span-1">
            <div
              className={cn(
                "bg-gradient-to-br from-slate-500/10",
                "to-gray-500/10 backdrop-blur-sm",
                "rounded-lg md:rounded-xl p-4 md:p-5",
                "border border-slate-500/20 h-full",
              )}
            >
              <h3
                className={cn(
                  "text-lg md:text-xl font-semibold",
                  "text-white mb-4 flex items-center gap-2",
                )}
              >
                <TrendingUp className="w-5 h-5 text-slate-400" />
                날짜별 길드 점수 변화
              </h3>

              {/* 그래프 영역 */}
              <div className="relative h-48 md:h-56 mb-4 overflow-hidden">
                <div className="absolute inset-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500/30">
                  <div className="flex items-end justify-start gap-2 px-2 h-full min-w-max relative">
                    {/* 이브 길드 선 그래프를 위한 SVG */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-10"
                      style={{
                        minWidth: `${dailyGuildRankings.length * 32}px`,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={lineGradientId}
                          x1="0%"
                          x2="100%"
                          y1="0%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10b981"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="#34d399"
                            stopOpacity="1"
                          />
                        </linearGradient>
                        <filter id={glowEffectId}>
                          <feGaussianBlur
                            result="coloredBlur"
                            stdDeviation="2"
                          />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <polyline
                        className="animate-fade-in"
                        fill="none"
                        filter={`url(#${glowEffectId})`}
                        points={(() => {
                          const allScores = dailyGuildRankings.flatMap((day) =>
                            day.rankings.map((guild) => guild.score),
                          );
                          const maxScore = Math.max(...allScores);
                          const minScore = Math.min(...allScores);

                          return dailyGuildRankings
                            .map((dayData, index) => {
                              const eveGuild = dayData.rankings.find(
                                (g) => g.name === "이브",
                              );
                              if (!eveGuild) return "";

                              const height =
                                ((eveGuild.score - minScore) /
                                  (maxScore - minScore)) *
                                100;
                              const x = index * 32 + 16; // 바 차트 중앙에 맞춤
                              const y =
                                ((100 - Math.max(height, 3)) / 100) *
                                (192 - 32); // 그래프 높이에 맞춤

                              return `${x},${y}`;
                            })
                            .join(" ");
                        })()}
                        stroke={`url(#${lineGradientId})`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        style={{ animationDelay: "800ms" }}
                      />

                      {/* 이브 길드 점들 */}
                      {dailyGuildRankings.map((dayData, index) => {
                        const eveGuild = dayData.rankings.find(
                          (g) => g.name === "이브",
                        );
                        if (!eveGuild) return null;

                        const allScores = dailyGuildRankings.flatMap((day) =>
                          day.rankings.map((guild) => guild.score),
                        );
                        const maxScore = Math.max(...allScores);
                        const minScore = Math.min(...allScores);
                        const height =
                          ((eveGuild.score - minScore) /
                            (maxScore - minScore)) *
                          100;
                        const x = index * 32 + 16;
                        const y =
                          ((100 - Math.max(height, 3)) / 100) * (192 - 32);

                        return (
                          <circle
                            className="animate-fade-in hover:r-6 transition-all duration-300 cursor-pointer"
                            cx={x}
                            cy={y}
                            fill="#10b981"
                            key={`eve-point-${dayData.date}`}
                            r="4"
                            stroke="#ffffff"
                            strokeWidth="2"
                            style={{ animationDelay: `${800 + index * 50}ms` }}
                          >
                            <title>{`이브: ${eveGuild.score.toLocaleString()}점 (${dayData.date})`}</title>
                          </circle>
                        );
                      })}
                    </svg>

                    {/* 기존 바 차트 */}
                    {dailyGuildRankings.map((dayData, dayIndex) => {
                      // 전체 데이터에서 최고/최저 점수 계산
                      const allScores = dailyGuildRankings.flatMap((day) =>
                        day.rankings.map((guild) => guild.score),
                      );
                      const maxScore = Math.max(...allScores);
                      const minScore = Math.min(...allScores);

                      return (
                        <div
                          className="flex flex-col items-center gap-2 flex-shrink-0"
                          key={dayData.date}
                        >
                          {/* 날짜별 길드 점수 바들 */}
                          <div className="flex items-end gap-0.5 h-40 md:h-48">
                            {dayData.rankings.map((guild, guildIndex) => {
                              const height =
                                ((guild.score - minScore) /
                                  (maxScore - minScore)) *
                                100;
                              const colors = guildColors[guild.name];

                              return (
                                <div
                                  className={cn(
                                    "bg-gradient-to-t rounded-t-[1px] w-2 transition-all duration-1000",
                                    "hover:shadow-sm relative group cursor-pointer animate-fade-in",
                                    guild.name === "이브"
                                      ? "opacity-60" // 이브 길드 바는 조금 투명하게
                                      : "opacity-90",
                                    colors?.primary ||
                                      "from-gray-500 to-gray-300",
                                  )}
                                  key={`${dayData.date}-${guild.name}`}
                                  style={{
                                    animationDelay: `${dayIndex * 100 + guildIndex * 20}ms`,
                                    height: `${Math.max(height, 3)}%`,
                                  }}
                                >
                                  {/* 툴팁 */}
                                  <div
                                    className={cn(
                                      "absolute -top-16 left-1/2 transform -translate-x-1/2",
                                      "bg-black/90 text-white text-xs px-2 py-1 rounded",
                                      "opacity-0 group-hover:opacity-100 transition-opacity",
                                      "whitespace-nowrap z-20 border border-slate-500/30",
                                    )}
                                  >
                                    <div className="font-medium text-center">
                                      {guild.name}
                                      {guild.name === "이브" && (
                                        <span className="text-green-300 ml-1">
                                          👑
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-center">
                                      {guild.score.toLocaleString()}점
                                    </div>
                                    <div className="text-slate-300 text-[10px] text-center">
                                      {guild.rank}위 • {dayData.date}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                            {dayData.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 스크롤 힌트 */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-50">
                  →
                </div>

                {/* 이브 길드 선 그래프 범례 */}
                <div className="absolute top-2 left-2 bg-black/60 rounded px-2 py-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded"></div>
                    <span className="text-green-300 font-medium">
                      이브 길드 추이
                    </span>
                  </div>
                </div>
              </div>

              {/* 길드 범례 */}
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(guildColors)
                  .slice(0, 6)
                  .map(([guildName, colors]) => (
                    <div className="flex items-center gap-1" key={guildName}>
                      <div
                        className={cn(
                          "w-2 h-2 rounded-sm bg-gradient-to-r",
                          colors.primary,
                        )}
                      />
                      <span className={cn("text-xs", colors.text)}>
                        {guildName}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                {Object.entries(guildColors)
                  .slice(6, 10)
                  .map(([guildName, colors]) => (
                    <div className="flex items-center gap-1" key={guildName}>
                      <div
                        className={cn(
                          "w-2 h-2 rounded-sm bg-gradient-to-r",
                          colors.primary,
                        )}
                      />
                      <span className={cn("text-xs", colors.text)}>
                        {guildName}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
