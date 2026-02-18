export default function Loading() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            {/* Category Badge Skeleton */}
            <div className="mb-4">
                <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            </div>

            {/* Title Skeleton */}
            <div className="mb-4 space-y-3">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Meta Info Skeleton */}
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="mb-6">
                <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    )
}
