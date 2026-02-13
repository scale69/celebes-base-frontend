import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'

/**
 * Factory function untuk membuat QueryClient dengan optimized configuration
 * Digunakan di server components untuk prefetching data
 * 
 * Pattern: Per-Request QueryClient adalah best practice untuk Next.js App Router
 * Reason: Prevent shared cache between different users/requests
 */
export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Data dianggap fresh selama 5 menit
                staleTime: 1000 * 60 * 5,
                // Tidak refetch otomatis di server
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                // Retry 1x jika gagal
                retry: 1,
            },
            dehydrate: {
                // Only dehydrate successful queries by default
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    })
}

/**
 * Browser QueryClient - shared across all requests di client side
 * Singleton pattern untuk client components
 */
let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server side: always create new QueryClient untuk setiap request
        return makeQueryClient()
    } else {
        // Browser side: reuse singleton QueryClient
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient()
        }
        return browserQueryClient
    }
}
