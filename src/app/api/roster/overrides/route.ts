// app/api/roster/overrides/route.ts
import { NextResponse } from "next/server";
import { loadOverrides, upsertOverride } from "@/lib/overrides";

// GET: 전체 오버라이드 맵 반환
export async function GET() {
  const data = await loadOverrides();
  return NextResponse.json({ overrides: data });
}

// PUT: { main_char, join_date?, prev_guild?, note? } 저장/갱신
export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}));
  const main_char =
    typeof body.main_char === "string" ? body.main_char.trim() : "";
  if (!main_char) {
    return NextResponse.json(
      { error: "main_char is required" },
      { status: 400 },
    );
  }
  const patch = {
    join_date: typeof body.join_date === "string" ? body.join_date : undefined,
    prev_guild:
      typeof body.prev_guild === "string" ? body.prev_guild : undefined,
    note: typeof body.note === "string" ? body.note : undefined,
  };
  const saved = await upsertOverride(main_char, patch);
  return NextResponse.json({ main_char, ...saved });
}
