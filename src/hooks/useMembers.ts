import { useEffect, useState } from "react";
import type { MemberWithStats } from "@/types/member";

export function useMembers() {
  const [members, setMembers] = useState<MemberWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/members");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMembers(data.members);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return { members, loading, error };
}
