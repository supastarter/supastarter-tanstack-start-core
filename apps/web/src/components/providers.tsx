"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};

export const Providers = ({ children }: { readonly children: ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>
);
