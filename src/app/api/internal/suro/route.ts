import { NextResponse } from "next/server";
import { getSuroRanking } from "@/domians/suro/api/suro.repository";

export async function GET() {
  const members = await getSuroRanking();
  return NextResponse.json(members);
}
