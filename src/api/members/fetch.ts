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
import { getAllMembers } from "@/db/member";
import { mapleApiClient } from "@/lib/http-client";

export const getGuildBasic = async ({
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

export const getGuildId = async ({
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

export const getId = async ({
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

export const getCharacterBasic = async ({
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

export const getGuildMembers = async () => {
  const memberData = await getAllMembers();
  return memberData;
};
