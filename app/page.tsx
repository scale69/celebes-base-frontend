"use server"
import Home from "@/components/articles/Home";
import { fetchArticles, fetchArticleByCategoryName, fetchArticleByTopOrPopulare } from "@/lib/axios/action/article";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function Page() {
    // getQueryClient automatically handles server vs client optimization
    const queryClient = getQueryClient()
    const start = Date.now();

    const categories = ["SULTRA", "Ekonomi", "Olahraga"];

    // Parallel prefetch SEMUA data yang dibutuhkan homepage
    await Promise.all([
        // Main articles
        queryClient.prefetchQuery({
            queryKey: ['articles'],
            queryFn: fetchArticles,
        }),
        // Top articles
        queryClient.prefetchQuery({
            queryKey: ['articles', 'top_article'],
            queryFn: () => fetchArticleByTopOrPopulare('top_article'),
        }),
        // Category sections - parallel juga
        ...categories.map(category =>
            queryClient.prefetchQuery({
                queryKey: ['articles', category],
                queryFn: () => fetchArticleByCategoryName(category),
            })
        )
    ])

    console.log('🏠 Homepage fetch completed in:', Date.now() - start, 'ms')

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Home />
        </HydrationBoundary>
    )

}