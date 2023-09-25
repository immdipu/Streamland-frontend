"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/app/userApi";
import toast from "react-hot-toast";
import clsx from "clsx";

const CreateGroupForm = () => {
  const [name, setName] = React.useState("");
  const [numberOfUsersAllowed, setNumberOfUsersAllowed] = React.useState("");

  const createGroup = useMutation(
    ({
      name,
      numberOfUsersAllowed,
    }: {
      name: string;
      numberOfUsersAllowed: string;
    }) =>
      userApis.createGroupChat({
        name,
        numberOfUsersAllowed: Number(numberOfUsersAllowed),
      }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleCreateGroup = () => {
    if (!name.trim()) {
      toast.error("Please enter group name");
      return;
    }
    createGroup.mutate({ name, numberOfUsersAllowed });
  };

  return (
    <div className=" py-5 px-7 ">
      <section>
        <div className=" flex flex-col">
          <label
            htmlFor="groupName"
            className="w-full pb-1 text-sm text-neutral-300 "
          >
            Name
          </label>
          <input
            id="groupName"
            className="bg-neutral-800 text-sm font-light text-neutral-300 placeholder:text-neutral-600 px-2 py-1 outline-none border-transparent border rounded-[3px] focus-within:border-neutral-600 transition-colors duration-200 ease-linear  placeholder:text-sm"
            placeholder="Enter group name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className=" flex flex-col mt-3">
          <label
            htmlFor="groupName"
            className="w-full pb-1 text-sm text-neutral-300 "
          >
            Maximum Members
          </label>
          <input
            id="groupName"
            className="bg-neutral-800 text-sm font-light text-neutral-300 placeholder:text-neutral-600 px-2 py-1 outline-none border-transparent border rounded-[3px] focus-within:border-neutral-600 transition-colors duration-200 ease-linear  placeholder:text-sm"
            placeholder="Enter maximum number of members"
            min={1}
            type="number"
            value={numberOfUsersAllowed ?? ""}
            onChange={(e) => setNumberOfUsersAllowed(e.target.value)}
          />
        </div>
      </section>
      <div className=" justify-center flex w-full mt-8">
        <button
          className={clsx(
            "bg-blue-600 active:scale-90  px-3 py-1 hover:bg-blue-700 ease-linear transition-all duration-200 rounded-md",
            createGroup.isLoading && "pointer-events-none"
          )}
          onClick={handleCreateGroup}
        >
          <span className="text-neutral-300 text-sm font-normal tracking-wide">
            {createGroup.isLoading ? "Creating" : "Create"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreateGroupForm;
