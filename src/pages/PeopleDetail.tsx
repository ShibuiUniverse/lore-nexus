import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Users, Scroll } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: group, isLoading } = useQuery({
    queryKey: ["people-group", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("people_groups")
        .select("*, locations(*)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch characters from this people group
  const { data: characters } = useQuery({
    queryKey: ["people-group-characters", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("id, name, title, image_url")
        .eq("people_group_id", id)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!group) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="font-display text-2xl mb-4">People Group Not Found</h2>
          <Link to="/realms" className="text-primary hover:underline">
            Return to Realms & Peoples
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="民族" position="left" />
        <JapaneseAccent text="文化" position="right" />

        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {group.image_url ? (
            <>
              <img
                src={group.image_url}
                alt={group.name}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
              <Users className="w-32 h-32 text-muted-foreground/20" />
            </div>
          )}

          {/* Back button */}
          <Link
            to="/realms"
            className="absolute top-24 left-6 flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors z-10"
          >
            <ArrowLeft size={20} />
            <span className="font-display text-sm tracking-wider">Back to Realms</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 -mt-32 pb-20">
          {/* Title section */}
          <div className="relative bg-card/80 backdrop-blur-sm border border-border p-8 md:p-12 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-primary" />
              <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                People Group
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground mb-4">
              {group.name}
            </h1>

            {group.locations && (
              <Link
                to={`/locations/${group.locations.id}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin size={16} />
                <span className="font-display text-sm tracking-wider">
                  Homeland: {group.locations.name}
                </span>
              </Link>
            )}

            {group.description && (
              <p className="text-muted-foreground mt-6 max-w-3xl leading-relaxed">
                {group.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Culture */}
              {group.culture_text && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Scroll size={16} className="text-primary" />
                    <h2 className="font-display text-xl tracking-wider text-foreground">
                      Culture
                    </h2>
                  </div>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {group.culture_text}
                  </p>
                </section>
              )}

              {/* Traditions */}
              {group.traditions && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Scroll size={16} className="text-primary" />
                    <h2 className="font-display text-xl tracking-wider text-foreground">
                      Traditions & Customs
                    </h2>
                  </div>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {group.traditions}
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Notable Characters */}
              {characters && characters.length > 0 && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-6">
                  <h3 className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
                    Notable Members
                  </h3>
                  <div className="space-y-3">
                    {characters.map((character) => (
                      <Link
                        key={character.id}
                        to={`/characters/${character.id}`}
                        className="flex items-center gap-3 p-2 -mx-2 hover:bg-muted/50 transition-colors group"
                      >
                        {character.image_url ? (
                          <img
                            src={character.image_url}
                            alt={character.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Users size={16} className="text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-display tracking-wide text-foreground group-hover:text-primary transition-colors">
                            {character.name}
                          </p>
                          {character.title && (
                            <p className="text-xs text-muted-foreground">
                              {character.title}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Back to list */}
        <section className="container mx-auto px-6 pb-24">
          <div className="max-w-md mx-auto">
            <Link
              to="/realms"
              className="flex items-center gap-3 p-5 bg-card/50 border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <ArrowLeft size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              <div>
                <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-0.5">Browse</p>
                <p className="font-display text-sm tracking-wide group-hover:text-primary transition-colors">All Realms</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PeopleDetail;
