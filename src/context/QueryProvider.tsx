"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

interface QueryProviderProps {
  children: any;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
