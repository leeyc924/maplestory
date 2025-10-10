import type { GuildMember } from "@/domians/members/types/member";
import { supabase } from "@/services/supabase/client";
import dayjs from "@/shared/lib/dayjs";
import { transformKeysToCamelCase } from "@/shared/lib/utils";

/**
 * 모든 길드 멤버 조회
 */
export async function getAllMembers(): Promise<GuildMember[]> {
  const { data, error } = await supabase.from("guild_members").select("*");

  if (error) {
    throw new Error(`길드 멤버 조회 실패: ${error.message}`);
  }
  const members: GuildMember[] = transformKeysToCamelCase(data || []);

  const permissionOrder = {
    길드원: 3,
    마스터: 1,
    부마스터: 2,
  };

  // 정렬 로직: 권한 우선순위 -> 가입일 순
  return members.sort((a, b) => {
    const aOrder =
      permissionOrder[a.permission as keyof typeof permissionOrder] || 999;
    const bOrder =
      permissionOrder[b.permission as keyof typeof permissionOrder] || 999;

    // 권한이 다르면 권한 순으로 정렬
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return dayjs(a.joinedAt).valueOf() - dayjs(b.joinedAt).valueOf();
  });
}

/**
 * 길드 멤버 삭제
 */
export async function deleteMember(id: string): Promise<void> {
  const { error } = await supabase.from("guild_members").delete().eq("id", id);

  if (error) {
    throw new Error(`길드 멤버 삭제 실패: ${error.message}`);
  }
}
