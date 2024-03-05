"use client";
import React from "react";
import Script from "next/script";

const Analytics = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_TRACKING_ID}')`}
      </Script>
      <Script
        id="ms-clarity"
        strategy="afterInteractive"
        onLoad={() => console.log("clarity onload")}
        onReady={() => console.log("clarity onready")}
        onError={() => console.log("clarity onerror")}
      >
        {typeof window !== "undefined" &&
          (function (
            c: any,
            l: any,
            a: string,
            r: string,
            i: string,
            t?: any,
            y?: any
          ) {
            c[a] =
              c[a] ||
              function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
            t = l.createElement(r);
            t.async = 1;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            if (y) y.parentNode.insertBefore(t, y);
            return null;
          })(window, document, "clarity", "script", "lbvoi2a0xh")}
      </Script>
    </>
  );
};

export default Analytics;
