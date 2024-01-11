import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import Link from "next/link";

const PlayerTopToolTip = () => {
  return (
    <div className=" flex items-center">
      <BsQuestionCircle className="text-neutral-300 peer" />
      <p className="font-light text-sm text-neutral-400 ml-2">
        Need tips to stream the movie Uninterrupted ?{" "}
      </p>{" "}
      <Link
        href={"/how-to-watch"}
        className="text-neutral-300 ml-2 text-sm hover:text-blue-500"
      >
        Click here
      </Link>
    </div>
  );
};

export default PlayerTopToolTip;
