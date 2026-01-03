import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import Explore from "./pages/Explore";
import TripDetails from "./pages/TripDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Trip } from "@/types/trip";
import { mockTrips } from "@/data/mockData";

const queryClient = new QueryClient();

const STORAGE_KEY = "globeTrotter_trips";

const App = () => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return mockTrips;
      }
    }
    return mockTrips;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard trips={trips} setTrips={setTrips} />} />
            <Route path="/my-trips" element={<MyTrips trips={trips} setTrips={setTrips} />} />
            <Route path="/explore" element={<Explore trips={trips} setTrips={setTrips} />} />
            <Route path="/trip/:id" element={<TripDetails trips={trips} setTrips={setTrips} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
