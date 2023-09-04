import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BsCalendar2Week } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import Skeleton from "react-loading-skeleton"; // Import Skeleton

const ProfileCardSkeleton = ({}) => {
  return (
    <div className="flex max-md:flex-col pl-5 py-7 max-md:mx-4 mx-11 bg-neutral-800 border-b-_welcometext_lightblue border-b border-opacity-20  rounded-t-lg">
      <div className="w-48 h-48  rounded-md">
        <Skeleton
          baseColor="#4a4848"
          highlightColor="#605b5b"
          height={200}
          width={200}
        />
      </div>
      <div className="mt-4 pl-7 w-full max-md:pl-0 max-md:mt-2">
        <div className=" w-full flex justify-between">
          <h4 className="font-semibold  text-xl  flex items-center pb-0">
            <Skeleton
              baseColor="#4a4848"
              highlightColor="#605b5b"
              width={150}
              height={30}
            />
          </h4>
          <div className="mr-10">
            <Skeleton
              baseColor="#4a4848"
              highlightColor="#605b5b"
              width={100}
              height={32}
            />
          </div>
        </div>
        <p className=" mb-2 pb-2 ">
          <Skeleton baseColor="#4a4848" highlightColor="#605b5b" width={80} />
        </p>
        <section>
          <p className="flex items-center mb-3">
            <BsCalendar2Week className="text-neutral-300 mr-3" />
            <Skeleton baseColor="#4a4848" highlightColor="#605b5b" width={80} />
          </p>
          <p className="flex items-center mb-2 -translate-x-[2px]">
            <HiMail className="text-neutral-300 mr-3 text-xl " />
            <Skeleton baseColor="#4a4848" highlightColor="#605b5b" width={80} />
          </p>
          <div className="flex items-center mb-2 mt-3 -translate-x-[2px]">
            <BiMoviePlay className="text-neutral-300 mr-3 text-xl " />
            <Skeleton
              baseColor="#4a4848"
              highlightColor="#605b5b"
              width={80}
              height={24}
            />
          </div>
          <div className="flex items-center mt-4 gap-8 mb-2  translate-x-[4px]">
            <div>
              <Skeleton
                baseColor="#4a4848"
                highlightColor="#605b5b"
                width={40}
                height={24}
              />
            </div>
            <div className="">
              <Skeleton
                baseColor="#4a4848"
                highlightColor="#605b5b"
                width={40}
                height={24}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
