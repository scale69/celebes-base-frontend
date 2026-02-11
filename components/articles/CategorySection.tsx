import Link from 'next/link'
import NewsCard from './NewsCard'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArticlesResponse, ResultArtilce } from '@/types/data'
import { useQuery } from '@tanstack/react-query'
import LoadingCard from '../layout/LoadingCard'
import NoData from '../layout/NoData'
import { fetchArticleByCategoryName } from '@/lib/axios/action/article'

const CategorySection = ({ title, color = 'sky' }: { title: string, color?: string }) => {
    const { data, isLoading, isError } = useQuery<ArticlesResponse>({
        queryKey: ['articles', title],
        queryFn: () => fetchArticleByCategoryName(title),
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

    const colorClasses = {
        sky: 'border-sky-500 text-sky-600 hover:text-sky-700',
        emerald: 'border-emerald-500 text-emerald-600 hover:text-emerald-700',
        orange: 'border-orange-500 text-orange-600 hover:text-orange-700',
        purple: 'border-purple-500 text-purple-600 hover:text-purple-700',
    }

    return (
        <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className={cn(
                    'text-2xl font-bold text-gray-900 border-l-4 pl-3',
                    colorClasses[color as keyof typeof colorClasses]
                )}>
                    {title}
                </h2>
                <Link
                    href={`/${title.toLowerCase()}`}
                    className={cn(
                        'flex items-center gap-1 text-sm font-semibold transition',
                        colorClasses[color as keyof typeof colorClasses]

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
