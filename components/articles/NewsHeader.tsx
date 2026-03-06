"use client";

import { usePathname } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
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

    const [pageBySlug, setPageBySlug] = useState<Record<string, number>>({});
    const [extraArticlesBySlug, setExtraArticlesBySlug] = useState<Record<string, ResultArtilce[]>>({});
    const [hasNextBySlug, setHasNextBySlug] = useState<Record<string, boolean>>({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const { data, isLoading, isError } = useQuery<ArticlesResponse>({
        queryKey: ["articles", slug],
        queryFn: () => fetchArticleByCategorySlug(slug),
        staleTime: 5 * 60 * 1000,
    });

    const children =
        data?.results?.[0]?.category?.parent === null
            ? (data?.results?.[0]?.category?.children ?? [])
            : [];

    const isParent = children.length > 0;

    const childQueries = useQueries({
        queries: children.map((child) => ({
            queryKey: ["articles", child.slug],
            queryFn: () => fetchArticleByCategorySlug(child.slug),
            staleTime: 5 * 60 * 1000,
            enabled: isParent,
        })),
    });

    const isChildLoading = childQueries.some((q) => q.isLoading);

    if (isLoading || (isParent && isChildLoading)) return <LoadingCard />;
    if (isError || !data)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );

    const activeSlugs = isParent
        ? [slug, ...children.map((c) => c.slug)]
        : [slug];

    // Gabungkan + deduplikasi semua artikel
    const initialArticles: ResultArtilce[] = [
        ...(data.results ?? []),
        ...childQueries.flatMap((q) => (q.data as ArticlesResponse)?.results ?? []),
    ].filter((article, index, self) =>
        index === self.findIndex((a) => a.id === article.id)
    );

    const extraArticles: ResultArtilce[] = activeSlugs
        .flatMap((s) => extraArticlesBySlug[s] ?? [])
        .filter((article, index, self) =>
            index === self.findIndex((a) => a.id === article.id)
        );

    const allArticles = [...initialArticles, ...extraArticles].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Total artikel dari API (count) untuk semua slug aktif
    const totalCount = isParent
        ? (data.count ?? 0) + childQueries.reduce((sum, q) => sum + ((q.data as ArticlesResponse)?.count ?? 0), 0)
        : (data.count ?? 0);

    // Artikel yang ditampilkan dibatasi visibleCount
    const visibleArticles = allArticles.slice(0, visibleCount);

    // Masih ada data yang belum tampil: bisa dari buffer atau dari API (next page)
    const hasNextInitial = (targetSlug: string) => {
        if (targetSlug === slug) return !!data.next;
        const idx = children.findIndex((c) => c.slug === targetSlug);
        if (idx !== -1) return !!((childQueries[idx]?.data as ArticlesResponse)?.next);
        return false;
    };

    const hasMoreFromApi = activeSlugs.some((s) => {
        if (hasNextBySlug[s] !== undefined) return hasNextBySlug[s];
        return hasNextInitial(s);
    });

    // Tampilkan tombol jika masih ada artikel di buffer atau di API
    const hasMore = visibleCount < allArticles.length || hasMoreFromApi;

    const handleLoadMore = async () => {
        // Jika masih ada di buffer, cukup tambah visibleCount
        if (visibleCount < allArticles.length) {
            setVisibleCount((prev) => prev + PAGE_SIZE);
            return;
        }

        // Jika buffer habis, fetch halaman berikutnya dari API
        setIsLoadingMore(true);

        await Promise.all(
            activeSlugs.map(async (targetSlug) => {
                const stillHasNext =
                    hasNextBySlug[targetSlug] !== undefined
                        ? hasNextBySlug[targetSlug]
                        : hasNextInitial(targetSlug);

                if (!stillHasNext) return;

                const nextPage = (pageBySlug[targetSlug] ?? 1) + 1;

                try {
                    const json: ArticlesResponse = await fetchArticleByCategorySlugLoadMore(
                        targetSlug,
                        String(nextPage)
                    );

                    if (!json) return;

                    setExtraArticlesBySlug((prev) => ({
                        ...prev,
                        [targetSlug]: [...(prev[targetSlug] ?? []), ...(json.results ?? [])],
                    }));

                    setPageBySlug((prev) => ({
                        ...prev,
                        [targetSlug]: nextPage,
                    }));

                    setHasNextBySlug((prev) => ({
                        ...prev,
                        [targetSlug]: !!json.next,
                    }));
                } catch (e) {
                    console.error("Gagal load more untuk slug:", targetSlug, e);
                }
            })
        );

        setVisibleCount((prev) => prev + PAGE_SIZE);
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
                                Menampilkan {visibleArticles.length} dari {totalCount} berita
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