"use client"

import { ResultArtilce } from "@/types/data";
import AdBanner from "./AdBanner";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "./LoadingCard";
import NoData from "./NoData";
import { fetchArticleByTopOrPopulare } from "@/lib/axios/action/article";
import RightAds from "../ads/RightAds";
import { Suspense } from "react";

export default function RightSidebar() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles', "popular_article"],
        queryFn: () => fetchArticleByTopOrPopulare("popular_article"),
    });

    if (isLoading) return <LoadingCard />
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
        <aside
            className="lg:col-span-3 overflow-scroll"
            aria-label="Right sidebar"
            role="complementary"
        >
            <div className="sticky top-20 space-y-6">
                {/* Ad */}
                <div aria-label="Advertisement">
                    <Suspense fallback={null}>
                        <RightAds location="top" />
                    </Suspense>
                </div>

                {/* Popular News */}
                <nav
                    aria-labelledby="popular-news-heading"
                    className="bg-white rounded-lg shadow-sm p-4"
                >
                    <h3
                        id="popular-news-heading"
                        className="text-lg font-bold text-gray-900 mb-4 border-b pb-2"
                    >
                        Berita Populer
                    </h3>
                    <ol className="space-y-4 list-none">
                        {data?.results?.slice(0, 4).map((news: ResultArtilce, index: number) => (
                            <li key={news.id}>
                                <a
                                    href={`/artikel/${news.slug}`}
                                    className="flex gap-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1"
                                    aria-label={`Popular news ${index + 1}: ${news.title}`}
                                >
                                    <span
                                        className="text-2xl font-bold text-sky-500 flex-shrink-0"
                                        aria-hidden="true"
                                    >
                                        {index + 1}
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition line-clamp-2">
                                            {news.title}
                                        </h4>
                                        <time
                                            className="text-xs text-gray-500 mt-1"
                                            dateTime={String(news.updated_at)}
                                        >
                                            {/* {news.date} */}
                                        </time>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Another Ad */}
                <div aria-label="Advertisement">
                    {/* <AdBanner size="square" title="Sponsor" /> */}
                    <Suspense fallback={null}>
                        <RightAds location="bottom" />
                    </Suspense>
                </div>
            </div>
        </aside>
    )
}