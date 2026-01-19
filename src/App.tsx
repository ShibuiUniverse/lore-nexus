import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTimeline from "./pages/admin/AdminTimeline";
import AdminCharacters from "./pages/admin/AdminCharacters";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminPeoples from "./pages/admin/AdminPeoples";
import AdminArtifacts from "./pages/admin/AdminArtifacts";
import AdminProphecies from "./pages/admin/AdminProphecies";
import AdminStories from "./pages/admin/AdminStories";
import AdminEras from "./pages/admin/AdminEras";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/timeline" element={<AdminTimeline />} />
            <Route path="/admin/eras" element={<AdminEras />} />
            <Route path="/admin/characters" element={<AdminCharacters />} />
            <Route path="/admin/locations" element={<AdminLocations />} />
            <Route path="/admin/peoples" element={<AdminPeoples />} />
            <Route path="/admin/artifacts" element={<AdminArtifacts />} />
            <Route path="/admin/prophecies" element={<AdminProphecies />} />
            <Route path="/admin/stories" element={<AdminStories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
