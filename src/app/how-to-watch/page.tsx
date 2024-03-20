/* eslint-disable @next/next/no-img-element */
import React from "react";

const page = () => {
  return (
    <div className="ml-16 max-md:ml-3">
      <div className="mt-28">
        <h1 className="text-2xl font-bold "> How to Watch</h1>
        <h3 className="mt-1 text-neutral-400">
          Follow these tips for uninterrupted streaming :
        </h3>
      </div>
      <section className="mt-3 bg-neutral-800 border border-neutral-700 hover:bg-neutral-900 mr-20 max-md:mr-3 px-4 py-2 rounded-md">
        <h2 className="font-semibold text-xl my-3">1. Install Ad Blocker</h2>
        <p className="mr-10  text-neutral-300">
          To ensure a smooth viewing experience, we recommend installing an ad
          blocker. We use third-party to stream our movies, so we cannot control
          the ads that are displayed. but we recommend using Ad Blocker to avoid
          ads.
          <br />
          <br />
          These are the best ad blocker extensions we recommend but you are free
          to use any ad blocker you want :
        </p>
        <section className="flex max-md:flex-col">
          <a
            href="https://chromewebstore.google.com/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block w-full border border-neutral-700 hover:bg-neutral-900 mr-20 px-4 py-2 rounded-md"
          >
            <h1 className="my-3 text-lg font-semibold">
              AdBlock - best ad blocker
            </h1>
            <img
              className=""
              src="https://getadblock.com/images/updateAssets/core_logo_full.svg"
              alt="adblocker"
            />
          </a>
          <a
            href="https://chromewebstore.google.com/detail/pop-up-blocker-for-chrome/bkkbcggnhapdmkeljlodobbkopceiche"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5  w-full block border border-neutral-700 hover:bg-neutral-900 mr-20 px-4 py-2 rounded-md"
          >
            <h1 className="my-3 text-lg font-semibold">
              Pop up blocker for Chrome
            </h1>
            <img
              className="w-64"
              src="https://poperblocker.com/wp-content/uploads/2017/09/poper-blocker-logo.svg"
              alt="adblocker"
            />
          </a>
        </section>
      </section>

      <section className="mt-3 bg-neutral-800 border border-neutral-700 hover:bg-neutral-900 mr-20 max-md:mr-3 px-4 py-2 rounded-md">
        <h2 className="font-semibold text-xl my-3">
          2. Switch Servers (If Needed)
        </h2>
        <p className="mr-10 text-neutral-300">
          We use third-party to stream our movies, so we cannot control the
          servers that are displayed. If you experience buffering on one server,
          try another server.
          <br />
          <br />
          Watch the video below to learn how to switch to a different server.
          <br />
          <br />
        </p>
        <div>
          <iframe
            className="w-full h-96"
            src="https://www.youtube.com/embed/V_uYqzZDtNs?si=hVRKYrH3yTeYxJHI&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default page;
