"use client";
import React from "react";
import useSidebarRoutes from "@/app/hooks/usesidebarRoutes";
import SingleComponent from "./SingleComponent";
import { DesktopSingleComponentProps } from "@/types/types";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Sidebarcomponent = () => {
  const routes = useSidebarRoutes(),
    router = useRouter(),
    user = useAppSelector((state) => state.auth);
  return (
    <div className="relative z-[55]">
      <h1
        onClick={() => {
          router.push("/");
        }}
        className="text-_white cursor-pointer z-[60] font-Helvetica text-2xl font-bold tracking-wider pl-7 mt-8"
      >
        ShowMania
      </h1>
      <section className="mt-14 flex flex-col gap-6">
        {routes.map((item: DesktopSingleComponentProps) => {
          if (item.label === "Profile" && !user.isUserAuthenticated)
            return null;
          return (
            <SingleComponent
              key={item.label}
              href={item.href}
              label={item.label}
              active={item.active}
              icon={item.icon}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Sidebarcomponent;
