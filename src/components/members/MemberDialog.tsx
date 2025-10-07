"use client";

import type { CreateMemberInput, GuildMember } from "@/types/member";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCreateGuildMember,
  useUpdateGuildMember,
} from "@/api/members/fetch-client";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  member?: GuildMember; // 수정 모드일 때 전달
  onSuccess?: () => void;
};

const PERMISSIONS = ["길드마스터", "부길드마스터", "길드원", "신입"] as const;

export default function MemberDialog({
  isOpen,
  onClose,
  member,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<CreateMemberInput>({
    accessFlag: "true",
    characterClass: "",
    characterImage: "",
    characterLevel: 1,
    characterName: "",
    joinedAt: new Date().toISOString(),
    note: "",
    ocid: "",
    permission: "길드원",
    previousGuild: "",
  });

  const createMutation = useCreateGuildMember();
  const updateMutation = useUpdateGuildMember();

  const isEditing = !!member;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // 멤버 데이터로 폼 초기화
  useEffect(() => {
    if (member) {
      setFormData({
        accessFlag: member.accessFlag,
        characterClass: member.characterClass,
        characterImage: member.characterImage,
        characterLevel: member.characterLevel,
        characterName: member.characterName,
        joinedAt: member.joinedAt,
        note: member.note,
        ocid: member.ocid,
        permission: member.permission || "길드원",
        previousGuild: member.previousGuild || "",
      });
    } else {
      // 새 멤버 생성 시 초기화
      setFormData({
        accessFlag: "true",
        characterClass: "",
        characterImage: "",
        characterLevel: 1,
        characterName: "",
        joinedAt: new Date().toISOString(),
        note: "",
        ocid: "",
        permission: "길드원",
        previousGuild: "",
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && member?.id) {
        await updateMutation.mutateAsync({
          id: member.id,
          memberData: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("멤버 저장 실패:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "characterLevel" ? Number(value) : value,
    }));
  };

  if (!isOpen) return null;

  const error = createMutation.error || updateMutation.error;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={cn(
          "bg-gradient-to-br from-blue-900/90 to-purple-900/90",
          "backdrop-blur-sm rounded-xl border border-white/10",
          "w-full max-w-md max-h-[90vh] overflow-y-auto",
        )}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "멤버 정보 수정" : "새 멤버 추가"}
          </h2>
          <button
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 폼 */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {/* 캐릭터명 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              캐릭터명 *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="characterName"
              onChange={handleInputChange}
              placeholder="캐릭터명을 입력하세요"
              required
              type="text"
              value={formData.characterName}
            />
          </div>

          {/* OCID */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              OCID *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="ocid"
              onChange={handleInputChange}
              placeholder="OCID를 입력하세요"
              required
              type="text"
              value={formData.ocid}
            />
          </div>

          {/* 직업 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              직업 *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="characterClass"
              onChange={handleInputChange}
              placeholder="예: 아크메이지(불,독)"
              required
              type="text"
              value={formData.characterClass}
            />
          </div>

          {/* 레벨 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              레벨 *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              max="300"
              min="1"
              name="characterLevel"
              onChange={handleInputChange}
              required
              type="number"
              value={formData.characterLevel}
            />
          </div>

          {/* 권한 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              권한
            </label>
            <select
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="permission"
              onChange={handleInputChange}
              value={formData.permission}
            >
              {PERMISSIONS.map((permission) => (
                <option
                  className="bg-gray-800"
                  key={permission}
                  value={permission}
                >
                  {permission}
                </option>
              ))}
            </select>
          </div>

          {/* 캐릭터 이미지 URL */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              캐릭터 이미지 URL *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="characterImage"
              onChange={handleInputChange}
              placeholder="https://..."
              required
              type="url"
              value={formData.characterImage}
            />
          </div>

          {/* 가입일 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              가입일 *
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="joinedAt"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  joinedAt: new Date(e.target.value).toISOString(),
                }));
              }} // ISO string을 datetime-local 형식으로
              required
              type="datetime-local"
              value={formData.joinedAt.slice(0, 16)}
            />
          </div>

          {/* 이전 길드 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              이전 길드
            </label>
            <input
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="previousGuild"
              onChange={handleInputChange}
              placeholder="이전 길드명 (선택사항)"
              type="text"
              value={formData.previousGuild}
            />
          </div>

          {/* 비고 */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              비고
            </label>
            <textarea
              className={cn(
                "w-full px-3 py-2 bg-white/10 border border-white/20",
                "rounded-lg text-white placeholder-gray-400 resize-none",
                "focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400",
              )}
              name="note"
              onChange={handleInputChange}
              placeholder="추가 정보나 메모 (선택사항)"
              rows={3}
              value={formData.note}
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">
                {error instanceof Error
                  ? error.message
                  : "오류가 발생했습니다."}
              </p>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              className={cn(
                "flex-1 px-4 py-2 bg-gray-600/50 hover:bg-gray-600/70",
                "text-white rounded-lg transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-gray-500",
              )}
              onClick={onClose}
              type="button"
            >
              취소
            </button>
            <button
              className={cn(
                "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700",
                "text-white rounded-lg transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "저장 중..." : isEditing ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
