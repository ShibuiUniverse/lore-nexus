import { useState } from "react";
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

  const handleOpenModal = (event: TimelineEventData) => {
    setModalEvent(event);
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
            <div className="relative">
              {/* Central timeline line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

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
                            onOpenModal={() => handleOpenModal(event)}
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
                          onOpenModal={() => handleOpenModal(event)}
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
      {modalEvent && modalEvent.event_type === "trailer" && (
        <TrailerModal
          trailer={modalEvent}
          open={true}
          onClose={handleCloseModal}
        />
      )}
      {modalEvent && modalEvent.event_type !== "trailer" && (
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
