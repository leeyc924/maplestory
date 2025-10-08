import type { GuildMember } from "../types/member";
import { internalApiClient } from "@/services/internal/client";
import { getGuildBasic, getGuildId } from "@/services/maple/api/api";
import { getCharacterBasic, getId } from "@/services/maple/charactor/api";

export const getGuildMembers = async (headers?: () => Headers) => {
  const response = await internalApiClient().get<GuildMember[]>(
    "/members",
    {},
    headers,
  );
  return response.data;
};

/**
 * 길드 멤버 변경사항 조회 - 기존 멤버와 새로 추가된 멤버를 구분
 */
export const getGuildMemberChanges = async ({
  guildName = "이브",
  worldName = "루나",
}: {
  guildName?: string;
  worldName?: string;
} = {}) => {
  try {
    // 1. 길드 ID 조회
    const guildIdData = await getGuildId({
      params: { guild_name: guildName, world_name: worldName },
    });

    // 2. 메이플 API에서 현재 길드 멤버 목록 조회
    const currentGuildData = await getGuildBasic({
      params: { oguild_id: guildIdData.oguild_id },
    });

    // 3. 데이터베이스에서 기존 멤버 목록 조회
    const existingMembers = await getGuildMembers();
    const existingMemberNames = new Set(
      existingMembers.map((member) => member.characterName),
    );

    // 4. 현재 길드 멤버와 기존 멤버 비교
    const currentMemberNames = new Set(currentGuildData.guild_member);

    // 새로 추가된 멤버 (API에는 있지만 DB에는 없는 멤버)
    const newMembers = currentGuildData.guild_member.filter(
      (memberName) => !existingMemberNames.has(memberName),
    );

    // 탈퇴한 멤버 (DB에는 있지만 API에는 없는 멤버)
    const leftMembers = existingMembers.filter(
      (member) => !currentMemberNames.has(member.characterName),
    );

    // 기존 멤버 (둘 다에 있는 멤버)
    const remainingMembers = existingMembers.filter((member) =>
      currentMemberNames.has(member.characterName),
    );

    return {
      /** 현재 길드 정보 */
      guildInfo: {
        level: currentGuildData.guild_level,
        masterName: currentGuildData.guild_master_name,
        memberCount: currentGuildData.guild_member_count,
        name: currentGuildData.guild_name,
      },
      /** 탈퇴한 멤버 목록 (전체 정보) */
      leftMembers,
      /** 새로 추가된 멤버 목록 (캐릭터명만) */
      newMembers,
      /** 기존 멤버 목록 (전체 정보) */
      remainingMembers,
      /** 변경사항 요약 */
      summary: {
        leftMemberCount: leftMembers.length,
        newMemberCount: newMembers.length,
        remainingMemberCount: remainingMembers.length,
        totalMembers: currentGuildData.guild_member_count,
      },
    };
  } catch (error) {
    throw new Error(
      `길드 멤버 변경사항 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
    );
  }
};

/**
 * 새로 추가된 멤버들의 상세 정보 조회
 */
export const getNewMembersDetails = async (newMemberNames: string[]) => {
  const newMembersDetails = [];

  for (const memberName of newMemberNames) {
    try {
      // 캐릭터 OCID 조회
      const idData = await getId({
        params: { character_name: memberName },
      });

      // 캐릭터 기본 정보 조회
      const characterData = await getCharacterBasic({
        params: { ocid: idData.ocid },
      });

      newMembersDetails.push({
        accessFlag: characterData.access_flag,
        characterClass: characterData.character_class,
        characterImage: characterData.character_image,
        characterLevel: characterData.character_level,
        characterName: characterData.character_name,
        guildName: characterData.character_guild_name,
        // 새 멤버이므로 가입일을 오늘로 설정
        joinedAt: new Date().toISOString().split("T")[0],
        note: "",
        ocid: idData.ocid,
        position: "길드원", // 기본값
      });
    } catch (error) {
      console.error(`${memberName} 정보 조회 실패:`, error);
      // 실패한 멤버는 기본 정보만 포함
      newMembersDetails.push({
        accessFlag: "true",
        characterClass: "알 수 없음",
        characterImage: "",
        characterLevel: 0,
        characterName: memberName,
        guildName: "",
        joinedAt: new Date().toISOString().split("T")[0],
        note: "정보 조회 실패",
        ocid: "",
        position: "길드원",
      });
    }
  }

  return newMembersDetails;
};
