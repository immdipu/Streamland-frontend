import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/context/GlobalProvider";
import Sidebar from "./component/sidenav/Sidebar";
import ProgressBar from "./component/progressbar/ProgressBar";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata = {
  title: "ShowMania",
  description:
    "ShowMania is a website where you can stream different movies and tv shows for free. We do not store any copyright-protected content on our website. Any linked content is stored only in third-party websites. This is a promotional website only. All files placed here are for introducing purpose.",
  applicationName: "ShowMania",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div>
            <ProgressBar />
            <Sidebar />
            <section className="pl-56 max-md:pl-0">
              {children}
              <Analytics />
            </section>
          </div>
        </Providers>
      </body>
      <Script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token="p.eyJ1IjogImVhNmZiMjM3LTIxOTctNDg1Mi05YzFiLWUzYWIxYmU1MDExZiIsICJpZCI6ICIzMjczNzVlYS02ZGRhLTQzNzYtODlhMC04NWUxY2RiMDAwM2UiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.f778Jn6SAMjrd9GtUkDv0drA55t8jLyK0YFEhxeGIbI"
      ></Script>
    </html>
  );
}
