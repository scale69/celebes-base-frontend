"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,    // cache fresh 5 menit - data tidak akan refetch dalam 5 menit
            refetchOnMount: false,        // tidak refetch saat mount jika data masih fresh
            refetchOnWindowFocus: false,  // tidak refetch saat focus kembali ke window
            refetchOnReconnect: false,    // tidak refetch saat reconnect
            retry: 1,                     // retry 1x jika gagal
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
