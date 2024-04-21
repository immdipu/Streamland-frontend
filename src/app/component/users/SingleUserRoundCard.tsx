import Link from "next/link";
import { FC } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Images from "../ImageComponent/Image";

const SingleUserRoundCard: FC<OnlineUsersTypes> = ({
  _id,
  fullName,
  profilePic,
  role,
  username,
}) => {
  return (
    <Link
      href={`/profile/${username}`}
      prefetch={false}
      className="block  w-fit"
    >
      <div className="w-24 overflow-hidden shrink-0 h-24 rounded-full ">
        <Images
          src={profilePic}
          height={100}
          width={100}
          alt={fullName}
          ImageWidth={"full"}
          Imageheight={96}
          rounded="full"
          trendingPerson={true}
        />
      </div>
      <h3
        id={`person${_id}`}
        className="text-start  text-sm text-_white mt-2 w-24  max-md:text-xs overflow-hidden text-ellipsis"
      >
        {fullName}{" "}
        {role === "admin" && <span className="text-red-500">Admin</span>}
      </h3>
      <p className="text-neutral-400 text-xs ">@{username}</p>
      <ReactTooltip
        anchorSelect={`#person${_id}`}
        place="bottom"
        content={fullName}
      />
    </Link>
  );
};

export default SingleUserRoundCard;
