import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY, QUERY_KEY_FACTORY } from "@/shared/lib/react-query";

export function useCreateGuildMember() {
  return useMutation({
    mutationFn: () =>
      new Promise((resolve) => resolve(console.log("createMember"))),
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export function useUpdateGuildMember() {
  return useMutation({
    mutationFn: () =>
      new Promise((resolve) => resolve(console.log("updateMember"))),
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}

export function useDeleteGuildMember() {
  return useMutation({
    mutationFn: () =>
      new Promise((resolve) => resolve(console.log("deleteMember"))),
    mutationKey: QUERY_KEY_FACTORY(QUERY_KEY.GUILD_MEMBERS),
  });
}
