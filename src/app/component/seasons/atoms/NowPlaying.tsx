import React from "react";

import { SiVlcmediaplayer } from "react-icons/si";

interface NowPlayingProps {
  SeasonId: string;
  currentEpisode: string;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  SeasonId,
  currentEpisode,
}) => {
  return (
    <div className="flex items-center gap-2">
      <h3 className="w-fit pl-14 max-md:pl-2 max-md:text-sm text-neutral-400 flex items-center text-lg font-medium gap-3">
        <SiVlcmediaplayer className="text-orange-400 " />
        Now Playing :
      </h3>
      <div>
        <span className="font-light max-md:text-sm">
          {parseInt(SeasonId.toString()) < 10
            ? `S0${SeasonId}`
            : "S" + SeasonId}
        </span>
        <span className="font-light max-md:text-sm">
          {parseInt(currentEpisode) < 10
            ? `e0${currentEpisode}`
            : "e" + currentEpisode}
        </span>
      </div>
    </div>
  );
};

export default NowPlaying;
