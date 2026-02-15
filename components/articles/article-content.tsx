'use client'

import { Calendar, User, Share2, Facebook, Twitter, TagIcon } from 'lucide-react'
import Image from 'next/image'

import RelatedNews from './RelatedNews'
import NoData from '../layout/NoData'
import { fetchArticleBySlug } from '@/lib/axios/action/article'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ResultArtilce, Tag } from '@/types/data'
import AdsTemplate from '../ads/AdsTemplate'
import { Suspense } from 'react'

const ArtikelDetailPage = ({ slug }: { slug: string }) => {

    const { data: article } = useSuspenseQuery<ResultArtilce>({
        queryKey: ['articles', slug],
        queryFn: () => fetchArticleBySlug(slug),
    })



    if (!article) return <NoData
        title="Artikel Tidak Ditemukan"
        message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
        backUrl="/"
        backLabel="Kembali ke Beranda"
    />


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1">
                <div className=" mx-auto px-4 py-6">
                    <article className=' lg:col-span-7'>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Category Badge */}
                            <div className="px-6 pt-6">
                                <span className="inline-block bg-sky-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                    {article?.category?.name}
                                </span>
                            </div>
                            {/* Title */}
                            <div className="px-6 pt-4">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {article.title}
                                </h1>
                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {(() => {
                                                // Pastikan tipe Date valid, jika tidak, parse manual
                                                const date =
                                                    typeof article.created_at === "string"
                                                        ? new Date(article.created_at)
                                                        : article.created_at instanceof Date
                                                            ? article.created_at
                                                            : null;
                                                if (!date || isNaN(date.getTime())) return "";

                                                // Contoh: Minggu, 05 Mei 2024 15.22
                                                return date.toLocaleString("id-ID", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "2-digit",
                                                })
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{article.pewarta}</span>
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <button className="hover:text-sky-600 transition">
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button className="hover:text-sky-600 transition">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="hover:text-sky-600 transition">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="flex items-center w-full justify-center px-6 pt-6 ">
                                <div className="relative group justify-center items-center overflow-hidden shadow-xl hover:shadow-md ">
                                    <Image
                                        width={675}
                                        height={380}
                                        src={`${article?.image}`}
                                        alt={article.image_description}
                                        unoptimized
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="w-full h-auto  rounded-lg transition-transform duration-500 group-hover:scale-105 shadow-md"
                                    />
                                    <div className="absolute  p-5 inset-0 bg-gradient-to-t  from-black/70 to-transparent opacity-0 group-hover:opacity-100 duration-500 flex items-end ">
                                        <div className="w-full">
                                            <span className="block px-4 py-2 text-xs  text-black/90 italic  bg-white/80 backeround-blur-md rounded transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                                                {article.image_description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6">
                                <div
                                    className="prose max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    style={{
                                        fontSize: '1.05rem',
                                        lineHeight: '1.8'
                                    }}
                                />
                            </div>

                            {/* In-Content Ad */}
                            <div className="px-6 pb-6">
                                <AdsTemplate placement='inline' />
                            </div>

                            {/* Tags */}
                            {article.tags && (
                                <div className="px-6 pb-6">
                                    <div className="flex  flex-wrap gap-2">
                                        {article.tags.map((tag: Tag) => (
                                            <div className='flex justify-center items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm' key={tag.id} >
                                                <TagIcon size={12} />
                                                <span className='uppercase'>{tag.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Suspense fallback={null}>
                            <RelatedNews slug={slug} />
                        </Suspense>
                    </article>
                </div>
            </main>
        </div>



    )
}

export default ArtikelDetailPage