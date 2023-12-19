"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
