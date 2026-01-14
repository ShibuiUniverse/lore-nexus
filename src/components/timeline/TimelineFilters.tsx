import { cn } from "@/lib/utils";
import { BookOpen, Play, Calendar } from "lucide-react";

interface Era {
  id: string;
  name: string;
  color?: string | null;
}

interface TimelineFiltersProps {
  categories: string[];
  eras: Era[];
  eventTypes: string[];
  selectedCategory: string | null;
  selectedEra: string | null;
  selectedEventType: string | null;
  onCategoryChange: (category: string | null) => void;
  onEraChange: (era: string | null) => void;
  onEventTypeChange: (eventType: string | null) => void;
}

export function TimelineFilters({
  categories,
  eras,
  eventTypes,
  selectedCategory,
  selectedEra,
  selectedEventType,
  onCategoryChange,
  onEraChange,
  onEventTypeChange,
}: TimelineFiltersProps) {
  const categoryLabels: Record<string, string> = {
    event: "Events",
    battle: "Battles",
    birth: "Births",
    death: "Deaths",
    alliance: "Alliances",
    discovery: "Discoveries",
  };

  const eventTypeConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    event: { label: "Events", icon: <Calendar size={12} /> },
    lore_story: { label: "Lore", icon: <BookOpen size={12} /> },
    trailer: { label: "Trailers", icon: <Play size={12} /> },
  };

  return (
    <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Event Type filters - Primary filter row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
              Type:
            </span>
            <button
              onClick={() => onEventTypeChange(null)}
              className={cn(
                "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200 flex items-center gap-1.5",
                !selectedEventType
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              All
            </button>
            {eventTypes.map((type) => {
              const config = eventTypeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() =>
                    onEventTypeChange(selectedEventType === type ? null : type)
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200 flex items-center gap-1.5",
                    selectedEventType === type
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {config?.icon}
                  {config?.label || type}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
                Category:
              </span>
              <button
                onClick={() => onCategoryChange(null)}
                className={cn(
                  "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                  !selectedCategory
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    onCategoryChange(selectedCategory === category ? null : category)
                  }
                  className={cn(
                    "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                    selectedCategory === category
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {categoryLabels[category] || category}
                </button>
              ))}
            </div>

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
    </div>
  );
}
