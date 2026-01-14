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
  eras?: Era | null;
}

interface TimelineEventProps {
  event: Event;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenModal: () => void;
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

  const eventType = event.event_type || "event";
  const isLoreStory = eventType === "lore_story";
  const isTrailer = eventType === "trailer";
  const isRegularEvent = eventType === "event";
  
  // Check if this event has substantial content that should open in a modal
  const hasLongContent = event.full_content && event.full_content.length > 500;
  const hasVideo = !!event.video_url;
  const shouldOpenModal = isLoreStory || isTrailer || hasLongContent || hasVideo;

  const handleClick = () => {
    if (shouldOpenModal) {
      onOpenModal();
    } else {
      onToggle();
    }
  };

  // Event type indicator icon
  const TypeIcon = () => {
    if (isLoreStory) {
      return (
        <div className="absolute -top-2 -right-2 p-1.5 bg-primary/20 border border-primary/30 rounded-full">
          <BookOpen size={14} className="text-primary" />
        </div>
      );
    }
    if (isTrailer) {
      return (
        <div className="absolute -top-2 -right-2 p-1.5 bg-accent/20 border border-accent/30 rounded-full">
          <Play size={14} className="text-accent" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={ref}
      id={event.id}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 group",
        position === "right" && "md:direction-rtl",
        "transition-all duration-700 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      )}
      style={{ 
        direction: "ltr",
        transitionDelay: `${(index % 3) * 100}ms`
      }}
    >
      {/* Timeline node */}
      <div
        className={cn(
          "absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 border-2 bg-background transition-all duration-300 group-hover:scale-125",
          isLoreStory && "w-4 h-4 border-primary",
          isTrailer && "w-4 h-4 border-accent"
        )}
        style={{ borderColor: isRegularEvent ? accentColor : undefined }}
      >
        {isLoreStory && (
          <BookOpen size={8} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
        )}
        {isTrailer && (
          <Play size={8} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" />
        )}
      </div>

      {/* Connecting line to node */}
      <div
        className={cn(
          "hidden md:block absolute top-7 h-px w-8",
          position === "left" ? "right-1/2 mr-1.5" : "left-1/2 ml-1.5"
        )}
        style={{ 
          backgroundColor: isLoreStory 
            ? "hsl(var(--primary))" 
            : isTrailer 
              ? "hsl(var(--accent))" 
              : accentColor, 
          opacity: 0.3 
        }}
      />

      {/* Event card */}
      <div
        className={cn(
          "ml-12 md:ml-0",
          position === "left" ? "md:pr-12 md:text-right" : "md:pl-12 md:col-start-2"
        )}
      >
        <button
          onClick={handleClick}
          className="w-full text-left group/card"
        >
          <div
            className={cn(
              "relative overflow-hidden border bg-card/50 backdrop-blur-sm transition-all duration-300",
              "hover:bg-card/80",
              isLoreStory && "border-primary/30 hover:border-primary/50",
              isTrailer && "border-accent/30 hover:border-accent/50",
              isRegularEvent && "border-border hover:border-primary/50",
              isExpanded && isRegularEvent && "border-primary/50"
            )}
          >
            {/* Type indicator */}
            <TypeIcon />

            {/* Image */}
            {event.image_url && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Play overlay for trailers */}
                {isTrailer && (
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
                      isLoreStory && "text-primary",
                      isTrailer && "text-accent"
                    )}
                    style={{ color: isRegularEvent ? accentColor : undefined }}
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
                {isLoreStory && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border border-primary/50 text-primary">
                    <BookOpen size={10} />
                    Lore
                  </span>
                )}
                {isTrailer && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border border-accent/50 text-accent">
                    <Play size={10} />
                    Trailer
                  </span>
                )}
                {isLoreStory && event.reading_time && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={10} />
                    {event.reading_time} min
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className={cn(
                "font-display text-lg tracking-wide mb-2 transition-colors",
                isLoreStory && "group-hover/card:text-primary",
                isTrailer && "group-hover/card:text-accent",
                isRegularEvent && "group-hover/card:text-primary",
                "text-foreground"
              )}>
                {event.title}
              </h3>

              {/* Description */}
              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Action indicator */}
              <div
                className={cn(
                  "flex items-center gap-2 mt-4 text-xs",
                  position === "left" && "md:justify-end"
                )}
              >
                {isLoreStory && (
                  <span className="text-primary flex items-center gap-1">
                    <BookOpen size={12} />
                    Read Story
                  </span>
                )}
                {isTrailer && (
                  <span className="text-accent flex items-center gap-1">
                    <Play size={12} />
                    Watch Trailer
                  </span>
                )}
                {isRegularEvent && event.full_content && !shouldOpenModal && (
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
                )}
                {isRegularEvent && shouldOpenModal && (
                  <span className="text-primary flex items-center gap-1">
                    <BookOpen size={12} />
                    Read Full Story
                  </span>
                )}
              </div>
            </div>

            {/* Expanded content (only for regular events without long content) */}
            {isRegularEvent && !shouldOpenModal && (
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

      {/* Spacer for alternating layout */}
      <div className="hidden md:block" />
    </div>
  );
}
