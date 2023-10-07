"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import { userApis } from "@/app/userApi";
import { toast } from "react-hot-toast";
import { AddMediaDataTypes } from "@/types/userTypes";
import { useMutation } from "@tanstack/react-query";

const Page = ({ params }: any) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const user = useAppSelector((state) => state.auth);

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
      <div className="h-[80vh] pt-24 relative">
        {showOverlay && (
          <div
            className="absolute inset-0 bg-black opacity-0"
            onClick={HanldeClick}
          ></div>
        )}
        <iframe
          src={`https://autoembed.to/movie/tmdb/${params.id}`}
          width="100%"
          height="100%"
          allowFullScreen
          className="full"
        />
      </div>
    </>
  );
};

export default Page;
