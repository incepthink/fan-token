import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { config } from "@/lib/wagmi";

import ExplorePage from "./pages/ExplorePage";
import ArtistLoginPage from "./pages/ArtistLoginPage";
import ArtistSignupPage from "./pages/ArtistSignupPage";
import ArtistDashboardLayout from "./pages/ArtistDashboardLayout";
import ArtistDashboardPage from "./pages/ArtistDashboardPage";
import CreateFanPage from "./pages/CreateFanPage";
import AddTaskPage from "./pages/AddTaskPage";
import ApprovalsPage from "./pages/ApprovalsPage";
import FanPageView from "./pages/FanPageView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/examples/fan-tokens">
              <Routes>
                <Route path="/" element={<ExplorePage />} />
                <Route path="/artist/login" element={<ArtistLoginPage />} />
                <Route path="/artist/signup" element={<ArtistSignupPage />} />
                <Route
                  path="/artist/dashboard"
                  element={<ArtistDashboardLayout />}
                >
                  <Route index element={<ArtistDashboardPage />} />
                  <Route path="create" element={<CreateFanPage />} />
                  <Route path="approvals" element={<ApprovalsPage />} />
                  <Route
                    path=":fanPageId/tasks/new"
                    element={<AddTaskPage />}
                  />
                  <Route
                    path=":fanPageId/approvals"
                    element={<ApprovalsPage />}
                  />
                </Route>
                <Route path="/:fanPageSlug" element={<FanPageView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
