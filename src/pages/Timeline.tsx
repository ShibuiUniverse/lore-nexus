import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { TimelineEvent } from "@/components/timeline/TimelineEvent";
import { TimelineFilters } from "@/components/timeline/TimelineFilters";
import { TimelineEraMarker } from "@/components/timeline/TimelineEraMarker";
import { LoreStoryModal } from "@/components/timeline/LoreStoryModal";
import { TrailerModal } from "@/components/timeline/TrailerModal";
import { supabase } from "@/integrations/supabase/client";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";

interface TimelineEventData {
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
  era_id?: string | null;
  eras?: {
    id: string;
    name: string;
    color?: string | null;
  } | null;
}

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [modalEvent, setModalEvent] = useState<TimelineEventData | null>(null);
  const [modalType, setModalType] = useState<"lore" | "trailer">("lore");

  // Scroll-driven mask: keeps the center line visible only around the current
  // viewport position, with soft fades at top and bottom — same feel as the
  // old per-era gradient lines but without gaps between sections.
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !lineRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Fraction of container: 0 = container top aligned with viewport top
      const visTop = Math.max(0, -top / height);
      const visBot = Math.min(1, (vh - top) / height);

      // Soft fade zone: 10% of container height on each edge of the window.
      // t1/b0 are clamped so there's always a minimum fade zone even when the
      // container top/bottom is flush with the viewport edge.
      const fade = 0.10;
      const t0 = `${Math.max(0, (visTop - fade) * 100).toFixed(1)}%`;
      const t1 = `${Math.max(fade * 100, visTop * 100).toFixed(1)}%`;
      const b0 = `${Math.min((1 - fade) * 100, visBot * 100).toFixed(1)}%`;
      const b1 = `${Math.min(100, (visBot + fade) * 100).toFixed(1)}%`;

      const mask = `linear-gradient(to bottom, transparent ${t0}, black ${t1}, black ${b0}, transparent ${b1})`;
      lineRef.current.style.maskImage = mask;
      lineRef.current.style.webkitMaskImage = mask;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

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

  const { data: events, isLoading } = useQuery({
    queryKey: ["timeline-events", selectedCategory, selectedEra, selectedEventType],
    queryFn: async () => {
      let query = supabase
        .from("timeline_events")
        .select("*, eras(*)")
        .order("year", { ascending: true });

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }
      if (selectedEra) {
        query = query.eq("era_id", selectedEra);
      }
      if (selectedEventType) {
        query = query.eq("event_type", selectedEventType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Get unique categories from events
  const categories = events
    ? [...new Set(events.map((e) => e.category).filter(Boolean))]
    : [];

  // Get unique event types from events
  const eventTypes = events
    ? [...new Set(events.map((e) => e.event_type).filter(Boolean))]
    : [];

  // Group events by era
  const eventsByEra = events?.reduce((acc, event) => {
    const eraId = event.era_id || "unknown";
    if (!acc[eraId]) {
      acc[eraId] = [];
    }
    acc[eraId].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  const handleOpenModal = (event: TimelineEventData, type?: "lore" | "trailer") => {
    setModalEvent(event);
    // Determine modal type based on content availability and user selection
    if (type) {
      setModalType(type);
    } else if (event.event_type === "trailer") {
      setModalType("trailer");
    } else if (event.event_type === "lore_story") {
      setModalType("lore");
    } else {
      // For regular events, default to lore if has content, otherwise trailer
      setModalType(event.full_content && event.full_content.length > 100 ? "lore" : "trailer");
    }
  };

  const handleCloseModal = () => {
    setModalEvent(null);
  };

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />
        
        {/* Japanese accents */}
        <JapaneseAccent text="年表" position="left" />
        <JapaneseAccent text="歴史の流れ" position="right" />

        {/* Header */}
        <header className="relative container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4 opacity-0 animate-fade-in">
            年表
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Timeline
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Trace the threads of history through the ages. Each event shapes the
            world and the legends within it.
          </p>
        </header>

        {/* Filters */}
        <TimelineFilters
          categories={categories as string[]}
          eras={eras || []}
          eventTypes={eventTypes as string[]}
          selectedCategory={selectedCategory}
          selectedEra={selectedEra}
          selectedEventType={selectedEventType}
          onCategoryChange={setSelectedCategory}
          onEraChange={setSelectedEra}
          onEventTypeChange={setSelectedEventType}
        />

        {/* Timeline */}
        <div className="relative container mx-auto px-6 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : events && events.length > 0 ? (
            <div ref={containerRef} className="relative">
              {/* Single center line — scroll-masked to stay visible only near the viewport */}
              <div
                ref={lineRef}
                className="absolute left-6 md:left-1/2 inset-y-0 w-px bg-primary/30 pointer-events-none"
              />

              {/* Events grouped by era */}
              <div className="space-y-8">
                {eras?.map((era) => {
                  const eraEvents = eventsByEra?.[era.id];
                  if (!eraEvents || eraEvents.length === 0) return null;

                  return (
                    <div key={era.id} className="relative">
                      {/* Era marker */}
                      <TimelineEraMarker era={era} />

                      {/* Era events */}
                      <div className="space-y-8 mt-8">
                        {eraEvents.map((event, index) => (
                          <TimelineEvent
                            key={event.id}
                            event={event}
                            isExpanded={expandedEventId === event.id}
                            onToggle={() =>
                              setExpandedEventId(
                                expandedEventId === event.id ? null : event.id
                              )
                            }
                            onOpenModal={(type) => handleOpenModal(event, type)}
                            position={index % 2 === 0 ? "left" : "right"}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Events without era */}
                {eventsByEra?.["unknown"] && eventsByEra["unknown"].length > 0 && (
                  <div className="relative">
                    <TimelineEraMarker
                      era={{ id: "unknown", name: "Unknown Era", color: "#666666" }}
                    />
                    <div className="space-y-8 mt-8">
                      {eventsByEra["unknown"].map((event, index) => (
                        <TimelineEvent
                          key={event.id}
                          event={event}
                          isExpanded={expandedEventId === event.id}
                          onToggle={() =>
                            setExpandedEventId(
                              expandedEventId === event.id ? null : event.id
                            )
                          }
                          onOpenModal={(type) => handleOpenModal(event, type)}
                          position={index % 2 === 0 ? "left" : "right"}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
                No Events Yet
              </p>
              <h2 className="font-display text-2xl tracking-wide mb-4">
                The Timeline Awaits
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {selectedCategory || selectedEra || selectedEventType
                  ? "No events match your current filters. Try adjusting them."
                  : "Events will appear here once they are added to the chronicle."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modalEvent && modalType === "trailer" && (
        <TrailerModal
          trailer={modalEvent}
          open={true}
          onClose={handleCloseModal}
        />
      )}
      {modalEvent && modalType === "lore" && (
        <LoreStoryModal
          story={modalEvent}
          open={true}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
};

export default Timeline;
