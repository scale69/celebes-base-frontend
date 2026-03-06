"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleByCategorySlug, fetchArticleByCategorySlugLoadMore } from "@/lib/axios/action/article";
import LoadingCard from "../layout/LoadingCard";
import NewsCard from "./NewsCard";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import NoData from "../layout/NoData";
import { useState } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PAGE_SIZE = 10;

export default function NewsHeader() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[segments.length - 1];
    const previou = segments[segments.length - 2];
    const title = slug.split("-").join(" ");

    const [extraArticles, setExtraArticles] = useState<ResultArtilce[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState<boolean | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const { data, isLoading, isError } = useQuery<ArticlesResponse>({
        queryKey: ["articles", slug],
        queryFn: () => fetchArticleByCategorySlug(slug),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <LoadingCard />;
    if (isError || !data)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );

    const allArticles: ResultArtilce[] = [...(data.results ?? []), ...extraArticles]
        .filter((a, i, self) => self.findIndex((x) => x.id === a.id) === i)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const visibleArticles = allArticles.slice(0, visibleCount);

    const apiHasNext = hasNext !== null ? hasNext : !!data.next;
    const hasMore = visibleCount < allArticles.length || apiHasNext;

    const handleLoadMore = async () => {
        if (visibleCount < allArticles.length) {
            setVisibleCount((prev) => prev + PAGE_SIZE);
            return;
        }

        if (!apiHasNext) return;

        setIsLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const json: ArticlesResponse = await fetchArticleByCategorySlugLoadMore(
                slug,
                String(nextPage)
            );
            if (json) {
                setExtraArticles((prev) => [...prev, ...(json.results ?? [])]);
                setCurrentPage(nextPage);
                setHasNext(!!json.next);
                setVisibleCount((prev) => prev + PAGE_SIZE);
            }
        } catch (e) {
            console.error("Gagal load more:", e);
        }

        setIsLoadingMore(false);
    };

    return (
        <div className="space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-sky-700" href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {previou ? (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="capitalize hover:text-sky-700"
                                    href={`/${previou}`}
                                >
                                    {previou}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="capitalize">{slug}</BreadcrumbItem>
                        </>
                    ) : (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="capitalize">{slug}</BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>

            <div className="lg:col-span-7">
                <h1 className="text-3xl capitalize font-bold text-gray-900 mb-6 border-l-4 border-emerald-500 pl-4">
                    Berita {title}
                </h1>

                {visibleArticles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {visibleArticles.map((news) => (
                                <NewsCard key={news.id} news={news} featured />
                            ))}
                        </div>

                        <div className="flex flex-col items-center mt-8 gap-2">
                            {hasMore && (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoadingMore ? "Memuat..." : "Muat Berita Lainnya"}
                                </button>
                            )}
                            <p className="text-sm text-gray-400">
                                Menampilkan {visibleArticles.length} dari {data.count ?? 0} berita
                            </p>
                        </div>
                    </>
                ) : (
                    <NoData />
                )}
            </div>
        </div>
    );
}