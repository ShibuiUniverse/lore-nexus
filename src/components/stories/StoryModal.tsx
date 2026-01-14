import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  story_type: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
}

interface StoryModalProps {
  story: Story | null;
  open: boolean;
  onClose: () => void;
}

const getEmbedUrl = (url: string): string => {
  // Convert YouTube watch URLs to embed URLs
  if (url.includes("youtube.com/watch")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Convert Vimeo URLs to embed URLs
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

export const StoryModal = ({ story, open, onClose }: StoryModalProps) => {
  if (!story) return null;

  const isTrailer = story.story_type === "trailer";

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-card border-border/50 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{story.title}</DialogTitle>
        </DialogHeader>
        
        {/* Video for trailers */}
        {isTrailer && story.video_url && (
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={getEmbedUrl(story.video_url)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={story.title}
            />
          </div>
        )}
        
        {/* Content for side stories */}
        {!isTrailer && (
          <>
            {/* Header image */}
            {story.thumbnail_url && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.thumbnail_url} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
            )}
          </>
        )}
        
        {/* Text content */}
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <Badge 
                variant="secondary" 
                className="mb-3 bg-primary/10 text-primary border-primary/20"
              >
                {isTrailer ? "Trailer" : "Side Story"}
              </Badge>
              <h2 className="font-display text-3xl tracking-wide">{story.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {story.description && (
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {story.description}
            </p>
          )}
          
          {story.content && (
            <ScrollArea className="max-h-[40vh]">
              <div className="prose prose-invert prose-lg max-w-none">
                {story.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
};
