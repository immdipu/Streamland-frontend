"use client";
import { SearchContext } from "@/context/GlobalProvider";
import { SearchResultsProps, serachItemProps } from "@/types/searchTypes";
import { useContext, useEffect, useState } from "react";
import SmallLoader from "../loader/SmallLoader";
import SearchCard from "./SearchCard";

const Search = () => {
  const searchProvider = useContext(SearchContext);
  const [searchData, setSearchData] = useState<serachItemProps[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTimer, setSearchTimer] = useState<any>(null);
  useEffect(() => {
    clearTimeout(searchTimer);
    const getSearch = async (query: string) => {
      setLoading(true);
      const page1Promise = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=1`
      );
      const page2Promise = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=2`
      );

      const [page1Response, page2Response] = await Promise.all([
        page1Promise,
        page2Promise,
      ]);

      if (!page1Response.ok || !page2Response.ok) {
        throw new Error("Failed to fetch data");
      }
      const page1data: SearchResultsProps = await page1Response.json();
      const page2data: SearchResultsProps = await page2Response.json();
      setSearchData([...page1data.results, ...page2data.results]);

      setLoading(false);
    };
    setSearchTimer(
      setTimeout(() => {
        if (
          searchProvider?.searchTerm &&
          searchProvider.searchTerm.trim() !== ""
        ) {
          getSearch(searchProvider.searchTerm);
        }
      }, 1500)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProvider?.searchTerm]);

  return (
    <div className="bg-_black_bg pt-7 text-_white">
      {searchProvider?.searchTerm.trim() !== "" && (
        <div>
          <h2 className="px-16 max-md:pl-1">
            Search Results for :{" "}
            <span className="text-xl capitalize">
              {searchProvider?.searchTerm}
            </span>
          </h2>
        </div>
      )}
      {loading ? (
        <section className="bg-_black_bg min-h-screen flex justify-center mt-32 ">
          <SmallLoader size={60} />
        </section>
      ) : (
        <section className="flex w-full py-7  gap-9 max-md:gap-3 flex-wrap pl-16 max-md:pl-1 pr-4 max-md:pr-1">
          {searchData ? (
            <>
              {searchData.length > 0 ? (
                <>
                  {searchData.map((item) => (
                    <SearchCard key={item.id} {...item} />
                  ))}
                </>
              ) : (
                <>
                  <section className="bg-_black_bg min-h-screen  w-full grid place-content-center">
                    <h3 className="text-_light_white text-lg tracking-wide">
                      No Result found
                    </h3>
                  </section>
                </>
              )}
            </>
          ) : (
            <>
              <section className="bg-_black_bg w-full  min-h-[74vh] overflow-hidden grid place-content-center">
                <h3 className="text-_light_white text-lg tracking-wide">
                  Search Movies, TV shows, Actors
                </h3>
              </section>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Search;
