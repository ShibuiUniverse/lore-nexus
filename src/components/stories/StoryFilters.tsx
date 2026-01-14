import { Button } from "@/components/ui/button";

interface StoryFiltersProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

export const StoryFilters = ({ selectedType, onTypeChange }: StoryFiltersProps) => {
  const types = [
    { value: null, label: "All" },
    { value: "side_story", label: "Side Stories" },
    { value: "trailer", label: "Trailers" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {types.map((type) => (
        <Button
          key={type.value ?? "all"}
          variant={selectedType === type.value ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange(type.value)}
          className={`
            font-display tracking-wider text-xs uppercase
            ${selectedType === type.value 
              ? "bg-primary text-primary-foreground" 
              : "border-border/50 hover:border-primary/50 hover:bg-primary/10"
            }
          `}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
};
