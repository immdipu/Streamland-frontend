import React from "react";

interface HeaderProps {
  title: string | undefined;
  name: string | undefined;
  TYPE: string;
}

const Header: React.FC<HeaderProps> = ({ TYPE, name, title }) => {
  return (
    <h2 className="text-4xl max-lg:text-3xl   max-md:text-center text-_show_title font-bold tracking-wide">
      {TYPE === "MOVIE" && title}
      {TYPE === "TV" && name}
    </h2>
  );
};

export default Header;
