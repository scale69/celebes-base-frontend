import { cn } from '@/lib/utils'
import { Ads } from '@/types/data'
import { AdBannerProps } from '@/types/props'
import Image from 'next/image'



const AdBanner = ({ size = 'horizontal', title = 'Iklan', className }: AdBannerProps) => {
    const sizeClasses = {
        horizontal: 'w-full h-24 md:h-28',
        sidebar: 'w-full h-64',
        square: 'w-full aspect-square',
        header: 'w-72 h-32 ',
    }



    return (
        <div>
            <div className={cn(
                'bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden',
                sizeClasses[size],
                className
            )}>
                <div className="text-center">
                    <p className="text-gray-500 font-semibold text-sm">{title}</p>
                    <p className="text-gray-400 text-xs mt-1">Advertisement Space</p>
                </div>

            </div>
        </div>
    )
}

export default AdBanner
