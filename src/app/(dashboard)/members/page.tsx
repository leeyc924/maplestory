"use client";

import { Users } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";
import { cn } from "@/lib/utils";

export default function MembersPage() {
  const { members, loading, error } = useMembers();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-400 text-lg">오류 발생: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div
        className={cn(
          "glass-effect rounded-xl md:rounded-2xl",
          "p-4 md:p-6 shadow-2xl",
        )}
      >
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-white",
            "mb-4 md:mb-6 flex items-center gap-2 md:gap-3",
          )}
        >
          <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-300" />
          길드원 현황 ({members.length}명)
        </h2>

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "gap-3 md:gap-4",
          )}
        >
          {members.map((member) => (
            <div
              key={member.ocid}
              className={cn(
                "bg-gradient-to-br from-blue-500/20",
                "to-purple-500/20 backdrop-blur-sm",
                "rounded-lg md:rounded-xl p-3 md:p-4",
                "border border-white/10 hover:border-white/30",
                "transition-all hover:scale-105 cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2 md:gap-3",
                  "mb-2 md:mb-3",
                )}
              >
                {member.basic?.character_image ? (
                  <img
                    src={member.basic.character_image}
                    alt={member.characterName}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full"
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
                    {member.characterName[0]}
                  </div>
                )}
                <div className="min-w-0">
                  <div
                    className={cn(
                      "text-white font-semibold",
                      "text-sm md:text-base truncate",
                    )}
                  >
                    {member.characterName}
                  </div>
                  <div className="text-blue-200 text-xs md:text-sm">
                    Lv. {member.characterLevel}
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
                  <span>주간 기여도</span>
                  <span className="text-green-300">
                    {member.contribution?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
