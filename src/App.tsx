
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LearnAI from "./pages/LearnAI";
import CodingArea from "./pages/CodingArea";
import Datasets from "./pages/Datasets";
import MLModels from "./pages/MLModels";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex w-full">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learn" element={<LearnAI />} />
              <Route path="/code" element={<CodingArea />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/models" element={<MLModels />} />
              <Route path="/training" element={<Dashboard />} />
              <Route path="/progress" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
