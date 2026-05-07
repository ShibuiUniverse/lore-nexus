import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

interface PeopleGroupWithDetails {
  id: string;
  people_group_id: string;
  is_primary: boolean;
  people_groups: {
    id: string;
    name: string;
    image_url: string | null;
  } | null;
}

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: character, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*, eras(*)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch character's people groups
  const { data: characterPeopleGroups } = useQuery({
    queryKey: ["character-people-groups", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("character_people_groups")
        .select("*, people_groups(id, name, image_url)")
        .eq("character_id", id);
      if (error) throw error;
      return data as PeopleGroupWithDetails[];
    },
    enabled: !!id,
  });

  const { data: relatedEvents } = useQuery({
    queryKey: ["character-events", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("character_events")
        .select("*, timeline_events(*)")
        .eq("character_id", id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!character) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl mb-4">Character Not Found</h1>
            <Link to="/characters" className="text-primary hover:underline">
              Return to Characters
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Sort people groups so primary comes first
  const sortedPeopleGroups = characterPeopleGroups
    ? [...characterPeopleGroups].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
    : [];

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Hero section with image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {character.image_url ? (
            <img
              src={character.image_url}
              alt={character.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 vignette" />

          {/* Japanese accents */}
          <JapaneseAccent text="人物" position="left" />

          {/* Back button */}
          <div className="absolute top-24 left-6 z-10">
            <Link
              to="/characters"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-display text-sm tracking-wider">Back to Characters</span>
            </Link>
          </div>

          {/* Character name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              {character.faction && (
                <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-3 opacity-0 animate-fade-in">
                  {character.faction}
                </p>
              )}
              <h1
                className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide text-foreground text-shadow-dramatic opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                {character.name}
              </h1>
              {character.title && (
                <p
                  className="font-display text-xl md:text-2xl text-muted-foreground mt-2 opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  {character.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="relative container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-7 space-y-10">
              {/* Description */}
              {character.description && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed border-l-2 border-primary pl-6">
                    {character.description}
                  </p>
                </section>
              )}

              {/* Backstory */}
              {character.backstory && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-4">
                    <span className="text-primary">物語</span>
                    <span>Backstory</span>
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {character.backstory}
                    </p>
                  </div>
                </section>
              )}

              {/* Abilities */}
              {character.abilities && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-4">
                    <span className="text-primary">能力</span>
                    <span>Abilities</span>
                  </h2>
                  <div className="p-6 border border-border bg-card/30 backdrop-blur-sm">
                    <p className="text-foreground/80 leading-relaxed">
                      {character.abilities}
                    </p>
                  </div>
                </section>
              )}

              {/* Related Events */}
              {relatedEvents && relatedEvents.length > 0 && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-4">
                    <span className="text-primary">歴史</span>
                    <span>Historical Events</span>
                  </h2>
                  <div className="space-y-4">
                    {relatedEvents.map((ce) => (
                      <Link
                        key={ce.id}
                        to={`/timeline#${ce.timeline_events?.id}`}
                        className="block p-4 border border-border hover:border-primary/50 bg-card/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-display text-xl text-primary">
                            {ce.timeline_events?.year}
                          </span>
                          <div>
                            <h3 className="font-display tracking-wide">
                              {ce.timeline_events?.title}
                            </h3>
                            {ce.role && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Role: {ce.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar with full image */}
            <div className="lg:col-span-5 space-y-6">
              {/* Full Character Image */}
              {character.image_url && (
                <div
                  className="sticky top-24 opacity-0 animate-slide-in-right"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="relative border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={character.image_url}
                        alt={character.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-display text-xs tracking-[0.2em] text-primary uppercase">
                        {character.faction || "Character Portrait"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Details card */}
              <div
                className="p-6 border border-border bg-card/30 backdrop-blur-sm opacity-0 animate-slide-in-right"
                style={{ animationDelay: "0.4s" }}
              >
                <h3 className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-4">
                  Details
                </h3>
                <dl className="space-y-4">
                  {character.faction && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                        Faction
                      </dt>
                      <dd className="text-foreground mt-1">{character.faction}</dd>
                    </div>
                  )}
                  {character.eras && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                        Era
                      </dt>
                      <dd
                        className="mt-1"
                        style={{ color: character.eras.color || undefined }}
                      >
                        {character.eras.name}
                      </dd>
                    </div>
                  )}
                  {sortedPeopleGroups.length > 0 && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                        People {sortedPeopleGroups.length > 1 ? "Groups" : "Group"}
                      </dt>
                      <dd className="mt-2 space-y-2">
                        {sortedPeopleGroups.map((cpg) => (
                          <Link
                            key={cpg.id}
                            to={`/peoples/${cpg.people_group_id}`}
                            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                          >
                            <span>{cpg.people_groups?.name}</span>
                            {cpg.is_primary && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                                Primary
                              </span>
                            )}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  )}
                  {character.title && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                        Title
                      </dt>
                      <dd className="text-foreground mt-1">{character.title}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CharacterDetail;
