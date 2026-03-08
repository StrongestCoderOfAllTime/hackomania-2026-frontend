import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Simulator from "@/pages/Simulator";
import Alerts from "@/pages/Alerts";
import Coach from "@/pages/Coach";
import Profile from "@/pages/Profile";
import Challenge from "@/pages/Challenge";
import Mascot from "@/pages/Mascot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/mascot" element={<Mascot />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
