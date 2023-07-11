"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import clsx from "clsx";
import Episode from "./Episodes";
import { seasonsProps, singleEpisodeTypes } from "@/types/types";

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
  const Episodes = searchParams.get("e");
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeSeason, setActiveSeason] = useState(SeasonId ?? "1");
  const [totalEpi, setTotalEpi] = useState(
    Episodes ? parseFloat(Episodes) : seasons![0].episode_count
  );

  const [allEpisodes, setAllEpisodes] = useState<singleEpisodeTypes[] | null>(
    null
  );

  useEffect(() => {
    setActiveSeason(SeasonId ?? seasons![0].season_number.toString());
    setTotalEpi(Episodes ? parseFloat(Episodes) : seasons![0].episode_count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SeasonId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEpisodes = await getAllEpisodes(
          params.id,
          activeSeason,
          totalEpi
        );
        console.log(allEpisodes);
        setAllEpisodes(allEpisodes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSeason, totalEpi]);

  const HanldeClick = () => {
    localStorage.setItem("tvId", params.id);
    setShowOverlay(false);
  };

  return (
    <div>
      <>
        <div className="h-[35rem] relative  py-6">
          {showOverlay && (
            <div
              className="absolute inset-0 bg-black opacity-0"
              onClick={HanldeClick}
            ></div>
          )}
          <iframe
            src={`https://autoembed.to/tv/tmdb/${params.id}-${SeasonId}-${currentEpisode}`}
            width="100%"
            height="100%"
            allowFullScreen
            className="full"
          />
        </div>

        <section className="flex flex-wrap gap-3 max-md:pl-1 py-5 pl-14 mt-10">
          {seasons?.map((item) => {
            return (
              <Link
                href={`/tv/${params.id}/seasons?s=${item.season_number}&e=${item.episode_count}`}
                key={item.id}
                className={clsx(
                  " text-_black_bg text-center py-1 font-medium px-2 rounded-md min-w-[35px] hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg",
                  activeSeason === item.season_number.toString()
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_sidenav_bg"
                )}
              >
                {activeSeason === item.season_number.toString()
                  ? `${item.name}`
                  : `${item.season_number}`}
              </Link>
            );
          })}
        </section>
      </>
      <section className="flex flex-col gap-5 pb-10 mt-10">
        {allEpisodes &&
          allEpisodes.map((item) => {
            if (item === null) return;
            return (
              <Episode
                setCurrentEpisode={setCurrentEpisode}
                {...item}
                key={item.id}
              />
            );
          })}
      </section>
    </div>
  );
};

export default Seasons;
