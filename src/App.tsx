
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import Stats from "./pages/Stats";
import Healing from "./pages/Healing";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { MoodProvider } from "./contexts/MoodContext";
import { HealingProvider } from "./contexts/HealingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MoodProvider>
        <HealingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/healing" element={<Healing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HealingProvider>
      </MoodProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
