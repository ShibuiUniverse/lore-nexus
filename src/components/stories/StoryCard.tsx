import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string | null;
  story_type: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
}

interface StoryCardProps {
  story: Story;
  onClick: () => void;
}

export const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const isTrailer = story.story_type === "trailer";

  return (
    <Card 
      className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {story.thumbnail_url ? (
          <img 
            src={story.thumbnail_url} 
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            {isTrailer ? (
              <Play className="w-12 h-12 text-primary/50" />
            ) : (
              <BookOpen className="w-12 h-12 text-primary/50" />
            )}
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Play button for trailers */}
        {isTrailer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        )}
        
        {/* Type badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border-border/50"
        >
          {isTrailer ? "Trailer" : "Side Story"}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl tracking-wide mb-2 group-hover:text-primary transition-colors duration-300">
          {story.title}
        </h3>
        {story.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {story.description}
          </p>
        )}
      </div>
      
      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
    </Card>
  );
};
