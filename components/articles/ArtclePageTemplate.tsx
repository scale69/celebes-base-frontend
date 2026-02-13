"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleByRelated, fetchArticleBySlug } from "@/lib/axios/action/article";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePageTemplate({
    params,
}: PageProps) {
    const { slug } = await params;

    const queryClient = new QueryClient()
    // const start = Date.now();
    await queryClient.prefetchQuery({
        queryKey: ['articles', slug],
        queryFn: () => fetchArticleBySlug(slug),
    })
    await queryClient.prefetchQuery({
        queryKey: ['related-articles', slug],
        queryFn: () => fetchArticleByRelated(slug),
    })

    // console.log('fetchArticles + categories duration:', Date.now() - start, 'ms')



    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ArtikelDetailPage slug={slug} />
        </HydrationBoundary>

    );
}