"use client";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "./../../../context/GlobalProvider";

type searchType = "All" | "Movie" | "Show" | "People";

const SearchStatic = () => {
  const pathname = usePathname();
  const searchTerm = useContext(SearchContext);
  const [showOptions, setShowOptions] = useState(false);
  const [searchType, setSearchType] = useState<searchType>("All");
  const searchRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (showOptions && searchRef.current) {
      document.addEventListener("click", (e) => {
        if (
          searchRef.current &&
          !searchRef.current.contains(e.target as Node)
        ) {
          setShowOptions(false);
        }
      });
    }
  }, [showOptions]);

  const handleClick = (type: searchType) => {
    setSearchType(type);
    localStorage.setItem("searchType", type);
  };

  return (
    <>
      {pathname === "/search" ? (
        <section>
          <div className="border-[0.4px] border-opacity-20 w-64 transition-all duration-150 ease-in focus-within:w-80 focus-within:border-opacity-80 pl-3   border-_light_white  flex items-center  font-light gap-3 h-8 text-_light_white rounded-2xl ">
            <CiSearch className="text-_light_white text-2xl" />
            <input
              type="search"
              value={searchTerm?.searchTerm}
              autoFocus
              onChange={(e) => searchTerm?.setSearchTerm(e.target.value)}
              placeholder="Search Everything"
              className="placeholder:text-xs border  bg-transparent w-full border-none text-_helptool_bg pl-1 outline-none text-sm  placeholder:text-_light_white"
            />

            <section
              ref={searchRef}
              onClick={() => setShowOptions(!showOptions)}
              className="bg-neutral-800 relative grid border border-neutral-700  place-content-center tracking-wide rounded-3xl px-4 h-full w-fit "
            >
              <p className="w-fit text-xs text-neutral-100">{searchType}</p>

              <div
                className={clsx(
                  "absolute top-9 w-28 left-0 rounded-md  transition-all will-change-auto ease-linear duration-75 overflow-hidden right-20 bg-_genre_chip_bg border border-neutral-600",

                  showOptions ? "opacity-100 h-auto" : "opacity-0 h-0 "
                )}
              >
                <ul>
                  <List text="All" onClick={handleClick} />
                  <List text="Movie" onClick={handleClick} />
                  <List text="Show" onClick={handleClick} />
                  <List text="People" onClick={handleClick} />
                </ul>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <Link
          href={"/search"}
          className="border-[0.4px]    max-md:w-full max-md:flex border-opacity-20 px-3 py-4 border-_light_white  flex items-center  font-light gap-3 text-_light_white rounded-2xl max-w-[250px] w-full h-7"
        >
          <CiSearch className="text-_light_white text-xl" />

          <p className="text-xs">Search Everything</p>
        </Link>
      )}
    </>
  );
};

export default SearchStatic;

const List = ({
  text,
  onClick,
}: {
  text: searchType;
  onClick: (arg: searchType) => void;
}) => {
  return (
    <li
      onClick={() => {
        onClick(text);
      }}
      className=" py-2 cursor-default text-sm text-neutral-300 pl-3 hover:bg-neutral-700 transition-colors duration-150 ease-linear"
    >
      {text}
    </li>
  );
};
