"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider as OverlayKitProvider } from "overlay-kit";
import { useState } from "react";
import { getQueryClient } from "@/lib/query-client";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayKitProvider>{children}</OverlayKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
