import { NextResponse } from "next/server";
import { getAllMembers } from "../member.repository";

export async function GET() {
  const members = await getAllMembers();
  return NextResponse.json(members);
}
