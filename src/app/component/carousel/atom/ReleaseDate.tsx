import React from "react";

import moment from "moment";

interface ReleaseDateProps {
  media_type: string;
  release_date: string | undefined;
  first_air_date: string | undefined;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({
  first_air_date,
  media_type,
  release_date,
}) => {
  return (
    <span className="text-_welcometext_lightblue ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-[2px] before:rounded-full before:h-[2px] font-Inter text-[13px]">
      {media_type === "movie" && release_date
        ? moment(release_date).format("YYYY")
        : ""}
      {media_type === "tv" && first_air_date
        ? moment(first_air_date).format("YYYY")
        : ""}
    </span>
  );
};

export default ReleaseDate;
