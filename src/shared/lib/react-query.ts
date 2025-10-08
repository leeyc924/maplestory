import type { DefaultOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const QUERY_KEY = Object.freeze({
  GUILD_MEMBERS: "GUILD_MEMBERS",
  SURO_RANKING: "SURO_RANKING",
});

export const QUERY_KEY_FACTORY = <T>(
  queryKey: keyof typeof QUERY_KEY,
  param?: T,
) => {
  const base = [QUERY_KEY[queryKey]] as const;

  if (param && Array.isArray(param)) {
    return [...base, ...param] as const;
  }

  if (param && typeof param === "object" && param !== null) {
    return [...base, ...Object.values(param)] as const;
  }

  if (param) {
    return [...base, param] as const;
  }

  return base;
};

const queryConfig = {
  queries: {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 10,
  },
} satisfies DefaultOptions;

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: queryConfig,
    }),
);
