import type { QUARTERS } from "../lib/consts";
import type { SuroRanking, SuroRankingToday } from "../types/suro";
import { internalApiClient } from "@/services/internal/client";

export const getSuroRanking = async ({
  headers,
  params,
}: {
  headers?: () => Headers;
  params: {
    year: number;
    quarter: (typeof QUARTERS)[number];
  };
}) => {
  const response = await internalApiClient().get<SuroRanking[]>(
    "/suro/ranking",
    { query: { ...params } },
    headers,
  );
  return response.data;
};

export const getSuroRankingToday = async ({
  headers,
}: {
  headers?: () => Headers;
}) => {
  const response = await internalApiClient().get<SuroRankingToday>(
    "/suro/ranking/today",
    {},
    headers,
  );
  return response.data;
};
