"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchStatic = () => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/search")}
        className="border-[0.4px] border-opacity-20 px-3 py-4 border-_light_white  flex items-center  font-light gap-3 text-_light_white rounded-2xl max-w-[250px] w-full h-7"
      >
        <CiSearch className="text-_light_white text-xl" />
        <p className="text-xs">Search Everything</p>
      </button>
    </>
  );
};

export default SearchStatic;
