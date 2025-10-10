import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import {
  prefetchSuroRankingQuery,
  prefetchSuroRankingTodayQuery,
} from "@/domians/suro/api/queries";
import { SuroChart } from "@/domians/suro/components/SuroChart";
import { SuroHeader } from "@/domians/suro/components/SuroHeader";
import { SuroQuarterFilter } from "@/domians/suro/components/SuroQuarterFilter";
import { SuroRankingTable } from "@/domians/suro/components/SuroRankingTable";
import { SuroStatsCards } from "@/domians/suro/components/SuroStatsCards";
import { getQuarter, getYear } from "@/domians/suro/lib/utils";
import dayjs from "@/shared/lib/dayjs";
import { getQueryClient } from "@/shared/lib/react-query";

export default async function SuroPage({
  searchParams,
}: {
  searchParams: Promise<{
    quarter: string;
    year: string;
  }>;
}) {
  const headerList = await headers();
  const queryClient = getQueryClient();
  const quarter = getQuarter((await searchParams).quarter);
  const year = getYear((await searchParams).year);

  await prefetchSuroRankingQuery({
    headers: () => headerList,
    params: { quarter, year },
  });
  await prefetchSuroRankingTodayQuery({ headers: () => headerList });
  const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        {/* 수로 랭킹 헤더 */}
        <SuroHeader time={time} />
        {/* 주요 통계 카드들 */}
        <SuroStatsCards />
        {/* 분기 선택 필터 */}
        <SuroQuarterFilter />
        {/* 날짜별 순위 변화 차트 섹션 */}
        <SuroChart />
        {/* 길드 순위표 섹션 */}
        <SuroRankingTable />
      </div>
    </HydrationBoundary>
  );
}
