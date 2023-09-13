"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllMessagesSkeleton = () => {
  return (
    <section className="flex-grow pb-3 px-36 pr-52  w-full message-container overflow-y-scroll pt-3   ">
      <div className="flex justify-end">
        <Skeleton
          className="   rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={200}
        />
      </div>
      <div className="flex mt-1 justify-end">
        <Skeleton
          className="   rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={300}
        />
      </div>
      <div className="flex mt-5 justify-start">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={120}
        />
      </div>
      <div className="flex mt-5 justify-end">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={150}
        />
      </div>
      <div className="flex mt-5 justify-start">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={190}
        />
      </div>
      <div className="flex mt-1 justify-start">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={160}
        />
      </div>
      <div className="flex mt-5 justify-end">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={190}
        />
      </div>
      <div className="flex mt-1 justify-end">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={270}
        />
      </div>
      <div className="flex mt-5 justify-start">
        <Skeleton
          className="rounded-sm"
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={37}
          width={280}
        />
      </div>
    </section>
  );
};

export default AllMessagesSkeleton;
