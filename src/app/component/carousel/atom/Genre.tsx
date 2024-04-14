import React from "react";
import GenresChip from "../../ui/GenresChip";
import { MoviesgenresObject, TvgenresObject } from "@/utils/genreData";

interface GenreProps {
  data: number[];
  media_type: string;
}

const Genre: React.FC<GenreProps> = ({ data, media_type }) => {
  return (
    <>
      {data?.map((id) => {
        return (
          <GenresChip
            Type={media_type === "movie" ? "MOVIE" : "TV"}
            id={id}
            key={id}
            name={
              media_type === "movie"
                ? MoviesgenresObject[id]
                : TvgenresObject[id]
            }
          />
        );
      })}
    </>
  );
};

export default Genre;
