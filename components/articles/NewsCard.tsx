import Link from 'next/link'
import { CalendarPlusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ResultArtilce } from '@/types/data'

const NewsCard = ({ news, featured = false, pathname }: { news: ResultArtilce, featured?: boolean, pathname?: string }) => {
    const ariaLabel = `Read article: ${news.title}. Category: ${news.category}. Published on ${news.created_at} by ${news.pewarta}`
    const date =
        typeof news?.created_at === 'string'
            ? new Date(news.created_at)
            : news?.created_at instanceof Date
                ? news.created_at
                : null;




    return (
        <Link
            href={`${news.category.parent?.slug ? `/${news.category.parent.slug}` : ''}/${news.category.slug}/${news.slug}`}
            aria-label={ariaLabel}
            prefetch={false}
        >
            <article className={cn(
                'group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col focus-within:ring-2 focus-within:ring-sky-500',
                featured && 'shadow-md'
            )}>
                <div className="relative overflow-hidden aspect-video">
                    <Image
                        src={`${news?.image}`}
                        alt={`${news?.title} - ${news?.category} news`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        priority
                        width={675}
                        height={380}
                        unoptimized
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
                            <CalendarPlusIcon className="w-3 h-3" aria-hidden="true" />
                            <time dateTime={String(news?.created_at)}>
                                {date
                                    ? (() => {
                                        const now = new Date();
                                        const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // dalam detik
                                        if (diff < 60) return `Baru saja`;
                                        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
                                        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
                                        if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
                                        return date.toLocaleString("id-ID", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                        })
                                    })()
                                    : ''
                                }
                            </time>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default NewsCard
