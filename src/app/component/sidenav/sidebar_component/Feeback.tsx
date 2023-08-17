"use client";
import React from "react";
import CustomModal from "../../modal/CustomModal";
import FeebackForm from "./FeebackForm";

const Feeback = () => {
  const btn = (
    <>
      <p className="text-xs text-neutral-500 ml-1  font-light">
        Send feeback or report a bug{" "}
        <span className="text-blue-500 hover:underline text-xs font-normal break-words">
          here
        </span>
      </p>
    </>
  );

  return (
    <div className="flex justify-normal">
      <CustomModal buttonElement={btn} data={<FeebackForm />} width={"1/2"} />
    </div>
  );
};

export default Feeback;
