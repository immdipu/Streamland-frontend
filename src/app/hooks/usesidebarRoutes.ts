"use client";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { SiAirplayvideo } from "react-icons/si";

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
        href: "/movie/genre",
        icon: RiMovie2Line,
        active: pathname === "/movie/genre",
      },
      {
        label: "TV show",
        href: "/tv/genre",
        icon: SiAirplayvideo,
        active: pathname === "/tv/genre",
      },
    ],
    [pathname]
  );
  return routes;
};

export default useSidebarRoutes;
