import { X, BookOpen, Clock, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface LoreStoryModalProps {
  story: {
    id: string;
    title: string;
    description?: string | null;
    full_content?: string | null;
    image_url?: string | null;
    reading_time?: number | null;
    year?: number | null;
    video_url?: string | null;
  };
  open: boolean;
  onClose: () => void;
}

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function LoreStoryModal({ story, open, onClose }: LoreStoryModalProps) {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = story.video_url ? getYouTubeVideoId(story.video_url) : null;

  const handleClose = () => {
    setShowVideo(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden bg-card border-border flex flex-col">
        {/* Header Image or Video */}
        <div className="relative h-64 md:h-80 flex-shrink-0 overflow-hidden">
          {showVideo && videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={story.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : story.image_url ? (
            <>
              <img
                src={story.image_url}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Play button if video exists */}
              {videoId && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover/play:scale-110 shadow-2xl">
                    <Play size={36} className="text-primary-foreground ml-1" />
                  </div>
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <BookOpen size={64} className="text-primary/30" />
            </div>
          )}
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Back to image button when video is playing */}
          {showVideo && story.image_url && (
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 left-4 px-3 py-2 bg-background/80 backdrop-blur-sm rounded border border-border hover:bg-background transition-colors z-10 text-xs"
            >
              View Image
            </button>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div className="px-6 md:px-8 pt-6 flex-shrink-0">
            <DialogHeader className="-mt-12 relative z-10">
              {/* Meta info */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {story.year && (
                  <span className="font-display text-xl text-primary">
                    {story.year}
                  </span>
                )}
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider border border-primary/30 text-primary bg-primary/5">
                  <BookOpen size={12} />
                  Lore Story
                </span>
                {story.reading_time && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {story.reading_time} min read
                  </span>
                )}
                {videoId && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider border border-accent/30 text-accent bg-accent/5 hover:bg-accent/10 transition-colors"
                  >
                    <Play size={12} />
                    {showVideo ? "Hide Video" : "Watch Video"}
                  </button>
                )}
              </div>

              <DialogTitle className="font-display text-2xl md:text-3xl tracking-wide text-foreground">
                {story.title}
              </DialogTitle>

              {story.description && (
                <p className="text-muted-foreground mt-2 italic">
                  {story.description}
                </p>
              )}
            </DialogHeader>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 min-h-0 px-6 md:px-8">
            <div className="prose prose-invert max-w-none py-6">
              {story.full_content ? (
                <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap text-base">
                  {story.full_content}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  This lore story's content is yet to be written...
                </p>
              )}
            </div>

            {/* Decorative footer */}
            <div className="flex items-center justify-center gap-2 py-8 text-primary/30">
              <span className="w-12 h-px bg-current" />
              <span className="font-display text-xs tracking-[0.3em]">完</span>
              <span className="w-12 h-px bg-current" />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
