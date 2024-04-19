"use client";
import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import Notification from "../notification/Notification";
import BackButton from "../reusable/BackButton";
import HamburgerButton from "./HamburgerButton";
import SearchStatic from "./SearchStatic";
import UserIcon from "./UserIcon";

const Topnav = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      document.querySelector(".topnav")?.classList.add("addblur");
    } else {
      document.querySelector(".topnav")?.classList.remove("addblur");
    }
  });

  return (
    <div
      className={clsx(
        " z-50 fixed bg-transparent  inset-x-0 h-20 top-0",
        pathname === "/chat" ? "pl-0" : "pl-56 max-md:pl-0"
      )}
    >
      {/* <TopNotification /> */}
      <section className="  h-full topnav flex  items-center w-full px-5 max-md:px-1">
        <BackButton />
        <HamburgerButton />
        <SearchStatic />
        <section className=" w-full flex justify-end  mr-16 max-md:mr-1 ">
          <section className=" mr-10 max-md:mr-0 flex items-center">
            <Notification />
          </section>
          <UserIcon />
        </section>
      </section>
    </div>
  );
};

export default Topnav;
