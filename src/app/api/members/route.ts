import { NextResponse } from "next/server";
import { getGuildMembers } from "@/lib/api/maple";

export async function GET() {
  try {
    const members = await getGuildMembers("EVE");
    return NextResponse.json({ members });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 },
    );
  }
}
