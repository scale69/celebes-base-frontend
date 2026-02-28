'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { searchArticles } from '@/lib/axios/action/article'

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
    const inputRef = useRef(null)

    // Sample news data for search (in real app, this would come from API)

    const categories = [
        { id: 'all', label: 'Semua', color: 'sky' },
        { id: 'SULTRA', label: 'SULTRA', color: 'sky' },
        { id: 'Kendari', label: 'Kendari', color: 'sky' },
        { id: 'Ekonomi', label: 'Ekonomi', color: 'emerald' },
        { id: 'Politik', label: 'Politik', color: 'purple' },
        { id: 'Olahraga', label: 'Olahraga', color: 'orange' },
        { id: 'Nasional', label: 'Nasional', color: 'blue' },
        { id: 'Internasional', label: 'Internasional', color: 'blue' },
    ]

    const popularSearches = [
        'Lokasi wisata',
        'Ramdhan',
        'Gubernur',
        'Festival Buton',
        'Pelabuhan'
    ]

    // API search
    const { data, isLoading, error } = useQuery({
        queryKey: ['search-articles', searchQuery, activeCategory],
        queryFn: async () => {
            // Only search on query present
            if (!searchQuery.trim()) return { results: [] }

            const apiResult = await searchArticles(searchQuery.trim());
            // Expected: { results: [...] } or just [...], handle both
            if (Array.isArray(apiResult)) {
                return { results: apiResult }
            }
            return apiResult ?? { results: [] }
        },
        enabled: isOpen && searchQuery.trim().length > 0, // only run when modal is open & query exists
        refetchOnWindowFocus: false,
    });

    console.log(data);


    // Filter by category if not "all"
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            return
        }

        let results = data?.results ?? [];
        if (activeCategory !== 'all') {
            results = results.filter(
                (news: any) =>
                    news.category === activeCategory
            );
        }
        setSearchResults(results)
    }, [searchQuery, activeCategory, data])

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                (inputRef.current as HTMLInputElement | null)?.focus();
            }, 100)
        }
    }, [isOpen])

    // Close on Escape key and handle keyboard shortcuts
    useEffect(() => {
        const handleKeyboard = (e: any) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault()
                // [Future] Navigate results
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

    // Global keyboard shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleGlobalShortcut = (e: any) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                if (
                    window.location.pathname === '/' ||
                    window.location.pathname.includes('/sultra') ||
                    window.location.pathname.includes('/ekonomi') ||
                    window.location.pathname.includes('/nasional')
                ) {
                    // Trigger search from header component
                }
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
    if (isLoading) return null
    if (error) return <p>Terjadi kesalahan saat pencarian.</p>

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
                                {searchResults.map((result: any) => (
                                    <Link
                                        key={result.id}
                                        href={`/artikel/${result.id}`}
                                        onClick={handleResultClick}
                                        className="block group"
                                    >
                                        <div className="p-4 rounded-lg hover:bg-gray-50 transition">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-semibold text-sky-600 uppercase">
                                                            {result.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">{result.date}</span>
                                                    </div>
                                                    <h4 className="text-base font-semibold text-gray-900 group-hover:text-sky-600 transition mb-1 line-clamp-2">
                                                        {result.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 line-clamp-1">
                                                        {result.excerpt}
                                                    </p>
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
