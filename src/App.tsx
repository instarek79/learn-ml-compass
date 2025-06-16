
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { SelectionProvider } from "./contexts/SelectionContext";
import { UserProvider } from "./contexts/UserContext";
import { NotificationSystem, useNotifications } from "./components/NotificationSystem";
import Dashboard from "./pages/Dashboard";
import LearnAI from "./pages/LearnAI";
import CodingArea from "./pages/CodingArea";
import Datasets from "./pages/Datasets";
import MLModels from "./pages/MLModels";
import MLPlayground from "./pages/MLPlayground";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { notifications, addNotification, removeNotification } = useNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UserProvider>
          <SelectionProvider>
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
                    <Route path="/playground" element={<MLPlayground />} />
                    <Route path="/training" element={<Dashboard />} />
                    <Route path="/progress" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <NotificationSystem 
                  notifications={notifications}
                  onRemove={removeNotification}
                />
              </div>
            </BrowserRouter>
          </SelectionProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
