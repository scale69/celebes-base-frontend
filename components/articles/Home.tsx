"use client";


import NewsCard from "./NewsCard";
import { fetchArticles } from "@/lib/axios/action/article";
import { useQuery } from "@tanstack/react-query";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import CategorySection from "./CategorySection";
import LoadingCard from "../layout/LoadingCard";
import TopNews from "../home/TopNews";
import NoData from "../layout/NoData";
import InlineAds from "../ads/InlineAds";
import { Suspense } from "react";
import HeaderAds from "../ads/HeaderAds";

interface HomeProps {
    getData: ArticlesResponse
    initialData: any[];      // array data tiap kategori
    categories: string[];
}

const Home = ({ getData, initialData, categories }: HomeProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
        initialData: getData
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
            <div className="block lg:hidden">
                <Suspense fallback={null}>
                    <HeaderAds />
                </Suspense>
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

            {/* Category Sections */}
            {/* <CategorySection
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
            /> */}

            {categories.map((category, i) => (
                <CategorySection
                    key={category}
                    title={category}
                    initialData={initialData[i]}
                />
            ))}
        </div>



    );
};

export default Home;
