import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function FeaturedSection() {
  const { data: featuredCharacters } = useQuery({
    queryKey: ["featured-characters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const { data: featuredEvents } = useQuery({
    queryKey: ["featured-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timeline_events")
        .select("*, eras(*)")
        .eq("is_featured", true)
        .order("year")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 texture-parchment opacity-50" />
      
      <div className="relative container mx-auto px-6">
        {/* Featured Characters */}
        {featuredCharacters && featuredCharacters.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-2">
                  人物
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-wide">
                  Featured Characters
                </h2>
              </div>
              <Link
                to="/characters"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredCharacters.map((character) => (
                <Link
                  key={character.id}
                  to={`/characters/${character.id}`}
                  className="group relative aspect-[3/4] overflow-hidden border-aged"
                >
                  {character.image_url ? (
                    <img
                      src={character.image_url}
                      alt={character.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {character.faction && (
                      <p className="text-xs tracking-widest text-primary uppercase mb-2">
                        {character.faction}
                      </p>
                    )}
                    <h3 className="font-display text-xl tracking-wide text-foreground">
                      {character.name}
                    </h3>
                    {character.title && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {character.title}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Events */}
        {featuredEvents && featuredEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-2">
                  年表
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-wide">
                  Key Events
                </h2>
              </div>
              <Link
                to="/timeline"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Full Timeline</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {featuredEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/timeline#${event.id}`}
                  className="group block p-6 border border-border hover:border-primary/50 bg-card/30 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 text-right">
                      <p className="font-display text-2xl text-primary">
                        {event.year}
                      </p>
                      {event.eras && (
                        <p className="text-xs text-muted-foreground">
                          {event.eras.name}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                    {event.image_url && (
                      <div className="hidden md:block flex-shrink-0 w-32 h-20 overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!featuredCharacters || featuredCharacters.length === 0) &&
         (!featuredEvents || featuredEvents.length === 0) && (
          <div className="text-center py-20">
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
              Coming Soon
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-4">
              The Chronicles Await
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The lore is being written. Return soon to explore the characters,
              events, and realms of this universe.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
