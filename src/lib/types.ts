export type GuildRosterRow = {
  // 엑셀과 1:1 매칭
  index: number;           // 숫자 (1부터)
  join_date: string;       // 가입일자 (YYYY-MM-DD)
  main_character: string;  // 본캐 (닉네임)
  previous_guild?: string; // 이전길드 (없으면 빈 문자열)
  note?: string;           // 비고
};