// @/components/articles/article-page-template.tsx
"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleBySlug } from "@/lib/axios/action/article";
import { ResultArtilce } from "@/types/data";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePageTemplate({
    params,
}: PageProps) {
    const { slug } = await params;

    const getData = await fetchArticleBySlug(slug);

    if (!getData) {
        return <div>Artikel  tidak ditemukan: {slug}</div>;
    }

    return <ArtikelDetailPage getData={getData} slug={slug} />;
}