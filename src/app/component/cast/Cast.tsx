import React from "react";
import { castProps } from "@/types/types";
import SingleCastCard from "./SingleCastCard";

const Cast = ({ data }: { data: castProps[] }) => {
  return (
    <div>
      <h3 className="text-_white text-2xl mb-3 font-medium">Cast</h3>
      <section className="overflow-x-auto flex gap-8 max-w-screen overflow-hidden whitespace-nowrap flex-nowrap">
        {data.map((item) => (
          <SingleCastCard key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
};

export default Cast;
