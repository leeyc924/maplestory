// 메이플 API 응답 타입 (snake_case)
export type CharacterOcidResponse = {
  ocid: string;
};

export type CharacterBasicResponse = {
  date: string;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
};

export type GuildIdResponse = {
  oguild_id: string;
};

export type GuildBasicResponse = {
  date: string;
  world_name: string;
  guild_name: string;
  guild_level: number;
  guild_fame: number;
  guild_point: number;
  guild_master_name: string;
  guild_member_count: number;
  guild_member: string[];
  guild_skill: Array<{
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string;
    skill_icon: string;
  }>;
  guild_noblesse_skill: Array<{
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string;
    skill_icon: string;
  }>;
  guild_mark: string;
  guild_mark_custom: string;
};

// 내부 사용 타입
export type GuildMember = {
  ocid: string;
  characterName: string;
  worldName: string;
  characterLevel: number;
  characterClass: string;
  characterGuildName: string;
};

export type MemberWithStats = GuildMember & {
  basic?: CharacterBasicResponse;
  contribution?: number;
};
