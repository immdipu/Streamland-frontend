"use client";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { BiHelpCircle, BiMessageSquareDots } from "react-icons/bi";
import { SiAirplayvideo } from "react-icons/si";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useAppSelector } from "@/redux/hooks";

const useSidebarRoutes = () => {
  const user = useAppSelector((state) => state.auth);
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

      {
        label: "Profile",
        href: `/profile/${user?.username}`,
        icon: BsPersonCircle,
        active: pathname === `/profile/${user?.username}`,
      },

      {
        label: "Watchlist",
        href: "/watchlist",
        icon: pathname === "/watchlist" ? AiFillHeart : AiOutlineHeart,
        active: pathname === "/watchlist",
      },
      {
        label: "Chat",
        href: `/chat`,
        icon: BiMessageSquareDots,
        active: pathname === `/chat`,
      },
      {
        label: "About",
        href: "/about",
        icon: BiHelpCircle,
        active: pathname === "/about",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, user.isUserAuthenticated]
  );
  return routes;
};

export default useSidebarRoutes;
