export type GuildMember = {
  ocid: string;
  characterName: string;
  worldName: string;
  characterLevel: number;
  characterClass: string;
  characterGuildName: string;
};

export type CharacterBasic = {
  characterName: string;
  worldName: string;
  characterGender: string;
  characterClass: string;
  characterClassLevel: string;
  characterLevel: number;
  characterExp: number;
  characterExpRate: string;
  characterGuildName: string;
  characterImage: string;
};

export type MemberWithStats = GuildMember & {
  basic?: CharacterBasic;
  contribution?: number;
};
