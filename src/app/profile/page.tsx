import React from "react";
import Profile from "../component/profile/Profile";
import { getUserDataTypes } from "@/types/userTypes";
import { redirect } from "next/navigation";

const page = async () => {
  redirect("/");
  return <div className="mt-20"></div>;
};

export default page;
