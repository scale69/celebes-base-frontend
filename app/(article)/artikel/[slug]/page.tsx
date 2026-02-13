"use server"
import ArticlePageTemplate from "@/components/articles/ArtclePageTemplate";

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
    return <ArticlePageTemplate params={params} />;
}