"use client";
import React from "react";
import Image from "next/image";
import { NowPlayingResponse } from "@/types/types";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GiRoundStar } from "react-icons/gi";
import Logo from "../../../../public/cinemaalogo.png";
import Images from "../ImageComponent/Image";
import Tooltip from "@mui/material/Tooltip";
import { TbPlaylistAdd } from "react-icons/tb";
import { useAppSelector } from "@/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { toast } from "react-hot-toast";
import { AddMediaDataTypes } from "@/types/userTypes";

const SingleCard: React.FC<NowPlayingResponse> = ({
  id,
  adult,
  backdrop_path,
  genre_ids,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  video,
  vote_average,
  vote_count,
}) => {
  const user = useAppSelector((state) => state.auth);

  const AddtoWatchlist = useMutation(
    (data: AddMediaDataTypes) => userApis.AddMedia(data),
    {
      onSuccess: (data) => {
        toast.success("Added to your watchlist");
      },
      onError: (data: any) => {
        if (data.response.data) {
          toast.error(data.response.data);
        } else {
          toast.error("Failed to add");
        }
      },
    }
  );

  return (
    <>
      <div className=" rounded-lg group relative flex-grow-0 w-36 max-md:w-28 flex-shrink-0">
        <Tooltip title="Add to Watchlist">
          <div
            onClick={() => {
              let data: AddMediaDataTypes = {
                id,
                title,
                original_title,
                backdrop_path,
                poster_path,
                media_type: "movie",
                release_date,
                vote_average,
              };
              if (user.isUserAuthenticated) {
                AddtoWatchlist.mutate(data);
              } else {
                toast.error("To save Watchlist Login first");
              }
            }}
            className="w-7 hidden group-hover:grid absolute z-20 h-7 top-2 left-2 border place-content-center border-neutral-500 border-opacity-50  bg-neutral-800 bg-opacity-40 rounded-md"
          >
            {AddtoWatchlist.isLoading ? (
              <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-blue-700 border-t-transparent" />
            ) : (
              <TbPlaylistAdd className="text-2xl text-neutral-300" />
            )}
          </div>
        </Tooltip>
        <Link href={`/movie/${id}`} prefetch={false}>
          {poster_path ? (
            <Images
              src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
              width={125}
              height={0}
              alt={title}
            />
          ) : (
            <Images src={Logo.src} width={500} height={500} alt={title} />
          )}

          <h3
            id={`movie${id}`}
            className="text-base max-md:text-xs py-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium  text-white"
          >
            {title}
          </h3>
          <ReactTooltip
            anchorSelect={`#movie${id}`}
            place="bottom"
            content={title}
          />
          <div className="flex items-center justify-between text-xs">
            <div className="flex  items-center gap-2">
              <p className="text-_light_white max-md:text-xxs font-normal ">
                {release_date?.split("-")[0]}
              </p>
              <p className="flex gap-1 max-md:text-xxs  text-_light_white items-center">
                <span>{vote_average?.toFixed(1)}</span>
                <GiRoundStar className="text-yellow-500 mb-[1px]" />
              </p>
            </div>

            <span className=" max-md:text-xxs border-_light_white tracking-wider border-[1px] border-opacity-25 font-thin max-md:px-1 max-md:py-0 px-2 rounded-md py-1 scale-90 text-_white">
              Movie
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SingleCard;
