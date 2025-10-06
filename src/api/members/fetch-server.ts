import { headers } from "next/headers";
import {
  getQueryClient,
  QUERY_KEY,
  QUERY_KEY_FACTORY,
} from "@/lib/react-query";
import { getGuildMembers } from "./fetch";

export const prefetchGuildMembersQuery = async ({
  params,
}: {
  params: Parameters<typeof getGuildMembers>[0]["params"];
}) => {
  const queryClient = getQueryClient();
  const headerList = await headers();

  await queryClient.prefetchQuery({
    queryFn: () =>
      getGuildMembers({
        headers: () => headerList,
        params,
      }),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS, params),
  });
};
