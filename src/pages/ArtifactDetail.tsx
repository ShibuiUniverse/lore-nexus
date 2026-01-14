import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Sword, Gem, BookOpen, Shield, ScrollText, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

const typeIcons: Record<string, React.ReactNode> = {
  weapon: <Sword size={20} />,
  gemstone: <Gem size={20} />,
  armor: <Shield size={20} />,
  tome: <BookOpen size={20} />,
  relic: <ScrollText size={20} />,
  other: <ScrollText size={20} />,
};

const ArtifactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: artifact, isLoading } = useQuery({
    queryKey: ["artifact", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artifacts")
        .select("*, characters(id, name, image_url, title)")
        .eq("id", id)
        .single();
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

  if (!artifact) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="font-display text-2xl mb-4">Artifact Not Found</h2>
          <Link to="/codex" className="text-primary hover:underline">
            Return to Codex
          </Link>
        </div>
      </Layout>
    );
  }

  const artifactType = artifact.artifact_type || "relic";

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text="遺物" position="left" />
        <JapaneseAccent text="力" position="right" />

        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {artifact.image_url ? (
            <>
              <img
                src={artifact.image_url}
                alt={artifact.name}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
              <div className="text-muted-foreground/20">
                {typeIcons[artifactType] ? (
                  <div className="w-32 h-32 flex items-center justify-center">
                    {React.cloneElement(typeIcons[artifactType] as React.ReactElement, { size: 80 })}
                  </div>
                ) : (
                  <ScrollText className="w-32 h-32" />
                )}
              </div>
            </div>
          )}

          {/* Back button */}
          <Link
            to="/codex"
            className="absolute top-24 left-6 flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors z-10"
          >
            <ArrowLeft size={20} />
            <span className="font-display text-sm tracking-wider">Back to Codex</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 -mt-32 pb-20">
          {/* Title section */}
          <div className="relative bg-card/80 backdrop-blur-sm border border-border p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary">{typeIcons[artifactType]}</span>
              <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                {artifactType}
              </span>
              {artifact.is_featured && (
                <span className="px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 ml-auto">
                  Legendary
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground mb-4">
              {artifact.name}
            </h1>

            {artifact.description && (
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                {artifact.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Power Description */}
              {artifact.power_description && (
                <section className="bg-card/50 backdrop-blur-sm border border-primary/30 p-8">
                  <h2 className="font-display text-xl tracking-wider text-primary mb-4">
                    Power
                  </h2>
                  <p className="text-foreground/90 leading-relaxed">
                    {artifact.power_description}
                  </p>
                </section>
              )}

              {/* Origin Story */}
              {artifact.origin_story && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-8">
                  <h2 className="font-display text-xl tracking-wider text-foreground mb-4">
                    Origin
                  </h2>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {artifact.origin_story}
                  </p>
                </section>
              )}

              {/* Lore Content */}
              {artifact.lore_content && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-8">
                  <h2 className="font-display text-xl tracking-wider text-foreground mb-4">
                    Lore
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {artifact.lore_content}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Current Holder */}
              {artifact.characters && (
                <section className="bg-card/50 backdrop-blur-sm border border-border p-6">
                  <h3 className="font-display text-sm tracking-[0.2em] text-primary uppercase mb-4">
                    Current Holder
                  </h3>
                  <Link
                    to={`/characters/${artifact.characters.id}`}
                    className="flex items-center gap-3 p-2 -mx-2 hover:bg-muted/50 transition-colors group"
                  >
                    {artifact.characters.image_url ? (
                      <img
                        src={artifact.characters.image_url}
                        alt={artifact.characters.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User size={20} className="text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-display tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {artifact.characters.name}
                      </p>
                      {artifact.characters.title && (
                        <p className="text-xs text-muted-foreground">
                          {artifact.characters.title}
                        </p>
                      )}
                    </div>
                  </Link>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Need to import React for cloneElement
import React from "react";

export default ArtifactDetail;
