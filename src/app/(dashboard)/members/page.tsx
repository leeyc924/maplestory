import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { Suspense } from "react";
import { prefetchGuildMembersQuery } from "@/domians/members/api/queries";
import MemberList from "@/domians/members/components/MemberList";
import { getQueryClient } from "@/shared/lib/react-query";

function MemberListSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-white text-lg">로딩 중...</div>
    </div>
  );
}

export default async function MembersPage() {
  const headerList = await headers();
  const queryClient = getQueryClient();
  await prefetchGuildMembersQuery(() => headerList);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MemberListSkeleton />}>
        <MemberList />
      </Suspense>
    </HydrationBoundary>
  );
}
