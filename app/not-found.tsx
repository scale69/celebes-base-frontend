import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-lg shadow-sm  mx-auto max-w-lg">
            <svg
                className="w-16 h-16 text-sky-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="24" cy="24" r="22" strokeWidth="2" className="text-sky-100" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M24 30v-6M24 18h.01"
                />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6 text-center">
                Maaf, halaman atau sumber daya yang Anda cari tidak dapat ditemukan.<br />
                Cek kembali URL atau kembali ke halaman utama.
            </p>
            <Link
                href="/"
                className="inline-block px-5 py-2 rounded bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    )
}