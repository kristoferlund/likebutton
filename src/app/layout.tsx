import "./globals.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { wagmiConfig } from "../wagmi/wagmiConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://likebutton.gg"),
  title: "likebutton.gg",
  description: "Yes, this is the like button. Press it and like someone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <Toaster position="top-center" reverseOrder={false} />
          <main className="flex flex-col items-center min-h-screen bg-header">
            <Header />
            <div className="flex flex-grow flex-col w-full px-5 lg:w-[1024px] items-center gap-5">
              <Suspense
                fallback={
                  <FontAwesomeIcon
                    icon={faHourglassEnd}
                    spin
                    className="w-10 h-10 text-theme-2"
                  />
                }
              >
                {children}
              </Suspense>
            </div>
            <Footer />
          </main>
        </WagmiConfig>
      </body>
    </html>
  );
}
