import React from "react";
import NowPlaying from "../atoms/NowPlaying";
import PlayerTopToolTip from "../../PlayerTopTooltip/PlayerTopToolTip";

interface SeasonHeaderProps {
  SeasonId: string | null;
  currentEpisode: string | null;
}

const SeasonHeader: React.FC<SeasonHeaderProps> = ({
  SeasonId,
  currentEpisode,
}) => {
  return (
    <>
      {SeasonId && currentEpisode && (
        <>
          <div className="flex max-md:flex-col flex-wrap max-md:items-start gap-2 items-center mt-1">
            <NowPlaying SeasonId={SeasonId} currentEpisode={currentEpisode} />
            <div className="flex gap-2  group ml-5 max-md:hidden items-center float-right">
              <PlayerTopToolTip />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SeasonHeader;
