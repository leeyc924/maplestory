"use client";

import type { GuildMember } from "@/domians/members/types/member";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useDeleteGuildMember } from "../api/mutations";
import { useGuildMembersSuspense } from "../api/queries";
import MemberCard from "./MemberCard";
import MemberDialog from "./MemberDialog";
import TestButton from "./TestButton";

export default function MemberList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<GuildMember | undefined>(
    undefined,
  );

  const { data: members } = useGuildMembersSuspense();
  console.log(`members`, members);
  const deleteMutation = useDeleteGuildMember();

  function openAddDialog() {
    // setEditingMember(undefined);
    // setIsDialogOpen(true);
    alert("준비중..");
  }

  function openEditDialog(member: GuildMember) {
    alert("준비중..");
    // setEditingMember(member);
    // setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingMember(undefined);
  }

  async function handleDelete(ocid: string) {
    alert("준비중..");
    // const member = members.find((m) => m.ocid === ocid);
    // if (!member) return;

    // if (!confirm(`"${member.characterName}" 멤버를 정말 삭제하시겠습니까?`))
    //   return;

    // try {
    //   if (member.id) {
    //     await deleteMutation.mutateAsync(member.id);
    //   }
    // } catch (error) {
    //   console.error("멤버 삭제 실패:", error);
    //   alert("멤버 삭제에 실패했습니다.");
    // }
  }

  function handleDialogSuccess() {
    // refetch(); // 데이터 새로고침
  }

  return (
    <>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <div
          className={cn(
            "glass-effect rounded-xl md:rounded-2xl",
            "p-6 md:p-8 shadow-2xl",
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
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-gradient-to-r from-blue-500 to-purple-500",
                "hover:from-blue-600 hover:to-purple-600",
                "text-white font-medium transition-all",
                "text-sm md:text-base",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
              )}
              onClick={openAddDialog}
              type="button"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">길드원 추가</span>
            </button>
          </div>
          {process.env.NODE_ENV === "development" && <TestButton />}
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              "gap-4 md:gap-6",
            )}
          >
            {members.map((member) => (
              <MemberCard
                key={member.ocid}
                member={member}
                onDelete={handleDelete}
                onEdit={openEditDialog}
              />
            ))}
          </div>

          {members.length === 0 && (
            <div className="text-center py-12 text-white/60">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">길드원이 없습니다</h3>
              <p className="text-sm mb-4">
                추가 버튼을 눌러 첫 번째 길드원을 등록하세요.
              </p>
              <button
                className={cn(
                  "px-6 py-2 bg-blue-600 hover:bg-blue-700",
                  "text-white rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500",
                )}
                onClick={openAddDialog}
              >
                길드원 추가하기
              </button>
            </div>
          )}

          {/* 삭제 로딩 상태 */}
          {/* {deleteMutation.isPending && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span className="text-white">삭제 중...</span>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* 멤버 추가/수정 다이얼로그 */}
      <MemberDialog
        isOpen={isDialogOpen}
        member={editingMember}
        onClose={closeDialog}
        onSuccess={handleDialogSuccess}
      />
    </>
  );
}
