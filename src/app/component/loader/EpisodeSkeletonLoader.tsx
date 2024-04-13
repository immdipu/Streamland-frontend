import React from "react";

const EpisodeSkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
      <div className="w-full bg-_black_bg animate-pulse h-10 rounded-full" />
    </div>
  );
};

export default EpisodeSkeletonLoader;
