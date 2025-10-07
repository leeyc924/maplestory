export type GuildMember = {
  /** 데이터베이스 ID */
  id: string;
  /** 캐릭터 직업 */
  characterClass: string;
  /** 캐릭터 레벨 */
  characterLevel: number;
  /** 캐릭터 명 */
  characterName: string;
  /** 캐릭터 식별자 */
  ocid: string;
  /** 최근 7일간 접속 여부 (true 접속, false 미접속) */
  accessFlag: string;
  /**
   * 캐릭터 외형 이미지
   * @description 쿼리 파라미터로 동작/감정표현 변경 가능
   * - action: A00~A41 (액션)
   * - emotion: E00~E24 (감정표현)
   * - wmotion: W00~W04 (무기 모션)
   * @example "https://open.api.nexon.com/static/maplestory/character/look/ABCDEFG?action=A00.2&emotion=E00"
   */
  characterImage: string;
  /** 권한 */
  permission?: string;
  /** 가입일 */
  joinedAt: string;
  /** 이전 길드 */
  previousGuild?: string;
  /** 비고 */
  note: string;
  /** 생성일 */
  createdAt?: string;
  /** 수정일 */
  updatedAt?: string;
  /** 월드 명 */
  guildName?: string;
};

export type CreateMemberInput = Omit<
  GuildMember,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateMemberInput = Partial<CreateMemberInput> & {
  id: string;
};

export type Member = GuildMember;
