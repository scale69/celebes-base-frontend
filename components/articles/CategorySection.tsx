import Link from 'next/link'
import NewsCard from './NewsCard'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArticlesResponse, ResultArtilce } from '@/types/data'

import NoData from '../layout/NoData'

const CategorySection = ({ title, categoryData }: { title: string, categoryData: ArticlesResponse }) => {

    const data = categoryData

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
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className={cn(
                    'text-2xl font-bold text-gray-900 border-l-4 pl-3',
                    // colorClasses[color as keyof typeof colorClasses]
                )}>
                    {title}
                </h2>
                <Link
                    href={`/${title.toLowerCase()}`}
                    className={cn(
                        'flex items-center gap-1 text-sm font-semibold transition',
                        // colorClasses[color as keyof typeof colorClasses]

                    )}
                >
                    Lihat Semua
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.results.map((news: ResultArtilce) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </div>
        </section>
    )
}

export default CategorySection
