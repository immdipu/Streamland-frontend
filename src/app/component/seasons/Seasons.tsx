"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import clsx from "clsx";
import Episode from "./Episodes";
import { SiVlcmediaplayer } from "react-icons/si";
import { seasonsProps, singleEpisodeTypes } from "@/types/types";
import SmallLoader from "../loader/SmallLoader";

import { useRouter } from "next/navigation";

const getEpisode = async function getSingleTv(
  tv_id: string,
  currSea: string,
  currEpiso: number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/3/tv/${tv_id}/season/${currSea}/episode/${currEpiso}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getAllEpisodes = async function getAllTvEpisodes(
  tv_id: string,
  currSea: string,
  totalEpisodes: number
) {
  const batchSize = Math.min(50, totalEpisodes); // Number of episodes to load initially (limited to totalEpisodes if less than 50)
  const episodes = [];

  // Fetch all episodes at once if the total number of episodes is less than or equal to 50
  if (batchSize >= totalEpisodes) {
    for (let i = 1; i <= totalEpisodes; i++) {
      try {
        const episode = await getEpisode(tv_id, currSea, i);
        episodes.push(episode);
      } catch (error) {
        console.error(`Failed to fetch episode ${i}:`, error);
        episodes.push(null); // Push null or any placeholder value for the failed episode
      }
    }
  } else {
    // Fetch the initial batch of episodes
    for (let i = 1; i <= batchSize; i++) {
      try {
        const episode = await getEpisode(tv_id, currSea, i);
        episodes.push(episode);
      } catch (error) {
        console.error(`Failed to fetch episode ${i}:`, error);
        episodes.push(null); // Push null or any placeholder value for the failed episode
      }
    }

    // Fetch the remaining episodes one by one
    for (let i = batchSize + 1; i <= totalEpisodes; i++) {
      try {
        const episode = await getEpisode(tv_id, currSea, i);
        episodes.push(episode);
      } catch (error) {
        console.error(`Failed to fetch episode ${i}:`, error);
        episodes.push(null); // Push null or any placeholder value for the failed episode
      }
    }
  }

  return episodes as singleEpisodeTypes[];
};

const Seasons = ({ seasons }: { seasons?: seasonsProps[] }) => {
  const params = useParams();
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
  const [EpisodeLoading, setEpisodeLoading] = useState(false);

  const router = useRouter();

  const [allEpisodes, setAllEpisodes] = useState<singleEpisodeTypes[] | null>(
    null
  );

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

  useEffect(() => {
    const fetchData = async () => {
      setEpisodeLoading(true);
      try {
        const allEpisodes = await getAllEpisodes(
          params.id,
          SeasonId ? SeasonId : seasons![0].season_number.toString(),
          TotalEpisodes ? parseFloat(TotalEpisodes) : seasons![0].episode_count
        );

        setAllEpisodes(allEpisodes);
        setEpisodeLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEpisodeLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SeasonId, TotalEpisodes]);

  const HanldeClick = () => {
    localStorage.setItem("tvId", params.id);
    setShowOverlay(false);
  };

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
                  {parseInt(SeasonId) < 10 ? `S0${SeasonId}` : "S" + SeasonId}
                </span>
                <span className="font-light max-md:text-sm">
                  {parseInt(currentEpisode) < 10
                    ? `e0${currentEpisode}`
                    : "e" + currentEpisode}
                </span>
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
              src={`https://autoembed.to/tv/tmdb/${params.id}-${
                SeasonId ? SeasonId : 1
              }-${currentEpisode ? currentEpisode : 1}`}
              width="100%"
              height="100%"
              allowFullScreen
              className="h-full full"
            />
          </div>
          <div className=" w-[450px] max-md:w-full  py-6 px-3 ">
            <section className="bg-neutral-800 h-full overflow-y-auto rounded-3xl py-5 px-4">
              <section
                className="flex items-center relative  bg-_black_bg hover:bg-opacity-60 cursor-pointer justify-center rounded-3xl"
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
                    "bg-_black_bg border border-neutral-500 border-opacity-25 absolute mt-2 shadow-lg  top-8 w-full overflow-y-auto duration-200 transition-all ease-in-out  flex flex-col  rounded-3xl seasonScroll",
                    showSeasondropdown ? "max-h-60 py-3 px-3" : "p-0 max-h-0"
                  )}
                  ref={Seasondropdown}
                >
                  {seasons?.map((item) => {
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
                {EpisodeLoading ? (
                  <>
                    <div className="grid h-full place-content-center">
                      <SmallLoader size={50} />
                    </div>
                  </>
                ) : (
                  <>
                    {allEpisodes &&
                      allEpisodes.map((item) => {
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
