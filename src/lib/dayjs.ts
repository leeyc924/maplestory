import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(isoWeek);
dayjs.extend(weekYear);

export default dayjs;

// ISO 주차 포맷 YYYY-Www
export function getCurrentISOWeek() {
  const d = dayjs();
  return `${d.isoWeekYear()}-W${String(d.isoWeek()).padStart(2, "0")}`;
}
