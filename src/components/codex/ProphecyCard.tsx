import { Link } from "react-router-dom";
import { Eye, EyeOff, CircleDot, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prophecy {
  id: string;
  name: string;
  prophecy_text: string;
  interpretation?: string | null;
  status?: string | null;
  source?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
  eras?: {
    id: string;
    name: string;
  } | null;
}

interface ProphecyCardProps {
  prophecy: Prophecy;
  index: number;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  unfulfilled: {
    label: "Unfulfilled",
    icon: <EyeOff size={12} />,
    className: "text-muted-foreground border-muted-foreground/50 bg-muted/20",
  },
  partially_fulfilled: {
    label: "Partial",
    icon: <CircleDot size={12} />,
    className: "text-amber-400 border-amber-400/50 bg-amber-400/10",
  },
  fulfilled: {
    label: "Fulfilled",
    icon: <Eye size={12} />,
    className: "text-green-400 border-green-400/50 bg-green-400/10",
  },
  disputed: {
    label: "Disputed",
    icon: <HelpCircle size={12} />,
    className: "text-red-400 border-red-400/50 bg-red-400/10",
  },
};

export function ProphecyCard({ prophecy, index }: ProphecyCardProps) {
  const status = prophecy.status || "unfulfilled";
  const config = statusConfig[status] || statusConfig.unfulfilled;

  return (
    <Link
      to={`/codex/prophecies/${prophecy.id}`}
      className="group relative block overflow-hidden border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Mystical background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Image or gradient */}
      {prophecy.image_url ? (
        <div className="relative h-32 overflow-hidden">
          <img
            src={prophecy.image_url}
            alt={prophecy.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      ) : (
        <div className="h-8" />
      )}

      {/* Content */}
      <div className="relative p-5">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border",
              config.className
            )}
          >
            {config.icon}
            {config.label}
          </span>
          {prophecy.is_featured && (
            <span className="px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
              Major
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-primary transition-colors mb-3">
          {prophecy.name}
        </h3>

        {/* Prophecy text preview */}
        <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3 line-clamp-3">
          "{prophecy.prophecy_text}"
        </blockquote>

        {/* Source */}
        {prophecy.source && (
          <p className="text-xs text-muted-foreground/70 mt-3">
            — {prophecy.source}
          </p>
        )}

        {/* Era */}
        {prophecy.eras && (
          <p className="text-xs text-primary/70 mt-2">
            Era: {prophecy.eras.name}
          </p>
        )}
      </div>

      {/* Decorative corner */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-8 h-8 transition-all duration-500",
          "opacity-0 group-hover:opacity-100"
        )}
        style={{
          background: "linear-gradient(135deg, transparent 50%, hsl(var(--primary) / 0.3) 50%)",
        }}
      />
    </Link>
  );
}
