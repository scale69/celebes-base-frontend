
"use client"
import NewsCard from "./NewsCard";
import { ResultArtilce } from "@/types/data";
import CategorySection from "./CategorySection";
import TopNews from "../home/TopNews";
import NoData from "../layout/NoData";
import { Suspense } from "react";
import AdsTemplate from "../ads/AdsTemplate";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/axios/action/article";
import LoadingCard from "../layout/LoadingCard";


const Home = () => {
    const categories = ["SULTRA", "Ekonomi", "Olahraga"];

    const { data, isLoading, error } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    })

    if (isLoading) return <LoadingCard />
    if (!data)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );
    if (error)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );

    return (
        <div className="w-full lg:col-span-6">
            {/* Hero Section */}
            <TopNews />

            {/* Ad inline Banner */}
            <div className="flex flex-col justify-center items-center gap-4 my-4 w-full">

                <Suspense fallback={null}>
                    <AdsTemplate placement="inline" />
                </Suspense>
                <div className="block lg:hidden">
                    <Suspense fallback={null}>
                        <AdsTemplate placement="header" />
                    </Suspense>
                </div>
            </div>
            {/* Latest News Grid */}
            <section aria-labelledby="latest-news-heading" className="mb-8">
                <h2
                    id="latest-news-heading"
                    className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3"
                >
                    Berita Terkini
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.results.map((news: ResultArtilce) => (
                        <NewsCard key={news.id} news={news} featured={false} />
                    ))}
                </div>
            </section>
            {categories.map((category) => (
                <CategorySection
                    key={category}
                    title={category}
                />
            ))}
        </div>
    );
};

export default Home;
