"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import NextNProgress from "nextjs-progressbar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <NextNProgress />
      {children}
    </Provider>
  );
};

export default Providers;
