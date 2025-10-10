import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

// 기본 시간대를 한국으로 설정
dayjs.tz.setDefault("Asia/Seoul");

export default dayjs;
