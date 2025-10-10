import type { QUARTERS } from "../lib/consts";
import type { SuroRanking } from "../types/suro";
import { supabase } from "@/services/supabase/client";
import { transformKeysToCamelCase } from "@/shared/lib/utils";

export async function getSuroRanking(
  year: number,
  quarter: (typeof QUARTERS)[number],
): Promise<SuroRanking[]> {
  // 분기별 시작/종료 날짜 계산
  const quarterDates = {
    1: { end: `${year}-03-31`, start: `${year}-01-01` },
    2: { end: `${year}-06-30`, start: `${year}-04-01` },
    3: { end: `${year}-09-30`, start: `${year}-07-01` },
    4: { end: `${year}-12-31`, start: `${year}-10-01` },
  };
  if (!quarterDates[quarter]) {
    throw new Error(`분기별 랭킹 조회 실패: 분기가 올바르지 않습니다.`);
  }

  const { start: startDate, end: endDate } = quarterDates[quarter];

  const { data, error } = await supabase
    .from("suro_ranking")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true })
    .order("ranking", { ascending: true });

  if (error) {
    throw new Error(`분기별 랭킹 조회 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data || []);
}
