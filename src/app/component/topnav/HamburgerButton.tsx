import { SearchContext } from "@/context/GlobalProvider";
import clsx from "clsx";
import { useContext } from "react";
import { BiMenuAltLeft } from "react-icons/bi";

const HamburgerButton = () => {
  const GlobalContext = useContext(SearchContext);
  return (
    <button
      className={clsx("mr-5 hidden max-md:mr-2 max-md:block")}
      onClick={() => GlobalContext?.setShowSidebar(!GlobalContext.showSider)}
    >
      <BiMenuAltLeft className="text-2xl  hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
    </button>
  );
};

export default HamburgerButton;
