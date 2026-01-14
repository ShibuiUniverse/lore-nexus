import { X, BookOpen, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LoreStoryModalProps {
  story: {
    id: string;
    title: string;
    description?: string | null;
    full_content?: string | null;
    image_url?: string | null;
    reading_time?: number | null;
    year?: number | null;
  };
  open: boolean;
  onClose: () => void;
}

export function LoreStoryModal({ story, open, onClose }: LoreStoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card border-border">
        {/* Header Image */}
        {story.image_url && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="px-8 pb-8">
          <DialogHeader className={story.image_url ? "-mt-16 relative z-10" : "pt-6"}>
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-4">
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

            <DialogTitle className="font-display text-3xl tracking-wide text-foreground">
              {story.title}
            </DialogTitle>

            {story.description && (
              <p className="text-muted-foreground mt-2 italic">
                {story.description}
              </p>
            )}
          </DialogHeader>

          {/* Content */}
          <ScrollArea className="h-[50vh] mt-6 pr-4">
            <div className="prose prose-invert max-w-none">
              {story.full_content ? (
                <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {story.full_content}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  This lore story's content is yet to be written...
                </p>
              )}
            </div>
          </ScrollArea>

          {/* Decorative footer */}
          <div className="flex items-center justify-center gap-2 mt-8 text-primary/30">
            <span className="w-12 h-px bg-current" />
            <span className="font-display text-xs tracking-[0.3em]">完</span>
            <span className="w-12 h-px bg-current" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
