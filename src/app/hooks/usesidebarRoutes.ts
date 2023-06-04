"use client";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";

const useSidebarRoutes = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Explore",
        href: "/",
        icon: MdExplore,
        active: pathname === "/",
      },
      {
        label: "Movies",
        href: "/movie",
        icon: RiMovie2Line,
        active: pathname === "/movie",
      },
    ],
    [pathname]
  );
  return routes;
};

export default useSidebarRoutes;
