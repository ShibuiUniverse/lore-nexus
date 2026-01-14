import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { LocationCard } from "@/components/locations/LocationCard";
import { LocationFilters } from "@/components/locations/LocationFilters";
import { PeopleCard } from "@/components/peoples/PeopleCard";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";

type TabType = "locations" | "peoples";

const Locations = () => {
  const [activeTab, setActiveTab] = useState<TabType>("locations");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { data: locations, isLoading: locationsLoading } = useQuery({
    queryKey: ["locations", selectedRegion],
    queryFn: async () => {
      let query = supabase
        .from("locations")
        .select("*")
        .order("sort_order", { ascending: true });

      if (selectedRegion) {
        query = query.eq("region", selectedRegion);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: peopleGroups, isLoading: peoplesLoading } = useQuery({
    queryKey: ["people-groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("people_groups")
        .select("*, locations(id, name)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Get unique regions from locations
  const regions = locations
    ? [...new Set(locations.map((l) => l.region).filter(Boolean))]
    : [];

  const isLoading = activeTab === "locations" ? locationsLoading : peoplesLoading;

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="領域" position="left" />
        <JapaneseAccent text="世界地図" position="right" />

        {/* Header */}
        <header className="relative container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4 opacity-0 animate-fade-in">
            領域と民族
          </p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Realms & Peoples
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            From ancient kingdoms to the diverse cultures that inhabit them.
            Discover the lands and peoples that shape this world.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("locations")}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-display text-sm tracking-wider uppercase border-b-2 transition-all duration-200",
                  activeTab === "locations"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <MapPin size={16} />
                Locations
              </button>
              <button
                onClick={() => setActiveTab("peoples")}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-display text-sm tracking-wider uppercase border-b-2 transition-all duration-200",
                  activeTab === "peoples"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Users size={16} />
                Peoples
              </button>
            </div>
          </div>
        </div>

        {/* Filters (only for locations tab) */}
        {activeTab === "locations" && (
          <LocationFilters
            regions={regions as string[]}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
        )}

        {/* Content Grid */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeTab === "locations" ? (
            // Locations Grid
            locations && locations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location, index) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  No Realms Found
                </p>
                <h2 className="font-display text-2xl tracking-wide mb-4">
                  The Atlas Awaits
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {selectedRegion
                    ? "No realms match your current filter. Try adjusting it."
                    : "Realms will appear here once they are added to the chronicle."}
                </p>
              </div>
            )
          ) : (
            // Peoples Grid
            peopleGroups && peopleGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {peopleGroups.map((group, index) => (
                  <PeopleCard
                    key={group.id}
                    group={group}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  No Peoples Found
                </p>
                <h2 className="font-display text-2xl tracking-wide mb-4">
                  Cultures Await Discovery
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  People groups will appear here once they are added to the chronicle.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Locations;
