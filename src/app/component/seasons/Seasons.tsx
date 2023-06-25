"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import clsx from "clsx";
import Episodes from "./Episodes";
import { seasonsProps } from "@/types/types";

const Seasons = ({ seasons }: { seasons?: seasonsProps[] }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const SeasonId = searchParams.get("s");
  const [activeSeason, setActiveSeason] = useState(SeasonId ?? "1");

  useEffect(() => {
    setActiveSeason(SeasonId ?? "1");
  }, [SeasonId]);

  return (
    <div>
      <>
        <section className="flex flex-wrap gap-3 pl-14 mt-10">
          {seasons?.map((item) => {
            return (
              <Link
                href={`tv/${params.id}/seasons?s=${item.season_number}`}
                key={item.id}
                className={clsx(
                  " text-_black_bg text-center py-1 font-medium px-2 rounded-md min-w-[35px] hover:text-_sidenav_bg hover:bg-_blue duration-200 transition-all ease-linear hover:shadow-lg",
                  activeSeason === item.season_number.toString()
                    ? "bg-_blue text-_sidenav_bg"
                    : "bg-_sidenav_bg"
                )}
              >
                {activeSeason === item.season_number.toString()
                  ? `${item.name}`
                  : `${item.season_number}`}
              </Link>
            );
          })}
        </section>
      </>
      <section>
        <Episodes />
      </section>
    </div>
  );
};

export default Seasons;
