import type {
  V1CharacterBasicParameters,
  V1CharacterBasicResponse,
  V1IdParameters,
  V1IdResponse,
} from "./types";
import { mapleApiClient } from "../client";

export const getId = async ({
  params,
  headers,
}: {
  params: V1IdParameters;
  headers?: () => Headers;
}) => {
  const response = await mapleApiClient().get<V1IdResponse>(
    "/v1/id",
    { query: { ...params } },
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
    { query: { ...params } },
    headers,
  );

  return response.data;
};
