"use client";
import PlayerTopToolTip from "@/app/component/PlayerTopTooltip/PlayerTopToolTip";
import PlayerButton from "@/app/component/seasons/atoms/PlayerButton";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import { AddMediaDataTypes } from "@/types/userTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = ({ params }: any) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const user = useAppSelector((state) => state.auth);
  const [player, setPlayer] = useState<1 | 2>(1);

  const { data, isLoading } = useQuery(["getMovie", params.id], async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  });

  const AddtoWatchlist = useMutation((data: AddMediaDataTypes) =>
    userApis.AddMedia(data)
  );

  const HanldeClick = () => {
    localStorage.setItem("movieId", params.id);
    const datas: AddMediaDataTypes = {
      id: params.id,
      title: data?.title,
      original_title: data?.original_title,
      backdrop_path: data?.backdrop_path,
      poster_path: data?.poster_path,
      media_type: "movie",
      release_date: data?.release_date,
      vote_average: data?.vote_average,
      type: "history",
    };
    if (user.isUserAuthenticated) {
      AddtoWatchlist.mutate(datas);
    }
    setShowOverlay(false);
  };
  return (
    <>
      <div className="pt-20 ">
        <div className=" ">
          <div className="-ml-14 px-5 mb-2 max-md:flex-col max-md:pt-5 max-md:gap-9 flex justify-between max-lg:ml-0">
            <PlayerButton player={player} setPlayer={setPlayer} />
            <PlayerTopToolTip />
          </div>
        </div>
        <div className="h-[80vh]  relative">
          {showOverlay && (
            <div
              className="absolute inset-0 bg-black opacity-0"
              onClick={HanldeClick}
            ></div>
          )}
          {player === 1 && (
            <iframe
              // src={`https://autoembed.to/movie/tmdb/${params.id}`}
              src={`https://www.2embed.cc/embed/${params.id}`}
              width="100%"
              height="100%"
              allowFullScreen
              className="full"
            />
          )}
          {player === 2 && (
            <iframe
              src={`https://autoembed.co/movie/tmdb/${params.id}`}
              width="100%"
              height="100%"
              allowFullScreen
              className="full"
            />
          )}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Page;
