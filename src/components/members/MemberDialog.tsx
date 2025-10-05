"use client";

import dayjs from "dayjs";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  CreateMemberInput,
  Member,
  UpdateMemberInput,
} from "@/types/member";

type Props = {
  isOpen: boolean;
  close: () => void;
  onSubmit: (data: CreateMemberInput | UpdateMemberInput) => Promise<void>;
  member?: Member;
  mode: "create" | "edit";
};

export default function MemberDialog({
  isOpen,
  close,
  onSubmit,
  member,
  mode,
}: Props) {
  const [characterName, setCharacterName] = useState(
    member?.character_name || "",
  );
  const [joinedAt, setJoinedAt] = useState(
    member?.joined_at
      ? dayjs(member.joined_at).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
  );
  const [previousGuild, setPreviousGuild] = useState(
    member?.previous_guild || "",
  );
  const [position, setPosition] = useState(member?.position || "길드원");
  const [note, setNote] = useState(member?.note || "");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === "create") {
        const data: CreateMemberInput = {
          character_name: characterName,
          joined_at: joinedAt,
        };

        if (previousGuild.trim()) {
          data.previous_guild = previousGuild;
        }

        if (position && position !== "길드원") {
          data.position = position;
        }

        if (note.trim()) {
          data.note = note;
        }

        await onSubmit(data);
      } else {
        const data: UpdateMemberInput = {
          joined_at: joinedAt,
        };

        if (previousGuild.trim()) {
          data.previous_guild = previousGuild;
        }

        if (position) {
          data.position = position;
        }

        if (note.trim()) {
          data.note = note;
        }

        await onSubmit(data);
      }

      close();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className={cn(
          "relative w-full max-w-md",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "rounded-2xl p-6 shadow-2xl border border-white/10",
        )}
      >
        <button
          onClick={close}
          className={cn(
            "absolute top-4 right-4 text-white/60",
            "hover:text-white transition-colors",
          )}
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {mode === "create" ? "길드원 추가" : "길드원 수정"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "create" && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                캐릭터명 *
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-white/10 border border-white/20",
                  "text-white placeholder-white/40",
                  "focus:outline-none focus:ring-2",
                  "focus:ring-blue-500",
                )}
                placeholder="캐릭터명 입력"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              가입일자 *
            </label>
            <input
              type="date"
              value={joinedAt}
              onChange={(e) => setJoinedAt(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-white/10 border border-white/20",
                "text-white",
                "focus:outline-none focus:ring-2",
                "focus:ring-blue-500",
              )}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              이전 길드
            </label>
            <input
              type="text"
              value={previousGuild}
              onChange={(e) => setPreviousGuild(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-white/10 border border-white/20",
                "text-white placeholder-white/40",
                "focus:outline-none focus:ring-2",
                "focus:ring-blue-500",
              )}
              placeholder="이전 길드명"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              직위 *
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-white/10 border border-white/20",
                "text-white",
                "focus:outline-none focus:ring-2",
                "focus:ring-blue-500",
              )}
              required
            >
              <option value="길드원">길드원</option>
              <option value="부길드마스터">부길드마스터</option>
              <option value="길드마스터">길드마스터</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              비고
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-white/10 border border-white/20",
                "text-white placeholder-white/40",
                "focus:outline-none focus:ring-2",
                "focus:ring-blue-500",
                "resize-none",
              )}
              placeholder="메모 입력"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg",
                "bg-white/10 hover:bg-white/20",
                "text-white font-medium transition-colors",
              )}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg",
                "bg-gradient-to-r from-blue-500 to-purple-500",
                "hover:from-blue-600 hover:to-purple-600",
                "text-white font-medium transition-all",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {submitting ? "처리중..." : mode === "create" ? "추가" : "수정"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
