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

export type Member = {
  id: string;
  ocid: string;
  character_name: string;
  character_class: string;
  character_level: number;
  character_image: string | null;
  world_name: string;
  guild_name: string;
  joined_at: string;
  previous_guild: string | null;
  position: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateMemberInput = {
  character_name: string;
  joined_at: string;
  previous_guild?: string;
  position?: string;
  note?: string;
};

export type UpdateMemberInput = {
  joined_at?: string;
  previous_guild?: string;
  position?: string;
  note?: string;
};
