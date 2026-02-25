"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleByRelated, fetchArticleBySlug } from "@/lib/axios/action/article";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { Suspense } from "react";
import LoadingContent from "../layout/LoadingContent";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface MetadataProps {
    params: { slug: string };
}

export async function generateMetadata(
    { params }: MetadataProps
): Promise<Metadata> {

    const article = await fetchArticleBySlug(params.slug);

    if (!article) {
        return {
            title: "Article Not Found",
            description: "Artikel tidak ditemukan",
        };
    }

    return {
        title: article.title,
        description: article.content?.slice(0, 150),
        // alternates: {
        //     canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article.slug}`,
        // },
        openGraph: {
            title: article.title,
            description: article,
            // url: `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article.slug}`,
            type: "article",
            images: [
                {
                    url: article.thumbnail,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.thumbnail],
        },
    };
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

    // console.log('✅ Fetch completed in:', Date.now() - start, 'ms')



    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingContent />}>
                <ArtikelDetailPage slug={slug} />
            </Suspense>
        </HydrationBoundary>

    );
}