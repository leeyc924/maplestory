import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import MemberList from "@/components/members/MemberList";
import { apiClient } from "@/lib/http-client";
import { getQueryClient } from "@/lib/query-client";
import type { Member } from "@/types/member";

function MemberListSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-white text-lg">로딩 중...</div>
    </div>
  );
}

async function fetchMembers(): Promise<Member[]> {
  const data = await apiClient.get<{ members: Member[] }>("/api/members", {
    next: { revalidate: 60 },
  });
  return data.members;
}

export default async function MembersPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MemberListSkeleton />}>
        <MemberList />
      </Suspense>
    </HydrationBoundary>
  );
}
