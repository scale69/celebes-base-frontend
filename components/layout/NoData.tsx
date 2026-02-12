import { FileX } from 'lucide-react'
import Link from 'next/link'

interface NoDataProps {
    title?: string
    message?: string
    showBackButton?: boolean
    backUrl?: string
    backLabel?: string
}

export default function NoData({
    title = 'Berita Kosang',
    message = 'Tidak ada berita untuk saat ini.',
    showBackButton = true,
    backUrl = '/',
    backLabel = 'Kembali ke Beranda'
}: NoDataProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-sky-100 rounded-full blur-xl opacity-50"></div>
                        <div className="relative bg-sky-50 rounded-full p-6">
                            <FileX className="w-16 h-16 text-sky-600" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Title */}


                {/* Message */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Back Button */}
                {showBackButton && (
                    <Link
                        href={backUrl}
                        className="inline-flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        {backLabel}
                    </Link>
                )}
            </div>
        </div>
    )
}
