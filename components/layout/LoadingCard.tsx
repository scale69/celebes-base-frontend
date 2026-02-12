import { Skeleton } from "../ui/skeleton";

export default function LoadingCard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:justify-center lg:items-center gap-5 w-full ">
            {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="bg-white rounded-lg  overflow-hidden shadow-sm md:w-  lg:w-72 xl:w-90 flex flex-col">
                    <Skeleton className="h-32 w-full rounded-none" />
                    <div className="p-4 flex-1 flex flex-col  ">
                        <Skeleton className="h-4 w-20 mb-3 rounded-full" />
                        <Skeleton className="mb-2 rounded" />
                        <Skeleton className="mb-2 rounded" />
                        <Skeleton className="h-4 w-full mb-2 rounded" />
                        <Skeleton className="h-4 w-2/3 mb-3 rounded" />
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <Skeleton className="h-3 w-24 rounded" />
                            <Skeleton className="h-3 w-20 rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}
