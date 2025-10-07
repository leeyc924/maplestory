import {
  getQueryClient,
  QUERY_KEY,
  QUERY_KEY_FACTORY,
} from "@/lib/react-query";
import { getGuildMembers } from "./fetch";

export const prefetchGuildMembersQuery = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getGuildMembers(),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
};
