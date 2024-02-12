import { Outlet, createRootRoute } from "@tanstack/react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

export const Route = createRootRoute({
  component: () => (
    <>
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
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </main>
    </>
  ),
});
