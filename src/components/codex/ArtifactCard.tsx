import { Link } from "react-router-dom";
import { Sword, Gem, BookOpen, Shield, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Artifact {
  id: string;
  name: string;
  description?: string | null;
  artifact_type?: string | null;
  power_description?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
  current_holder_id?: string | null;
  characters?: {
    id: string;
    name: string;
  } | null;
}

interface ArtifactCardProps {
  artifact: Artifact;
  index: number;
}

const typeIcons: Record<string, React.ReactNode> = {
  weapon: <Sword size={14} />,
  gemstone: <Gem size={14} />,
  armor: <Shield size={14} />,
  tome: <BookOpen size={14} />,
  relic: <ScrollText size={14} />,
  other: <ScrollText size={14} />,
};

const typeColors: Record<string, string> = {
  weapon: "text-red-400 border-red-400/50",
  gemstone: "text-purple-400 border-purple-400/50",
  armor: "text-blue-400 border-blue-400/50",
  tome: "text-amber-400 border-amber-400/50",
  relic: "text-primary border-primary/50",
  other: "text-muted-foreground border-muted-foreground/50",
};

export function ArtifactCard({ artifact, index }: ArtifactCardProps) {
  const artifactType = artifact.artifact_type || "relic";

  return (
    <Link
      to={`/codex/artifacts/${artifact.id}`}
      className="group relative block overflow-hidden border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/80 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {artifact.image_url ? (
          <img
            src={artifact.image_url}
            alt={artifact.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
            <div className="text-muted-foreground/30">
              {typeIcons[artifactType] ? (
                <div className="w-16 h-16 flex items-center justify-center">
                  {React.cloneElement(typeIcons[artifactType] as React.ReactElement, { size: 48 })}
                </div>
              ) : (
                <ScrollText className="w-16 h-16" />
              )}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Featured badge */}
        {artifact.is_featured && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/90 text-primary-foreground">
            Legendary
          </span>
        )}

        {/* Type badge */}
        <span
          className={cn(
            "absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border bg-background/80 backdrop-blur-sm",
            typeColors[artifactType]
          )}
        >
          {typeIcons[artifactType]}
          {artifactType}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-primary transition-colors mb-2">
          {artifact.name}
        </h3>

        {/* Description */}
        {artifact.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {artifact.description}
          </p>
        )}

        {/* Power preview */}
        {artifact.power_description && (
          <p className="text-xs text-primary/70 italic line-clamp-1">
            Power: {artifact.power_description}
          </p>
        )}

        {/* Current holder */}
        {artifact.characters && (
          <p className="text-xs text-muted-foreground mt-2">
            Held by: <span className="text-foreground">{artifact.characters.name}</span>
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

// Need to import React for cloneElement
import React from "react";
