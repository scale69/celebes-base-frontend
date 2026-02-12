"use server"
import ArtikelDetailPage from "@/components/articles/article-content";
import { fetchArticleBySlug } from "@/lib/axios/action/article";
interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const getData = await fetchArticleBySlug(slug);

    return <ArtikelDetailPage getData={getData} slug={slug} />;
}