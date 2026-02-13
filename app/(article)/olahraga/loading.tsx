export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-10 w-48 bg-gray-200 rounded"></div>
            </div>

            {/* News Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                        {/* Image skeleton */}
                        <div className="w-full h-48 bg-gray-200"></div>

                        {/* Content skeleton */}
                        <div className="p-4 space-y-3">
                            <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
