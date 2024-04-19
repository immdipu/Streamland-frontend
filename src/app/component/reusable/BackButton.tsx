import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={clsx(
        "mr-5 max-md:hidden",
        pathname === "/"
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      )}
    >
      <BiArrowBack className="text-2xl hover:text-_sidenav_bg duration-200 transition-colors ease-in-out text-_welcometext_lightblue" />
    </button>
  );
};

export default BackButton;
