// app/members/_ui/MembersClient.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import dayjs from "@/lib/dayjs";

export type MemberRow = {
  id: string;
  number: number;
  join_date: string;
  main_char: string;
  prev_guild: string;
  note: string;
};

interface Props {
  initialMembers: MemberRow[];
}

export default function MembersClient({ initialMembers }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [rows, setRows] = useState<MemberRow[]>(initialMembers);
  const [saving, setSaving] = useState<string | null>(null); // main_char

  // URL 동기화(검색어)
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    router.replace(`/members?${params.toString()}`);
  }, [q, router, sp]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (m) =>
        m.main_char.toLowerCase().includes(term) ||
        (m.prev_guild ?? "").toLowerCase().includes(term) ||
        (m.note ?? "").toLowerCase().includes(term),
    );
  }, [rows, q]);

  // 셀 입력 핸들러
  function updateCell(idx: number, patch: Partial<MemberRow>) {
    setRows((prev) => {
      const next = [...prev];
      if (next[idx]) {
        next[idx] = { ...next[idx], ...patch };
      }
      return next;
    });
  }

  async function saveRow(row: MemberRow) {
    // 간단한 날짜 유효성 체크
    if (row.join_date && !dayjs(row.join_date).isValid()) {
      alert("가입일자는 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    setSaving(row.main_char);
    try {
      const res = await fetch("/api/roster/overrides", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          main_char: row.main_char,
          join_date: row.join_date,
          prev_guild: row.prev_guild,
          note: row.note,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "저장 실패");
      }
      // 저장 성공 → 서버 소스와 동기화를 위해 재요청(선호) 또는 낙관적 유지
      // 여기서는 낙관적으로 유지
    } catch (e) {
      alert(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">길드원 현황</h1>
        <div className="text-sm text-slate-500">
          총 인원:{" "}
          <span className="font-medium text-sky-700">{rows.length}</span>
        </div>
      </div>

      {/* 검색 */}
      <section className="grid grid-cols-1 gap-3 rounded-2xl border border-sky-200 bg-white/80 p-4 shadow-sm md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-slate-500">검색</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="본캐/이전길드/비고 검색"
            className="flex-1 rounded-lg border border-sky-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
          />
        </label>
      </section>

      {/* 테이블 (수기 입력 가능) */}
      <section className="overflow-hidden rounded-2xl border border-sky-200 bg-white/80 shadow-sm">
        <div className="max-h-[62vh] overflow-auto">
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 bg-sky-50 text-left text-sm text-slate-600">
              <tr>
                <th className="w-20 p-3">번호</th>
                <th className="w-40 p-3">가입일자</th>
                <th className="w-48 p-3">본캐</th>
                <th className="w-48 p-3">이전길드</th>
                <th className="w-60 p-3">비고</th>
                <th className="w-28 p-3 text-right">저장</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100 text-sm">
              {filtered.map((m, idx) => (
                <tr
                  key={`${m.id}-${m.main_char}`}
                  className="hover:bg-sky-50/60"
                >
                  <td className="p-3 tabular-nums">{m.number}</td>
                  <td className="p-3">
                    <DatePicker
                      value={m.join_date}
                      onChange={(val) => updateCell(idx, { join_date: val })}
                    />
                  </td>
                  <td className="p-3 font-medium">{m.main_char}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={m.prev_guild}
                      onChange={(e) =>
                        updateCell(idx, { prev_guild: e.target.value })
                      }
                      className="w-full rounded-md border border-sky-200 px-2 py-1 outline-none focus:ring-2 focus:ring-sky-300"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={m.note}
                      onChange={(e) =>
                        updateCell(idx, { note: e.target.value })
                      }
                      className="w-full rounded-md border border-sky-200 px-2 py-1 outline-none focus:ring-2 focus:ring-sky-300"
                    />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => saveRow(m)}
                      disabled={saving === m.main_char}
                      className="rounded-md border border-sky-300 px-3 py-1 text-sm font-medium text-sky-700 hover:bg-sky-50 disabled:opacity-50"
                    >
                      {saving === m.main_char ? "저장중…" : "저장"}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={6}>
                    결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
