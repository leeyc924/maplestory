export type V1GuildBasicParamters = {
  /** 길드 식별자 (필수) */
  oguild_id: string;
  /** 조회 기준일 (KST, YYYY-MM-DD) (선택) */
  date?: string;
};

export interface V1GuildBasicResponse {
  /** 조회 기준일 (KST, 일 단위 데이터로 시, 분은 일괄 0으로 표기) */
  date: string; // example: 2023-12-21T00:00+09:00
  /** 월드 명 */
  world_name: string;
  /** 길드 명 */
  guild_name: string;
  /** 길드 레벨 */
  guild_level: number;
  /** 길드 명성치 */
  guild_fame: number;
  /** 길드 포인트(GP) */
  guild_point: number;
  /** 길드 마스터 캐릭터 명 */
  guild_master_name: string;
  /** 길드원 수 */
  guild_member_count: number;
  /** 길드원 목록 */
  guild_member: string[];
  /** 길드 스킬 목록 */
  guild_skill: {
    /** 스킬 명 */
    skill_name: string;
    /** 스킬 설명 */
    skill_description: string;
    /** 스킬 레벨 */
    skill_level: number;
    /** 스킬 레벨 별 효과 */
    skill_effect: string;
    /** 스킬 아이콘 */
    skill_icon: string;
  }[];
  /** 노블레스 스킬 목록 */
  guild_noblesse_skill: {
    /** 스킬 명 */
    skill_name: string;
    /** 스킬 설명 */
    skill_description: string;
    /** 스킬 레벨 */
    skill_level: number;
    /** 스킬 레벨 별 효과 */
    skill_effect: string;
    /** 스킬 아이콘 */
    skill_icon: string;
  }[];
}

export interface V1GuildIdParameters {
  /** 길드 명 */
  guild_name: string;
  /** 월드 명 */
  world_name: string;
}

export interface V1GuildIdResponse {
  /** 길드 식별자 */
  oguild_id: string;
}

export interface V1RankingGuildParameters {
  /** 월드 명 */
  world_name?: string;
  /** 조회 기준일 (KST, YYYY-MM-DD) */
  date: string;
  /** 랭킹 타입 (0:주간 명성치, 1:플래그 레이스, 2:지하 수로) */
  ranking_type: number;
  /** 길드 명 */
  guild_name?: string;
  /** 페이지 번호 */
  page?: number;
}

/** 길드 랭킹 응답 */
export interface V1RankingGuildResponse {
  /** 길드 랭킹 정보 */
  ranking: {
    /** 랭킹 업데이트 일자 (KST) */
    date: string; // example: 2023-12-22
    /** 길드 랭킹 순위 */
    ranking: number;
    /** 길드 명 */
    guild_name: string;
    /** 월드 명 */
    world_name: string;
    /** 길드 레벨 */
    guild_level: number;
    /** 길드 마스터 캐릭터 명 */
    guild_master_name: string;
    /** 길드 마크 */
    guild_mark: string;
    /** 길드 포인트 */
    guild_point: number;
  }[];
}
