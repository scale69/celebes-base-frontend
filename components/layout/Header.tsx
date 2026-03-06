"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Link from "next/link";
import { Menu, Search, ChevronDown, Home } from "lucide-react";
import Image from "next/image";
import MobileSidebar from "./MobileSidebar";
import AdsTemplate from "../ads/AdsTemplate";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface SubItem {
    label: string;
    href: string;
}

interface DropdownProps {
    label: string;
    isActive: boolean;
    alignRight?: boolean;
    children: React.ReactNode;
}

// ─────────────────────────────────────────────
// Dropdown Component (self-contained, own ref)
// ─────────────────────────────────────────────
function Dropdown({ label, isActive, alignRight = false, children }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close when clicking outside this dropdown
    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`px-4 py-3 hover:bg-sky-600 transition-colors text-sm font-medium flex items-center gap-1 ${isActive ? "border-b-2 border-white" : ""
                    }`}
            >
                {label}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div
                    className={`absolute top-full mt-0 bg-white text-gray-900 shadow-xl z-50 ${alignRight ? "right-0" : "left-0"
                        }`}
                    // Prevent closing when clicking inside dropdown
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const SULTRA_DARATAN: SubItem[] = [
    { label: "Kendari", href: "/sultra/kendari" },
    { label: "Konawe", href: "/sultra/konawe" },
    { label: "Kolaka", href: "/sultra/kolaka" },
];

const SULTRA_KEPULAUAN: SubItem[] = [
    { label: "Muna & Muna Barat", href: "/sultra/muna-dan-muna-barat" },
    { label: "Baubau", href: "/sultra/baubau" },
    { label: "Kepulauan Buton", href: "/sultra/kepulauan-buton" },
];

const HUKUM_POLITIK: SubItem[] = [
    { label: "Hukum", href: "/hukum-dan-politik/hukum" },
    { label: "Politik", href: "/hukum-dan-politik/politik" },
];

const NAV_LINKS = [
    { label: "Ekonomi", href: "/ekonomi" },
    { label: "Olahraga", href: "/olahraga" },
    { label: "Nasional", href: "/nasional" },
    { label: "Internasional", href: "/internasional" },
    { label: "Hiburan & Life Style", href: "/hiburan-dan-life-style" },
    { label: "Artikel & ADV", href: "/artikel-dan-adv" },
];

const MOBILE_LINKS = [
    { label: "Sultra", href: "/sultra" },
    { label: "Ekonomi", href: "/ekonomi" },
    { label: "Nasional", href: "/nasional" },
    { label: "Olahraga", href: "/olahraga" },
];

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// ─────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────
export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const now = new Date();
    const dateStr = `${HARI[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`;

    const navLinkClass = (href: string) =>
        `px-4 py-3 hover:bg-sky-600 transition-colors text-sm font-medium inline-block ${pathname === href ? "border-b-2 border-white" : ""
        }`;

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-200"
                }`}
        >
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* ── Top Bar ── */}
            <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-10 text-sm">
                        <div className="flex items-center gap-4">
                            <span>{dateStr}</span>
                            <span className="hidden md:inline">|</span>
                            <span className="hidden md:inline">Kendari, Sulawesi Tenggara</span>
                        </div>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-2 hover:text-sky-200 transition group"
                            aria-label="Cari berita (Ctrl+K)"
                        >
                            <span className="hidden md:inline text-xs">Ctrl+K</span>
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Logo & Ad ── */}
            <div className="bg-white">
                <div className="container mx-auto">
                    <div className="flex items-center py-4 justify-between">
                        <Link href="/">
                            <div className="flex flex-col">
                                <Image src="/logo.png" alt="Logo" width={200} height={100} unoptimized />
                                <span className="text-[10px] ml-[76px] -mt-[26px] text-gray-700 tracking-wide">
                                    Portal Berita Sulawesi Tenggara
                                </span>
                            </div>
                        </Link>
                        <div className="hidden lg:block">
                            <Suspense fallback={null}>
                                <AdsTemplate placement="header" />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:block bg-amber-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center">

                        <Link href="/" className={navLinkClass("/")}>
                            <Home className="w-4 h-4" />
                        </Link>

                        {/* SULTRA dropdown */}
                        <Dropdown label="SULTRA" isActive={pathname.includes("sultra")}>
                            <div className="p-4 w-[420px]">
                                <Link href="/sultra" className="block px-3 py-2 hover:bg-gray-100 rounded font-semibold text-sky-600 mb-2">
                                    Show All
                                </Link>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Daratan</p>
                                        {SULTRA_DARATAN.map((item) => (
                                            <Link key={item.href} href={item.href} className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="px-3 py-1 text-xs font-bold text-gray-500 uppercase">Kepulauan</p>
                                        {SULTRA_KEPULAUAN.map((item) => (
                                            <Link key={item.href} href={item.href} className="block px-3 py-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Dropdown>

                        <Link href="/ekonomi" className={navLinkClass("/ekonomi")}>Ekonomi</Link>

                        {/* Hukum & Politik dropdown */}
                        <Dropdown label="Hukum & Politik" isActive={pathname.includes("hukum-dan-politik")}>
                            <div className="w-[200px] py-2">
                                <Link href="/hukum-dan-politik" className="block px-4 py-2 hover:bg-gray-100 font-semibold text-sky-600 text-sm">
                                    Show All
                                </Link>
                                {HUKUM_POLITIK.map((item) => (
                                    <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-gray-100 text-sm transition-colors">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </Dropdown>

                        {NAV_LINKS.slice(1).map((link) => (
                            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                                {link.label}
                            </Link>
                        ))}

                        {/* Tentang Kami — right aligned */}
                        <div className="ml-auto">
                            <Dropdown label="Tentang Kami" isActive={pathname.includes("tentang-kami")} alignRight>
                                <div className="w-[200px] py-2">
                                    {[
                                        { label: "Tentang Kami", href: "/tentang-kami" },
                                        { label: "Redaksi", href: "/redaksi" },
                                        { label: "Kontak", href: "/tentang-kami/#kontak" },
                                    ].map((item) => (
                                        <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-gray-100 text-sm transition-colors">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </Dropdown>
                        </div>

                    </div>
                </div>
            </nav>

            {/* ── Mobile Nav ── */}
            <nav className="lg:hidden bg-amber-600 text-white">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-4 py-3 overflow-x-auto">
                        <Link href="/" className={`text-sm font-medium whitespace-nowrap hover:text-sky-200 transition ${pathname === "/" ? "border-b-2 border-white py-1" : ""}`}>
                            <Home className="w-4 h-4" />
                        </Link>
                        {MOBILE_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium whitespace-nowrap hover:text-sky-200 transition ${pathname.startsWith(link.href) ? "border-b-2 border-white py-1" : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} aria-label="Buka menu">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
}