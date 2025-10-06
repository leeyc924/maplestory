import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { prefetchGuildMembersQuery } from "@/api/members/fetch-server";
import MemberList from "@/components/members/MemberList";
import { getQueryClient } from "@/lib/react-query";

function MemberListSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-white text-lg">로딩 중...</div>
    </div>
  );
}

export default async function MembersPage() {
  const queryClient = getQueryClient();
  await prefetchGuildMembersQuery({
    params: {
      guild_name: "이브",
      world_name: "루나",
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MemberListSkeleton />}>
        <MemberList />
      </Suspense>
    </HydrationBoundary>
  );
}
