"use client";
import React, { useLayoutEffect, useState } from "react";
import Checkbox from "./Checkbox";
import clsx from "clsx";
import toast from "react-hot-toast";
import { userApis } from "../userApi";
import { useMutation } from "@tanstack/react-query";

const SurveyForm = () => {
  const [show, setShow] = useState(false);
  const [surveryData, setSurveyData] = useState({
    name: "",
    source: "",
    otherSource: "",
    rating: "",
    feedback: "",
  });

  const { mutate, isLoading } = useMutation(
    (data: any) => userApis.survey(data),
    {
      onSuccess: () => {
        toast.success(
          "Thank you for taking the time to provide your feedback.",
          {
            duration: 5000,
          }
        );
        localStorage.setItem("survey", "true");
        setShow(false);
      },
      onError: () => {
        toast.error("Failed to submit feedback");
      },
    }
  );

  useLayoutEffect(() => {
    const survey = localStorage.getItem("survey");
    if (survey) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveryData.source || !surveryData.rating) {
      toast.error("Please fill all required fields");
      return;
    }
    mutate(surveryData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSurveyData((prev) => ({
        ...prev,
        source: value,
      }));
    } else {
      setSurveyData((prev) => ({
        ...prev,
        source: "",
      }));
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-_black_bg z-[500] grid place-content-center bg-opacity-50 backdrop-blur-sm  top-0">
      <section className="bg-_genre_chip_bg max-w-2xl w-full py-3 rounded-md">
        <form onSubmit={handleSubmit} className="survey-form">
          <div className="px-4">
            <h2 className="font-bold text-2xl">Website feedback survey</h2>
            <p className="text-neutral-400">
              Please take a moment to help us improve your experience by
              providing feedback on our website.
            </p>
          </div>

          <div className="px-5 mt-3">
            <label htmlFor="hearaboutus" className="font-semibold">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2 mt-2">
              <Checkbox
                onChange={handleCheckboxChange}
                label="Search engine"
                value="searchEngine"
              />
              <Checkbox
                onChange={handleCheckboxChange}
                label="Social media"
                value="socialMedia"
              />
              <Checkbox
                onChange={handleCheckboxChange}
                label="From a friend"
                value="friend"
              />
              <Checkbox
                onChange={handleCheckboxChange}
                label="Other"
                value="other"
              />
            </div>

            {surveryData.source === "other" && (
              <input
                type="text"
                value={surveryData.otherSource}
                onChange={(e) => {
                  setSurveyData((prev) => ({
                    ...prev,
                    otherSource: e.target.value,
                  }));
                }}
                placeholder="Enter source"
                className="w-full p-2 mt-2 text-neutral-300 rounded-md"
              />
            )}
          </div>

          <div className="px-5 mt-4">
            <label htmlFor="rating" className="font-semibold">
              How would you rate your overall experience on our website?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              value={surveryData.rating}
              onChange={(e) => {
                setSurveyData((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }));
              }}
              id="rating"
              className="w-full p-2  mt-2 text-neutral-300 rounded-md"
            >
              <option value="">Select rating</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
              <option value="4">⭐️⭐️⭐️⭐️ - Good</option>
              <option value="3">⭐️⭐️⭐️ - Okay</option>
              <option value="2">⭐️⭐️ - Not great</option>
              <option value="1">⭐️ - Terrible</option>
            </select>
          </div>

          <div className="mt-5 px-5">
            <label htmlFor="name" className="font-semibold  mt-4">
              What is your name?
            </label>
            <input
              type="text"
              value={surveryData.name}
              onChange={(e) => {
                setSurveyData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              id="name"
              placeholder="Enter your name (optional)"
              className="w-full p-2 mt-2 text-neutral-300 rounded-md"
            />
          </div>

          <div className="px-5 mt-4">
            <label htmlFor="feedback" className="font-semibold  mt-4">
              What can we do to improve our website?
            </label>
            <textarea
              value={surveryData.feedback}
              onChange={(e) => {
                setSurveyData((prev) => ({
                  ...prev,
                  feedback: e.target.value,
                }));
              }}
              id="feedback"
              rows={4}
              placeholder="Enter your feedback (optional)"
              className="w-full p-2 mt-2 resize-none text-neutral-300 rounded-md"
            />
          </div>

          <div className="w-full px-5">
            <button
              disabled={!surveryData.source || !surveryData.rating || isLoading}
              type="submit"
              className={clsx(
                "py-2 my-3 bg-blue-600 w-full  rounded-md",
                !surveryData.source || !surveryData.rating
                  ? "bg-neutral-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              )}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SurveyForm;
