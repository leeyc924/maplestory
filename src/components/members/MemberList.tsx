"use client";

import type { GuildMember } from "@/types/member";
import { Plus, Users } from "lucide-react";
import { useGuildMembersSuspense } from "@/api/members/fetch-client";
import MemberCard from "@/components/members/MemberCard";
import { cn } from "@/lib/utils";

export default function MemberList() {
  const { data } = useGuildMembersSuspense({
    params: {
      guild_name: "이브",
      world_name: "루나",
    },
  });

  function openAddDialog() {
    // overlay.open(({ isOpen, close }) => (
    //   <MemberDialog
    //     close={close}
    //     isOpen={isOpen}
    //     mode="create"
    //     onSubmit={async (data) => {
    //       alert("추가");
    //     }}
    //   />
    // ));
  }

  function openEditDialog(member: GuildMember) {
    // overlay.open(({ isOpen, close }) => (
    //   <MemberDialog
    //     close={close}
    //     isOpen={isOpen}
    //     member={member}
    //     mode="edit"
    //     onSubmit={async (data) => {
    //       alert("수정");
    //     }}
    //   />
    // ));
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    alert("삭제");
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
            길드원 현황 ({data.length}명)
          </h2>

          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-gradient-to-r from-blue-500 to-purple-500",
              "hover:from-blue-600 hover:to-purple-600",
              "text-white font-medium transition-all",
              "text-sm md:text-base",
            )}
            onClick={openAddDialog}
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
          {data.map((member) => (
            <MemberCard
              key={member.ocid}
              member={member}
              onDelete={handleDelete}
              onEdit={openEditDialog}
            />
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 text-white/60">
            길드원이 없습니다. 추가 버튼을 눌러 등록하세요.
          </div>
        )}
      </div>
    </div>
  );
}
