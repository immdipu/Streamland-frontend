import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SmallLoader = ({ size }: { size: number }) => {
  return (
    <div>
      <ClipLoader
        color={"#3676d6"}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SmallLoader;
