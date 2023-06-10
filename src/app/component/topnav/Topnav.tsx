import React from "react";
import SearchStatic from "./SearchStatic";
const Topnav = () => {
  return (
    <div
      className="pl-56  z-50 fixed bg-transparent
     inset-x-0 h-20 top-0"
    >
      <section className=" backdrop-blur-md h-full flex items-center w-full px-16">
        <SearchStatic />
      </section>
    </div>
  );
};

export default Topnav;
