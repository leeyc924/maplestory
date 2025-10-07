import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createMember, deleteMember, updateMember } from "@/db/member";
import { QUERY_KEY, QUERY_KEY_FACTORY } from "@/lib/react-query";
import { getGuildMembers } from "./fetch";

export function useGuildMembersSuspense() {
  return useSuspenseQuery({
    queryFn: () => getGuildMembers(),
    queryKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export function useCreateGuildMember() {
  return useMutation({
    mutationFn: createMember,
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export function useUpdateGuildMember() {
  return useMutation({
    mutationFn: updateMember,
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export function useDeleteGuildMember() {
  return useMutation({
    mutationFn: deleteMember,
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}
