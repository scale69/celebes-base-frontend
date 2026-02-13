"use client"
import { fetchArticleByTopOrPopulare } from "@/lib/axios/action/article";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "../layout/LoadingCard";
import NoData from "../layout/NoData";
import NewsCard from "../articles/NewsCard";
import { ResultArtilce } from "@/types/data";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,

} from "@/components/ui/carousel"

export default function TopNews() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles', "top_article"],
        queryFn: () => fetchArticleByTopOrPopulare("top_article"),
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
        <div className=''>
            <section aria-labelledby="featured-news-heading" className="mb-8">
                <h2
                    id="featured-news-heading"
                    className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3"
                >
                    Berita Utama
                </h2>
                <Carousel
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                    opts={{
                        align: "start", // pastikan scrolnya berdasarkan card
                        loop: true
                    }}
                >
                    <CarouselContent className="-ml-1 ">
                        {data?.results.map((news: ResultArtilce) => (
                            <CarouselItem
                                key={news.id}
                                className="basis-full sm:basis-1/2  pl-1"
                            >
                                <div className="p-1">
                                    <NewsCard key={news.id} news={news} featured />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* Tambahkan indikator posisi scroll */}
                    <div className="relative flex justify-center w-full pt-7">
                        <div className="absolute">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </div>
                </Carousel>
            </section>
        </div>
    )
}