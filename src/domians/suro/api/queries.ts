import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getQueryClient,
  QUERY_KEY,
  QUERY_KEY_FACTORY,
} from "@/shared/lib/react-query";
import { getSuroRanking } from "./suro.client";

export function useSuroRankingSuspense() {
  return useSuspenseQuery({
    queryFn: () => getSuroRanking(),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING),
  });
}

export const prefetchSuroRankingQuery = async (headers?: () => Headers) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getSuroRanking(headers),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.SURO_RANKING),
  });
};
