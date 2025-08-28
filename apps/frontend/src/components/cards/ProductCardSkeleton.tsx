import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton({ width }: { width: string }) {
  return (
    <div className={`group ${width}`}>
      <div className="relative">
        <Skeleton className="w-full h-72 bg-gray-200 rounded-md" />
      </div>
      <div className="p-2 pb-4">
        <Skeleton className="h-5 w-3/4 mb-2 bg-gray-200 rounded" />
        <Skeleton className="h-4 w-1/2 mb-4 bg-gray-200 rounded" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16 bg-gray-200 rounded" />
          <Skeleton className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
