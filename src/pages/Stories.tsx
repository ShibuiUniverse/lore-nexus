import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { StoryCard } from "@/components/stories/StoryCard";
import { StoryFilters } from "@/components/stories/StoryFilters";
import { StoryModal } from "@/components/stories/StoryModal";
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
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

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

  const filteredStories = stories?.filter((story) => {
    if (selectedType && story.story_type !== selectedType) return false;
    return true;
  });

  return (
    <Layout>
      <div className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-6 text-center relative">
            <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">
              物語
            </p>
            <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-6">
              Stories & Trailers
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Dive deeper into the world through side stories and cinematic trailers 
              that expand the lore beyond the main timeline.
            </p>
            
            {/* Decorative line */}
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
            <div>
              <h2 className="font-display text-sm tracking-[0.2em] text-muted-foreground uppercase">
                Filter by Type
              </h2>
            </div>
            <StoryFilters 
              selectedType={selectedType} 
              onTypeChange={setSelectedType} 
            />
          </div>
        </section>

        {/* Stories Grid */}
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
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {selectedType 
                  ? "No stories found for this type." 
                  : "No stories available yet."}
              </p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                Check back soon for new content.
              </p>
            </div>
          )}
        </section>

        {/* Story Modal */}
        <StoryModal 
          story={selectedStory} 
          open={!!selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      </div>
    </Layout>
  );
};

export default Stories;
