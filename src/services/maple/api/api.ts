import type {
  V1GuildBasicParamters,
  V1GuildBasicResponse,
  V1GuildIdParameters,
  V1GuildIdResponse,
} from "./types";
import { mapleApiClient } from "../client";

export const getGuildBasic = async ({
  params,
  headers,
}: {
  params: V1GuildBasicParamters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1GuildBasicResponse>(
    "/v1/guild/basic",
    { query: { ...params } },
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
    { query: { ...params } },
    headers,
  );

  return response.data;
};
