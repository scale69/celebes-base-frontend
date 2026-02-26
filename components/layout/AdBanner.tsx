import { cn } from '@/lib/utils'
import { Ads } from '@/types/data'
import { AdBannerProps } from '@/types/props'
import Image from 'next/image'



const AdBanner = ({ size = 'inline', title = 'Iklan', className }: AdBannerProps) => {
    const replaceSize = size.replace(/\s/g, '').toLowerCase() as string
    const sizeClasses = {
        inline: 'w-full h-24 md:h-28',
        leftsidebar: 'w-full h-98',
        rightsidebar: 'w-full h-98',
        header: 'w-full lg:w-98 h-32 ',
    }

    return (
        <div>
            <div className={cn(
                'bg-gradient-to-br  from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden',
                sizeClasses[replaceSize as keyof typeof sizeClasses],
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
