const BASE_URL = "https://open.api.nexon.com/maplestory/v1";

function getApiKey(): string {
  const key = process.env.MAPLE_API_KEY;
  if (!key) {
    throw new Error("MAPLE_API_KEY is not defined in environment variables");
  }
  return key;
}

const API_KEY = getApiKey();

type MapleApiError = {
  error: {
    name: string;
    message: string;
  };
};

export async function getCharacterOcid(
  characterName: string,
): Promise<string | null> {
  try {
    const url = `${BASE_URL}/id?character_name=${encodeURIComponent(characterName)}`;
    const response = await fetch(url, {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const error: MapleApiError = await response.json();
      console.error("Maple API Error:", error);
      return null;
    }

    const data: { ocid: string } = await response.json();
    return data.ocid;
  } catch (error) {
    console.error("Failed to get character OCID:", error);
    return null;
  }
}

export async function getCharacterBasic(ocid: string) {
  try {
    const response = await fetch(`${BASE_URL}/character/basic?ocid=${ocid}`, {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get character basic:", error);
    return null;
  }
}

export async function getGuildMembers(
  guildName: string,
  worldName: string = "스카니아",
) {
  const members = ["캐릭터명1", "캐릭터명2", "캐릭터명3"];

  const memberData = await Promise.all(
    members.map(async (name) => {
      const ocid = await getCharacterOcid(name);
      if (!ocid) return null;

      const basic = await getCharacterBasic(ocid);
      if (!basic) return null;

      return {
        ocid,
        characterName: name,
        worldName,
        characterLevel: basic.character_level as number,
        characterClass: basic.character_class as string,
        characterGuildName: basic.character_guild_name as string,
        basic,
        contribution: Math.floor(Math.random() * 20000),
      };
    }),
  );

  return memberData.filter(
    (member): member is NonNullable<typeof member> => member !== null,
  );
}
