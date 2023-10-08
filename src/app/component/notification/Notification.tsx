"use client";
import React from "react";
import { CiBellOn } from "react-icons/ci";
import NotificationListCard from "./NotificationListCard";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import { useSocket } from "@/context/SocketProvider";
import { set } from "nprogress";

const Notification = () => {
  const { notificationSocket } = useSocket();
  const [showNotification, setShowNotification] =
    React.useState<boolean>(false);
  const [NewNotification, setNewNotification] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<string[]>([]);
  const { data, isLoading } = useQuery(
    ["GetNotification"],
    () => userApis.GetNotification(),
    {
      onSuccess: (data: string[]) => {
        setNotification(data);
      },
    }
  );

  React.useEffect(() => {
    if (!notificationSocket) return;
    notificationSocket.on("NewNotificationReceived", (data: any) => {
      setNotification((prev) => [data.message, ...prev]);
      setShowNotification(true);
      setNewNotification(true);
    });

    return () => {
      notificationSocket.off("NewNotificationReceived");
    };
  }, [notificationSocket]);

  return (
    <div className="relative">
      <div className="relative">
        <CiBellOn
          className="text-3xl text-neutral-400 cursor-pointer "
          onClick={() => {
            setShowNotification(!showNotification);
            setNewNotification(false);
          }}
        />
        <div className="w-5 text-xs -top-1 font-light -right-2 h-fit grid place-content-center rounded-full bg-blue-500 absolute">
          {notification.length > 0 && notification.length}
        </div>
        <section
          className={clsx(
            "flex flex-col absolute w-96  duration-150 ease-linear transition-all overflow-hidden  -left-96 bg-neutral-800",
            showNotification ? " h-80" : "h-0"
          )}
        >
          <h2 className="px-2 flex justify-between py-2 mb-1 font-semibold text-neutral-200">
            Notifications{" "}
            <span
              className={clsx(
                "bg-green-200 pt-1 text-green-700 animate-bounce font-normal px-2 border rounded-md text-xs",
                !NewNotification && "hidden"
              )}
            >
              New Notificatoin
            </span>
            <span
              onClick={() => {
                setShowNotification(!showNotification);
                setNewNotification(false);
              }}
              className="cursor-pointer px-3 text-sm text-neutral-500 font-light"
            >
              close
            </span>
          </h2>
          <>
            <section className="h-72 overflow-y-auto">
              {notification.length === 0 && (
                <div className="flex justify-center items-center h-full">
                  <h3 className="text-neutral-400 text-sm font-light">
                    No Notification
                  </h3>
                </div>
              )}
              {notification.length > 0 &&
                notification.map((item, index) => (
                  <NotificationListCard key={index} text={item} />
                ))}
            </section>
          </>
          <button
            onClick={() => {
              setNotification([]);
              setShowNotification(false);
              setNewNotification(false);
            }}
            className="py-1 bg-neutral-700 bg-opacity-30 shadow-md hover:bg-opacity-100 transition-colors duration-200 ease-linear text-xs text-neutral-300 "
          >
            Mark all read
          </button>
        </section>
      </div>
    </div>
  );
};

export default Notification;
