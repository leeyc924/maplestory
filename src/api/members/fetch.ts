import type { GuildMember } from "@/types/member";
import type {
  V1CharacterBasicParameters,
  V1CharacterBasicResponse,
  V1GuildBasicParamters,
  V1GuildBasicResponse,
  V1GuildIdParameters,
  V1GuildIdResponse,
  V1IdParameters,
  V1IdResponse,
} from "./schema";
import { mapleApiClient } from "@/lib/http-client";

const getGuildBasic = async ({
  params,
  headers,
}: {
  params: V1GuildBasicParamters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1GuildBasicResponse>(
    "/v1/guild/basic",
    {
      // next: { revalidate: 3600 },
      query: {
        ...params,
      },
    },
    headers,
  );
  return response.data;
};

const getGuildId = async ({
  params,
  headers,
}: {
  params: V1GuildIdParameters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1GuildIdResponse>(
    "/v1/guild/id",
    {
      // next: { revalidate: 3600 },
      query: {
        ...params,
      },
    },
    headers,
  );

  return response.data;
};

const getId = async ({
  params,
  headers,
}: {
  params: V1IdParameters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1IdResponse>(
    "/v1/id",
    {
      // next: { revalidate: 3600 },
      query: {
        ...params,
      },
    },
    headers,
  );

  return response.data;
};

const getCharacterBasic = async ({
  params,
  headers,
}: {
  params: V1CharacterBasicParameters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1CharacterBasicResponse>(
    "/v1/character/basic",
    {
      // next: { revalidate: 3600 },
      query: {
        ...params,
      },
    },
    headers,
  );

  return response.data;
};

export interface GetGuildMembersParams {
  params: V1GuildIdParameters & Pick<V1GuildBasicParamters, "date">;
  headers?: () => Headers;
}

export const getGuildMembers = async ({
  params,
  headers,
}: GetGuildMembersParams) => {
  const { guild_name, world_name, date } = params;
  const { oguild_id } = await getGuildId({
    headers,
    params: { guild_name, world_name },
  });

  const { guild_member } = await getGuildBasic({
    headers,
    params: { oguild_id },
  });

  const memberData: (GuildMember | null)[] = await Promise.all(
    guild_member.map(async (name) => {
      try {
        const ocid = await getId({
          headers,
          params: { character_name: name },
        });
        if (!ocid) return null;
        const basic = await getCharacterBasic({
          headers,
          params: { ocid: ocid.ocid },
        });
        if (!basic) return null;

        return {
          accessFlag: basic.access_flag,
          characterClass: basic.character_class,
          characterImage: basic.character_image,
          characterLevel: basic.character_level,
          characterName: basic.character_name,
          joinedAt: "",
          note: "",
          ocid: ocid.ocid,
          permission: "",
          previousGuild: "",
        };
      } catch {
        return null;
      }
    }),
  );

  return memberData.filter((member) => member !== null);
};
