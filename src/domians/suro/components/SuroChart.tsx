"use client";
import type { ChartData } from "../types/suro";
import dayjs from "dayjs";
import { TrendingUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSuroRanginkSuspense } from "../api/queries";
import { CHART_COLORS } from "../lib/consts";
import {
  formatKoreanNumber,
  getQuarter,
  getYear,
  isEveGuild,
} from "../lib/utils";

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
  payload: Record<string, unknown>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  // 순위별로 정렬
  const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg shadow-xl p-4">
      <p className="font-bold text-slate-800 mb-3 text-center border-b pb-2">
        {label}
      </p>
      <div className="space-y-1.5 overflow-y-auto">
        {sortedPayload.map((entry) => (
          <div
            className={`flex items-center justify-between gap-4 px-2 py-1 rounded ${
              isEveGuild(entry.dataKey)
                ? "bg-blue-50 border border-blue-200"
                : ""
            }`}
            key={entry.dataKey}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span
                className={`font-medium ${
                  isEveGuild(entry.dataKey) ? "text-blue-700" : "text-slate-700"
                }`}
              >
                {entry.payload[`${entry.dataKey}_ranking`] as number}.{" "}
                {entry.dataKey}
              </span>
            </div>
            <span
              className={`font-bold ${
                isEveGuild(entry.dataKey) ? "text-blue-600" : "text-slate-600"
              }`}
            >
              {formatKoreanNumber(entry.payload[entry.dataKey] as number)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function SuroChart() {
  const searchParams = useSearchParams();
  const quarter = getQuarter(searchParams.get("quarter"));
  const year = getYear(searchParams.get("year"));
  const { data: suroRankings } = useSuroRanginkSuspense({
    params: { quarter, year },
  });
  const [selectedGulidName, setSelectedGulidName] = useState<string | null>(
    null,
  );

  const { chartData, lineData } = useMemo(() => {
    const dataPointMap = suroRankings.reduce(
      (acc, ranking) => {
        const formattedDate = dayjs(ranking.date).format("MM/DD");

        if (!acc[formattedDate]) {
          acc[formattedDate] = {
            date: formattedDate,
          };
        }

        acc[formattedDate][ranking.guildName] = ranking.guildPoint;
        acc[formattedDate][`${ranking.guildName}_ranking`] = ranking.ranking;
        acc[formattedDate][`${ranking.guildName}_date`] = ranking.date;
        return acc;
      },
      {} as Record<string, ChartData>,
    );
    const chartData = Object.values(dataPointMap).sort(
      (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf(),
    );

    const lineData = Array.from(
      new Set(suroRankings.map((guild) => guild.guildName)),
    ).map((guildName, index) => ({
      color: CHART_COLORS[index],
      guildName,
    }));

    return { chartData, lineData };
  }, [suroRankings]);

  // Y축 범위 계산
  const scoreRange = useMemo(() => {
    const guildPoints = suroRankings.map((guild) => guild.guildPoint);

    return {
      max: Math.max(...guildPoints) + 1000_000,
      min: Math.min(...guildPoints) - 1000_000,
    };
  }, [suroRankings]);

  return (
    <div className="glass-effect rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-green-400" />
        날짜별 수로 점수 추이 (전체 기간)
      </h3>
      <div className="h-[500px] overflow-x-auto">
        <div
          style={{
            height: "100%",
            minWidth: `${chartData.length * 100}px`,
          }}
        >
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} stroke="#9ca3af" />
              <YAxis
                domain={[scoreRange.min, scoreRange.max]}
                fontSize={12}
                stroke="#9ca3af"
                tickFormatter={formatKoreanNumber}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} />} />
              <Legend
                iconType="line"
                onClick={(e) =>
                  setSelectedGulidName((prev) =>
                    prev ? null : (e.dataKey as string),
                  )
                }
              />
              {lineData.map(({ guildName, color }) => {
                return (
                  <Line
                    activeDot={{ r: 10 }}
                    dataKey={guildName}
                    dot={{
                      fill: color,
                      r: isEveGuild(guildName)
                        ? 7
                        : selectedGulidName === guildName
                          ? 6
                          : 4,
                      stroke: isEveGuild(guildName) ? "#1e40af" : color,
                      strokeWidth: isEveGuild(guildName) ? 2 : 0,
                    }}
                    key={guildName}
                    stroke={color}
                    strokeOpacity={
                      isEveGuild(guildName)
                        ? 1
                        : selectedGulidName === guildName
                          ? 1
                          : selectedGulidName === null
                            ? 0.8
                            : 0.2
                    }
                    strokeWidth={
                      isEveGuild(guildName)
                        ? 5
                        : selectedGulidName === guildName
                          ? 4
                          : selectedGulidName === null
                            ? 2.5
                            : 1
                    }
                    type="monotone"
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
