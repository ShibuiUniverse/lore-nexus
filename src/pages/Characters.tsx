import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { CharacterFilters } from "@/components/characters/CharacterFilters";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

const Characters = () => {
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const { data: eras } = useQuery({
    queryKey: ["eras"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("eras")
        .select("*")
        .order("start_year", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: characters, isLoading } = useQuery({
    queryKey: ["characters", selectedFaction, selectedEra],
    queryFn: async () => {
      let query = supabase
        .from("characters")
        .select("*, eras(*)")
        .order("sort_order", { ascending: true });

      if (selectedFaction) {
        query = query.eq("faction", selectedFaction);
      }
      if (selectedEra) {
        query = query.eq("era_id", selectedEra);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Get unique factions from characters
  const factions = characters
    ? [...new Set(characters.map((c) => c.faction).filter(Boolean))]
    : [];

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="人物" position="left" />
        <JapaneseAccent text="英雄伝説" position="right" />

        {/* Header */}
        <header className="relative container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4 opacity-0 animate-fade-in">
            人物
          </p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Characters
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Heroes, villains, and legends whose actions shaped the course of
            history. Each carries a story worth telling.
          </p>
        </header>

        {/* Filters */}
        <CharacterFilters
          factions={factions as string[]}
          eras={eras || []}
          selectedFaction={selectedFaction}
          selectedEra={selectedEra}
          onFactionChange={setSelectedFaction}
          onEraChange={setSelectedEra}
        />

        {/* Character Grid */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : characters && characters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                No Characters Found
              </p>
              <h2 className="font-display text-2xl tracking-wide mb-4">
                The Codex Awaits
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedFaction || selectedEra
                  ? "No characters match your current filters. Try adjusting them."
                  : "Characters will appear here once they are added to the chronicle."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Characters;
