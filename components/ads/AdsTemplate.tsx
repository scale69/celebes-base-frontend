"use client"
import { useQuery } from "@tanstack/react-query";
import AdBanner from "../layout/AdBanner";
import { fetchAds } from "@/lib/axios/action/ads";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Ads } from "@/types/data";


type AdsProps = {
    placement: "inline" | "header" | "left sidebar" | "right sidebar",
    location?: "top" | "bottom"
}

export default function AdsTemplate({ placement, location }: AdsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

    const url = `${pathname}?${searchParams.toString()}`;
    const fullURL = (() => {
        const constructed = new URL(url, typeof window !== "undefined" ? window.location.origin : backendUrl).href;
        return constructed.endsWith('?') ? constructed.slice(0, -1) : constructed;
    })();

    // Mendapatkan pathname pertama dari URL, tanpa leading atau trailing slash kosong
    // Contoh: "/sultra/kantah-baubau-rampungkan-seluruh-tunggakan-layanan?" => "sultra"
    const getPatname = pathname?.split('/').filter(Boolean)[0];

    const { data, isLoading } = useQuery({
        queryKey: ["ads", placement, getPatname],
        queryFn: () => fetchAds(placement, getPatname),
    });

    if (isLoading) return null

    if (!data) return null

    if (data.length <= 0) return <AdBanner size={placement} title="Iklan" className="mb-4" />


    return (
        <div
            className="flex  flex-col gap-4 "
            role="complementary"
            aria-label="Advertisement"

        >
            {(placement === "right sidebar") && (
                location === "top" ? (
                    data.slice(0, 1).map((ads: Ads) => (
                        <div key={ads?.id} className='bg-gradient-to-br w-full  from-gray-100  to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden'

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
                    ))
                ) : (
                    location === "bottom" &&
                    data.slice(1).map((ads: Ads) => (
                        <div key={ads?.id} className='bg-gradient-to-br w-full from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden'>
                            <Image
                                src={`${ads.image}`}
                                alt={ads.placement}
                                width={400}
                                height={700}
                                unoptimized
                                className="w-full h-full"
                            />
                        </div>
                    ))
                )
            )}

            {(placement === "left sidebar") && (location === "bottom" ?
                (
                    data.slice(0, 2).map((ads: Ads) => (
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
                    ))
                ) : (
                    data.map((ads: Ads) => (
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
                    ))
                )
            )}
            {(placement === "inline") && (
                data.slice(0, 1).map((ads: Ads) => (
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
                ))
            )}
            {(placement === "header") && (
                <>
                    {data.length > 0 ? (
                        data.slice(0, 1).map((ads: Ads) => (
                            <div
                                key={ads.id}
                                className="bg-gradient-to-br w-full h-32 from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden"
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
                        ))
                    ) : (
                        <div className="hidden lg:mb-5 lg:block">
                            <AdBanner size="header" title="Iklan" className="" />
                        </div>
                    )}
                </>
            )}

        </div>
    )
}