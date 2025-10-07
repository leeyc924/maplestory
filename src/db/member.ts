import type { CreateMemberInput, GuildMember } from "@/types/member";
import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import {
  transformKeysToCamelCase,
  transformKeysToSnakeCase,
} from "@/lib/utils";

const TABLE_NAME = "guild_members";

/**
 * 모든 길드 멤버 조회
 */
export async function getAllMembers(): Promise<GuildMember[]> {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");

  if (error) {
    throw new Error(`길드 멤버 조회 실패: ${error.message}`);
  }

  const members: GuildMember[] = transformKeysToCamelCase(data || []);

  // 권한별 우선순위 정의
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
 * 특정 길드 멤버 조회 (ID로)
 */
export async function getMemberById(id: string): Promise<GuildMember | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
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
 * 캐릭터명으로 길드 멤버 조회
 */
export async function getMemberByCharacterName(
  characterName: string,
): Promise<GuildMember | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
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
 * OCID로 길드 멤버 조회
 */
export async function getMemberByOcid(
  ocid: string,
): Promise<GuildMember | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("ocid", ocid)
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
    .from(TABLE_NAME)
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
    .from(TABLE_NAME)
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
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    throw new Error(`길드 멤버 삭제 실패: ${error.message}`);
  }
}

/**
 * OCID로 길드 멤버 삭제
 */
export async function deleteMemberByOcid(ocid: string): Promise<void> {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("ocid", ocid);

  if (error) {
    throw new Error(`길드 멤버 삭제 실패: ${error.message}`);
  }
}

/**
 * 레벨별 멤버 조회
 */
export async function getMembersByLevelRange(
  minLevel: number,
  maxLevel: number,
): Promise<GuildMember[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .gte("character_level", minLevel)
    .lte("character_level", maxLevel)
    .order("character_level", { ascending: false });

  if (error) {
    throw new Error(`길드 멤버 조회 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data || []);
}

/**
 * 직업별 멤버 조회
 */
export async function getMembersByClass(
  characterClass: string,
): Promise<GuildMember[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("character_class", characterClass)
    .order("character_level", { ascending: false });

  if (error) {
    throw new Error(`길드 멤버 조회 실패: ${error.message}`);
  }

  return transformKeysToCamelCase(data || []);
}
