import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
    const now = new Date();
    const year = now.getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            CELEBES SULTRA
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Portal berita terpercaya yang menyajikan informasi terkini dari
                            Sulawesi Tenggara dan seluruh Nusantara.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Menu Cepat
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/tentang-kami"
                                    className="hover:text-sky-400 transition"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/redaksi" className="hover:text-sky-400 transition">
                                    Redaksi
                                </Link>
                            </li>
                            <li>
                                <Link href="/pedoman" className="hover:text-sky-400 transition">
                                    Pedoman Media Siber
                                </Link>
                            </li>
                            <li>
                                <Link href="tentang-kami/#kontak" className="hover:text-sky-400 transition">
                                    Hubungi Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Kategori</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/sultra" className="hover:text-sky-400 transition">
                                    SULTRA
                                </Link>
                            </li>
                            <li>
                                <Link href="/ekonomi" className="hover:text-sky-400 transition">
                                    Ekonomi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/olahraga"
                                    className="hover:text-sky-400 transition"
                                >
                                    Olahraga
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nasional"
                                    className="hover:text-sky-400 transition"
                                >
                                    Nasional
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/internasional"
                                    className="hover:text-sky-400 transition"
                                >
                                    Internasional
                                </Link>
                            </li>
                            <li>
                                <Link href="/hiburan" className="hover:text-sky-400 transition">
                                    Hiburan & Life Style
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex  items-start gap-2">
                                {/* <Mail className="w-5 h-5 flex mt-0.5" /> */}
                                <div className=" ">
                                    <p className="font-medium">Email Redaksi:</p>
                                    <a
                                        href="mailto:ptcelebesnusantarautama@gmail.com"
                                        className="text-sky-400 hover:text-sky-300"
                                    >
                                        ptcelebesnusantarautama@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Alamat:</p>
                                <p className="text-gray-400">
                                    Jalan D.I Panjaitan Komplek BTN Pepabri Lepo-Lepo Indah, Blok A.10
                                    No. 20
                                    <br />
                                    Desa/Kelurahan Wundudopi, Kec. Baruga, Kota Kendari, Provinsi
                                    Sulawesi T enggara
                                    <br />
                                    Kode Pos: 93116
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs md:text-sm text-gray-500">
                    <p>&copy; {year} CELEBES NUSANTARA. All rights reserved.</p>
                    <Link href={"https://scale.web.id"} target="_blank" >Designed by Scale</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
