import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ResultArtilce } from '@/types/data'

const NewsCard = ({ news, featured = false, pathname }: { news: ResultArtilce, featured?: boolean, pathname?: string }) => {
    const ariaLabel = `Read article: ${news.title}. Category: ${news.category}. Published on ${news.updated_at} by ${news.pewarta}`
    const date =
        typeof news?.updated_at === 'string'
            ? new Date(news.updated_at)
            : news?.updated_at instanceof Date
                ? news.updated_at
                : null;


    return (
        <Link
            href={`${!pathname || pathname === '/' ? '/artikel' : pathname}/${news.slug}`}
            aria-label={ariaLabel}
        >
            <article className={cn(
                'group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col focus-within:ring-2 focus-within:ring-sky-500',
                // featured && 'shadow-md'
            )}>
                <div className="relative overflow-hidden aspect-video">
                    <Image
                        src={`${news?.image}`}
                        alt={`${news?.title} - ${news?.category} news`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        width="800"
                        height="600"
                        unoptimized
                    />
                    <div className="absolute top-3 left-3">
                        <span
                            className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                            role="text"
                            aria-label={`Category: ${news.category}`}
                        >
                            {news.category.name}
                        </span>
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <h3 className={cn(
                        'font-bold text-gray-900 group-hover:text-sky-600 transition line-clamp-2 mb-2',
                        featured ? 'text-xl' : 'text-lg'
                    )}>
                        {news.title}
                    </h3>

                    <div className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1 "
                        dangerouslySetInnerHTML={{ __html: news.content }} />


                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            <time dateTime={String(news?.updated_at)}>
                                {date
                                    ? (() => {
                                        const now = new Date();
                                        const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // dalam detik
                                        if (diff < 60) return `Baru saja`;
                                        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
                                        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
                                        if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
                                        return date.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
                                    })()
                                    : ''
                                }
                            </time>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" aria-hidden="true" />
                            <span>{news.pewarta}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default NewsCard
