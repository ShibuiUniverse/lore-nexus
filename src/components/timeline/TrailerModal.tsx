import { X, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TrailerModalProps {
  trailer: {
    id: string;
    title: string;
    description?: string | null;
    video_url?: string | null;
    year?: number | null;
  };
  open: boolean;
  onClose: () => void;
}

function getEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return url;
}

export function TrailerModal({ trailer, open, onClose }: TrailerModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-card border-border">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {trailer.year && (
                <span className="font-display text-xl text-primary">
                  {trailer.year}
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider border border-accent/50 text-accent bg-accent/5">
                <Play size={12} />
                Trailer
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <DialogTitle className="font-display text-2xl tracking-wide text-foreground mt-2">
            {trailer.title}
          </DialogTitle>
          {trailer.description && (
            <p className="text-muted-foreground text-sm mt-1">
              {trailer.description}
            </p>
          )}
        </DialogHeader>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          {trailer.video_url ? (
            <iframe
              src={getEmbedUrl(trailer.video_url)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={trailer.title}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <Play size={48} className="mb-2 opacity-50" />
              <p className="text-sm">No video URL provided</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
