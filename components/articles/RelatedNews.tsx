import { useQuery } from "@tanstack/react-query";
import NoData from "../layout/NoData";
import LoadingCard from "../layout/LoadingCard";
import { fetchArticleByRelated } from "@/lib/axios/action/article";
import Link from "next/link";
import { ArticlesResponse, ResultArtilce } from "@/types/data";

export default function RelatedNews({ slug }: { slug: string }) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['related-articles', slug],
        queryFn: () => fetchArticleByRelated(slug),
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
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3">
                Berita Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((news: ResultArtilce) => (
                    <Link key={news.id} href={`/artikel/${news.slug}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                            <img
                                src={`${news.image}`}
                                alt={news.title}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-3">
                                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 transition line-clamp-2 mb-2">
                                    {news.title}
                                </h4>
                                {/* <p className="text-xs text-gray-500">{news.date}</p> */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}