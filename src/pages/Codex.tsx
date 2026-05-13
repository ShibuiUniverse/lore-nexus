import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { ArtifactCard } from "@/components/codex/ArtifactCard";
import { ProphecyCard } from "@/components/codex/ProphecyCard";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Sword, ScrollText } from "lucide-react";

type TabType = "artifacts" | "prophecies";

const Codex = () => {
  const [activeTab, setActiveTab] = useState<TabType>("artifacts");
  const [selectedArtifactType, setSelectedArtifactType] = useState<string | null>(null);
  const [selectedProphecyStatus, setSelectedProphecyStatus] = useState<string | null>(null);

  const { data: artifacts, isLoading: artifactsLoading } = useQuery({
    queryKey: ["artifacts", selectedArtifactType],
    queryFn: async () => {
      let query = supabase
        .from("artifacts")
        .select("*, characters(id, name)")
        .order("sort_order", { ascending: true });

      if (selectedArtifactType) {
        query = query.eq("artifact_type", selectedArtifactType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data?.filter(a => !a.artifact_type?.startsWith("armory_")) ?? [];
    },
  });

  const { data: prophecies, isLoading: propheciesLoading } = useQuery({
    queryKey: ["prophecies", selectedProphecyStatus],
    queryFn: async () => {
      let query = supabase
        .from("prophecies")
        .select("*, eras(id, name)")
        .order("sort_order", { ascending: true });

      if (selectedProphecyStatus) {
        query = query.eq("status", selectedProphecyStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const artifactTypes = ["weapon", "gemstone", "relic", "other"];
  const prophecyStatuses = ["unfulfilled", "partially_fulfilled", "fulfilled", "disputed"];

  const isLoading = activeTab === "artifacts" ? artifactsLoading : propheciesLoading;

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="典籍" position="left" />
        <JapaneseAccent text="古代の知識" position="right" />

        {/* Header */}
        <header className="relative container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4 opacity-0 animate-fade-in">
            典籍
          </p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Codex
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Ancient artifacts of power and prophecies that shape the fate of realms.
            The collected knowledge of ages past.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("artifacts")}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-display text-sm tracking-wider uppercase border-b-2 transition-all duration-200",
                  activeTab === "artifacts"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Sword size={16} />
                Artifacts
              </button>
              <button
                onClick={() => setActiveTab("prophecies")}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 font-display text-sm tracking-wider uppercase border-b-2 transition-all duration-200",
                  activeTab === "prophecies"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <ScrollText size={16} />
                Prophecies
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-background/60 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 py-4">
            {activeTab === "artifacts" ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
                  Type:
                </span>
                <button
                  onClick={() => setSelectedArtifactType(null)}
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    !selectedArtifactType
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  All
                </button>
                {artifactTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedArtifactType(selectedArtifactType === type ? null : type)
                    }
                    className={cn(
                      "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                      selectedArtifactType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
                  Status:
                </span>
                <button
                  onClick={() => setSelectedProphecyStatus(null)}
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    !selectedProphecyStatus
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  All
                </button>
                {prophecyStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setSelectedProphecyStatus(selectedProphecyStatus === status ? null : status)
                    }
                    className={cn(
                      "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                      selectedProphecyStatus === status
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {status.replace("_", " ")}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activeTab === "artifacts" ? (
            artifacts && artifacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artifacts.map((artifact, index) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                  No Artifacts Found
                </p>
                <h2 className="font-display text-2xl tracking-wide mb-4">
                  The Vault Awaits
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {selectedArtifactType
                    ? "No artifacts match your current filter. Try adjusting it."
                    : "Artifacts will appear here once they are added to the codex."}
                </p>
              </div>
            )
          ) : prophecies && prophecies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prophecies.map((prophecy, index) => (
                <ProphecyCard
                  key={prophecy.id}
                  prophecy={prophecy}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                No Prophecies Found
              </p>
              <h2 className="font-display text-2xl tracking-wide mb-4">
                The Oracle is Silent
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedProphecyStatus
                  ? "No prophecies match your current filter. Try adjusting it."
                  : "Prophecies will appear here once they are added to the codex."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Codex;
