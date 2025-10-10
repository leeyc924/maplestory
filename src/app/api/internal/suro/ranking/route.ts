import { type NextRequest, NextResponse } from "next/server";
import { getSuroRanking } from "@/domians/suro/api/suro.repository";
import { getQuarter, getYear } from "@/domians/suro/lib/utils";

export async function GET(request: NextRequest) {
  const year = getYear(request.nextUrl.searchParams.get("year"));
  const quarter = getQuarter(request.nextUrl.searchParams.get("quarter"));

  const response = await getSuroRanking(year, quarter);
  return NextResponse.json(response);
}
