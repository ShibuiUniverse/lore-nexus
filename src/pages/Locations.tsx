import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { LocationCard } from "@/components/locations/LocationCard";
import { LocationFilters } from "@/components/locations/LocationFilters";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

const Locations = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const { data: locations, isLoading } = useQuery({
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

  // Get unique regions from locations
  const regions = locations
    ? [...new Set(locations.map((l) => l.region).filter(Boolean))]
    : [];

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
            領域
          </p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Realms
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            From ancient kingdoms to mysterious lands beyond the horizon.
            Each realm holds secrets waiting to be discovered.
          </p>
        </header>

        {/* Filters */}
        <LocationFilters
          regions={regions as string[]}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        {/* Location Grid */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : locations && locations.length > 0 ? (
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Locations;
