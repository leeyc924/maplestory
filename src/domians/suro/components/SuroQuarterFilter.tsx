"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { QUARTERS } from "../lib/consts";
import { getQuarter, getYear } from "../lib/utils";

interface SuroQuarterFilterProps {
  className?: string;
}

export function SuroQuarterFilter({ className }: SuroQuarterFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuarter = getQuarter(searchParams.get("quarter"));
  const currentYear = getYear(searchParams.get("year"));

  // 연도 옵션 생성 (현재 연도 기준으로 ±2년)
  const yearOptions = useMemo(() => {
    const currentYearValue = new Date().getFullYear();
    const years = [];
    for (let i = currentYearValue - 2; i <= currentYearValue + 2; i++) {
      years.push(i);
    }
    return years;
  }, []);

  const handleQuarterChange = (quarter: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("quarter", quarter.toString());
    router.push(`?${params.toString()}`);
  };

  const handleYearChange = (year: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", year.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("glass-effect rounded-xl p-4 shadow-xl", className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 제목 */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">기간 선택</h4>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* 연도 선택 */}
          <div className="relative">
            <select
              className="appearance-none bg-black/30 text-white border border-white/20 rounded-lg px-4 py-2 pr-8 
                         hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
              onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
              value={currentYear}
            >
              {yearOptions.map((year) => (
                <option className="bg-gray-800" key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
          </div>

          {/* 분기 선택 버튼들 */}
          <div className="flex gap-1 bg-black/20 rounded-lg p-1">
            {QUARTERS.map((quarter) => (
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "hover:bg-white/10",
                  currentQuarter === quarter
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "text-white/80 hover:text-white",
                )}
                key={quarter}
                onClick={() => handleQuarterChange(quarter)}
              >
                {quarter}분기
              </button>
            ))}
          </div>
        </div>

        {/* 현재 선택된 기간 표시 */}
        <div className="text-sm text-white/70 sm:ml-auto">
          선택된 기간:{" "}
          <span className="text-yellow-300 font-medium">
            {currentYear}년 {currentQuarter}분기
          </span>
        </div>
      </div>
    </div>
  );
}
