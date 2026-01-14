interface Era {
  id: string;
  name: string;
  description?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  color?: string | null;
}

interface TimelineEraMarkerProps {
  era: Era;
}

export function TimelineEraMarker({ era }: TimelineEraMarkerProps) {
  const yearRange =
    era.start_year && era.end_year
      ? `${era.start_year} - ${era.end_year}`
      : era.start_year
      ? `From ${era.start_year}`
      : era.end_year
      ? `Until ${era.end_year}`
      : null;

  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Era marker diamond */}
      <div
        className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-2"
        style={{
          borderColor: era.color || "hsl(0, 72%, 50%)",
          backgroundColor: "hsl(var(--background))",
        }}
      />

      {/* Era label */}
      <div className="ml-12 md:ml-0 flex flex-col items-start md:items-center">
        <div
          className="px-6 py-2 border"
          style={{ borderColor: era.color || "hsl(0, 72%, 50%)" }}
        >
          <h2
            className="font-display text-lg md:text-xl tracking-widest uppercase"
            style={{ color: era.color || "hsl(0, 72%, 50%)" }}
          >
            {era.name}
          </h2>
        </div>
        {yearRange && (
          <p className="text-xs text-muted-foreground mt-2 tracking-wider">
            {yearRange}
          </p>
        )}
        {era.description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-md text-center hidden md:block">
            {era.description}
          </p>
        )}
      </div>
    </div>
  );
}
