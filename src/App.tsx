
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BooksPage from "./pages/Books";
import MoviesPage from "./pages/Movies";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx still exists or will be created
import { MediaLogProvider } from "./contexts/MediaLogContext";


// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MediaLogProvider> {/* New Provider */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate replace to="/books" />} /> {/* Redirect / to /books */}
              <Route path="/books" element={<BooksPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              {/* Add NotFound route if it exists, or create a simple one */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MediaLogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

