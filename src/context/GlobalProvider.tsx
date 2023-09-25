"use client";
import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Topnav from "@/app/component/topnav/Topnav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { SocketProvider } from "./SocketProvider";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSider: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

const queryClient = new QueryClient();

const getSearchResult = async (query: string) => {};
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSider, setShowSidebar] = useState(false);
  const path = usePathname();

  const searchContextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    showSider,
    setShowSidebar,
  };

  return (
    <Provider store={store}>
      <Toaster />
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <SearchContext.Provider value={searchContextValue}>
            {path !== "/chat" && <Topnav />}
            <GoogleOAuthProvider clientId="999403015017-rodh8011hs8r1l0tjlakeidj4vnu1u53.apps.googleusercontent.com">
              {children}
            </GoogleOAuthProvider>
          </SearchContext.Provider>
        </QueryClientProvider>
      </SocketProvider>
    </Provider>
  );
};

export default Providers;
