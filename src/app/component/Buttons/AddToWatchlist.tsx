import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AddMediaDataTypes } from "@/types/userTypes";
import { userApis } from "@/app/userApi";
import { TbPlaylistAdd } from "react-icons/tb";
import { useAppSelector } from "@/redux/hooks";

const AddToWatchlist: React.FC<AddMediaDataTypes> = ({
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
    </>
  );
};

export default AddToWatchlist;
