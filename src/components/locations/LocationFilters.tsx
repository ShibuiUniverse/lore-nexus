import { cn } from "@/lib/utils";

interface LocationFiltersProps {
  regions: string[];
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
}

export function LocationFilters({
  regions,
  selectedRegion,
  onRegionChange,
}: LocationFiltersProps) {
  if (regions.length === 0) return null;

  return (
    <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground uppercase tracking-wider mr-2">
            Region:
          </span>
          <button
            onClick={() => onRegionChange(null)}
            className={cn(
              "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
              !selectedRegion
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            All
          </button>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() =>
                onRegionChange(selectedRegion === region ? null : region)
              }
              className={cn(
                "px-3 py-1.5 text-xs tracking-wider uppercase border transition-all duration-200",
                selectedRegion === region
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
