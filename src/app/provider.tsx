"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider as OverlayKitProvider } from "overlay-kit";
import { getQueryClient } from "@/shared/lib/react-query";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayKitProvider>{children}</OverlayKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
