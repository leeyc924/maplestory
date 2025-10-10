import type { QUARTERS } from "../lib/consts";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getQueryClient,
  QUERY_KEY,
  QUERY_KEY_FACTORY,
} from "@/shared/lib/react-query";
import { getSuroRanking, getSuroRankingToday } from "./suro.client";

export function useSuroRanginkSuspense({
  params,
}: {
  params: {
    quarter: (typeof QUARTERS)[number];
    year: number;
  };
}) {
  return useSuspenseQuery({
    queryFn: () => getSuroRanking({ params }),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING, params),
  });
}

export const prefetchSuroRankingQuery = async ({
  headers,
  params,
}: {
  headers?: () => Headers;
  params: {
    quarter: (typeof QUARTERS)[number];
    year: number;
  };
}) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () =>
      getSuroRanking({
        headers,
        params,
      }),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING, params),
  });
};

export function useSuroRanginkTodaySuspense() {
  return useSuspenseQuery({
    queryFn: () => getSuroRankingToday({}),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING_TODAY),
  });
}

export const prefetchSuroRankingTodayQuery = async ({
  headers,
}: {
  headers?: () => Headers;
}) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getSuroRankingToday({ headers }),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING_TODAY),
  });
};
