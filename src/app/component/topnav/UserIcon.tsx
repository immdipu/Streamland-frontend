import { userApis } from "@/app/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LoggedIn } from "@/redux/slice/authSlice";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SmallLoader from "../loader/SmallLoader";
import UserAvatar from "./UserAvatar";

const UserIcon = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const AutoLogin = useMutation(() => userApis.AutoLogin(), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
    },
    onError: (data) => {
      console.log(data);
    },
  });
  useEffect(() => {
    AutoLogin.mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {AutoLogin.isLoading ? (
        <SmallLoader size={30} />
      ) : (
        <>
          {user.isUserAuthenticated ? (
            <UserAvatar />
          ) : (
            <Link
              href={"/login"}
              className={clsx(
                "bg-_genre_chip_bg max-md:flex max-md:items-center max-md:text-xs max-md:py-1 max-md:px-2  py-2 bg-opacity-60 border border-neutral-500 hover:border-opacity-75 duration-200 transition-colors  ease-linear border-opacity-25 px-4 block rounded-md  text-sm tracking-wider text-neutral-200",
                pathname === "/login" && "hidden"
              )}
            >
              Login
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default UserIcon;
