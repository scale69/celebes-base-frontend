"use server"
import ArticlePageTemplate from "@/components/articles/ArtclePageTemplate";
import { SlugProps } from "@/types/props";

export default async function Page({ params }: SlugProps) {
    return <ArticlePageTemplate params={params} />;
}