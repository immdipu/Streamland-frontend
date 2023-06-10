import React from "react";
import SearchStatic from "./SearchStatic";
const Topnav = () => {
  return (
    <div className="pl-56 h-full z-50 sticky top-0 ">
      <section className="bg-_black_bg backdrop-blur-md h-20 flex items-center w-full px-16">
        <SearchStatic />
      </section>
    </div>
  );
};

export default Topnav;
