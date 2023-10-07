"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddMediaDataTypes } from "@/types/userTypes";
import { userApis } from "@/app/userApi";
import { TbPlaylistAdd } from "react-icons/tb";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";

interface AddToWatchlistProps extends AddMediaDataTypes {
  showAddToWatchlist?: boolean;
}

const AddToWatchlist: React.FC<AddToWatchlistProps> = ({
  id,
  title,
  original_title,
  backdrop_path,
  poster_path,
  media_type,
  release_date,
  vote_average,
  name,
  first_air_date,
  showAddToWatchlist = false,
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
      <Tooltip title="Add to Watchlist">
        <div
          onClick={() => {
            let data: AddMediaDataTypes = {
              id,
              title,
              original_title,
              backdrop_path,
              poster_path,
              media_type,
              release_date,
              vote_average,
              name,
              first_air_date,
              type: "watchlist",
            };
            if (user.isUserAuthenticated) {
              AddtoWatchlist.mutate(data);
            } else {
              toast.error("To save Watchlist Login first");
            }
          }}
          className={clsx(
            "z-20  border place-content-center rounded-md ",
            showAddToWatchlist
              ? "grid w-fit py-1 px-2 border-_light_white border-opacity-30  hover:border-opacity-80 duration-150 ease-in transition-opacity"
              : " hidden group-hover:grid w-7 h-7 absolute bg-neutral-800 bg-opacity-40  border-neutral-500 border-opacity-50 top-2 left-2"
          )}
        >
          {AddtoWatchlist.isLoading ? (
            showAddToWatchlist ? (
              <button className="text-_light_white text-xs font-light">
                Adding...
              </button>
            ) : (
              <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-blue-700 border-t-transparent" />
            )
          ) : showAddToWatchlist ? (
            <button className="text-_light_white text-xs font-light">
              Add to Watchlist
            </button>
          ) : (
            <TbPlaylistAdd className="text-2xl text-neutral-300" />
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default AddToWatchlist;
