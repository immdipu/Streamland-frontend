import React from "react";
import clsx from "clsx";

interface PlayerButtonProps {
  player: 1 | 2;
  setPlayer: React.Dispatch<React.SetStateAction<1 | 2>>;
}

const PlayerButton: React.FC<PlayerButtonProps> = ({ player, setPlayer }) => {
  return (
    <div className="ml-14 max-md:ml-2 mt-3 flex gap-4">
      <button
        className={clsx(
          "bg-_genre_chip_bg px-4 rounded-md py-1 text-sm max-md:text-xs",
          player === 1 ? "bg-blue-600" : "text-neutral-300"
        )}
        onClick={() => setPlayer(1)}
      >
        Player 1
      </button>
      <button
        className={clsx(
          "bg-_genre_chip_bg px-4 rounded-md py-1 text-sm max-md:text-xs",
          player === 2 ? "bg-blue-600" : "text-neutral-300"
        )}
        onClick={() => setPlayer(2)}
      >
        Player 2
      </button>
    </div>
  );
};

export default PlayerButton;
