import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getQueryClient,
  QUERY_KEY,
  QUERY_KEY_FACTORY,
} from "@/shared/lib/react-query";
import { getGuildMembers } from "./member.client";

export function useGuildMembersSuspense() {
  return useSuspenseQuery({
    queryFn: () => getGuildMembers(),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export const prefetchGuildMembersQuery = async (headers?: () => Headers) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getGuildMembers(headers),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
};
