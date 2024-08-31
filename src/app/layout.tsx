import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/context/GlobalProvider";
import Sidebar from "./component/sidenav/Sidebar";
import ProgressBar from "./component/progressbar/ProgressBar";
const inter = Inter({ subsets: ["latin"] });
import Analytics from "@/context/Analytics";

export const metadata = {
  title: "streamland",
  description:
    "At streamland, you can stream movies and TV shows for free. Plus, chat with other users, share your thoughts, and engage in discussions. We do not store any copyright-protected content on our website. Any linked content is stored only in third-party websites. This is a promotional website only. All files placed here are for introducing purposes",
  applicationName: "streamland",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  keywords: [
    "streamland ",
    "streamland movies ",
    "streamland tv shows",
    "streamland free movies",
    "streamland free tv shows",
    "streamland free movies and tv shows",
    "streamland free movies and tv shows online",
    "streamland free movies online",
    "free tv shows",
    "free movies and tv shows",
    "free movies and tv shows online",
    "free movies online",
    "free hd movies",
    "free tv shows online",
    "free movies and tv shows app",
  ],
  robots: "index, follow",
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
    </html>
  );
}
