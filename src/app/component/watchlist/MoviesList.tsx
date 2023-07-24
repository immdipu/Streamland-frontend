"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import { GiRoundStar } from "react-icons/gi";

const MoviesList = () => {
  //   const { isLoading, data, error } = useQuery(["watchlist"], () =>
  //     userApis.GetAllMedia()
  //   );
  //   if (isLoading) {
  //     return <div>Loading......</div>;
  //   }
  //   console.log(data);
  return (
    <div>
      <h2 className="text-2xl mt-5">Movies Watchlist</h2>
      <section className="mt-10 ">
        <div>
          <div className="flex gap-5 mr-20 bg-opacity-40 bg-neutral-800">
            <Images
              src={`https://image.tmdb.org/t/p/w200/gPbM0MK8CP8A174rmUwGsADNYKD.jpg}`}
              width={125}
              height={0}
              alt="moviess"
              rounded="0"
            />
            <div>
              <h3 className="text-2xl mt-2 ">
                <span className="font-light text-xl">1.</span> Transformet the
                fallen Night and what the hell
              </h3>
              <div className="flex flex-col justify-between border">
                <div className="flex items-center  gap-6 ml-6 mt-2 text-xs">
                  <div className="flex  items-center gap-2">
                    <p className="text-_light_white max-md:text-xxs text-sm font-normal ">
                      {/* {release_date?.split("-")[0]} */} 2022
                    </p>
                    <p className="flex gap-1 max-md:text-xxs text-sm  text-_light_white items-center">
                      {/* <span>{vote_average?.toFixed(1)}</span> */}
                      <span>5.2</span>
                      <GiRoundStar className="text-yellow-500 mb-[1px]" />
                    </p>
                  </div>

                  <span className=" max-md:text-xxs text-sm border-_light_white tracking-wider border-[1px] border-opacity-25 font-thin max-md:px-1 max-md:py-0 px-2 rounded-md py-1 scale-90 text-_white">
                    Movie
                  </span>
                </div>
                <section>
                  <Link href={"/12548"}>Watch</Link>
                  <button>Remove</button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviesList;
