import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { WagmiConfig } from "wagmi";
import { routeTree } from "./routeTree.gen";
import { wagmiConfig } from "./wagmi/wagmiConfig";

// Create a new query client instance
export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RouterProvider router={router} />
        </WagmiConfig>
      </QueryClientProvider>
    </StrictMode>
  );
}
