import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/context/GlobalProvider";
import Sidebar from "./component/sidenav/Sidebar";
import ProgressBar from "./component/progressbar/ProgressBar";
const inter = Inter({ subsets: ["latin"] });
import Analytics from "@/context/Analytics";
import SurveyForm from "./surveyform/SurveyForm";
import TopNotification from "./component/notification/TopNotification";

export const metadata = {
  title: "ShowMania",
  description:
    "At ShowMania, you can stream movies and TV shows for free. Plus, chat with other users, share your thoughts, and engage in discussions. We do not store any copyright-protected content on our website. Any linked content is stored only in third-party websites. This is a promotional website only. All files placed here are for introducing purposes",
  applicationName: "ShowMania",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  keywords: [
    "showmania ",
    "showmania movies ",
    "showmania tv shows",
    "showmania free movies",
    "showmania free tv shows",
    "showmania free movies and tv shows",
    "showmania free movies and tv shows online",
    "showmania free movies online",
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
          <SurveyForm />
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
