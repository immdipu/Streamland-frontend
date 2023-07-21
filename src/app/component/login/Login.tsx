"use client";
import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   onError: (error) => console.log(error),
  // });

  return (
    <div>
      <div className="flex items-center min-h-screen p-4 bg-_black_bg lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="/">Cinemaa</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              Watch movies and tv shows, save your favorite movie to watch later
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span> Don&apos;t have an account?</span>
              <a
                href="#"
                className="underline hover:text-neutral-200 underline-offset-4 "
              >
                Get Started!
              </a>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" className="underline underline-offset-2 text-white">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-white underline-offset-2">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 bg-_genre_chip_bg md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-neutral-100">
              Account Login
            </h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="text"
                  className="text-sm font-medium tracking-wide text-neutral-200"
                >
                  Email or username
                </label>
                <input
                  type="email"
                  id="email"
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium tracking-wide text-neutral-200"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-200 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="text"
                  id="password"
                  className="px-4 py-2 transition duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <br />
              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-medium tracking-wide text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
              <div className="flex flex-col space-y-5 ">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 bg-opacity-30 w-full"></span>
                  <span className="font-normal text-neutral-300 whitespace-nowrap">
                    Or continue with
                  </span>
                  <span className="h-px bg-gray-400 w-full bg-opacity-30"></span>
                </span>
              </div>
            </form>
            <div className="flex justify-center py-2 space-y-4 mt-3">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    const data = jwt_decode(credentialResponse.credential);
                    console.log(data);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
