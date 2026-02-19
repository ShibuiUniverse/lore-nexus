import { useState, useEffect } from "react";
import { Sword, Skull, Ship, Users, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const collection = COLLECTION_CONFIG[item.power_description ?? ""] ?? {
    label: item.power_description ?? "Unknown",
    color: "hsl(0, 0%, 50%)",
    icon: <Sword size={11} />,
  };

  const isSidekick = item.artifact_type === "armory_sidekick";

  const badges = (
    <div className="flex items-center gap-2 flex-wrap mb-3">
      <span
        className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border"
        style={{ borderColor: collection.color, color: collection.color }}
      >
        {collection.icon}
        {collection.label}
      </span>
      <span className="flex items-center gap-1 px-2 py-0.5 text-xs uppercase tracking-wider border border-border text-muted-foreground">
        <Sword size={11} />
        {isSidekick ? "Sidekick" : "Weapon"}
      </span>
    </div>
  );

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setOpen(true)}
        className="opacity-0 animate-fade-in flex flex-col w-full text-left border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        style={{ animationDelay: `${(index % 12) * 0.05}s` }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          {badges}
          <h3 className="font-display text-base tracking-wide text-foreground leading-snug">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Quote block */}
        {item.lore_content && (
          <div className="px-5 pb-4 flex-1">
            <div className="border-l-2 pl-4" style={{ borderColor: collection.color + "60" }}>
              <p className="text-sm italic text-foreground/80 leading-relaxed line-clamp-6">
                {item.lore_content}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border/50 mt-auto w-full flex items-center justify-between gap-4">
          <div>
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
          <span className="text-xs text-muted-foreground/50 shrink-0 uppercase tracking-wider">
            Read more
          </span>
        </div>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-xl max-h-[85vh] flex flex-col border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border/50">
              <div>
                {badges}
                <h2 className="font-display text-xl tracking-wide text-foreground leading-snug">
                  {item.name}
                </h2>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body — scrollable */}
            <div className="overflow-y-auto px-6 py-6 flex-1">
              {item.lore_content && (
                <div className="border-l-2 pl-5" style={{ borderColor: collection.color + "80" }}>
                  <p className="text-base italic text-foreground/90 leading-loose whitespace-pre-line">
                    {item.lore_content}
                  </p>
                </div>
              )}
            </div>

            {/* Modal footer */}
            {(item.origin_story || item.characters) && (
              <div className="px-6 py-4 border-t border-border/50 space-y-1">
                {item.origin_story && (
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    {item.origin_story}
                  </p>
                )}
                {item.characters && (
                  <p className="text-xs" style={{ color: collection.color + "cc" }}>
                    Wielded by {item.characters.name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
