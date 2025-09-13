// app/members/page.tsx

import type { MemberRow } from "./_ui/MembersClient";
import MembersClient from "./_ui/MembersClient";

export default async function MembersPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/maple/guild/members`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">길드원 현황</h1>
        <p className="text-sm text-red-600">
          불러오기 실패: {data?.error ?? "알 수 없는 오류"}
        </p>
      </div>
    );
  }

  const rows = (data?.rows ?? []) as MemberRow[];
  return <MembersClient initialMembers={rows} />;
}
