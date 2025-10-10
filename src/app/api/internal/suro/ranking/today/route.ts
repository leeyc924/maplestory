import type { SuroRanking } from "@/domians/suro/types/suro";
import { type NextRequest, NextResponse } from "next/server";
import { getRankingGuild } from "@/services/maple/guild/api";
import { EVE_WORLD_NAME } from "@/shared/lib/consts";
import dayjs from "@/shared/lib/dayjs";

export async function GET(request: NextRequest) {
  const today = dayjs();
  const isFriday = today.day() === 5;
  const yesterday = today.subtract(1, "day").format("YYYY-MM-DD");
  const todayRanking = await getRankingGuild({
    headers: () => new Headers(request.headers),
    params: {
      date: today.format("YYYY-MM-DD"),
      page: 1,
      ranking_type: 2,
      world_name: EVE_WORLD_NAME,
    },
  });
  if (!todayRanking.ranking) {
    return NextResponse.json({
      today: [],
      yesterday: [],
    });
  }

  const yesterdayRanking = isFriday
    ? null
    : await getRankingGuild({
        headers: () => new Headers(request.headers),
        params: {
          date: yesterday,
          page: 1,
          ranking_type: 2,
          world_name: EVE_WORLD_NAME,
        },
      });

  const todayData: SuroRanking[] = todayRanking.ranking
    .slice(0, 10)
    .map((item) => ({
      date: item.date,
      guildName: item.guild_name,
      guildPoint: item.guild_point,
      id: item.ranking,
      ranking: item.ranking,
    }));

  const yesterdayData: SuroRanking[] = yesterdayRanking
    ? yesterdayRanking.ranking.slice(0, 10).map((item) => ({
        date: item.date,
        guildName: item.guild_name,
        guildPoint: item.guild_point,
        id: item.ranking,
        ranking: item.ranking,
      }))
    : [];

  return NextResponse.json({
    today: todayData,
    yesterday: yesterdayData,
  });
}
