import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProviderWrapper } from "./ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // --- THIS IS KEY FOR SESSION CACHING ---
      staleTime: Infinity, // Data is considered fresh until manually invalidated or page refresh
      gcTime: 1000 * 60 * 60 * 24, // How long unused data stays in memory (e.g., 24 hours). Cleared on refresh anyway.
      // --- Other useful defaults ---
      refetchOnWindowFocus: false, // Don't refetch just because user tabs back to the page
      retry: 1, // Retry failed fetches once (or set to false)
    },
  },
});


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </QueryClientProvider>
  </StrictMode>
);
