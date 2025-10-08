import type {
  CreateMemberInput,
  GuildMember,
} from "@/domians/members/types/member";
import dayjs from "dayjs";
import { supabase } from "@/services/supabase/client";
import {
  transformKeysToCamelCase,
  transformKeysToSnakeCase,
} from "@/shared/lib/utils";

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
 * 캐릭터명으로 길드 멤버 조회
 */
export async function getMemberByCharacterName(
  characterName: string,
): Promise<GuildMember | null> {
  const { data, error } = await supabase
    .from("guild_members")
    .select("*")
    .eq("character_name", characterName)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 데이터 없음
    }
    throw new Error(`길드 멤버 조회 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data);
}

/**
 * 새 길드 멤버 생성
 */
export async function createMember(
  memberData: CreateMemberInput,
): Promise<GuildMember> {
  const dbData = transformKeysToSnakeCase(memberData);

  const { data, error } = await supabase
    .from("guild_members")
    .insert(dbData)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("이미 존재하는 캐릭터명 또는 OCID입니다.");
    }
    throw new Error(`길드 멤버 생성 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data);
}

/**
 * 길드 멤버 정보 수정
 */
export async function updateMember({
  id,
  memberData,
}: {
  id: string;
  memberData: Partial<CreateMemberInput>;
}): Promise<GuildMember> {
  const dbData = transformKeysToSnakeCase(memberData);

  const { data, error } = await supabase
    .from("guild_members")
    .update(dbData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("이미 존재하는 캐릭터명 또는 OCID입니다.");
    }
    throw new Error(`길드 멤버 수정 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data);
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
