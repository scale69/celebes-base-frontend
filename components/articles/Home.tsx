"use client";


import NewsCard from "./NewsCard";
import { fetchArticles } from "@/lib/axios/action/article";
import { useQuery } from "@tanstack/react-query";
import { ResultArtilce } from "@/types/data";
import CategorySection from "./CategorySection";
import LoadingCard from "../layout/LoadingCard";
import TopNews from "../home/TopNews";
import NoData from "../layout/NoData";
import InlineAds from "../ads/InlineAds";
import { Suspense } from "react";


const Home = () => {


    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
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


        <div className="lg:col-span-7">
            {/* Hero Section */}
            <TopNews />

            {/* Ad inline Banner */}
            <Suspense fallback={null}>
                <InlineAds />
            </Suspense>
            {/* Latest News Grid */}
            <section aria-labelledby="latest-news-heading" className="mb-8">
                <h2
                    id="latest-news-heading"
                    className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3"
                >
                    Berita Terkini
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.results?.map((news: ResultArtilce) => (
                        <NewsCard key={news.id} news={news} featured={false} />
                    ))}
                </div>
            </section>

            {/* Category Sections */}
            <CategorySection
                title="SULTRA"

                color="sky"
            />
            <CategorySection
                title="Ekonomi"
                color="emerald"
            />
            <CategorySection
                title="Olahraga"
                color="orange"
            />
        </div>



    );
};

export default Home;
