import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Timeline from "./pages/Timeline";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import PeopleDetail from "./pages/PeopleDetail";
import Codex from "./pages/Codex";
import ArtifactDetail from "./pages/ArtifactDetail";
import ProphecyDetail from "./pages/ProphecyDetail";
import Stories from "./pages/Stories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
          <Route path="/peoples/:id" element={<PeopleDetail />} />
          <Route path="/realms" element={<Locations />} />
          <Route path="/codex" element={<Codex />} />
          <Route path="/codex/artifacts/:id" element={<ArtifactDetail />} />
          <Route path="/codex/prophecies/:id" element={<ProphecyDetail />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
