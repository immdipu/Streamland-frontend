"use client";
import React, { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Topnav from "@/app/component/topnav/Topnav";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

const getSearchResult = async (query: string) => {};
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchContextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <Provider store={store}>
      <SearchContext.Provider value={searchContextValue}>
        <Topnav />
        {children}
      </SearchContext.Provider>
    </Provider>
  );
};

export default Providers;
