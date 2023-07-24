import React from "react";

const LoadingAnimation = () => {
  return (
    <>
      <div>
        <div
          className="flex gap-5 max-md:mr-1 mr-20 bg-neutral-800 bg-opacity-40 animate-skeleton-loading"
          style={{
            animationDuration: "1.5s",
            animationIterationCount: "infinite",
          }}
        >
          {/* Skeleton Image */}
          <div className="shrink-0 bg-neutral-700  w-32 h-40"></div>

          {/* Skeleton Text */}
          <div className="flex flex-col flex-1">
            {/* Skeleton Title */}
            <div className="h-6 bg-neutral-700 w-2/3 rounded"></div>

            {/* Skeleton Meta Info */}
            <div className="flex items-center gap-6 mt-2">
              {/* Skeleton Release Date */}
              <div className="h-4 bg-neutral-700 w-12 rounded"></div>

              {/* Skeleton Rating */}
              <div className="h-4 bg-neutral-700 w-8 rounded"></div>
            </div>

            {/* Skeleton Buttons */}
            <section className="flex items-center mt-3 gap-6">
              {/* Skeleton Watch Button */}
              <div className="bg-neutral-700 px-5 py-2 rounded-md w-16"></div>

              {/* Skeleton Remove Button */}
              <div className="bg-neutral-700 px-5 py-2 rounded-md w-20"></div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
