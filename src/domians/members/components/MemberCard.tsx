"use client";

import dayjs from "dayjs";
import { Crown, Edit, Shield, Trash2, User } from "lucide-react";
import "dayjs/locale/ko";

import type { GuildMember } from "@/domians/members/types/member";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

type Props = {
  member: GuildMember;
  onEdit: (member: GuildMember) => void;
  onDelete: (id: string) => void;
};

const getPermissionIcon = (permission?: string) => {
  if (!permission) return null;

  const normalizedPermission = permission.toLowerCase();

  if (normalizedPermission === "마스터") {
    return <Crown className="w-4 h-4 text-yellow-400" />;
  }
  if (normalizedPermission === "부마스터") {
    return <Shield className="w-4 h-4 text-purple-400" />;
  }

  return <User className="w-4 h-4 text-gray-400" />;
};

export default function MemberCard({ member, onEdit, onDelete }: Props) {
  const firstChar = member.characterName.charAt(0) || "?";

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-500/20",
        "to-purple-500/20 backdrop-blur-sm",
        "rounded-lg md:rounded-xl p-3 md:p-4",
        "border border-white/10 hover:border-white/30",
        "transition-all",
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 md:gap-3 flex-1">
          {member.characterImage ? (
            <Image
              alt={member.characterName}
              className={cn("w-[72px] h-[72px]", "flex-shrink-0")}
              height={72}
              src={member.characterImage}
              unoptimized
              width={72}
            />
          ) : (
            <div
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-full",
                "bg-gradient-to-br from-blue-400",
                "to-purple-400 flex items-center",
                "justify-center text-white font-bold",
                "text-base md:text-lg flex-shrink-0",
              )}
            >
              {firstChar}
            </div>
          )}

          <div className="flex flex-1 flex-shrink-0 flex-col">
            <div className="flex gap-1 ml-auto">
              <button
                className={cn(
                  "p-1.5 rounded-lg bg-blue-500/20",
                  "hover:bg-blue-500/30 text-blue-300",
                  "transition-colors",
                )}
                onClick={() => onEdit(member)}
                type="button"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className={cn(
                  "p-1.5 rounded-lg bg-red-500/20",
                  "hover:bg-red-500/30 text-red-300",
                  "transition-colors",
                )}
                onClick={() => onDelete(member.ocid)}
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "text-white font-semibold",
                  "text-sm md:text-base",
                  "flex items-center gap-2",
                )}
              >
                <span className="whitespace-nowrap">
                  {member.characterName}
                </span>
                {getPermissionIcon(member.permission)}
              </div>
              <div className="text-blue-200 text-xs md:text-sm">
                Lv. {member.characterLevel}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 text-xs md:text-sm">
        <div className="flex justify-between text-gray-200">
          <span>직업</span>
          <span className="text-yellow-300 truncate ml-2">
            {member.characterClass}
          </span>
        </div>
        <div className="flex justify-between text-gray-200">
          <span>가입일</span>
          <span className="text-green-300">
            {dayjs(member.joinedAt).format("YYYY.MM.DD")}
          </span>
        </div>
        <div className="flex justify-between text-gray-200">
          <span>이전 길드</span>
          <span className="text-orange-300 truncate ml-2">
            {member.previousGuild || "-"}
          </span>
        </div>
        {member.note && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="text-gray-300 text-xs">* {member.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
