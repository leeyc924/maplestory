import type { SuroRankingToday, SuroStats } from "../types/suro";
import { EVE_GUILD_NAME } from "@/shared/lib/consts";
import dayjs from "@/shared/lib/dayjs";
import { parseToEnum } from "@/shared/lib/utils";
import { QUARTERS } from "./consts";

export const getQuarter = (quarter: string | null) => {
  const currentQuarter = Math.ceil((dayjs().month() + 1) / 3);
  return parseToEnum(
    parseInt(quarter ?? currentQuarter.toString(), 10),
    QUARTERS,
    currentQuarter as (typeof QUARTERS)[number],
  );
};

export const getYear = (year: string | null) => {
  return parseInt(year ?? dayjs().year().toString(), 10);
};

export const isEveGuild = (guildName: string) => {
  return guildName === EVE_GUILD_NAME;
};

/**
 * 큰 숫자를 한국어 단위(억, 만)로 포맷팅
 * @param num 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: "1억 2,345만", "5,678만")
 */
export const formatKoreanNumber = (num: number): string => {
  if (num >= 100000000) {
    // 억 단위
    const eok = Math.floor(num / 100000000);
    const remainder = num % 100000000;

    if (remainder >= 10000) {
      const man = Math.floor(remainder / 10000);
      return `${eok}억 ${man.toLocaleString()}만`;
    }
    return `${eok}억`;
  } else if (num >= 10000) {
    // 만 단위
    const man = Math.floor(num / 10000);
    return `${man.toLocaleString()}만`;
  }

  return num.toLocaleString();
};

/**
 * 수로 랭킹 데이터에서 이브 길드의 통계 정보를 계산
 * @param data 오늘과 어제의 랭킹 데이터
 * @returns 계산된 통계 정보
 */
export const calculateSuroStats = (data: SuroRankingToday): SuroStats => {
  // 이브 길드 데이터 찾기
  const eveToday = data.today.find((guild) => isEveGuild(guild.guildName));
  const eveYesterday = data.yesterday.find((guild) =>
    isEveGuild(guild.guildName),
  );

  if (!eveToday) {
    return {
      currentGuildPoint: 0,
      currentRanking: 0,
      lowerRankPointDiff: undefined,
      lowerRankPointDiffPercent: undefined,
      pointChange: 0,
      pointChangePercent: 0,
      upperRankPointDiff: undefined,
      upperRankPointDiffPercent: undefined,
    };
  }

  // 점수 변화 계산
  const pointChange = eveYesterday
    ? eveToday.guildPoint - eveYesterday.guildPoint
    : 0;

  const pointChangePercent =
    eveYesterday && eveYesterday.guildPoint > 0
      ? (pointChange / eveYesterday.guildPoint) * 100
      : 0;

  // 상위/하위 랭킹과의 점수차 계산
  const currentRanking = eveToday.ranking;
  const upperRankGuild = data.today.find(
    (guild) => guild.ranking === currentRanking - 1,
  );
  const lowerRankGuild = data.today.find(
    (guild) => guild.ranking === currentRanking + 1,
  );

  const upperRankPointDiff = upperRankGuild
    ? upperRankGuild.guildPoint - eveToday.guildPoint
    : undefined;

  const upperRankPointDiffPercent =
    upperRankGuild &&
    eveToday.guildPoint > 0 &&
    upperRankPointDiff !== undefined
      ? (upperRankPointDiff / eveToday.guildPoint) * 100
      : undefined;

  const lowerRankPointDiff = lowerRankGuild
    ? eveToday.guildPoint - lowerRankGuild.guildPoint
    : undefined;

  const lowerRankPointDiffPercent =
    lowerRankGuild &&
    lowerRankGuild.guildPoint > 0 &&
    lowerRankPointDiff !== undefined
      ? (lowerRankPointDiff / lowerRankGuild.guildPoint) * 100
      : undefined;

  return {
    currentGuildPoint: eveToday.guildPoint,
    currentRanking: eveToday.ranking,
    lowerRankPointDiff,
    lowerRankPointDiffPercent,
    pointChange,
    pointChangePercent,
    upperRankPointDiff,
    upperRankPointDiffPercent,
  };
};
