import { NextResponse } from "next/server";
import { getAllMembers } from "@/domians/members/api/member.repository";

export async function GET() {
  const members = await getAllMembers();
  return NextResponse.json(members);
}
