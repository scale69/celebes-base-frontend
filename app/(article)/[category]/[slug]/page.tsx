import ArticlePageTemplate from "@/components/articles/ArtclePageTemplate";
import { fetchArticleBySlug } from "@/lib/axios/action/article";
import { ResultArtilce } from "@/types/data";
import { Metadata } from "next";
interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { slug } = await params;

    const article: ResultArtilce | null = await fetchArticleBySlug(slug);
    if (!article) {
        return {
            title: "Article Not Found",
            description: "Artikel tidak ditemukan",
        };
    }

    return {
        title: article.title,
        description: article.content?.slice(0, 150),
        openGraph: {
            title: article.title,
            description: article.content?.slice(0, 150),
            type: "article",
            images: [
                {
                    url: String(article.image),
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.content?.slice(0, 150),
            images: String(article.image),
        },
    };
}


export default function Page({ params }: PageProps) {
    return <ArticlePageTemplate params={params} />;
}