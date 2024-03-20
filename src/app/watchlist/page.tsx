import React from "react";
import { Watchlist } from "../component";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShowMania | Watchlist",
};

const page = () => {
  return (
    <div className="pt-20 pl-16">
      <Watchlist />
    </div>
  );
};

export default page;
