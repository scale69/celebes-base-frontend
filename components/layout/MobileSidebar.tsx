'use client'

import { X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const MobileSidebar = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean,
    onClose: () => void
}) => {
    const [expandedMenu, setExpandedMenu] = useState(null)

    const menuItems = [
        { label: 'Home', href: '/', submenu: null },
        {
            label: 'SULTRA', href: '/sultra', submenu: [
                { label: 'Show All', href: '/sultra' },
                { label: 'Kendari', href: '/sultra/kendari' },
                { label: 'Konawe', href: '/sultra/konawe' },
                { label: 'Kolaka', href: '/sultra/kolaka' },
                { label: 'Muna & Muna Barat', href: '/sultra/muna' },
                { label: 'Baubau', href: '/sultra/baubau' },
                { label: 'Kepulauan Buton', href: '/sultra/buton' },
            ]
        },
        { label: 'Ekonomi', href: '/ekonomi', submenu: null },
        {
            label: 'Hukum & Politik', href: '/hukum-politik', submenu: [
                { label: 'Hukum', href: '/hukum' },
                { label: 'Politik', href: '/politik' },
            ]
        },
        { label: 'Olahraga', href: '/olahraga', submenu: null },
        { label: 'Nasional', href: '/nasional', submenu: null },
        { label: 'Hiburan & Life Style', href: '/hiburan', submenu: null },
        { label: 'Artikel & ADV', href: '/artikel', submenu: null },
        { label: 'Tentang Kami', href: '/tentang-kami', submenu: null },
    ]

    const toggleSubmenu = (label: any) => {
        setExpandedMenu(expandedMenu === label ? null : label)
    }

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden overflow-y-auto',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-sky-600 text-white">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-sky-700 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                {item.submenu ? (
                                    <div>
                                        <button
                                            onClick={() => toggleSubmenu(item.label)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                                        >
                                            <span>{item.label}</span>
                                            <ChevronRight
                                                className={cn(
                                                    'w-4 h-4 transition-transform',
                                                    expandedMenu === item.label && 'rotate-90'
                                                )}
                                            />
                                        </button>
                                        {expandedMenu === item.label && (
                                            <ul className="ml-4 mt-1 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.href}>
                                                        <Link
                                                            href={subItem.href}
                                                            onClick={onClose}
                                                            className="block px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg transition text-sm"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="block px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default MobileSidebar
