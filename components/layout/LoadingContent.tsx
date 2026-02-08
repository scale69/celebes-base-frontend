import { Skeleton } from "../ui/skeleton";

export default function LoadingContent() {
    return (
        <div className="flex justify-center w-full h-screen p-5">
            <div className="  h-full">
                <div className="bg-white rounded-lg  overflow-hidden shadow-sm h-[600px] w-[900px] flex flex-col">
                    <Skeleton className="h-50 w-full rounded-none" />
                    <div className="p-4 flex-1 flex flex-col  ">
                        <Skeleton className="h-4 w-20 mb-3 rounded-full" />
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
            </div>
        </div>

    );
}
