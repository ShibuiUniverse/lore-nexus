import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

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
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const yearRange =
    era.start_year && era.end_year
      ? `${era.start_year} — ${era.end_year}`
      : era.start_year
      ? `From ${era.start_year}`
      : era.end_year
      ? `Until ${era.end_year}`
      : null;

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex items-center justify-center py-12 md:py-16 z-10",
        "transition-all duration-700 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
    >
      {/* Background glow */}
      <div 
        className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${era.color || "hsl(0, 72%, 50%)"} 0%, transparent 70%)`
        }}
      />

      {/* Era marker diamond — pinned to vertical center of this section */}
      <div
        className="absolute left-6 md:left-1/2 top-8 md:top-12 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-45 border-2 z-20 shadow-lg"
        style={{
          borderColor: era.color || "hsl(0, 72%, 50%)",
          backgroundColor: "hsl(var(--background))",
          boxShadow: `0 0 20px ${era.color || "hsl(0, 72%, 50%)"}40`
        }}
      />

      {/* Era label */}
      <div className="ml-16 md:ml-0 flex flex-col items-start md:items-center relative z-10">
        <div
          className="px-8 py-3 border-2 bg-background"
          style={{ borderColor: era.color || "hsl(0, 72%, 50%)" }}
        >
          <h2
            className="font-display text-xl md:text-2xl tracking-[0.2em] uppercase"
            style={{ color: era.color || "hsl(0, 72%, 50%)" }}
          >
            {era.name}
          </h2>
        </div>
        {yearRange && (
          <p 
            className="text-sm font-display tracking-[0.15em] mt-3"
            style={{ color: era.color || "hsl(0, 72%, 50%)", opacity: 0.8 }}
          >
            {yearRange}
          </p>
        )}
        {era.description && (
          <p className="text-sm text-muted-foreground mt-3 max-w-lg text-center hidden md:block leading-relaxed">
            {era.description}
          </p>
        )}
      </div>
    </div>
  );
}
