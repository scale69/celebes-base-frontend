"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleByRelated, fetchArticleBySlug } from "@/lib/axios/action/article";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { Suspense } from "react";
import LoadingContent from "../layout/LoadingContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePageTemplate({
    params,
}: PageProps) {
    const { slug } = await params;

    // getQueryClient automatically handles server vs client optimization
    const queryClient = getQueryClient()
    const start = Date.now();

    // Parallel fetching - jalankan kedua request bersamaan untuk performa lebih cepat
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['articles', slug],
            queryFn: () => fetchArticleBySlug(slug),
        }),
        queryClient.prefetchQuery({
            queryKey: ['related-articles', slug],
            queryFn: () => fetchArticleByRelated(slug),
        })
    ])

    console.log('✅ Fetch completed in:', Date.now() - start, 'ms')



    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingContent />}>
                <ArtikelDetailPage slug={slug} />
            </Suspense>
        </HydrationBoundary>

    );
}