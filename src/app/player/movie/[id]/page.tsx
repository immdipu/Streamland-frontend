"use client";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinemaa | Player",
};

const page = ({ params }: any) => {
  return (
    <>
      <div className="h-[80vh] pt-24">
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

export default page;
