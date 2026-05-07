import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { StoryCard } from "@/components/stories/StoryCard";
import { StoryFilters } from "@/components/stories/StoryFilters";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Story {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  story_type: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
}

const Stories = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Story[];
    },
  });

  const filteredStories = stories?.filter(
    (s) => !selectedType || s.story_type === selectedType
  );

  return (
    <Layout>
      <div className="pt-24 min-h-screen">

        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-6 text-center relative">
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
              年代記
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6">
              Chronicles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Legends, lore, and side stories that expand the world beyond the main timeline.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-2 h-2 rotate-45 bg-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-6 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h2 className="font-display text-sm tracking-[0.2em] text-muted-foreground uppercase">
              Filter by Type
            </h2>
            <StoryFilters
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>
        </section>

        {/* Grid */}
        <section className="container mx-auto px-6 pb-24">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filteredStories && filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {selectedType
                  ? "No stories found for this type."
                  : "No stories available yet."}
              </p>
            </div>
          )}
        </section>

      </div>
    </Layout>
  );
};

export default Stories;
