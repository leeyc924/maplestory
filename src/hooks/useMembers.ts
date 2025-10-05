import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/http-client";
import type {
  CreateMemberInput,
  Member,
  UpdateMemberInput,
} from "@/types/member";

export async function fetchMembers(): Promise<Member[]> {
  const data = await apiClient.get<{ members: Member[] }>("/api/members");
  return data.members;
}

async function createMember(input: CreateMemberInput): Promise<Member> {
  const data = await apiClient.post<{ member: Member }>("/api/members", input);
  return data.member;
}

async function updateMemberApi(
  id: string,
  input: UpdateMemberInput,
): Promise<Member> {
  const data = await apiClient.put<{ member: Member }>("/api/members", {
    id,
    data: input,
  });
  return data.member;
}

async function deleteMemberApi(id: string): Promise<void> {
  await apiClient.delete(`/api/members?id=${id}`);
}

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
}

export function useMembersSuspense() {
  return useSuspenseQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberInput }) =>
      updateMemberApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemberApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
