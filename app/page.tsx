"use server"
import Home from "@/components/articles/Home";
import { fetchArticles } from "@/lib/axios/action/article";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Page() {
    const queryClient = new QueryClient()
    // const start = Date.now();
    await queryClient.prefetchQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    })

    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Home />
        </HydrationBoundary>
    )

}