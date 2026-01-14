import { X, BookOpen, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

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

type MediaSlide = {
  type: "image" | "video";
  url: string;
  videoId?: string;
};

export function LoreStoryModal({ story, open, onClose }: LoreStoryModalProps) {
  const videoId = story.video_url ? getYouTubeVideoId(story.video_url) : null;
  
  // Build media slides array
  const mediaSlides: MediaSlide[] = [];
  if (story.image_url) {
    mediaSlides.push({ type: "image", url: story.image_url });
  }
  if (videoId) {
    mediaSlides.push({ type: "video", url: story.video_url!, videoId });
  }
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasMultipleSlides = mediaSlides.length > 1;

  const handleClose = () => {
    setCurrentSlide(0);
    onClose();
  };

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? mediaSlides.length - 1 : prev - 1));
  }, [mediaSlides.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === mediaSlides.length - 1 ? 0 : prev + 1));
  }, [mediaSlides.length]);

  const currentMedia = mediaSlides[currentSlide];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden bg-card border-border flex flex-col">
        {/* Full scrollable content */}
        <ScrollArea className="flex-1 h-full">
          <div className="flex flex-col">
            {/* Media Carousel */}
            {mediaSlides.length > 0 && (
              <div className="relative h-64 md:h-96 flex-shrink-0 overflow-hidden">
                {currentMedia?.type === "video" && currentMedia.videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentMedia.videoId}?rel=0`}
                    title={story.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : currentMedia?.type === "image" ? (
                  <>
                    <img
                      src={currentMedia.url}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </>
                ) : null}

                {/* Carousel Navigation Arrows */}
                {hasMultipleSlides && (
                  <>
                    <button
                      onClick={goToPrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors z-10"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={goToNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors z-10"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Slide Indicators */}
                {hasMultipleSlides && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                    {mediaSlides.map((slide, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider rounded-full border transition-all",
                          currentSlide === index
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background/80 backdrop-blur-sm border-border hover:bg-background"
                        )}
                      >
                        {slide.type === "image" ? "Image" : "Trailer"}
                      </button>
                    ))}
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors z-10"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* No media fallback */}
            {mediaSlides.length === 0 && (
              <div className="relative h-32 flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <BookOpen size={48} className="text-primary/30" />
                </div>
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors z-10"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Content Area */}
            <div className="px-6 md:px-8 py-6">
              <DialogHeader>
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

              {/* Story Content */}
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
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
