"use client";


import AdBanner from "../layout/AdBanner";
import NewsCard from "./NewsCard";
import { fetchArticles } from "@/lib/axios/action/article";
import { useQuery } from "@tanstack/react-query";
import { ResultArtilce } from "@/types/data";
import LeftAds from "../ads/LeftAds";
import BannerAds from "../ads/BannerAds";
import CategorySection from "./CategorySection";
import LoadingCard from "../layout/LoadingCard";


const Home = () => {


    const { data, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    });

    if (isLoading) return <LoadingCard />
    if (!data) return <p>no data</p>


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main
                id="main-content"
                className="flex-1"
                role="main"
                aria-label="Main content"
            >
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Ad */}
                        <LeftAds />

                        {/* Main Content */}
                        <div className="lg:col-span-7">
                            {/* Hero Section */}
                            <section aria-labelledby="featured-news-heading" className="mb-8">
                                <h2
                                    id="featured-news-heading"
                                    className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3"
                                >
                                    Berita Utama
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data?.results?.slice(0, 2).map((news: ResultArtilce) => (
                                        <NewsCard key={news.id} news={news} featured />
                                    ))}
                                </div>
                            </section>

                            {/* Ad Banner */}
                            <BannerAds />


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
                                news={data?.results?.filter((n: ResultArtilce) => n.category.name === "SULTRA")}
                                color="sky"
                            />

                            <CategorySection
                                title="Ekonomi"
                                news={data?.results?.filter((n: ResultArtilce) => n.category.name === "Ekonomi")}
                                color="emerald"
                            />

                            <CategorySection
                                title="Olahraga"
                                news={data?.results?.filter((n: ResultArtilce) => n.category.name === "Olahraga")}
                                color="orange"
                            />
                        </div>

                        {/* Right Sidebar */}
                        <aside
                            className="lg:col-span-3"
                            aria-label="Right sidebar"
                            role="complementary"
                        >
                            <div className="sticky top-20 space-y-6">
                                {/* Ad */}
                                <div aria-label="Advertisement">
                                    <AdBanner size="sidebar" title="Iklan" />
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
                                                    href={`/artikel/${news.id}`}
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
                                    <AdBanner size="square" title="Sponsor" />
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
