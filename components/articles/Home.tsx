

import NewsCard from "./NewsCard";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import CategorySection from "./CategorySection";
import TopNews from "../home/TopNews";
import NoData from "../layout/NoData";
import InlineAds from "../ads/InlineAds";
import { Suspense, use } from "react";
import HeaderAds from "../ads/HeaderAds";
import AdsTemplate from "../ads/AdsTemplate";


const Home = ({ getData }: { getData: Promise<ArticlesResponse> }) => {
    const categories = ["SULTRA", "Ekonomi", "Olahraga"];


    const data = use(getData)

    // if (isLoading) return <LoadingCard />
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
                <AdsTemplate placement="inline" />
            </Suspense>
            <div className="block lg:hidden">
                <Suspense fallback={null}>
                    <AdsTemplate placement="header" />
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
                />
            ))}
        </div>



    );
};

export default Home;
