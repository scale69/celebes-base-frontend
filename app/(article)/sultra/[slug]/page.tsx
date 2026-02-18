import ArticlePageTemplate from "@/components/articles/ArtclePageTemplate";

interface PageProps {
    params: Promise<{ slug: string }>
}

export default function Page({ params }: PageProps) {
    return <ArticlePageTemplate params={params} />;
}