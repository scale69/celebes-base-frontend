
import { ResultArtilce } from "@/types/data";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleByTopOrPopulare } from "@/lib/axios/action/article";
import { Suspense } from "react";
import { FileX } from "lucide-react";
import AdsTemplate from "../ads/AdsTemplate";
import Link from "next/link";

export default async function RightSidebar() {



    const data = await fetchArticleByTopOrPopulare("popular_article")

    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ['articles', "popular_article"],
    //     queryFn: () => fetchArticleByTopOrPopulare("popular_article"),
    // });


    return (
        <aside
            className="lg:col-span-2 overflow-scroll"
            aria-label="Right sidebar"
            role="complementary"
        >
            <div className="sticky space-y-6">
                {/* Ad */}
                <div aria-label="Advertisement">
                    <Suspense fallback={null}>
                        <AdsTemplate placement="right sidebar" location="top" />
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
                                <Link
                                    href={`${news.category.parent?.slug ? `/${news.category.parent.slug}` : ''}/${news.category.slug}/${news.slug}`}
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
                                </Link>
                            </li>
                        ))}
                    </ol>
                    {(data.length <= 0) && (
                        <div className="col-span-full gap-2 flex flex-col items-center justify-center py-8 border rounded-lg bg-gray-50 text-gray-500">
                            <FileX />
                            <span className="text-sm font-medium">
                                Tidak ada berita populer untuk saat ini.
                            </span>
                        </div>
                    )}
                </nav>

                {/* Another Ad */}
                <div aria-label="Advertisement">
                    {/* <AdBanner size="square" title="Sponsor" /> */}
                    <Suspense fallback={null}>
                        <AdsTemplate placement="right sidebar" location="bottom" />
                    </Suspense>
                </div>
            </div>
        </aside>
    )
}