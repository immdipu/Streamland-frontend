import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { feedbackDataTypes } from "@/types/userTypes";
import { userApis } from "@/app/userApi";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import SmallLoader from "../../loader/SmallLoader";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/role";

const FeebackForm = () => {
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");
  const [checked, setchecked] = useState(false);
  const user = useAppSelector((state) => state.auth);

  const modelClose = () => {
    document.getElementById("modalclosebtn")?.click();
  };

  const Feedback = useMutation(
    (data: feedbackDataTypes) => userApis.SendFeeback(data),
    {
      onSuccess: (data) => {
        modelClose();
        toast.success(data);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong");
      },
    }
  );
  const NOtifications = useMutation(
    (data: any) => userApis.AddNotification(data),
    {
      onSuccess: (data) => {
        modelClose();
        toast.success(data);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(checked);

    if (message.length < 10) {
      toast.error("Message is too short" + message.length);
      return;
    }
    if (message.length > 1000) {
      toast.error("Message is too long");
      return;
    }
    if (checked && user.role === Role.admin) {
      const notifications = {
        notification: message,
      };
      NOtifications.mutate(notifications);
    } else {
      Feedback.mutate({ name, message });
    }
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchecked(event.target.checked);
  };

  return (
    <>
      <section className="text-gray-600 body-font relative bg-neutral-800 p-14">
        <form onSubmit={handleSubmit}>
          <div className="rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 ">
            <h2 className="text-white text-xl mb-1 font-medium ">
              Feedback{" "}
              {user && user.role === Role.admin && (
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckbox}
                />
              )}{" "}
            </h2>

            <p className="leading-relaxed mb-5 text-sm text-neutral-300">
              Any feedback or suggestion is welcome here :{")"}
            </p>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-neutral-200 mb-1"
              >
                Name{" "}
              </label>
              <input
                type="text"
                id="email"
                value={name}
                onChange={(e) => setname(e.target.value)}
                name="email"
                placeholder="Enter your name (optional)"
                className="w-full placeholder:text-sm bg-neutal-600 text-neutral-100 rounded border border-gray-600 focus:border-gray-300 focus:ring-2 focus:ring-gray-300 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-neutral-200 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                required
                placeholder="Enter your message"
                className="w-full bg-neutral-700 rounded border border-neutral-600 focus:border-neutral-200  h-32 text-sm font-light outline-none text-neutral-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              className={clsx(
                "text-white active:bg-opacity-60 active:text-neutral-100 bg-_blue border-0 py-2 px-6 focus:outline-none hover:bg-_sidenav_active_color rounded text-lg",
                Feedback.isLoading &&
                  "cursor-not-allowed pointer-events-none bg-opacity-50"
              )}
            >
              {Feedback.isLoading ? <SmallLoader size={20} /> : "Send"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default FeebackForm;
