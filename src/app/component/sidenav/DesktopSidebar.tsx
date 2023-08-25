"use client";
import React, { useState, useEffect } from "react";
import Component from "./sidebar_component/Sidebarcomponent";
import Notifications from "./sidebar_component/Notifications";
import Feeback from "./sidebar_component/Feeback";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";

const DesktopSidebar = () => {
  const [notification, setNotification] = useState<string[]>([]);
  const GetNotification = useMutation(() => userApis.GetNotification(), {
    onSuccess: (data) => {
      setNotification(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    GetNotification.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-56 border-r-[0.2px] border-r-_light_white border-opacity-10 bg-_black_bg fixed inset-y-0">
      <Component />
      {notification.length > 0 && <Notifications data={notification} />}
      <div className=" absolute bottom-0 ">
        <Feeback />
      </div>
    </div>
  );
};

export default DesktopSidebar;
