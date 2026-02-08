'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, User, Share2, Facebook, Twitter, TagIcon } from 'lucide-react'
import Link from 'next/link'
import AdBanner from '@/components/layout/AdBanner'
import { useQuery } from '@tanstack/react-query'
import { ResultArtilce, Tag } from '@/types/data'
import Image from 'next/image'
import LoadingContent from '@/components/layout/LoadingContent'
import NoData from '@/components/layout/NoData'
import { fetchArticleBySlug } from '@/lib/axios/action/article'

const ArtikelDetailPage = () => {
    const params = useParams()
    const slug = params.slug as string
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)




    const { data: article, isLoading } = useQuery<ResultArtilce>({
        queryKey: ['articles', slug],
        queryFn: () => fetchArticleBySlug(slug),
    });

    if (isLoading) return <LoadingContent />
    if (!article) return <NoData
        title="Artikel Tidak Ditemukan"
        message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
        backUrl="/"
        backLabel="Kembali ke Beranda"
    />





    const relatedNews = [
        {
            id: 6,
            title: 'Muna Barat Luncurkan Program Wisata Bahari Berkelanjutan',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
            date: '2025-06-12'
        },
        {
            id: 11,
            title: 'Kendari Raih Penghargaan Kota Bersih Nasional',
            image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
            date: '2025-06-11'
        },
        {
            id: 12,
            title: 'Kolaka Kembangkan Sektor Pertanian Modern',
            image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
            date: '2025-06-10'
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:text-sky-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/sultra" className="hover:text-sky-600">SULTRA</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-semibold">Artikel</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Ad */}
                        <aside className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-20">
                                <AdBanner size="sidebar" title="Iklan" className="mb-4" />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="lg:col-span-7">
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
                                            {/* <span>{article.date}</span> */}
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
                                <div className=" px-6 pt-6">
                                    <div className="relative group w-full overflow-hidden">
                                        <Image
                                            width={600}
                                            height={400}
                                            src={`${article.image}`}
                                            alt={article.image_description}
                                            unoptimized
                                            className=" w-full max-h-[400px] rounded-lg transition-transform duration-500  group-hover:scale-105 shadow-md"
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
                                    <AdBanner size="horizontal" title="Sponsor" />
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

                            {/* Related News */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-sky-500 pl-3">
                                    Berita Terkait
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {relatedNews.map((news) => (
                                        <Link key={news.id} href={`/artikel/${news.id}`}>
                                            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="p-3">
                                                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-sky-600 transition line-clamp-2 mb-2">
                                                        {news.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">{news.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-20 space-y-6">
                                {/* Ad */}
                                <AdBanner size="sidebar" title="Iklan" />

                                {/* Popular News */}
                                <div className="bg-white rounded-lg shadow-sm p-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                                        Berita Populer
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedNews.map((news, index) => (
                                            <Link key={news.id} href={`/artikel/${news.id}`}>
                                                <div className="flex gap-3 group cursor-pointer">
                                                    <span className="text-2xl font-bold text-sky-500 flex-shrink-0">
                                                        {index + 1}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition line-clamp-2">
                                                            {news.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Another Ad */}
                                <AdBanner size="square" title="Sponsor" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default ArtikelDetailPage