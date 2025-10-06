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

export interface V1IdParameters {
  /** 캐릭터 명 */
  character_name: string;
}

export interface V1IdResponse {
  /** 캐릭터 식별자 */
  ocid: string;
}

export interface V1CharacterBasicParameters {
  /** 캐릭터 식별자 */
  ocid: string;
  /** 조회 기준일 (KST, YYYY-MM-DD) (선택) */
  date?: string;
}

export interface V1CharacterBasicResponse {
  /** 조회 기준일 (KST, 일 단위 데이터로 시, 분은 일괄 0으로 표기) */
  date: string; // example: 2023-12-21T00:00+09:00
  /** 캐릭터 명 */
  character_name: string;
  /** 월드 명 */
  world_name: string;
  /** 캐릭터 성별 */
  character_gender: string;
  /** 캐릭터 직업 */
  character_class: string;
  /** 캐릭터 전직 차수 */
  character_class_level: string;
  /** 캐릭터 레벨 */
  character_level: number;
  /** 현재 레벨에서 보유한 경험치 */
  character_exp: number;
  /** 현재 레벨에서 경험치 퍼센트 */
  character_exp_rate: string;
  /** 캐릭터 소속 길드 명 */
  character_guild_name: string;
  /**
   * 캐릭터 외형 이미지
   * @description 쿼리 파라미터로 동작/감정표현 변경 가능
   * - action: A00~A41 (액션)
   * - emotion: E00~E24 (감정표현)
   * - wmotion: W00~W04 (무기 모션)
   * @example "https://open.api.nexon.com/static/maplestory/character/look/ABCDEFG?action=A00.2&emotion=E00"
   */
  character_image: string;
  /** 캐릭터 생성일 (KST, 일 단위 데이터로 시, 분은 일괄 0으로 표기) */
  character_date_create: string; // example: 2023-12-21T00:00+09:00
  /** 최근 7일간 접속 여부 (true 접속, false 미접속) */
  access_flag: string;
  /** 해방 퀘스트 완료 여부 (0:미완료, 1:제네시스 무기 해방, 2:데스티니 무기 1차 해방) */
  liberation_quest_clear: string;
}
