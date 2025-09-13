// app/api/maple/guild/members/route.ts
import { NextResponse } from "next/server";
import dayjs from "@/lib/dayjs";
import { nxGet } from "@/lib/nx";
import { loadOverrides } from "@/lib/overrides";

export const runtime = "nodejs";

type GuildIdRes = { oguild_id: string };
type GuildBasicRes = { guild_member: string[] };

const GUILD_NAME = "이브";
const WORLD_NAME = "루나";

export async function GET() {
  try {
    // Nexon: oguild_id → guild basic
    const { oguild_id } = await nxGet<GuildIdRes>("/maplestory/v1/guild/id", {
      guild_name: GUILD_NAME,
      world_name: WORLD_NAME,
    });
    const guild = await nxGet<GuildBasicRes>("/maplestory/v1/guild/basic", {
      oguild_id,
    });

    // 수기 오버라이드 로드
    const overrides = await loadOverrides();

    // 5컬럼으로 매핑 + 오버라이드 병합
    const rows = guild.guild_member.map((name, i) => {
      const key = name.trim();
      const ov = overrides[key] ?? {};
      const jd =
        ov.join_date && dayjs(ov.join_date).isValid()
          ? dayjs(ov.join_date).format("YYYY-MM-DD")
          : (ov.join_date ?? "");

      return {
        id: String(i + 1),
        number: i + 1, // 숫자
        join_date: jd, // 가입일자(수기)
        main_char: key, // 본캐
        prev_guild: ov.prev_guild ?? "", // 이전길드(수기)
        note: ov.note ?? "", // 비고(수기)
      };
    });

    return NextResponse.json({ rows }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
