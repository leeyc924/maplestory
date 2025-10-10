export interface SuroRanking {
  /** 고유 ID */
  id: number;
  /** 날짜 (YYYY-MM-DD 형식) */
  date: string;
  /** 길드명 */
  guildName: string;
  /** 수로 점수 */
  guildPoint: number;
  /** 길드 순위 */
  ranking: number;
}

export interface SuroRankingToday {
  today: SuroRanking[];
  yesterday: SuroRanking[];
}

// 차트용 데이터 포인트
export interface ChartData {
  /** 날짜 (표시용 MM/DD 형식) */
  date: string;
  [key: string]: number | string;
}

// 수로 통계 정보
export interface SuroStats {
  /** 우리 길드 현재 순위 */
  currentRanking: number;
  /** 현재 점수 */
  currentGuildPoint: number;
  /** 점수 변화 (어제 대비) */
  pointChange: number;
  /** 점수 변화 퍼센트 */
  pointChangePercent: number;
  /** 상위 랭킹과의 점수차 */
  upperRankPointDiff?: number;
  /** 상위 랭킹과의 점수차 퍼센트 */
  upperRankPointDiffPercent?: number;
  /** 하위 랭킹과의 점수차 */
  lowerRankPointDiff?: number;
  /** 하위 랭킹과의 점수차 퍼센트 */
  lowerRankPointDiffPercent?: number;
}

// 랭킹 변화 정보를 포함한 길드 데이터
export interface GuildRankingWithChange extends SuroRanking {
  /** 어제 랭킹 */
  yesterdayRanking?: number;
  /** 어제 점수 */
  yesterdayGuildPoint?: number;
  /** 랭킹 변화 ("+3", "-2", "0", "NEW" 등) */
  rankingChange: string;
  /** 점수 변화량 */
  pointChange: number;
  /** 점수 변화 퍼센트 */
  pointChangePercent: number;
}
