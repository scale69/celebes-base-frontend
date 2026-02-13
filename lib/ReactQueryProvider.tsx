"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 menit
            refetchOnWindowFocus: false,
            // staleTime: 1000 * 60 * 10,   // cache fresh 10 menit
            // refetchOnWindowFocus: false,
            // refetchOnReconnect: false,
            // refetchOnMount: true,        // refetch saat mount / refresh browser
            // retry: 1,
        },
    },
}
);

export default function ReactQueryProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
