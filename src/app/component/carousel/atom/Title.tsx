import React from "react";

interface TitleProps {
  media_type: string;
  title: string | undefined;
  original_title: string | undefined;
  name: string | undefined;
}

const Title: React.FC<TitleProps> = ({
  media_type,
  title,
  original_title,
  name,
}) => {
  return (
    <h3 className="font-semibold line-clamp-2 max-md:text-2xl leading-[45px] max-xl:text-xl text-start font-Inter text-3xl text-_sidenav_bg">
      {media_type === "movie" ? title || original_title : name}
    </h3>
  );
};

export default Title;
