"use client"
import { useQuery } from "@tanstack/react-query";
import AdBanner from "../layout/AdBanner";
import { fetchAds } from "@/lib/axios/action/ads";
import LoadingCard from "../layout/LoadingCard";
import NoData from "../layout/NoData";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Ads } from "@/types/data";

export default function BannerAds({ placement, size }: { placement: string, size: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

    const url = `${pathname}?${searchParams.toString()}`;
    const fullURL = (() => {
        const constructed = new URL(url, typeof window !== "undefined" ? window.location.origin : backendUrl).href;
        return constructed.endsWith('?') ? constructed.slice(0, -1) : constructed;
    })();

    console.log(fullURL);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["ads", placement, fullURL],
        queryFn: () => fetchAds(placement, fullURL),
    });

    if (isLoading) return <LoadingCard />;
    if (isError)
        return (
            <NoData
                title="Artikel Tidak Ditemukan"
                message="Maaf, artikel yang Anda cari tidak ditemukan atau mungkin telah dihapus."
                backUrl="/"
                backLabel="Kembali ke Beranda"
            />
        );

    if (data.length <= 0) return <AdBanner size={size as "horizontal" | "sidebar" | "square" | "header" | undefined} title="Iklan" className="mb-4" />
    return (
        <div
            className="flex  flex-col gap-4 mb-8"
            role="complementary"
            aria-label="Advertisement"

        >
            {data.map((ads: Ads) => (
                <div key={ads.id} className='bg-gradient-to-br w-full  from-gray-100  to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden'

                >
                    <Image
                        src={`${ads.image}`}
                        alt={ads.placement}
                        width={400}
                        height={700}
                        unoptimized
                        className="w-full h-full"
                    />
                </div>
            ))}
        </div>
    )
}