import React from "react";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg p-4">
            <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-8">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
