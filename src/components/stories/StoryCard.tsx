import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen, Scroll, Sword, FileText, Clock } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  story_type: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
}

interface StoryCardProps {
  story: Story;
}

const TYPE_LABELS: Record<string, string> = {
  legend:      "Legend",
  lore:        "Lore",
  chronicle:   "Chronicle",
  manga:       "Manga",
  short_story: "Short Story",
  trailer:     "Trailer",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  legend:      <Scroll className="w-10 h-10 text-primary/50" />,
  lore:        <BookOpen className="w-10 h-10 text-primary/50" />,
  chronicle:   <BookOpen className="w-10 h-10 text-primary/50" />,
  manga:       <Sword className="w-10 h-10 text-primary/50" />,
  short_story: <FileText className="w-10 h-10 text-primary/50" />,
  trailer:     <Play className="w-10 h-10 text-primary/50" />,
};

const readingTime = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).length / 200));

import React from "react";

export const StoryCard = ({ story }: StoryCardProps) => {
  const type      = story.story_type ?? "lore";
  const isTrailer = type === "trailer";
  const typeLabel = TYPE_LABELS[type] ?? type;
  const icon      = TYPE_ICONS[type] ?? <BookOpen className="w-10 h-10 text-primary/50" />;
  const minutes   = story.content ? readingTime(story.content) : null;

  return (
    <Link
      to={`/stories/${story.id}`}
      className="group relative flex flex-col overflow-hidden bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-500"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {story.thumbnail_url ? (
          <img
            src={story.thumbnail_url}
            alt={story.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            {icon}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

        {/* Play button for trailers */}
        {isTrailer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Type badge */}
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border-border/50 font-display tracking-wider text-xs"
        >
          {typeLabel}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg tracking-wide mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
          {story.title}
        </h3>
        {story.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
            {story.description}
          </p>
        )}
        {minutes && !isTrailer && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border/20">
            <Clock size={10} />
            {minutes} min read
          </p>
        )}
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-primary/15 group-hover:border-primary/35 transition-colors duration-500" />
    </Link>
  );
};
