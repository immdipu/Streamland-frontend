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

const AllUsers = () => {
  const user = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<userList[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
          container.scrollTop + container.clientHeight >=
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

  return (
    <div
      ref={containerRef}
      className="h-[80vh] my-3 overflow-y-scroll userlist py-5 "
    >
      <>
        <h3 className="ml-5 pt-3 pb-2 ">Recent users</h3>
      </>
      <>
        {users
          ?.sort((a, b) => {
            if (a.role === "admin") return -1;
            return 0;
          })
          ?.map((item) => {
            if (item._id === user.id && item.role !== Role.admin) return null;
            return <SingleUserCard key={item._id} {...item} />;
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
