import { getRankingGuild } from "@/services/maple/guild/api";

export const getSuroRanking = async (headers?: () => Headers) => {
  const response = await getRankingGuild({
    params: {
      date: "2025-10-08",
      guild_name: "이브",
      ranking_type: 2,
      world_name: "루나",
    },
  });
  return response.ranking;
};
