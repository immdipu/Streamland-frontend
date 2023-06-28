import React from "react";
import { castProps } from "@/types/types";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Logo from "../../../../public/cinemaalogo.png";
const SingleCastCard: React.FC<castProps> = ({
  cast_id,
  name,
  original_name,
  profile_path,
  character,
  credit_id,
}) => {
  return (
    <>
      <Link
        href={`cast/${cast_id}`}
        className=" rounded-lg flex-grow-0 w-36 flex-shrink-0 "
        prefetch={false}
      >
        {profile_path ? (
          <Images
            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
            width={125}
            height={0}
            alt={name}
          />
        ) : (
          <Images src={Logo.src} width={125} height={0} alt={name} />
        )}
        <h3
          id={`movie${cast_id}`}
          className="text-sm tracking-wide mt-3 whitespace-nowrap overflow-hidden text-ellipsis  text-white"
        >
          {name}
        </h3>
        <ReactTooltip
          anchorSelect={`#movie${cast_id}`}
          place="bottom"
          content={name}
        />
        <ReactTooltip
          anchorSelect={`#character${cast_id}`}
          place="top"
          content={character}
        />
        <h3
          id={`character${cast_id}`}
          className="text-xs mt-1 whitespace-nowrap overflow-hidden text-ellipsis font-light  text-white"
        >
          {character}
        </h3>
      </Link>
    </>
  );
};

export default SingleCastCard;
