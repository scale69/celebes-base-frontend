'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search, ChevronDown } from 'lucide-react'
import AdBanner from './AdBanner'
import Image from 'next/image'


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Global keyboard shortcut for search (Ctrl+K / Cmd+K)
    useEffect(() => {
        const handleKeyboard = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsSearchOpen(true)
            }
        }
        document.addEventListener('keydown', handleKeyboard)
        return () => document.removeEventListener('keydown', handleKeyboard)
    }, [])

    const sultraSubmenu = [
        { label: 'Show All', href: '/sultra' },
        {
            label: 'Daratan', subItems: [
                { label: 'Kendari', href: '/sultra/kendari' },
                { label: 'Konawe', href: '/sultra/konawe' },
                { label: 'Kolaka', href: '/sultra/kolaka' },
            ]
        },
        {
            label: 'Kepulauan', subItems: [
                { label: 'Muna & Muna Barat', href: '/sultra/muna' },
                { label: 'Baubau', href: '/sultra/baubau' },
                { label: 'Kepulauan Buton', href: '/sultra/buton' },
            ]
        },
    ]

    const hukumPolitikSubmenu = [
        { label: 'Show All', href: '/hukum-dan-politik' },
        { label: 'Hukum', href: '/hukum-dan-politik/hukum' },
        { label: 'Politik', href: '/hukum-dan-politik/politik' },
    ]

    // date
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const now = new Date();
    const dayName = hari[now.getDay()];
    const day = now.getDate();
    const month = bulan[now.getMonth()];
    const year = now.getFullYear();

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-200'
            }`}>
            {/* Top Bar with Ad */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-10">
                        <div className="flex items-center space-x-4 text-sm">
                            <span>
                                {dayName} {day}-{month}-{year}
                            </span>
                            <span className="hidden md:inline">|</span>
                            <span className="hidden md:inline">Kendari, Sulawesi Tenggara</span>
                        </div>
                        {/* search */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-2 hover:text-sky-200 transition group"
                                aria-label="Search"
                                title="Search (Ctrl+K)"
                            >
                                <Search className="w-4 h-4 cursor-pointer" />
                                <span className="hidden md:inline text-xs opacity-0 group-hover:opacity-100 transition">
                                    Ctrl+K
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <div className="flex flex-col">
                                <Image src={'/logo.png'} alt='logo-cs' width={200} height={100} unoptimized />
                                {/* <h1 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight">
                                    CELEBES NUSANTARA
                                </h1> */}
                                <p className="text-[10px] bg-white pl-[74px] -mt-[26px] text-gray-500 tracking-wide">Portal Berita Sulawesi Tenggara</p>
                            </div>
                        </Link>

                        {/* Header Ad - Desktop Only */}
                        <div className="hidden lg:block">
                            <AdBanner size="header" title="Iklan" />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            // onClick={onMenuClick}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:block bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-start">
                        {/* Home */}
                        <Link href="/" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Home
                        </Link>

                        {/* SULTRA Dropdown */}
                        <div className="relative group">
                            <button className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium flex items-center gap-1">
                                SULTRA
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-0 w-[420px] bg-white text-gray-900 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-4">
                                    <Link href="/sultra" className="block px-3 py-2 hover:bg-gray-100 rounded font-semibold text-sky-600 mb-2">
                                        Show All
                                    </Link>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Daratan</p>
                                            {sultraSubmenu[1]?.subItems?.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Kepulauan</p>
                                            {sultraSubmenu[2]?.subItems?.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ekonomi */}
                        <Link href="/ekonomi" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Ekonomi
                        </Link>

                        {/* Hukum & Politik Dropdown */}
                        <div className="relative group">
                            <button className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium flex items-center gap-1">
                                Hukum & Politik
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-0 w-[200px] bg-white text-gray-900 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-2">
                                    {hukumPolitikSubmenu.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Olahraga */}
                        <Link href="/olahraga" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Olahraga
                        </Link>

                        {/* Nasional */}
                        <Link href="/nasional" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Nasional
                        </Link>

                        {/* Hiburan & Life Style */}
                        <Link href="/hiburan-dan-life-style" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Hiburan & Life Style
                        </Link>

                        {/* Artikel & ADV */}
                        <Link href="/artikel-dan-adv" className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium inline-block">
                            Artikel & ADV
                        </Link>

                        {/* Tentang Kami - Right aligned dropdown */}
                        <div className="relative group ml-auto">
                            <button className="px-4 py-3 hover:bg-sky-600 transition text-sm font-medium flex items-center gap-1">
                                Tentang Kami
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-0 w-[200px] bg-white text-gray-900 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-2">
                                    <Link href="/tentang-kami" className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition">
                                        Tentang Kami
                                    </Link>

                                    <Link href="/tentang-kami/#kontak" className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition">
                                        Kontak
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="lg:hidden bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-4 py-3 overflow-x-auto">
                        <Link href="/" className="text-sm font-medium whitespace-nowrap hover:text-sky-400 transition">
                            Home
                        </Link>
                        <Link href="/sultra" className="text-sm font-medium whitespace-nowrap hover:text-sky-400 transition">
                            Sultra
                        </Link>
                        <Link href="/ekonomi" className="text-sm font-medium whitespace-nowrap hover:text-sky-400 transition">
                            Ekonomi
                        </Link>
                        <Link href="/nasional" className="text-sm font-medium whitespace-nowrap hover:text-sky-400 transition">
                            Nasional
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            {/* <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /> */}
        </header>
    )
}

export default Header
