import { ShoppingCart } from "lucide-react";

export function ItemSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-72 mx-auto h-[26rem] mb-3 flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-40 bg-gray-200">
        {/* Bestseller skeleton (even if it might not appear) */}
        <span className="absolute top-2 left-2 bg-gray-300 text-transparent text-sm px-3 py-1 rounded-full">
          Bestseller
        </span>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

          {/* Tags Skeleton */}
          <div className="flex gap-3">
            <div className="bg-gray-200 my-2 px-2 py-[1px] rounded-2xl text-xs h-5 w-12"></div>
            <div className="bg-gray-200 my-2 px-2 py-[1px] rounded-2xl text-xs h-5 w-12"></div>
            <div className="bg-gray-200 my-2 px-2 py-[1px] rounded-2xl text-xs h-5 w-12"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mt-2">
            {/* Price Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full mt-1 bg-gray-200 text-transparent py-2 rounded-lg flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
