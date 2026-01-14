import { cn } from "@/lib/utils";

interface Era {
  id: string;
  name: string;
  color?: string | null;
}

interface CharacterFiltersProps {
  factions: string[];
  eras: Era[];
  selectedFaction: string | null;
  selectedEra: string | null;
  onFactionChange: (faction: string | null) => void;
  onEraChange: (era: string | null) => void;
}

export function CharacterFilters({
  factions,
  eras,
  selectedFaction,
  selectedEra,
  onFactionChange,
  onEraChange,
}: CharacterFiltersProps) {
  return (
    <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Faction filters */}
          {factions.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
                Faction:
              </span>
              <button
                onClick={() => onFactionChange(null)}
                className={cn(
                  "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  !selectedFaction
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                All
              </button>
              {factions.map((faction) => (
                <button
                  key={faction}
                  onClick={() =>
                    onFactionChange(selectedFaction === faction ? null : faction)
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    selectedFaction === faction
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {faction}
                </button>
              ))}
            </div>
          )}

          {/* Era filters */}
          {eras.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap md:ml-auto">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
                Era:
              </span>
              <button
                onClick={() => onEraChange(null)}
                className={cn(
                  "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  !selectedEra
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                All
              </button>
              {eras.map((era) => (
                <button
                  key={era.id}
                  onClick={() =>
                    onEraChange(selectedEra === era.id ? null : era.id)
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    selectedEra === era.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                  style={{
                    borderColor:
                      selectedEra === era.id ? era.color || undefined : undefined,
                  }}
                >
                  {era.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
