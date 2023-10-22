/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { userList } from "@/types/userTypes";
import SingleUserCard from "./SingleUserCard";
import SmallLoader from "../loader/SmallLoader";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/role";
import { useMutation } from "@tanstack/react-query";

const AllUsers = () => {
  const user = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<userList[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [Timer, setTimer] = useState<any>(null);
  const [FilteredUsers, setFilteredUsers] = useState<userList[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const SearchUser = useMutation((term: string) => userApis.searchUser(term), {
    onSuccess: (data: userList[]) => {
      setFilteredUsers(data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });

  const currentPageRef = useRef(1);

  useEffect(() => {
    const getUsers = async (page: number) => {
      setLoading(true);
      const { data } = await userApis.getUserList(page);
      setLoading(false);
      return data;
    };
    getUsers(1).then((data) => {
      setUsers(data);
    });

    const fetchNextPage = async (page: number) => {
      setLoading(true);
      try {
        const { data } = await userApis.getUserList(page);

        if (data.length === 0) {
          setHasMore(false);
        }
        setUsers((prev) => [...prev, ...data]);
      } catch (error: any) {
        if (error.response.status === 404) {
          setHasMore(false);
          toast.error("No more users");
        }
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;

        const isAtBottom =
          container.scrollTop + container.clientHeight + 5 >=
          container.scrollHeight;
        if (isAtBottom) {
          if (!hasMore) return null;
          const nextPage = currentPageRef.current + 1;
          fetchNextPage(nextPage);
          currentPageRef.current = nextPage;
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(Timer);
    setTimer(
      setTimeout(() => {
        if (value.trim() === "") {
          setFilteredUsers([]);
          return;
        }
        SearchUser.mutate(value);
      }, 1500)
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-[80vh] my-3 overflow-y-scroll userlist py-5 "
    >
      <div className=" h-12 z-10 mb-14  focus-within:border-neutral-700 transition-colors duration-300 ease-linear border border-transparent sticky px-3 rounded-md mx-6 top-0 bg-neutral-800">
        <input
          type="search"
          className="bg-transparent outline-none w-full text-neutral-200 font-light h-full placeholder:text-neutral-500"
          placeholder="Search users by name"
          onChange={handleSearch}
        />
        <>
          <h3 className="bg-[#1b1b1b] text-neutral-300 text-lg font-Helvetica font-light  py-4 rounded-md w-full -translate-x-8 pl-5 mt-2  ">
            Total users :{" "}
            <span className="font-normal">
              {searchTerm.trim() !== "" ? FilteredUsers.length : users.length}
            </span>
          </h3>
        </>
      </div>

      <>
        {searchTerm.trim() !== "" && SearchUser.isLoading && (
          <>
            <div className="text-center mt-32 py-4">
              <SmallLoader size={40} />
            </div>
          </>
        )}
        {searchTerm.trim() !== "" &&
          SearchUser.isSuccess &&
          FilteredUsers?.length === 0 && (
            <p className="text-white text-center">No user found</p>
          )}
        {searchTerm.trim() !== ""
          ? FilteredUsers?.sort((a, b) => {
              if (a.role === "admin") return -1;
              return 0;
            })?.map((item) => {
              if (item._id === user.id && item.role !== Role.admin) return null;
              return (
                <SingleUserCard showLoginAs={true} key={item._id} {...item} />
              );
            })
          : users
              ?.sort((a, b) => {
                if (a.role === "admin") return -1;
                return 0;
              })
              ?.map((item) => {
                if (item._id === user.id && item.role !== Role.admin)
                  return null;
                return (
                  <SingleUserCard showLoginAs={true} key={item._id} {...item} />
                );
              })}
      </>
      {loading && hasMore && (
        <div className="text-center py-4">
          <SmallLoader size={34} />
        </div>
      )}
      {!loading && !hasMore && <p className="text-white text-center">End</p>}
    </div>
  );
};

export default AllUsers;
