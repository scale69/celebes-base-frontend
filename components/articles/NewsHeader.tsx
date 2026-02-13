"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleByCategorySlug } from "@/lib/axios/action/article";
import LoadingCard from "../layout/LoadingCard";
import NewsCard from "./NewsCard";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import NoData from "../layout/NoData";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
type PageProps = {
    params: { slug: string };
    searchParams: Record<string, string | string[] | undefined>;
};
export default function NewsHeader() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[segments.length - 1];
    const previou = segments[segments.length - 2];

    const title = slug.split("-").join(" ");



    const { data, isLoading, isError } = useQuery<ArticlesResponse>({
        queryKey: ["articles", slug],
        queryFn: () => fetchArticleByCategorySlug(slug),
    });

    if (isLoading) return <LoadingCard />;
    if (isError)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );
    if (!data)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );

    return (

        <div className="space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {previou && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${previou}`}>{previou}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="lg:col-span-7">
                <h1 className="text-3xl capitalize  font-bold text-gray-900 mb-6 border-l-4 border-emerald-500 pl-4">
                    Berita {title}
                </h1>
                {data.results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.results.map((news: ResultArtilce) => (
                            <NewsCard
                                pathname={pathname}
                                key={news.id}
                                news={news}
                                featured
                            />
                        ))}
                    </div>
                ) : (
                    <NoData />
                )}
            </div>
        </div>

    );
}
