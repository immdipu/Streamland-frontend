"use client";
import React from "react";
import SearchCard from "../search/SearchCard";
import { serachItemProps } from "../../../types/searchTypes";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createURL } from "@/utils/utils";

const PersonMovieShows = ({ data }: { data: serachItemProps[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

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

  const dataSort = (data: serachItemProps[]) => {
    const params = new URLSearchParams(searchParams.toString());
    let sort = params.get("sort");
    const categories = params.get("categories");

    let newData = data;

    if (sort) {
      if (sort === "alpha-asc") {
        newData = newData.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          } else if (a.name && b.name) {
            return a.name.localeCompare(b.name);
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
          } else {
            return 0;
          }
        });
      }

      if (sort === "date-desc") {
        newData = newData.filter((item) => {
          if (item.release_date) {
            return item.release_date !== "";
          }
          if (item.first_air_date) {
            return item.first_air_date !== "";
          }
        });

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
        newData = newData.filter((item) => {
          if (item.release_date) {
            return item.release_date !== "";
          }
          if (item.first_air_date) {
            return item.first_air_date !== "";
          }
        });

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
        } else {
          return 0;
        }
      });
    }

    if (categories) {
      if (categories === "all") {
        newData = newData = data;
      } else if (categories === "movie") {
        newData = newData.filter((item) => item.media_type === "movie");
      } else if (categories === "tv") {
        newData = newData.filter((item) => item.media_type === "tv");
      }
    }

    return newData;
  };

  return (
    <>
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
              <option value="date-asc">Date (ascending)</option>
              <option value="date-desc">Date (descending)</option>
              <option value="rating-asc">Rating (ascending)</option>
              <option value="rating-desc">Rating (descending)</option>=
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

        <section className="grid py-10 max-md:justify-center max-md:grid-cols-smallAutoFit grid-cols-autoFit gap-x-2 gap-y-9">
          {dataSort(data).map((item) => {
            return <SearchCard key={item.id} {...item} />;
          })}
        </section>
      </section>
    </>
  );
};

export default PersonMovieShows;
