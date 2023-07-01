import React from "react";
import { TrendingPersonProps } from "@/types/personTypes";
import TrendingPersonSilder from "./TrendingPersonSlider";

const TrendingPerson = async ({ data }: { data: any }) => {
  const trendingPerson: TrendingPersonProps = await data;

  return (
    <div className="px-6 my-10 max-md:px-1">
      <h2 className="font-medium pl-9 max-md:pl-6 my-6 text-xl text-_white ">
        Trending Person
      </h2>
      <section>
        <TrendingPersonSilder
          data={trendingPerson.results}
          className="trendingPerson"
        />
      </section>
    </div>
  );
};

export default TrendingPerson;
