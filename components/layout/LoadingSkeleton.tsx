import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
    count?: number
    featured?: boolean
    className?: string
}

function NewsCardSkeleton({ featured = false }: { featured?: boolean }) {
    return (
        <div
            className={cn(
                "bg-white rounded-lg  overflow-hidden shadow-sm h-full flex flex-col"
            )}
        >
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-4 flex-1 flex flex-col  ">
                <Skeleton className="h-4 w-20 mb-3 rounded-full" />
                <Skeleton
                    className={cn(
                        "mb-2 rounded",
                        featured ? "h-6 w-full" : "h-5 w-full"
                    )}
                />
                <Skeleton
                    className={cn(
                        "mb-2 rounded",
                        featured ? "h-6 w-3/4" : "h-5 w-3/4"
                    )}
                />
                <Skeleton className="h-4 w-full mb-2 rounded" />
                <Skeleton className="h-4 w-2/3 mb-3 rounded" />
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                </div>
            </div>
        </div>
    )
}

function LoadingSkeleton({
    count = 2,
    featured = false,
    className,
}: LoadingSkeletonProps) {
    return (
        <div className="flex  justify-center  ">
            <div
                className={cn("grid gap-4  sm:grid-cols-2 lg:grid-cols-3", className)}
                aria-label="Loading content"
            >
                {Array.from({ length: count }).map((_, i) => (
                    <NewsCardSkeleton key={i} featured={i === 0 && featured} />
                ))}
            </div>
        </div>
    )
}

export { LoadingSkeleton, NewsCardSkeleton }
