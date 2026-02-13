"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleByRelated, fetchArticleBySlug } from "@/lib/axios/action/article";
import { Suspense } from "react";
import LoadingContent from "../layout/LoadingContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePageTemplate({
    params,
}: PageProps) {
    const { slug } = await params;


    const dataArtcle = fetchArticleBySlug(slug)
    const dataRelatedArticle = fetchArticleByRelated(slug)

    return (
        <Suspense fallback={<LoadingContent />}>
            <ArtikelDetailPage {...{ dataArtcle, dataRelatedArticle }} />
        </Suspense>
    );
}