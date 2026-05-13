import { ChevronDown, BookOpen, Play, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Era {
  id: string;
  name: string;
  color?: string | null;
}

interface Event {
  id: string;
  title: string;
  description?: string | null;
  full_content?: string | null;
  year?: number | null;
  category?: string | null;
  image_url?: string | null;
  event_type?: string | null;
  video_url?: string | null;
  reading_time?: number | null;
  show_lore_badge?: boolean | null;
  eras?: Era | null;
}

interface TimelineEventProps {
  event: Event;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenModal: (modalType?: "lore" | "trailer") => void;
  position: "left" | "right";
  index?: number;
}

export function TimelineEvent({
  event,
  isExpanded,
  onToggle,
  onOpenModal,
  position,
  index = 0,
}: TimelineEventProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
  });
  
  const categoryColors: Record<string, string> = {
    event: "hsl(0, 72%, 50%)",
    battle: "hsl(0, 60%, 45%)",
    birth: "hsl(38, 60%, 45%)",
    death: "hsl(0, 0%, 40%)",
    alliance: "hsl(200, 60%, 45%)",
    discovery: "hsl(280, 50%, 50%)",
  };

  const accentColor = event.category
    ? categoryColors[event.category] || "hsl(0, 72%, 50%)"
    : "hsl(0, 72%, 50%)";

  // Badge logic - lore badge controlled by explicit flag, trailer by video_url
  const hasLore = !!event.show_lore_badge;
  const hasTrailer = !!event.video_url;
  const hasBothContent = hasLore && hasTrailer;
  const hasAnyContent = hasLore || hasTrailer;
  
  // Check if this event has content that should open in a modal
  const shouldOpenModal = hasLore || hasTrailer;

  const handleCardClick = () => {
    if (shouldOpenModal) {
      // Default to lore if available, otherwise trailer
      onOpenModal(hasLore ? "lore" : "trailer");
    } else {
      onToggle();
    }
  };

  const handleBadgeClick = (e: React.MouseEvent, type: "lore" | "trailer") => {
    e.stopPropagation();
    onOpenModal(type);
  };

  return (
    <div
      ref={ref}
      id={event.id}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 group",
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Timeline node — sits on the center line */}
      <div
        className={cn(
          "absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 border-2 bg-background transition-all duration-300 group-hover:scale-125 z-10",
          hasAnyContent && "w-4 h-4 border-primary"
        )}
        style={{ borderColor: !hasAnyContent ? accentColor : undefined }}
      >
        {hasAnyContent && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
        )}
      </div>

      {/* Connecting line: anchored at center, extends into the card column */}
      <div
        className={cn(
          "hidden md:block absolute top-7 h-px w-12 z-10",
          position === "left" ? "right-1/2" : "left-1/2"
        )}
        style={{
          backgroundColor: hasAnyContent ? "hsl(var(--primary))" : accentColor,
          opacity: 0.4,
        }}
      />

      {/* Card — explicit column placement, no spacer divs needed */}
      <div
        className={cn(
          "ml-12 md:ml-0",
          position === "left"
            ? "md:col-start-1 md:pr-12 md:text-right"
            : "md:col-start-2 md:pl-12"
        )}
      >
        <button
          onClick={handleCardClick}
          className={cn("w-full group/card", position === "left" ? "md:text-right" : "text-left")}
        >
          <div
            className={cn(
              "relative overflow-hidden border bg-card/50 backdrop-blur-sm transition-all duration-300",
              "hover:bg-card/80",
              hasAnyContent && "border-primary/30 hover:border-primary/50",
              !hasAnyContent && "border-border hover:border-primary/50",
              isExpanded && !hasAnyContent && "border-primary/50"
            )}
          >
            {/* Image */}
            {event.image_url && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Play overlay for trailer-only entries */}
                {hasTrailer && !hasLore && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center">
                      <Play size={28} className="text-accent-foreground ml-1" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Year, category, and reading time */}
              <div
                className={cn(
                  "flex items-center gap-3 mb-3 flex-wrap",
                  position === "left" && "md:justify-end"
                )}
              >
                {event.year && (
                  <span
                    className={cn(
                      "font-display text-2xl",
                      hasAnyContent && "text-primary"
                    )}
                    style={{ color: !hasAnyContent ? accentColor : undefined }}
                  >
                    {event.year}
                  </span>
                )}
                {event.category && (
                  <span
                    className="px-2 py-0.5 text-xs uppercase tracking-wider border"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                    }}
                  >
                    {event.category}
                  </span>
                )}
                {event.reading_time && hasLore && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={10} />
                    {event.reading_time} min
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg tracking-wide mb-2 transition-colors group-hover/card:text-primary text-foreground">
                {event.title}
              </h3>

              {/* Description */}
              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Content Badges - Show based on available content */}
              {hasAnyContent && (
                <div
                  className={cn(
                    "flex items-center gap-2 mt-4 flex-wrap",
                    position === "left" && "md:justify-end"
                  )}
                >
                  {/* Lore badge */}
                  {hasLore && (
                    <button
                      onClick={(e) => handleBadgeClick(e, "lore")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border border-primary/50 text-primary bg-primary/5 hover:bg-primary/20 transition-colors rounded"
                    >
                      <BookOpen size={12} />
                      Read Lore
                    </button>
                  )}
                  
                  {/* Trailer badge */}
                  {hasTrailer && (
                    <button
                      onClick={(e) => handleBadgeClick(e, "trailer")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border border-accent/50 text-accent bg-accent/5 hover:bg-accent/20 transition-colors rounded"
                    >
                      <Play size={12} />
                      Watch Trailer
                    </button>
                  )}
                </div>
              )}

              {/* Action indicator - Only show when there's no modal content */}
              {!hasAnyContent && event.full_content && (
                <div
                  className={cn(
                    "flex items-center gap-2 mt-4 text-xs",
                    position === "left" && "md:justify-end"
                  )}
                >
                  <span className="text-muted-foreground flex items-center gap-1">
                    {isExpanded ? "Show less" : "Read more"}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </span>
                </div>
              )}
            </div>

            {/* Expanded content (only for events without modal content) */}
            {!shouldOpenModal && (
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6 border-t border-border pt-4">
                  <div className="prose prose-sm prose-invert max-w-none">
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                      {event.full_content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
