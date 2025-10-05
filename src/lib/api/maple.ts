import { mapleClient } from "@/lib/http-client";
import type {
  CharacterBasicResponse,
  CharacterOcidResponse,
  GuildBasicResponse,
  GuildIdResponse,
} from "@/types/member";

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0] || "";
}

export async function getGuildId(
  guildName: string,
  worldName: string,
): Promise<string | null> {
  try {
    const data = await mapleClient.get<GuildIdResponse>(
      `/v1/guild/id?guild_name=${encodeURIComponent(guildName)}&world_name=${encodeURIComponent(worldName)}`,
      { next: { revalidate: 3600 } },
    );
    return data.oguild_id;
  } catch (error) {
    console.error("Failed to get guild ID:", error);
    return null;
  }
}

export async function getGuildBasic(
  oguildId: string,
  date?: string,
): Promise<GuildBasicResponse | null> {
  try {
    const queryDate = date || getYesterday();
    const data = await mapleClient.get<GuildBasicResponse>(
      `/v1/guild/basic?oguild_id=${oguildId}&date=${queryDate}`,
      { next: { revalidate: 3600 } },
    );
    return data;
  } catch (error) {
    console.error("Failed to get guild basic:", error);
    return null;
  }
}

export async function getCharacterOcid(
  characterName: string,
): Promise<string | null> {
  try {
    const data = await mapleClient.get<CharacterOcidResponse>(
      `/v1/id?character_name=${encodeURIComponent(characterName)}`,
      { next: { revalidate: 3600 } },
    );
    return data.ocid;
  } catch (error) {
    console.error("Failed to get character OCID:", error);
    return null;
  }
}

export async function getCharacterBasic(
  ocid: string,
): Promise<CharacterBasicResponse | null> {
  try {
    const data = await mapleClient.get<CharacterBasicResponse>(
      `/v1/character/basic?ocid=${ocid}`,
      { next: { revalidate: 3600 } },
    );
    return data;
  } catch (error) {
    console.error("Failed to get character basic:", error);
    return null;
  }
}

export async function getGuildMembers(
  guildName: string = "이브",
  worldName: string = "루나",
) {
  const guildId = await getGuildId(guildName, worldName);
  if (!guildId) {
    console.error("Guild not found");
    return [];
  }

  const guildBasic = await getGuildBasic(guildId);
  if (!guildBasic) {
    console.error("Failed to get guild info");
    return [];
  }

  const memberNames = guildBasic.guild_member;

  const memberData = await Promise.all(
    memberNames.map(async (name) => {
      const ocid = await getCharacterOcid(name);
      if (!ocid) return null;

      const basic = await getCharacterBasic(ocid);
      if (!basic) return null;

      return {
        ocid,
        characterName: name,
        worldName,
        characterLevel: basic.character_level,
        characterClass: basic.character_class,
        characterGuildName: basic.character_guild_name,
        basic,
        contribution: Math.floor(Math.random() * 20000),
      };
    }),
  );

  return memberData.filter(
    (member): member is NonNullable<typeof member> => member !== null,
  );
}
