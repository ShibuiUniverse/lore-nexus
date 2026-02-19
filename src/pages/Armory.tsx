import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { ArmoryCard } from "@/components/armory/ArmoryCard";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Sword, PawPrint } from "lucide-react";

const COLLECTIONS = [
  { value: "soulless_citadel", label: "Soulless Citadel" },
  { value: "women_warriors",   label: "Women Warriors" },
  { value: "pirates_of_fukushu", label: "Pirates of Fukushū" },
];

const Armory = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ["armory", selectedCollection, selectedType],
    queryFn: async () => {
      let query = supabase
        .from("artifacts")
        .select("*, characters(id, name)")
        .in("artifact_type", ["armory_weapon", "armory_sidekick"])
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (selectedCollection) {
        query = query.eq("power_description", selectedCollection);
      }
      if (selectedType) {
        query = query.eq("artifact_type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="武器庫" position="left" />
        <JapaneseAccent text="武器と仲間" position="right" />

        {/* Header */}
        <header className="relative container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4 opacity-0 animate-fade-in">
            武器庫
          </p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Armory
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Every weapon has a story. Every companion has a purpose. Browse the weapons
            and sidekicks of the Shibui Universe collections — in their own words.
          </p>
        </header>

        {/* Filters */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 py-3 space-y-3">
            {/* Collection filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-1 w-20 shrink-0">
                Collection:
              </span>
              <button
                onClick={() => setSelectedCollection(null)}
                className={cn(
                  "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  !selectedCollection
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                All
              </button>
              {COLLECTIONS.map((col) => (
                <button
                  key={col.value}
                  onClick={() =>
                    setSelectedCollection(selectedCollection === col.value ? null : col.value)
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    selectedCollection === col.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {col.label}
                </button>
              ))}
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-1 w-20 shrink-0">
                Type:
              </span>
              <button
                onClick={() => setSelectedType(null)}
                className={cn(
                  "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  !selectedType
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                All
              </button>
              <button
                onClick={() =>
                  setSelectedType(selectedType === "armory_weapon" ? null : "armory_weapon")
                }
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  selectedType === "armory_weapon"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <Sword size={11} />
                Weapons
              </button>
              <button
                onClick={() =>
                  setSelectedType(selectedType === "armory_sidekick" ? null : "armory_sidekick")
                }
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  selectedType === "armory_sidekick"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <PawPrint size={11} />
                Sidekicks
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items && items.length > 0 ? (
            <>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center">
                {items.length} {items.length === 1 ? "entry" : "entries"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <ArmoryCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                Nothing Here Yet
              </p>
              <h2 className="font-display text-2xl tracking-wide mb-4">
                The Arsenal Awaits
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedCollection || selectedType
                  ? "No items match your current filters. Try adjusting them."
                  : "Weapons and sidekicks will appear here once the armory is stocked."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Armory;
