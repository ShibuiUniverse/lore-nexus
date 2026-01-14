import { cn } from "@/lib/utils";

interface JapaneseAccentProps {
  text: string;
  position?: "left" | "right";
  className?: string;
}

export function JapaneseAccent({ text, position = "left", className }: JapaneseAccentProps) {
  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 pointer-events-none select-none",
        "text-muted-foreground/20 text-xs tracking-[0.5em]",
        "font-display uppercase",
        position === "left" ? "left-4 md:left-8" : "right-4 md:right-8",
        "writing-mode-vertical hidden lg:block",
        className
      )}
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      {text}
    </div>
  );
}
