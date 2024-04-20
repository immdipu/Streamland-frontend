"use client";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import { LoggedIn } from "@/redux/slice/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import FullScreenLoader from "../loader/FullScreenLoader";
import SmallLoader from "../loader/SmallLoader";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const [showSignup, setShowSignUp] = useState(false);
  const SignupFullName = useRef<HTMLInputElement>(null);
  const SignupUsername = useRef<HTMLInputElement>(null);
  const SignupEmail = useRef<HTMLInputElement>(null);
  const SignupPassword = useRef<HTMLInputElement>(null);
  const LoginEmailUser = useRef<HTMLInputElement>(null);
  const LoginPassword = useRef<HTMLInputElement>(null);

  const googleLogin = useMutation(
    (data: string) => userApis.GoogleLogin(data),
    {
      onSuccess: (data) => {
        dispatch(LoggedIn(data));
        toast.success("Logged in successfully");
      },
      onError: (data: any) => {
        const msg: string = data.response.data;
        if (msg) {
          console.log(msg);
        } else {
          console.log("something went wrong");
        }
      },
    }
  );

  const Signup = useMutation((data: any) => userApis.signUp(data), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
      toast.success("Account created successfully");
    },
    onError: (data: any) => {
      if (data.response.data) {
        toast.error(data.response.data);
      } else {
        toast.error("Sign up failed ");
      }
    },
  });
  const LogIn = useMutation((data: any) => userApis.LogIn(data), {
    onSuccess: (data) => {
      dispatch(LoggedIn(data));
      toast.success(" Logged in successfully");
    },
    onError: (data: any) => {
      if (data.response.data) {
        toast.error(data.response.data);
      } else {
        toast.error("Login failed  Try Again!");
      }
    },
  });

  useEffect(() => {
    if (user.isUserAuthenticated) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isUserAuthenticated]);

  const HandleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullNameValue = SignupFullName.current?.value?.trim() || "";
    const usernameValue = SignupUsername.current?.value?.trim() || "";
    const emailValue = SignupEmail.current?.value?.trim() || "";
    const passwordValue = SignupPassword.current?.value?.trim() || "";
    if (!fullNameValue) {
      toast.error("FullName is required");
      return;
    }

    if (!usernameValue) {
      toast.error("username is required");
      return;
    }

    if (!emailValue) {
      toast.error("email is required");
      return;
    }

    if (!passwordValue) {
      toast.error("password is required");
      return;
    }
    if (passwordValue.length < 4) {
      toast.error("passowrd length should be more than 4");
    }
    let data = {
      fullName: fullNameValue,
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };
    Signup.mutate(data);
  };

  const HandleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailUsernameValue = LoginEmailUser.current?.value?.trim() || "";
    const passwordValue = LoginPassword.current?.value?.trim() || "";
    if (!emailUsernameValue) {
      toast.error("email or username is required");
      return;
    }
    if (!passwordValue) {
      toast.error("password is required");
      return;
    }
    let data = {
      email: emailUsernameValue,
      username: emailUsernameValue,
      password: passwordValue,
    };
    LogIn.mutate(data);
  };

  return (
    <div>
      {googleLogin.isLoading && <FullScreenLoader />}
      <div className="flex items-center min-h-screen p-4 max-md:p-0 bg-_black_bg lg:justify-center">
        <div className="flex relative flex-col max-w-3xl max-md:w-full overflow-hidden bg-_black_bg max-md:mt-20 rounded-md shadow-lg max md:flex-row ">
          {/* Information section */}
          <div
            className={clsx(
              "p-4 absolute max-md:h-1/2 max-md:w-full  transition-all duration-200 ease-linear w-1/2 z-20 flex flex-col justify-center gap-5 bottom-0 top-0 py-6 text-white bg-blue-500",
              showSignup
                ? "right-0 left-1/2 max-md:left-0 max-md:top-1/2"
                : "left-0 right-1/2 max-md:right-0   max-md:bottom-0"
            )}
          >
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="/">ShowMania</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              Watch movies and tv shows, save your favorite movie to watch later
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span className="text-sm text-neutral-100">
                {" "}
                {showSignup ? "Already" : "Don't"} have an account?
              </span>
              <button
                onClick={() => setShowSignUp(!showSignup)}
                className="underline hover:text-neutral-200 underline-offset-4 "
              >
                {showSignup ? "Log in" : " Get Started!"}
              </button>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <Link
                href={"/terms"}
                className="underline underline-offset-2 text-white"
              >
                terms
              </Link>{" "}
              and{" "}
              <Link
                href={"/terms"}
                className="underline text-white underline-offset-2"
              >
                conditions
              </Link>
            </p>
          </div>
          {/* signup section */}
          <div className="p-5 bg-_genre_chip_bg md:flex-1 w-1/2 max-md:w-full max-md:px-10 shrink-0">
            <h3 className="my-4 text-2xl font-semibold text-neutral-100">
              Sign up
            </h3>
            <form
              className="flex flex-col space-y-5"
              onSubmit={HandleSignupSubmit}
            >
              <div className="flex w-1/2">
                <div className="flex flex-col pr-2 w-full space-y-1">
                  <label
                    htmlFor="text"
                    className="text-sm font-medium  tracking-wide text-neutral-200"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="text"
                    autoFocus
                    ref={SignupFullName}
                    placeholder="Your full name"
                    required
                    className="px-4 py-2 transition duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                </div>
                <div className="flex flex-col pl-2 w-full space-y-1">
                  <label
                    htmlFor="text"
                    className="text-sm font-medium  tracking-wide text-neutral-200"
                  >
                    username
                  </label>
                  <input
                    type="text"
                    ref={SignupUsername}
                    required
                    placeholder="username"
                    id="text"
                    className="px-4 py-2 transition duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="text"
                  className="text-sm font-medium tracking-wide text-neutral-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  id="email"
                  required
                  ref={SignupEmail}
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
                </div>
                <input
                  type="text"
                  id="password"
                  placeholder="password"
                  ref={SignupPassword}
                  required
                  className="px-4 py-2 transition  duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <br />
              <div className="mt-2">
                <button
                  type="submit"
                  className={clsx(
                    "w-full px-4 py-2 text-lg font-medium tracking-wide text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4",
                    Signup.isLoading
                      ? "pointer-events-none bg-opacity-70"
                      : "bg-opacity-100 pointer-events-auto"
                  )}
                >
                  {Signup.isLoading ? <SmallLoader size={25} /> : "sign up"}
                </button>
              </div>
            </form>
          </div>
          {/* login section */}
          <div className="p-5 bg-_genre_chip_bg md:flex-1 max-md:w-full max-md:px-10 w-1/2 shrink-0">
            <h3 className="my-4 text-2xl font-semibold text-neutral-100">
              Account Login
            </h3>
            <form
              onSubmit={HandleLoginSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="text"
                  className="text-sm font-medium tracking-wide text-neutral-200"
                >
                  Email or username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  id="email"
                  autoFocus
                  ref={LoginEmailUser}
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
                </div>
                <input
                  type="text"
                  placeholder="password"
                  id="password"
                  ref={LoginPassword}
                  className="px-4 py-2 transition duration-300 border border-neutral-400 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <br />
              <div className="mt-2">
                <button
                  type="submit"
                  className={clsx(
                    "w-full px-4 py-2 text-lg font-medium tracking-wide text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4",
                    LogIn.isLoading
                      ? "bg-opacity-70 pointer-events-none"
                      : "bg-opacity-100 pointer-events-auto"
                  )}
                >
                  {LogIn.isLoading ? <SmallLoader size={25} /> : "Log in"}
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
            <div className="flex bg-transparent justify-center py-2 space-y-4 mt-3">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    googleLogin.mutate(credentialResponse.credential);
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
