import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY, QUERY_KEY_FACTORY } from "@/lib/react-query";
import { getGuildMembers } from "./fetch";

export function useGuildMembersSuspense({
  params,
}: {
  params: Parameters<typeof getGuildMembers>[0]["params"];
}) {
  return useSuspenseQuery({
    queryFn: () => getGuildMembers({ params }),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS, params),
  });
}
