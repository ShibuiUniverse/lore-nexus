import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Era {
  id: string;
  name: string;
  color?: string | null;
}

interface Character {
  id: string;
  name: string;
  title?: string | null;
  description?: string | null;
  faction?: string | null;
  image_url?: string | null;
  eras?: Era | null;
}

interface CharacterCardProps {
  character: Character;
  index: number;
}

export function CharacterCard({ character, index }: CharacterCardProps) {
  return (
    <Link
      to={`/characters/${character.id}`}
      className={cn(
        "group relative aspect-[3/4] overflow-hidden border border-border",
        "hover:border-primary/50 transition-all duration-500",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Image */}
      {character.image_url ? (
        <img
          src={character.image_url}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-card" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Era color accent */}
      {character.eras?.color && (
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: character.eras.color }}
        />
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Faction tag */}
        {character.faction && (
          <p className="text-xs tracking-widest text-primary uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            {character.faction}
          </p>
        )}

        {/* Name */}
        <h3 className="font-display text-xl tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
          {character.name}
        </h3>

        {/* Title */}
        {character.title && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {character.title}
          </p>
        )}

        {/* Description preview */}
        {character.description && (
          <p className="text-xs text-muted-foreground mt-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {character.description}
          </p>
        )}

        {/* Era badge */}
        {character.eras && (
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: character.eras.color || "hsl(var(--primary))" }}
            />
            <span className="text-xs text-muted-foreground">
              {character.eras.name}
            </span>
          </div>
        )}
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
    </Link>
  );
}
