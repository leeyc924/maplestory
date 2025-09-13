"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dayjs, { getCurrentISOWeek } from "@/lib/dayjs";

type Member = {
  id: string;
  nickname: string;
  rank: "master" | "officer" | "member";
  lastLogin: string; // YYYY-MM-DD
  weeklyParticipation: number; // 0~7
  participationRate: number; // 0~100
};

const demo: Member[] = [
  {
    id: "m1",
    nickname: "루미",
    rank: "officer",
    lastLogin: "2025-09-12",
    weeklyParticipation: 6,
    participationRate: 92,
  },
  {
    id: "m2",
    nickname: "소라",
    rank: "member",
    lastLogin: "2025-09-10",
    weeklyParticipation: 4,
    participationRate: 60,
  },
  {
    id: "m3",
    nickname: "라떼",
    rank: "member",
    lastLogin: "2025-09-13",
    weeklyParticipation: 7,
    participationRate: 100,
  },
  {
    id: "m4",
    nickname: "하늘",
    rank: "master",
    lastLogin: "2025-09-08",
    weeklyParticipation: 3,
    participationRate: 50,
  },
];

const ranks = [
  { value: "", label: "전체" },
  { value: "master", label: "마스터" },
  { value: "officer", label: "운영진" },
  { value: "member", label: "길드원" },
];

export default function MembersPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [week, setWeek] = useState<string>(
    sp.get("week") || getCurrentISOWeek(),
  );
  const [q, setQ] = useState<string>(sp.get("q") || "");
  const [rank, setRank] = useState<string>(sp.get("rank") || "");

  useEffect(() => {
    const params = new URLSearchParams();
    if (week) params.set("week", week);
    if (q) params.set("q", q);
    if (rank) params.set("rank", rank);
    const query = params.toString();
    router.replace(`/members${query ? `?${query}` : ""}`);
  }, [week, q, rank, router]);

  const filtered = useMemo(() => {
    return demo.filter((m) => {
      const byRank = rank ? m.rank === rank : true;
      const byQ = q ? m.nickname.includes(q) : true;
      return byRank && byQ;
    });
  }, [q, rank]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">길드원 현황</h1>
        <div className="text-sm text-slate-500">
          주차: <span className="font-medium text-sky-700">{week}</span>
        </div>
      </div>

      {/* 필터 바 */}
      <section className="grid grid-cols-1 gap-3 rounded-2xl border border-sky-200 bg-white/80 p-4 shadow-sm md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-slate-500">주차</span>
          <input
            type="text"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="YYYY-Www"
            className="flex-1 rounded-lg border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-slate-500">검색</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="닉네임 검색"
            className="flex-1 rounded-lg border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-slate-500">직위</span>
          <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="flex-1 rounded-lg border border-sky-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          >
            {ranks.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* 테이블 */}
      <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
        <div className="max-h-[62vh] overflow-auto">
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 bg-sky-50 text-left text-sm text-slate-600">
              <tr>
                <th className="w-40 p-3">닉네임</th>
                <th className="w-28 p-3">직위</th>
                <th className="w-36 p-3">최근 접속</th>
                <th className="w-36 p-3">주차 참여</th>
                <th className="w-36 p-3">참여율</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100 text-sm">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-sky-50/60">
                  <td className="truncate p-3 font-medium">{m.nickname}</td>
                  <td className="p-3">{m.rank}</td>
                  <td className="p-3">
                    {dayjs(m.lastLogin).format("YYYY-MM-DD")}
                  </td>
                  <td className="p-3">{m.weeklyParticipation} / 7</td>
                  <td className="p-3">{m.participationRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
