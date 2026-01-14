import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  description?: string | null;
  region?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
}

interface LocationCardProps {
  location: Location;
  index: number;
}

export function LocationCard({ location, index }: LocationCardProps) {
  return (
    <Link
      to={`/locations/${location.id}`}
      className={cn(
        "group relative aspect-[4/3] overflow-hidden border border-border",
        "hover:border-primary/50 transition-all duration-500",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Image */}
      {location.image_url ? (
        <img
          src={location.image_url}
          alt={location.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-muted" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Featured badge */}
      {location.is_featured && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-primary/90 text-primary-foreground text-xs tracking-wider uppercase">
          Featured
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Region tag */}
        {location.region && (
          <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <MapPin size={12} className="text-primary" />
            <p className="text-xs tracking-widest text-primary uppercase">
              {location.region}
            </p>
          </div>
        )}

        {/* Name */}
        <h3 className="font-display text-xl tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
          {location.name}
        </h3>

        {/* Description preview */}
        {location.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {location.description}
          </p>
        )}
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
    </Link>
  );
}
