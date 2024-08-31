import React from "react";
import Search from "../component/search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "streamland | Search",
};

const page = () => {
  return (
    <div className="pt-20 bg-_black_bg min-h-screen">
      <Search />
    </div>
  );
};

export default page;
