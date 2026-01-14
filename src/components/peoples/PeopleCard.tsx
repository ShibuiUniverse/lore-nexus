import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface PeopleGroup {
  id: string;
  name: string;
  description?: string | null;
  culture_text?: string | null;
  traditions?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
  homeland_id?: string | null;
  locations?: {
    id: string;
    name: string;
  } | null;
}

interface PeopleCardProps {
  group: PeopleGroup;
  index: number;
}

export function PeopleCard({ group, index }: PeopleCardProps) {
  return (
    <Link
      to={`/peoples/${group.id}`}
      className="group relative block overflow-hidden border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {group.image_url ? (
          <img
            src={group.image_url}
            alt={group.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
            <Users className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Featured badge */}
        {group.is_featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/90 text-primary-foreground">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Homeland link */}
        {group.locations && (
          <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-2 flex items-center gap-1.5">
            <span className="w-4 h-px bg-primary/50" />
            {group.locations.name}
          </p>
        )}

        {/* Name */}
        <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-primary transition-colors mb-2">
          {group.name}
        </h3>

        {/* Description */}
        {group.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {group.description}
          </p>
        )}

        {/* Culture preview */}
        {group.culture_text && (
          <p className="text-xs text-muted-foreground/70 mt-3 italic line-clamp-1">
            "{group.culture_text.slice(0, 80)}..."
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
