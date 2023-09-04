import React from "react";
import Profile from "@/app/component/profile/Profile";
import { getUserDataTypes } from "@/types/userTypes";

const page = async ({ params }: any) => {
  return (
    <div className="mt-20">
      <Profile />
    </div>
  );
};

export default page;
