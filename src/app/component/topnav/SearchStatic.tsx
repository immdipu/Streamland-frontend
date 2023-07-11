"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { SearchContext } from "./../../../context/GlobalProvider";
import Link from "next/link";

const SearchStatic = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchTerm = useContext(SearchContext);

  return (
    <>
      {pathname === "/search" ? (
        <section>
          <div className="border-[0.4px] border-opacity-20 w-64 transition-all duration-150 ease-in focus-within:w-72 focus-within:border-opacity-80 px-3 py-4 border-_light_white  flex items-center  font-light gap-3 text-_light_white rounded-2xl h-7">
            <input
              type="search"
              value={searchTerm?.searchTerm}
              autoFocus
              onChange={(e) => searchTerm?.setSearchTerm(e.target.value)}
              placeholder="Search Everything"
              className="placeholder:text-xs bg-transparent w-full border-none text-_helptool_bg pl-1 outline-none text-sm  placeholder:text-_light_white"
            />
            <CiSearch className="text-_light_white text-xl" />
          </div>
        </section>
      ) : (
        <Link
          href={"/search"}
          className="border-[0.4px] border-opacity-20 px-3 py-4 border-_light_white  flex items-center  font-light gap-3 text-_light_white rounded-2xl max-w-[250px] w-full h-7"
        >
          <CiSearch className="text-_light_white text-xl" />

          <p className="text-xs">Search Everything</p>
        </Link>
      )}
    </>
  );
};

export default SearchStatic;
