import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Clock } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  story_type: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  gallery_urls?: string[] | null;
}

interface StoryModalProps {
  story: Story | null;
  open: boolean;
  onClose: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  legend: "Legend",
  lore: "Lore",
  chronicle: "Chronicle",
  manga: "Manga",
  short_story: "Short Story",
  trailer: "Trailer",
};

const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com/watch")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

const readingTime = (text: string): number =>
  Math.max(1, Math.round(text.split(/\s+/).length / 200));

// Renders a paragraph, turning *text* into <em>text</em>
const renderInline = (text: string, key: number) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <p key={key} className="text-foreground/85 font-body text-base md:text-lg leading-relaxed mb-5">
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="text-foreground/70 not-italic font-light tracking-wide">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        )
      )}
    </p>
  );
};

const renderContent = (content: string) => {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed === "---") {
      return (
        <div key={i} className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-border/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/40" />
          <div className="h-px flex-1 bg-border/40" />
        </div>
      );
    }
    // Single-line blocks that start with --- (e.g. "---\n")
    if (trimmed.startsWith("---")) {
      return (
        <div key={i} className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-border/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/40" />
          <div className="h-px flex-1 bg-border/40" />
        </div>
      );
    }
    return renderInline(trimmed, i);
  });
};

export const StoryModal = ({ story, open, onClose }: StoryModalProps) => {
  // All gallery images = hero first, then any additional gallery_urls
  const allImages = story
    ? [story.thumbnail_url, ...(story.gallery_urls ?? [])].filter(Boolean) as string[]
    : [];
  const [activeImage, setActiveImage] = useState<string | null>(allImages[0] ?? null);

  // Reset active image when story changes
  useEffect(() => {
    setActiveImage(allImages[0] ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story?.id]);

  if (!story) return null;

  const isTrailer = story.story_type === "trailer";
  const typeLabel = TYPE_LABELS[story.story_type ?? ""] ?? story.story_type ?? "Story";
  const minutes = story.content ? readingTime(story.content) : null;
  const hasGallery = allImages.length > 1;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent hideClose className="max-w-3xl max-h-[90vh] p-0 bg-card border-border/50 flex flex-col overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{story.title}</DialogTitle>
        </DialogHeader>

        {/* ── Sticky header ── */}
        <div className="flex items-start justify-between gap-4 px-7 py-5 border-b border-border/30 flex-shrink-0">
          <div>
            <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 font-display tracking-wider text-xs">
              {typeLabel}
            </Badge>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide leading-tight">
              {story.title}
            </h2>
            {minutes && !isTrailer && (
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                <Clock size={11} />
                {minutes} min read
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Trailer embed */}
          {isTrailer && story.video_url && (
            <div className="relative aspect-video w-full bg-black flex-shrink-0">
              <iframe
                src={getEmbedUrl(story.video_url)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={story.title}
              />
            </div>
          )}

          {/* Hero image (with gallery support if multiple) */}
          {!isTrailer && activeImage && (
            <>
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={story.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>

              {/* Gallery thumbnail strip — only when there's more than one image */}
              {hasGallery && (
                <div className="flex gap-2 px-7 py-3 overflow-x-auto border-b border-border/20 bg-card/50 flex-shrink-0">
                  {allImages.map((src) => (
                    <button
                      key={src}
                      onClick={() => setActiveImage(src)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        src === activeImage
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/40"
                      }`}
                      aria-label="View image"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Text content */}
          <div className="px-7 py-6">
            {story.description && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 pb-6 border-b border-border/20">
                {story.description}
              </p>
            )}

            {story.content && (
              <div className="max-w-none">
                {renderContent(story.content)}
              </div>
            )}

            {/* Bottom padding so last line doesn't sit against the edge */}
            <div className="h-4" />
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary/20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary/20 pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
};
