"use client";

import { Plus, Users } from "lucide-react";
import { overlay } from "overlay-kit";
import MemberCard from "@/components/members/MemberCard";
import MemberDialog from "@/components/members/MemberDialog";
import {
  useAddMember,
  useDeleteMember,
  useMembersSuspense,
  useUpdateMember,
} from "@/hooks/useMembers";
import { cn } from "@/lib/utils";
import type {
  CreateMemberInput,
  Member,
  UpdateMemberInput,
} from "@/types/member";

export default function MemberList() {
  const { data: members } = useMembersSuspense();
  const addMutation = useAddMember();
  const updateMutation = useUpdateMember();
  const deleteMutation = useDeleteMember();

  function openAddDialog() {
    overlay.open(({ isOpen, close }) => (
      <MemberDialog
        isOpen={isOpen}
        close={close}
        onSubmit={async (data) => {
          await addMutation.mutateAsync(data as CreateMemberInput);
        }}
        mode="create"
      />
    ));
  }

  function openEditDialog(member: Member) {
    overlay.open(({ isOpen, close }) => (
      <MemberDialog
        isOpen={isOpen}
        close={close}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync({
            id: member.id,
            data: data as UpdateMemberInput,
          });
        }}
        member={member}
        mode="edit"
      />
    ));
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteMutation.mutateAsync(id);
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div
        className={cn(
          "glass-effect rounded-xl md:rounded-2xl",
          "p-4 md:p-6 shadow-2xl",
        )}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2
            className={cn(
              "text-xl md:text-2xl font-bold text-white",
              "flex items-center gap-2 md:gap-3",
            )}
          >
            <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-300" />
            길드원 현황 ({members.length}명)
          </h2>

          <button
            onClick={openAddDialog}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-gradient-to-r from-blue-500 to-purple-500",
              "hover:from-blue-600 hover:to-purple-600",
              "text-white font-medium transition-all",
              "text-sm md:text-base",
            )}
            type="button"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">길드원 추가</span>
          </button>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "gap-3 md:gap-4",
          )}
        >
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12 text-white/60">
            길드원이 없습니다. 추가 버튼을 눌러 등록하세요.
          </div>
        )}
      </div>
    </div>
  );
}
