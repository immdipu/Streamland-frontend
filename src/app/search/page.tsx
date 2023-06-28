import React from "react";
import Search from "../component/search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinemaa | Search",
};

const page = () => {
  return (
    <div className="pt-20 bg-_black_bg">
      <Search />
    </div>
  );
};

export default page;
