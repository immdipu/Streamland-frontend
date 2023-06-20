import React from "react";
import SmallLoader from "./SmallLoader";

const FullScreenLoader = () => {
  return (
    <>
      <div className="fixed inset-0 grid place-items-center bg-black bg-opacity-25 z-[200]">
        <SmallLoader size={50} />
      </div>
    </>
  );
};

export default FullScreenLoader;
