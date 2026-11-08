import React from "react";

const RecipeCardSkeleton = () => {
  return (
    <div className="bg-base-100 border border-base-300 rounded-(--radius-box) overflow-hidden shadow-sm flex flex-col justify-between">
      {/* Image Skeleton */}
      <div className="skeleton h-48 w-full rounded-none" />

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Category Badge */}
        <div>
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>

        {/* Recipe Title */}
        <div className="skeleton h-6 w-3/4" />

        {/* Author and Comments Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-base-200">
          {/* Author Info */}
          <div className="flex items-center space-x-2">
            <div className="skeleton w-7 h-7 rounded-full" />
            <div className="skeleton h-3 w-20" />
          </div>

          {/* Comment Counter */}
          <div className="skeleton h-3 w-8" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
