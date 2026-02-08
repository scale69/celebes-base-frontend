"use client";

import { usePathname } from "next/navigation";
import AdBanner from "../layout/AdBanner";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleByCategorySlug } from "@/lib/axios/action/article";
import LoadingCard from "../layout/LoadingCard";
import NewsCard from "./NewsCard";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import NoData from "../layout/NoData";

export default function NewsHeader() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[segments.length - 1];
    const title = slug.split("-").join(" ");

    console.log(slug);


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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* left */}
                        <aside className="hidden lg:block lg:col-span-2">
                            <nav className="text-sm text-gray-600 mb-6">
                                <span>Home</span> <span className="mx-2">/</span>{" "}
                                <span className="text-emerald-600 font-semibold">Ekonomi</span>
                            </nav>

                            <div className="sticky top-20">
                                <AdBanner size="sidebar" title="Iklan" className="mb-4" />
                            </div>
                        </aside>

                        {/* coontent */}

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
                        {/* right */}

                        <aside className="lg:col-span-3">
                            <div className="sticky top-20 space-y-6">
                                <AdBanner size="sidebar" title="Iklan" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
