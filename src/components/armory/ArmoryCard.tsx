import { Sword, Skull, Ship, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArmoryItem {
  id: string;
  name: string;
  description?: string | null;
  lore_content?: string | null;
  origin_story?: string | null;
  artifact_type?: string | null;
  power_description?: string | null; // stores collection slug
  image_url?: string | null;
  characters?: { id: string; name: string } | null;
}

interface ArmoryCardProps {
  item: ArmoryItem;
  index?: number;
}

const COLLECTION_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  soulless_citadel: {
    label: "Soulless Citadel",
    color: "hsl(0, 72%, 50%)",
    icon: <Skull size={11} />,
  },
  women_warriors: {
    label: "Women Warriors",
    color: "hsl(38, 60%, 45%)",
    icon: <Users size={11} />,
  },
  pirates_of_fukushu: {
    label: "Pirates of Fukushū",
    color: "hsl(200, 60%, 45%)",
    icon: <Ship size={11} />,
  },
};

export function ArmoryCard({ item, index = 0 }: ArmoryCardProps) {
  const collection = COLLECTION_CONFIG[item.power_description ?? ""] ?? {
    label: item.power_description ?? "Unknown",
    color: "hsl(0, 0%, 50%)",
    icon: <Sword size={11} />,
  };

  const isSidekick = item.artifact_type === "armory_sidekick";

  return (
    <div
      className="opacity-0 animate-fade-in flex flex-col border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${(index % 12) * 0.05}s` }}
    >
      {/* Header bar */}
      <div className="px-5 pt-5 pb-4">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {/* Collection badge */}
          <span
            className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border"
            style={{ borderColor: collection.color, color: collection.color }}
          >
            {collection.icon}
            {collection.label}
          </span>

          {/* Type badge */}
          <span className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border border-border text-muted-foreground">
            <Sword size={11} />
            {isSidekick ? "Sidekick" : "Weapon"}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-base tracking-wide text-foreground leading-snug">
          {item.name}
        </h3>

        {/* Description one-liner */}
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Quote block — flex-grow so cards align at bottom */}
      {item.lore_content && (
        <div className="px-5 pb-4 flex-1">
          <div
            className="border-l-2 pl-4"
            style={{ borderColor: collection.color + "60" }}
          >
            <p
              className="text-sm italic text-foreground/80 leading-relaxed line-clamp-6"
            >
              {item.lore_content}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/50 mt-auto">
        {item.origin_story && (
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            {item.origin_story}
          </p>
        )}
        {item.characters && (
          <p className="text-xs mt-1" style={{ color: collection.color + "cc" }}>
            Wielded by {item.characters.name}
          </p>
        )}
      </div>
    </div>
  );
}
