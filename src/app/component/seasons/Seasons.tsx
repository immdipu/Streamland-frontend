/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import clsx from "clsx";
import Episode from "./Episodes";
import { SiVlcmediaplayer } from "react-icons/si";
import { BsQuestionCircle } from "react-icons/bs";
import { seasonsProps } from "@/types/types";
import SmallLoader from "../loader/SmallLoader";
import { Apis } from "@/app/tmdbApi/TmdbApi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AddMediaDataTypes } from "@/types/userTypes";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import PlayerTopToolTip from "../PlayerTopTooltip/PlayerTopToolTip";

import { useRouter } from "next/navigation";

const Seasons = ({
  seasons,
  Tvshowdata,
}: {
  Tvshowdata: any;
  seasons?: seasonsProps[];
}) => {
  const params = useParams();
  const user = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const SeasonId = searchParams.get("s");
  const TotalEpisodes = searchParams.get("e");
  const currentEpisode = searchParams.get("ce");
  const [showSeasondropdown, setShowSeasondropdown] = useState(false);
  const Seasondropdown = useRef<HTMLElement>(null);
  const SeasonBtn = useRef<HTMLElement>(null);
  const SeasonBtn2 = useRef<HTMLDivElement>(null);
  const SeasonBtn4 = useRef<HTMLDivElement>(null);
  const SeasonBtn3 = useRef<HTMLParagraphElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleOutSideClick = (e: Event) => {
      if (
        showSeasondropdown &&
        e.target !== Seasondropdown.current &&
        e.target !== SeasonBtn.current &&
        e.target !== SeasonBtn2.current &&
        e.target !== SeasonBtn3.current &&
        e.target !== SeasonBtn4.current
      ) {
        setShowSeasondropdown(false);
      }
    };
    window.addEventListener("click", handleOutSideClick);
    return () => {
      window.removeEventListener("click", handleOutSideClick);
    };
  }, [showSeasondropdown]);

  const AddtoWatchlist = useMutation((data: AddMediaDataTypes) =>
    userApis.AddMedia(data)
  );

  const HanldeClick = () => {
    localStorage.setItem("tvId", params.id as string);
    const datas: AddMediaDataTypes = {
      id: params.id as string,
      name: Tvshowdata?.name,
      original_title: Tvshowdata?.original_name,
      backdrop_path: Tvshowdata?.backdrop_path,
      poster_path: Tvshowdata?.poster_path,
      media_type: "tv",
      first_air_date: Tvshowdata?.first_air_date,
      vote_average: Tvshowdata?.vote_average,
      type: "history",
    };
    if (user.isUserAuthenticated) {
      AddtoWatchlist.mutate(datas);
    }
    setShowOverlay(false);
  };

  useEffect(() => {
    if (!SeasonId || !TotalEpisodes) {
      router.push(
        `/tv/${params.id}/seasons?s=${seasons![0].season_number}&e=${
          seasons![0].episode_count
        }&ce=1`
      );
    }
  }, [SeasonId, TotalEpisodes, params.id]);

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["allEpisodes", params.id, SeasonId, TotalEpisodes],
    () => Apis.GetAllEpisodes(params.id as string, SeasonId, TotalEpisodes),
    {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  return (
    <div>
      <div>
        {SeasonId && currentEpisode && (
          <>
            <div className="flex gap-2 items-center mt-3">
              <h3 className="w-fit pl-14 max-md:pl-2 max-md:text-sm text-neutral-400 flex items-center text-lg font-medium gap-3">
                <SiVlcmediaplayer className="text-orange-400 " />
                Now Playing :
              </h3>
              <div>
                <span className="font-light max-md:text-sm">
                  {parseInt(SeasonId.toString()) < 10
                    ? `S0${SeasonId}`
                    : "S" + SeasonId}
                </span>
                <span className="font-light max-md:text-sm">
                  {parseInt(currentEpisode) < 10
                    ? `e0${currentEpisode}`
                    : "e" + currentEpisode}
                </span>
              </div>
              <div className="flex gap-2  group ml-5 items-center float-right">
                <PlayerTopToolTip />
              </div>
            </div>
          </>
        )}
      </div>
      <>
        <div className="flex h-[35rem] max-md:h-full max-md:flex-col">
          <div className=" relative w-full py-6 flex-grow-1  max-md:h-[25rem] max-md:flex-shrink-0">
            {showOverlay && (
              <div
                className="absolute inset-0  bg-black opacity-0"
                onClick={HanldeClick}
              ></div>
            )}
            <iframe
              // src={`https://autoembed.to/tv/tmdb/${params.id}-${
              //   SeasonId ? SeasonId : 1
              // }-${currentEpisode ? currentEpisode : 1}`}
              src={`https://www.2embed.cc/embedtv/${params.id}&s=${
                SeasonId ? SeasonId : 1
              }&e=${currentEpisode ? currentEpisode : 1}`}
              width="100%"
              height="100%"
              allowFullScreen
              className="h-full full"
            />
          </div>
          <div className=" w-[450px] max-md:w-full  py-6 px-3 ">
            <section className="bg-neutral-800 h-full overflow-y-auto rounded-3xl py-5 px-4">
              <section
                className="flex items-center relative  bg-blue-700 hover:bg-opacity-60 cursor-pointer justify-center rounded-3xl"
                onClick={() => setShowSeasondropdown(!showSeasondropdown)}
                ref={SeasonBtn}
              >
                <div
                  className="flex items-center gap-2 py-1 select-none"
                  ref={SeasonBtn2}
                >
                  <p className="text-neutral-300 font-normal" ref={SeasonBtn3}>
                    Season {SeasonId ?? seasons![0].season_number}
                  </p>
                  <div
                    className="border-transparent border-[6px] border-t-neutral-400 w-0 h-0 mt-2"
                    ref={SeasonBtn4}
                  />
                </div>
                {/* dropdown */}
                <section
                  className={clsx(
                    "bg-_black_bg border border-neutral-500 z-10 border-opacity-25 absolute mt-2 shadow-lg  top-8 w-full overflow-y-auto duration-200 transition-all ease-in-out  flex flex-col  rounded-3xl seasonScroll",
                    showSeasondropdown ? "max-h-60 py-3 px-3" : "p-0 max-h-0"
                  )}
                  ref={Seasondropdown}
                >
                  {seasons?.map((item) => {
                    console.log("item", item);
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          router.push(
                            `/tv/${params.id}/seasons?s=${item.season_number}&e=${item.episode_count}&ce=1`
                          );
                        }}
                        className={clsx(
                          " text-neutral-400 py-1 my-1 text-center font-light  rounded-3xl  px-2 hover:text-_sidenav_bg   duration-200 transition-all ease-linear hover:shadow-lg",
                          SeasonId === item.season_number.toString()
                            ? "bg-_blue bg-opacity-50 font-normal text-white"
                            : "bg-inherit hover:bg-neutral-800"
                        )}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </section>
              </section>
              {/* Episodes */}
              <section className="w-80 max-md:w-full   h-[26rem] mt-4 seasonScroll overflow-y-auto flex gap-1 flex-col">
                {isLoading || isFetching ? (
                  <>
                    <div className="grid h-full place-content-center">
                      <SmallLoader size={50} />
                    </div>
                  </>
                ) : (
                  <>
                    {data &&
                      SeasonId &&
                      TotalEpisodes &&
                      data.map((item) => {
                        if (item === null) return;
                        return <Episode {...item} key={item.id} />;
                      })}
                  </>
                )}
              </section>
            </section>
          </div>
        </div>

        <section className="flex flex-wrap gap-3 max-md:pl-1 py-5 pl-14 mt-10"></section>
      </>
      <section className="flex flex-col gap-5 pb-10 mt-10"></section>
    </div>
  );
};

export default Seasons;
