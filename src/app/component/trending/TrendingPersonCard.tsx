import { SingleTrendingPersonProp } from "@/types/personTypes";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Images from "../ImageComponent/Image";

const TrendingPersonCard: React.FC<SingleTrendingPersonProp> = ({
  gender,
  adult,
  id,
  known_for,
  known_for_department,
  media_type,
  name,
  original_name,
  popularity,
  profile_path,
}) => {
  return (
    <Link href={`/person/${id}`} prefetch={false} className="block">
      <div className="w-36 max-md:w-28 max-md:h-28 h-36 rounded-full ">
        <Images
          src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
          height={200}
          width={300}
          alt={name}
          ImageWidth={"full"}
          Imageheight={144}
          rounded="full"
          trendingPerson={true}
        />
      </div>
      <h3
        id={`person${id}`}
        className="text-center text-_white mt-3 w-36 max-md:w-28 max-md:text-xs overflow-hidden text-ellipsis"
      >
        {original_name}
      </h3>
      <ReactTooltip
        anchorSelect={`#person${id}`}
        place="bottom"
        content={original_name}
      />
    </Link>
  );
};

export default TrendingPersonCard;
