import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/context/GlobalProvider";
import Sidebar from "./component/sidenav/Sidebar";
import Topnav from "./component/topnav/Topnav";
import { Toaster } from "react-hot-toast";
import ProgressBar from "./component/progressbar/ProgressBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cinemaa",
  description:
    "CINEMAA is a website where you can stream different movies and tv shows for free. We do not store any copyright-protected content on our website. Any linked content is stored only in third-party websites. This is a promotional website only. All files placed here are for introducing purpose.",
  generator: "Next.js",
  applicationName: "Cinemaa",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
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
            <section className="pl-56 max-md:pl-0">{children}</section>
          </div>
        </Providers>
      </body>
    </html>
  );
}
