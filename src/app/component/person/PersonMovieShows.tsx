"use client";
import React, { Suspense } from "react";
import SearchCard from "../search/SearchCard";
import { serachItemProps } from "../../../types/searchTypes";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createURL } from "@/utils/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const PersonMovieShows = ({ data }: { data: serachItemProps[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  const handleSortbyCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("categories", e.target.value);
    router.push(createURL(`/person/${id}`, newParams), { scroll: false });
  };

  const handleSortby = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", e.target.value);
    router.push(createURL(`/person/${id}`, newParams), { scroll: false });
  };

  const DuplicateObjectFilter = (array: serachItemProps[]) => {
    const seen = new Set();
    const filteredArr = array.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });
    return filteredArr;
  };

  const dataSort = (datas: serachItemProps[]) => {
    datas = DuplicateObjectFilter(datas);
    const params = new URLSearchParams(searchParams.toString());
    let sort = params.get("sort");
    const categories = params.get("categories");

    let newData = datas;

    if (categories) {
      if (categories === "all") {
        newData = datas;
      } else if (categories === "movie") {
        newData = newData.filter((item) => item.media_type === "movie");
      } else if (categories === "tv") {
        newData = newData.filter((item) => item.media_type === "tv");
      }
    }

    if (sort) {
      if (sort === "alpha-asc") {
        newData = newData.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          } else if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          } else if (a.name && b.title) {
            return a.name.localeCompare(b.title);
          } else if (a.title && b.name) {
            return a.title.localeCompare(b.name);
          } else {
            return 0;
          }
        });
      }
      if (sort === "alpha-desc") {
        newData = newData.sort((a, b) => {
          if (a.title && b.title) {
            return b.title.localeCompare(a.title);
          } else if (a.name && b.name) {
            return b.name.localeCompare(a.name);
          } else if (a.name && b.title) {
            return b.title.localeCompare(a.name);
          } else if (a.title && b.name) {
            return b.name.localeCompare(a.title);
          } else {
            return 0;
          }
        });
      }

      if (sort === "date-desc") {
        newData = newData.filter(
          (item) => item.release_date || item.first_air_date
        );

        newData.sort((a, b) => {
          let aDate = a.release_date ? a.release_date : a.first_air_date;
          let bDate = b.release_date ? b.release_date : b.first_air_date;
          if (aDate && bDate) {
            const dateA = new Date(aDate);
            const dateB = new Date(bDate);
            return dateB.getTime() - dateA.getTime();
          } else {
            return 0;
          }
        });
      }

      if (sort === "date-asc") {
        newData = newData.filter(
          (item) => item.release_date || item.first_air_date
        );
        newData.sort((a, b) => {
          let aDate = a.release_date ? a.release_date : a.first_air_date;
          let bDate = b.release_date ? b.release_date : b.first_air_date;
          if (aDate && bDate) {
            const dateA = new Date(aDate);
            const dateB = new Date(bDate);
            return dateA.getTime() - dateB.getTime();
          } else {
            return 0;
          }
        });
      }

      if (sort === "rating-asc") {
        newData = newData.sort((a, b) => {
          if (a.vote_average && b.vote_average) {
            return b.vote_average - a.vote_average;
          } else {
            return 0;
          }
        });
      }

      if (sort === "rating-desc") {
        newData = newData.sort((a, b) => {
          if (a.vote_average && b.vote_average) {
            return a.vote_average - b.vote_average;
          } else {
            return 0;
          }
        });
      }
    } else {
      sort = "alpha-asc";
      newData = newData.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        } else if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        } else if (a.name && b.title) {
          return a.name.localeCompare(b.title);
        } else if (a.title && b.name) {
          return a.title.localeCompare(b.name);
        } else {
          return 0;
        }
      });
    }

    return newData;
  };

  return (
    <Suspense>
      <section className="mt-14">
        <div className="flex max-md:flex-col max-md:items-start justify-between items-center sticky top-0">
          <h3 className="text-xl font-medium ">Movies and TV shows :</h3>
          <section className="flex gap-2 mr-8 max-md:mt-3 flex-wrap">
            <select
              name="sortby"
              id="sort"
              onChange={handleSortby}
              className=" text-sm px-1 py-1 rounded-sm font-normal text-neutral-200 "
              value={searchParams.get("sort") ?? "alpha-asc"}
            >
              <option value="alpha-asc">Alphabetically (A-Z)</option>
              <option value="alpha-desc">Alphabetically (Z-A)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="date-desc">Date (Newest)</option>
              <option value="rating-asc">Rating (High to Low)</option>
              <option value="rating-desc">Rating (Low to High)</option>=
            </select>

            <select
              name="categories"
              id="categories"
              className=" text-sm px-1 py-1 rounded-sm font-normal text-neutral-200 "
              onChange={handleSortbyCategories}
              value={searchParams.get("categories") ?? "all"}
            >
              <option value="all">All categories</option>
              <option value="movie">Movie</option>
              <option value="tv">TV show</option>
            </select>
          </section>
        </div>

        <section
          ref={parent}
          className="grid py-10 max-md:justify-center max-md:grid-cols-smallAutoFit grid-cols-autoFit gap-x-2 gap-y-9"
        >
          {dataSort(data).map((item) => {
            return <SearchCard key={item.id} {...item} />;
          })}
        </section>
      </section>
    </Suspense>
  );
};

export default PersonMovieShows;
