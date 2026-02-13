import { fetchArticleBySlug } from "@/lib/axios/action/article"
import { SlugProps } from "@/types/props"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NewsHeader from "./NewsHeader"

export default async function CategoryPageTemplate({ params }: SlugProps) {
    const { slug } = await params
    const queryClient = new QueryClient()
    // const start = Date.now();
    await queryClient.prefetchQuery({
        queryKey: ['articles', slug],
        queryFn: () => fetchArticleBySlug(slug),
    })

    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsHeader />
        </HydrationBoundary>
    )
}