
import { Users, Award, Target, Mail } from 'lucide-react'
import AdBanner from '@/components/layout/AdBanner'
import Image from 'next/image'

const TentangKamiPage = () => {

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    <nav className="text-sm text-gray-600 mb-6">
                        <span>Home</span> <span className="mx-2">/</span> <span className="text-sky-600 font-semibold">Tentang Kami</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <aside className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-20">
                                <AdBanner size="sidebar" title="Iklan" className="mb-4" />
                            </div>
                        </aside>

                        <div className="lg:col-span-7">
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                Tentang Kami
                            </h1>

                            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                                <Image src={'/logo.png'} alt='logo-cs' width={400} height={100} unoptimized />


                                <div className="prose max-w-none">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">CELEBES SULTRA</h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        CELEBES SULTRA adalah portal berita digital yang berdedikasi untuk menyajikan informasi terkini, akurat, dan terpercaya dari Sulawesi Tenggara dan seluruh Sultra. Kami berkomitmen untuk menjadi sumber berita yang kredibel dan dapat diandalkan oleh masyarakat.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Didirikan dengan visi menjadi media informasi terdepan, kami fokus pada penyampaian berita yang berimbang, mendalam, dan bermanfaat bagi pembaca. Tim redaksi kami terdiri dari jurnalis berpengalaman yang memiliki integritas tinggi dan komitmen terhadap jurnalisme berkualitas.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                                        <Target className="w-8 h-8 text-sky-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Visi</h3>
                                    <p className="text-gray-600 text-sm">
                                        Menjadi portal berita terpercaya dan terdepan di Sulawesi Tenggara
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                                        <Award className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Misi</h3>
                                    <p className="text-gray-600 text-sm">
                                        Menyajikan informasi berkualitas dengan integritas dan profesionalisme
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                                        <Users className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tim</h3>
                                    <p className="text-gray-600 text-sm">
                                        Jurnalis berpengalaman dengan dedikasi tinggi
                                    </p>
                                </div>
                            </div>

                            <div id='kontak' className="bg-white rounded-lg shadow-sm p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hubungi Kami</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-sky-600 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Email Redaksi</p>
                                            <a href="mailto:ptcelebesnusantarautama@gmail.com" className="text-sky-600 hover:text-sky-700">
                                                ptcelebesnusantarautama@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-sky-600 mt-1" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Alamat</p>
                                            <p className="text-gray-700">
                                                Jl. Example No. 123, Kendari<br />
                                                Sulawesi Tenggara, Indonesia 93111
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-3">
                            <div className="sticky top-20 space-y-6">
                                <AdBanner size="sidebar" title="Iklan" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default TentangKamiPage