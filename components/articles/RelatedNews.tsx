import { useQuery } from "@tanstack/react-query";
import NoData from "../layout/NoData";
import LoadingCard from "../layout/LoadingCard";
import { fetchArticleByRelated } from "@/lib/axios/action/article";
import Link from "next/link";
import { ArticlesResponse, ResultArtilce } from "@/types/data";
import { FileX } from "lucide-react";
import { use } from "react";

export default function RelatedNews({ dataRelatedArticle }: { dataRelatedArticle: Promise<ResultArtilce[]> }) {


    const data = use(dataRelatedArticle)


    if (!data) return null



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
                                <p className="text-xs text-gray-500">
                                    {(() => {
                                        const date =
                                            typeof news.updated_at === "string"
                                                ? new Date(news.updated_at)
                                                : news.updated_at instanceof Date
                                                    ? news.updated_at
                                                    : null;
                                        if (!date || isNaN(date.getTime())) return "";
                                        return date.toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        }).replace(/\.(\d\d)$/, ':$1').replace(",", "");
                                    })()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
                {(data.length <= 0) && (
                    <div className="col-span-full gap-2 flex flex-col items-center justify-center py-8 border rounded-lg bg-gray-50 text-gray-500">
                        <FileX />
                        <span className="text-base font-medium">
                            Tidak ada berita terkait untuk saat ini.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}