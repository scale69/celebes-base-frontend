'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { searchArticles } from '@/lib/axios/action/article'
import { ResultArtilce } from '@/types/data'

const SearchModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const categories = [
        { id: 'all', label: 'Semua', color: 'sky' },
        { id: 'SULTRA', label: 'SULTRA', color: 'sky' },
        { id: 'Kendari', label: 'Kendari', color: 'blue' },
        { id: 'Ekonomi', label: 'Ekonomi', color: 'emerald' },
        { id: 'Politik', label: 'Politik', color: 'purple' },
        { id: 'Olahraga', label: 'Olahraga', color: 'orange' },
        { id: 'Nasional', label: 'Nasional', color: 'blue' },
        { id: 'Internasional', label: 'Internasional', color: 'blue' },
    ]

    const popularSearches = ['Sultra', 'Ramadhan', 'Pelabuhan']

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                (inputRef.current as HTMLInputElement | null)?.focus()
            }, 100)
        }
    }, [isOpen])

    // Search functionality dengan debounce
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        // Clear debounce sebelumnya
        if (debounceRef.current) clearTimeout(debounceRef.current)

        setIsSearching(true)

        debounceRef.current = setTimeout(async () => {
            const data = await searchArticles(searchQuery)

            if (data?.results) {
                const filtered = data.results.filter((news: any) => {
                    return activeCategory === 'all' || news.category.name === activeCategory
                })
                setSearchResults(filtered)
            } else {
                setSearchResults([])
            }

            setIsSearching(false)
        }, 400)

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [searchQuery, activeCategory])

    // Close on Escape key
    useEffect(() => {
        const handleKeyboard = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKeyboard)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKeyboard)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    // Global keyboard shortcut (Ctrl+K atau Cmd+K)
    useEffect(() => {
        const handleGlobalShortcut = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
            }
        }
        document.addEventListener('keydown', handleGlobalShortcut)
        return () => document.removeEventListener('keydown', handleGlobalShortcut)
    }, [])

    const handleResultClick = () => {
        setSearchQuery('')
        onClose()
    }

    const handlePopularSearchClick = (search: string) => {
        setSearchQuery(search)
    }

    if (!isOpen) return null




    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Search Modal */}
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Cari berita, topik, atau kategori..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none transition"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-gray-100 rounded-xl transition"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    'px-4 py-2 rounded-full text-sm font-medium transition',
                                    activeCategory === cat.id
                                        ? 'bg-sky-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {searchQuery === '' ? (
                        // Popular Searches
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-sky-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Pencarian Popular</h3>
                            </div>
                            <div className="space-y-2">
                                {popularSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePopularSearchClick(search)}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700 group-hover:text-sky-600 transition">
                                                {search}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-sky-600 transition" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : searchResults.length > 0 ? (
                        // Search Results
                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-4">
                                Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
                            </p>
                            <div className="space-y-4">
                                {searchResults.map((result: ResultArtilce) => (
                                    <Link
                                        key={result.id}
                                        href={`/artikel/${result.slug}`}
                                        onClick={handleResultClick}
                                        className="block group"
                                    >
                                        <div className="p-4 rounded-lg hover:bg-gray-50 transition">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] md:text-xs font-semibold text-sky-600 uppercase">
                                                            {result.category.name}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-[10px] text-gray-500">
                                                            {(() => {
                                                                if (!result.created_at) return null;
                                                                // Try to detect and format date string if possible
                                                                if (typeof result.created_at === "string") {
                                                                    // Try parsing the date string (supports ISO or common formats)
                                                                    const d = new Date(result.created_at);
                                                                    // Check if date is valid
                                                                    if (!isNaN(d.getTime())) {
                                                                        return d.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
                                                                    }
                                                                    // Fallback to raw string if parsing fails
                                                                    return result.created_at;
                                                                }
                                                                // If it's already a Date, format it
                                                                if (result.created_at instanceof Date) {
                                                                    return result.created_at.toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
                                                                }
                                                                return result.created_at;
                                                            })()}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition mb-1 line-clamp-2">
                                                        {result.title}
                                                    </h4>

                                                    <div
                                                        className="prose text-xs md:text-sm max-w-none text-gray-500 leading-relaxed"
                                                        dangerouslySetInnerHTML={{ __html: result.content.slice(0, 150) + "..." }}
                                                    />
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-sky-600 transition flex-shrink-0 mt-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // No Results
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Tidak ada hasil ditemukan
                            </h3>
                            <p className="text-gray-600">
                                Coba gunakan kata kunci lain atau filter kategori berbeda
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Tips */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 text-center">
                        💡 Tips: Gunakan filter kategori untuk hasil yang lebih spesifik
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
